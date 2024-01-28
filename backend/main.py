from mido import Message, MidiFile, MidiTrack
import mido 
from midi2audio import FluidSynth
fs = FluidSynth()
import random
from openai import OpenAI
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

def gpt_generate(prompt="", tempurture=1, pace=200, seed=-1):
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

def save_file(out):
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
            track.append(mido.Message("note_on",time=atime+pace, note=note_name_to_midi(midi_to_note_name(int(i)))))
            atime=0
        except:
            pass
    out_mid.save('new_song.mid')
    fs.midi_to_audio('new_song.mid', 'output.wav')

if __name__=="__main__":
    save_file("0 71 66 66 71 72 71 31 36 36 42 78 46 63 66 57 61 69 35 54 61 61 61 71 39 42 66 38 42 61 39 54 43 42 54 3 59 67 55 43 47 54 4 54 42 4 59 59 42 42 83 71 66 36 83 59 66 31 38 47 36 64 28 54 66 36 39 28 35 47 4 28 66 59 41 49 38 59 54 59 54 64 46 52 42 36 39 4 42 4 36 46 47 59 4 39 54 59 64 48 4")