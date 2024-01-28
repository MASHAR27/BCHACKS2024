import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton
} from '@ionic/react';

const Stats: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [musicTracks, setMusicTracks] = useState([
    { id: 1, title: 'Music Track 1', url: 'url-to-track-1.mp3' },
    { id: 2, title: 'Music Track 2', url: 'url-to-track-2.mp3' },
    { id: 3, title: 'Music Track 3', url: 'url-to-track-3.mp3' },
    // ... more music tracks
  ]);

  const filteredMusicTracks = musicTracks.filter(track =>
    track.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDownload = () => {
    if (selectedMusic) {
      // Implement download logic here
      console.log('Downloading:', selectedMusic.url);
    }
  };

  const handleEmailShare = () => {
    if (selectedMusic) {
      // Implement email sharing logic here
      console.log('Sharing on email:', selectedMusic.url);
    }
  };

  const handleInstagramShare = () => {
    if (selectedMusic) {
      // Implement Instagram sharing logic here
      console.log('Sharing on Instagram:', selectedMusic.url);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your Listening Habits</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Your Listening Habits</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonSearchbar
          value={searchText}
          onIonChange={e => setSearchText(e.detail.value!)}
          placeholder="Search for music tracks"
        />

        <IonList>
          {filteredMusicTracks.map(track => (
            <IonItem key={track.id} button onClick={() => setSelectedMusic(track)}>
              <IonLabel>{track.title}</IonLabel>
            </IonItem>
          ))}
        </IonList>

        {selectedMusic && (
          <div>
            <IonButton onClick={handleDownload}>Download</IonButton>
            <IonButton onClick={handleEmailShare}>Share on Email</IonButton>
            <IonButton onClick={handleInstagramShare}>Share on Instagram</IonButton>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Stats;
