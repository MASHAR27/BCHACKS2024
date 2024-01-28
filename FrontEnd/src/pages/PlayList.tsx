import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonSearchbar
} from '@ionic/react';

const PlayList: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [musicList, setMusicList] = useState([
    // Dummy data, replace with actual music list
    { id: 1, title: 'Music Track 1', url: 'track1.mp3' },
    { id: 2, title: 'Music Track 2', url: 'track2.mp3' },
    // Add more tracks as needed
  ]);

  const handleCombineMusic = () => {
    if (selectedTracks.length === 2) {
      // Logic to combine two music tracks
      console.log(`Combining tracks: ${selectedTracks[0]} and ${selectedTracks[1]}`);
      // Implement music combining logic here
    } else {
      alert('Please select exactly 2 tracks to combine.');
    }
  };

  const handleTrackSelection = (trackId) => {
    let updatedSelection = [...selectedTracks];
    if (updatedSelection.includes(trackId)) {
      updatedSelection = updatedSelection.filter(id => id !== trackId);
    } else {
      updatedSelection.push(trackId);
    }
    setSelectedTracks(updatedSelection);
  };

  const filteredMusicList = musicList.filter(track =>
    track.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Music Generator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Search and Combine Music Tracks</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonSearchbar 
              value={searchText} 
              onIonChange={e => setSearchText(e.detail.value!)}
              placeholder="Search music tracks"
            ></IonSearchbar>

            <IonList>
              {filteredMusicList.map(track => (
                <IonItem key={track.id}>
                  <IonLabel>{track.title}</IonLabel>
                  <IonCheckbox 
                    slot="start" 
                    onIonChange={() => handleTrackSelection(track.id)}
                    checked={selectedTracks.includes(track.id)}
                  />
                </IonItem>
              ))}
            </IonList>

            <IonButton expand="block" onClick={handleCombineMusic}>Combine Selected Music</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default PlayList;
