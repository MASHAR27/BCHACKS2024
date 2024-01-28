from mido import Message, MidiFile, MidiTrack
import mido 

out_mid = MidiFile()
track = MidiTrack()
out_mid.tracks.append(track)

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

out="76 73 81 57 61 52 36 52 81 76 34 9 9 28 28 38 49 49 38 28 28 38 38 51 76 72 63 69 74 36 42 49 42 42 49 36 42 42 49 42 42 49 38 42 42 38 51 38 63 42 35 76 35 42 42 42 38 42 53 58 34 69 49 41 42 49 28 42 35 49 76 69 53 58 63 74 69 49 35 42 42 34 49 36 77 53 58 69 34 49 41 64 51 42 60 63 72 72 58 53 76 72 69 60 28 42 42 49 35 42 42 34 69 64 77 58 42 49 36 51 42 42 54 55 76 72 42 60 60 42 35 42 54 72 41 42 42 69 60 60 38 53 58 69 50 76 72 70 40 77 35 42 42 28 60 72 63 56 49 54 40 65 28 35 42 49 42 42 49 65 63 54 56 42 40 70 40 35 42 28 40 42 40 56 78 28 42 42 78 63 72 70 56 40 65 35 42 40 42 56 56 40 65"
atime = 0
for i in out.split(" "):
    if i=="0":
        atime+=100
        continue

    track.append(mido.Message("note_on",time=atime+200, note=note_name_to_midi(midi_to_note_name(int(i)))))
    atime=0
out_mid.save('new_song.mid')
from midi2audio import FluidSynth
fs = FluidSynth()
fs.midi_to_audio('new_song.mid', f'music/{12}.wav')
