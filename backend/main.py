from mido import Message, MidiFile, MidiTrack
import mido 
from midi2audio import FluidSynth
fs = FluidSynth()
import random
from openai import OpenAI
import model 
import torch
import numpy as np

import torch
import numpy as np
device = 'cuda' if torch.cuda.is_available() else 'cpu'

DIM = 512
import math
import torch.nn as nn

from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from fastapi.staticfiles import StaticFiles
app = FastAPI()




app.mount("/music", StaticFiles(directory="music"), name="music")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

class PositionalEncoding(nn.Module):

    def __init__(self, d_model: int, dropout: float = 0.1, max_len: int = 5000):
        super().__init__()
        self.dropout = nn.Dropout(p=dropout)

        position = torch.arange(max_len).unsqueeze(1)
        div_term = torch.exp(torch.arange(0, d_model, 2) * (-math.log(10000.0) / d_model))
        pe = torch.zeros(max_len, 1, d_model)
        pe[:, 0, 0::2] = torch.sin(position * div_term)
        pe[:, 0, 1::2] = torch.cos(position * div_term)
        self.register_buffer('pe', pe)

    def forward(self, x):
        """
        Arguments:
            x: Tensor, shape ``[seq_len, batch_size, embedding_dim]``
        """
        x = x + self.pe[:x.size(0)].to(device)
        return x
#https://pytorch.org/tutorials/beginner/transformer_tutorial.html

class Music(torch.nn.Module):
  def __init__(self):
    super().__init__()
    self.pos = PositionalEncoding(DIM, max_len=201)#torch.nn.Embedding(200, DIM).to(device)
    self.projection = torch.nn.Embedding(128, DIM).to(device)
    self.trans = torch.nn.TransformerEncoder(torch.nn.TransformerEncoderLayer(DIM, 16, batch_first=True), 8).to(device)
    self.output = torch.nn.Linear(DIM, 128).to(device)
  def forward(self, x):
    #pos = self.pos(torch.arange(0,200).to(device))
    feature = self.projection(x)
    feature = self.pos(feature)
    feature = self.trans(feature, mask=torch.nn.Transformer.generate_square_subsequent_mask(200), is_causal=True)
    return self.output(feature)
model = Music()

# model = torch.load("music.mod", map_location=device)
# torch.save(model.state_dict(), "music.dict")
# quit()
model.load_state_dict(torch.load("music.dict"))
import threading
import os
def image_gen(prompt, uuid):
    response = client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        size="1024x1024",
        quality="standard",
        n=1,
    )
    image_url = response.data[0].url
    print(image_url)
    os.system(f"wget \"{image_url}\" -O music/{uuid}.png")

with open("key.key", "r") as f:
    key=f.read()
client = OpenAI(api_key=key)

def midi_to_note_name(midi_number):
    notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

    octave = (midi_number // 12) - 1
    note = notes[midi_number % 12]

    return f"{note}{octave}"

def note_name_to_midi(note):
    notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

    if "#" in note:
        n = note[:2]
        o = int(note[2:])
    else:
        n = note[0]
        o = int(note[1:])
    if o==4 or o==7:
        o+=1
    return (o+1)*12+notes.index(n)

def gpt_generate(prompt="", tempurture=1, seed=-1):
    response = client.chat.completions.create(
    model="ft:gpt-3.5-turbo-1106:personal::8ltJTjQI",
    messages=[
        {
        "role": "system",
        "content": "You are a music writer, you will be generate music in midi message stream with only note number and0 means pause for 100 ticks"
        },
        {
        "role": "assistant",
        "content": prompt
        }
    ],
    temperature=tempurture,
    max_tokens=100,
    seed=int(random.random()*1000000) if seed==-1 else seed
    )

    out = response.choices[0].message.content
    return out

def own_model_generate(prompt="0", tempurture=1, seed=-1):
    torch.manual_seed(int(random.random()*1000000) if seed==-1 else seed)
    inp = torch.tensor([[int(i) for i in prompt.split(" ")]]).to(torch.int32)
    t = tempurture
    for i in range(100):
        p = torch.nn.functional.softmax(model(inp)[0][-1]/t).detach().numpy()
        out = np.random.choice(np.arange(128), p=p)
        out = torch.tensor(out).unsqueeze(-1).unsqueeze(-1)
        inp = torch.concat((inp, out), dim=-1)
    return " ".join([str(i) for i in inp.detach().numpy()[0]])
    
def save_file(out, uuid, pace=200):
    out_mid = MidiFile()
    track = MidiTrack()
    out_mid.tracks.append(track)
    atime = 0
    for i in out.split(" "):
        if i=="0":
            atime+=100
            continue
        try: 
            # track.append(mido.Message("note_on",time=atime+pace, note=int(i)))
            track.append(mido.Message("note_on",time=atime+pace, note=int(i)))
            atime=0
        except:
            pass
    out_mid.save('new_song.mid')
    fs.midi_to_audio('new_song.mid', f'music/{uuid}.wav')
    return uuid

def read_file(name):
    with open(name, "r") as f:
        return f.read()

def get_music():
    return [i for i in os.listdir("music")]

@app.get("/gen_music")
def gen(image_prompt, model="gpt", prompt="0", tempurture=1, seed=-1, pace=100):
    uuid = int(random.random()*1000000)
    # thread = threading.Thread(target=image_gen, args=('A music cover image for '+image_prompt, uuid))
    # thread.start()
    image_gen('A music cover image for '+image_prompt, uuid)
    print("started")

    if model=="gpt":
        out = gpt_generate(prompt=prompt, tempurture=float(tempurture), seed=int(seed))
        # out = out #cannot do prompt+=?
        # return save_file(out, uuid, pace=pace)
    else:
        out = own_model_generate(prompt=prompt, tempurture=float(tempurture), seed=int(seed))
        # out = out #cannot do prompt+=?
        # return save_file(out, uuid, pace=pace)
    os.system(f'python3 convert.py "{out}" {uuid}')
@app.get("/list")
def list():
    return set([i.split(".")[0] for i in os.listdir("music")])