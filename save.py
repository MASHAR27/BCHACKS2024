from mido import Message, MidiFile, MidiTrack
import mido 

out_mid = MidiFile()
track = MidiTrack()
out_mid.tracks.append(track)

with open("generated.txt", "r") as f:
    msg = f.read()


def midi_to_note_name(midi_number):
    # Define the note names
    notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

    # Calculate the octave and note
    octave = (midi_number // 12) - 1
    note = notes[midi_number % 12]

    # Combine note and octave
    return f"{note}{octave}"

def note_name_to_midi(note):
    notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

    if "#" in note:
        n = note[:2]
        o = int(note[2:])
    else:
        n = note[0]
        o = int(note[1:])
    return (o+1)*12+notes.index(n)

for i in msg.split("\n"):
    tokens = i.split(" ")
    n = tokens[0].split(":")[1]
    v = tokens[1].split(":")[1]
    t = tokens[2].split(":")[1]
    # print(n)
    # print(midi_to_note_name(note_name_to_midi(n)))
    track.append(mido.Message("note_on",velocity=int(v), time=int(t)+64, note=note_name_to_midi(n)))

out_mid.save('new_song.mid')