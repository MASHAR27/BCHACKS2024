import os
import mido
import pathlib
import json

with open("prompt.txt","r") as f:
    system = f.read()
for i in pathlib.Path('.').rglob('*.mid'):
    # print(i)
    try:
        i=str(i)
        content = ""
        mid = mido.MidiFile(i)
        for j in list(mid)[:200]:
            j.time = round(j.time, 4)
            content+=str(j)+"\n"
            print(json.dumps({"messages": [{"role": "system", "content": system}, {"role": "user", "content": "Now you generate a music with title "+i.split("/")[-1]}, {"role": "assistant", "content": content}]}))
    except:
        pass
