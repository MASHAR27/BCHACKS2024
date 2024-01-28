import os
import mido
import pathlib
import json

from mido import Message, MidiFile, MidiTrack

out_mid = MidiFile()
track = MidiTrack()
out_mid.tracks.append(track)

with open("prompt.txt","r") as f:
    system = f.read()

def midi_to_note_name(midi_number):
    # Define the note names
    notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

    # Calculate the octave and note
    octave = (midi_number // 12) - 1
    note = notes[midi_number % 12]

    # Combine note and octave
    return f"{note}{octave}"

# files = ["./_Weird Al_ Yankovic/Amish Paradise.mid",
# "./_Weird Al_ Yankovic/Dare to Be Stupid.mid",
# "./_Weird Al_ Yankovic/Eat It.mid",
# "./2 Brothers on the 4th Floor/Come Take My Hand.mid",
# "./ZZ Top/Gimme All Your Lovin.1.mid",
# "./ZZ Top/Gimme All Your Lovin.2.mid",
# "./ZZ Top/Gimme All Your Lovin.3.mid",
# "./ZZ Top/Gimme All Your Lovin.4.mid",
# "./ZZ Top/Gimme all your Lovin.mid",
# "./ZZ Top/Got Me Under Pressure.mid",
# "./ZZ Top/Just Got Paid.mid",
# "./ZZ Top/La Grange.1.mid",
# "./ZZ Top/Legs.1.mid"]

# prompts = ["Edgy ,cool, dark theme,despair and stress","Goofy, xylophone, stupid, funny and carnival type ,very non-serious and light mood","Ominous,scary,tense, build up, thinking type music , emotional, melancholic, gradual", "Calming, chill , night , asmr type , funky , riveting","lullaby , sleepy , mystical , childhood , nostalgic", "Energizing, fun, motivational, party-like, interesting, powerful","Soothing, motivational, party-like, interesting, powerful, slow","Fun, motivational, slow, powerful","Energizing, fun, country-style","Energizing, fun, motivational, slow, powerful, interesting"," Rock, Soothing, Steady, Sonic, Feel-Good","Progressive Rock, Empowering, Enthusiastic, Exciting, Encouraging","Upgoing, Chill, Onbeat, Happy","Soothing, Dramatic, Emotional, Slpw"]
# for i in range(5):
#         content = ""
#         mid = mido.MidiFile(files[i])
#         # print(len(mid.tracks))
#         for j in mid.tracks[1:]:
#             mid.tracks[0] += j 
#         count = 0
#         for j in mid.tracks[0]:
#             if j.type=="note_on" or j.type=="note_off":
#                     track.append(mido.Message("note_on",velocity=j.velocity, time=j.time, note=j.note))
#                     content += f"Note:{midi_to_note_name(j.note)} Velocity:{j.velocity} Time:{round(j.time)}"+"\n"
#                     count+=1
#                     if count>=100:
#                         # print(json.dumps({"prompt": "Request: "+i.split("/")[-1], "completion": "Answer: " + content}))
#                         # print(json.dumps({"prompt": "Request: "+prompts[i], "completion": "Answer: " + content}))

#                         print(json.dumps({"messages": [{"role": "system", "content": system}, {"role": "user", "content": "Now you generate a music with title "+prompts[i]}, {"role": "assistant", "content": content}]}))
#                         content = "" #forgot this 
#                         count = 0 

#         # print(json.dumps({"prompt": "Request: "+prompts[i], "completion": "Answer: " + content}))
#         print(json.dumps({"messages": [{"role": "system", "content": system}, {"role": "user", "content": "Now you generate a music with title "+prompts[i]}, {"role": "assistant", "content": content}]}))
#         # print(json.dumps({"prompt": "Request: "+i.split("/")[-1], "completion": "Answer: " + content}))

for i in list(pathlib.Path('.').rglob('*.mid'))[:5000]:
# for i in ["./2 Brothers on the 4th Floor/Come Take My Hand.mid"]:
    try:
        content = ""
        i = str(i)
        mid = mido.MidiFile(i)
        # print(len(mid.tracks))
        for j in mid.tracks[1:]:
            mid.tracks[0] += j 
        count = 0 
        for j in mid.tracks[0]:
            if j.type=="note_on" or j.type=="note_off":
                    track.append(mido.Message(j.type, time=(j.time//100)*100, note=j.note))
                    for i in range(j.time//100):
                        content+="0 "
                    content += str(j.note)+" "
                    count+=1
                    if count>=200:
                        # break
                        # print(json.dumps({"prompt": "Request: "+i.split("/")[-1], "completion": "Answer: " + content}))
                        # print(json.dumps({"messages": [{"role": "system", "content": system}, {"role": "user", "content": "Now you generate a music with title "+i.split("/")[-1]}, {"role": "assistant", "content": content}]}))
                        print(content)
                        content = "" #forgot this 
                        count = 0 
        print(content)
        # print(json.dumps({"prompt": "Request: "+i.split("/")[-1], "completion": "Answer: " + content}))
        # print(json.dumps({"messages": [{"role": "system", "content": system}, {"role": "user", "content": "Now you generate a music with title "+i.split("/")[-1]}, {"role": "assistant", "content": content}]}))
    except:
        pass
out_mid.save('new_song.mid')

# with open("ans3.jsonl","r") as f:a=f.read()
# import random
# a = a.split("\n")
# random.shuffle(a)
# with open("ans3.jsonl","w") as f:f.write("\n".join(a))