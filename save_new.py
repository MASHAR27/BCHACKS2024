from mido import Message, MidiFile, MidiTrack
import mido 

out_mid = MidiFile()
track = MidiTrack()
out_mid.tracks.append(track)

out = "55 62 50 62 55 50 55 62 62 55 50 62 50 55 62 50 55 62 50 55 62 60 55 48 60 55 48 60 60 48 55 60 48 55 60 48 57 62 48 57 62 48 50 62 57 50 62 57 62 50 57 62 50 57 60 50 57 60 50 60 57 50 60 57 36 48 60 62 36 48 60 62 48 60 60 48 57 55 48 53 57 62 55 48 53 62 48 48 62 60 62 57 48 36 53 55 48 57 60 60 55 48 60 55 48 60 57 48 62 60 36 48 55 55 55 60 60 60 36 62 60 48 55 55 55 60 62 48 36 60 55 48 60 62 55 36 48 55 60 62 57 74 48 53 55 36 57 60 62 62 60 55 48 55 62 36 55 48 60 63 62 60 55 48 63".split(" ")
for i in out:
    track.append(mido.Message("note_on",time=200, note=int(i)))

out_mid.save('new_song.mid')