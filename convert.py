with open("trans2.seq","r") as f:
    data = f.read().split("\n")
import json
for i in data[:3000]:
    print(json.dumps({"messages": [{"role": "system", "content": "You are a music writer, you will be generate music in midi message stream with only note number and0 means pause for 100 ticks"}, {"role": "assistant", "content": i}]}))