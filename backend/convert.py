import sys
from mido import Message, MidiFile, MidiTrack
import mido 
from midi2audio import FluidSynth
fs = FluidSynth()

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

save_file(sys.argv[1], sys.argv[2])