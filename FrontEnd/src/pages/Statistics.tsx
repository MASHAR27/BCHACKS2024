import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonList, IonItem, IonLabel, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

const Stats: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [musicTracks, setMusicTracks] = useState([
    { id: 1, title: 'Music Track 1' },
    { id: 2, title: 'Music Track 2' },
    { id: 3, title: 'Music Track 3' },
    // ... more music tracks
  ]);

  // Filter the music tracks based on the search text
  const filteredMusicTracks = musicTracks.filter(track =>
    track.title.toLowerCase().includes(searchText.toLowerCase())
  );

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

        {/* Search Bar */}
        <IonSearchbar
          value={searchText}
          onIonChange={e => setSearchText(e.detail.value!)}
          placeholder="Search for music tracks"
        />

        {/* Filtered List of Music Tracks */}
        <IonList>
          {filteredMusicTracks.map(track => (
            <IonItem key={track.id}>
              <IonLabel>{track.title}</IonLabel>
            </IonItem>
          ))}
        </IonList>

        <IonCard>
      <IonCardHeader>
        <IonCardTitle>Card Title</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>Here the Piechart is gonna be</IonCardContent>

      <IonButton fill="clear">Action 1</IonButton>
      <IonButton fill="clear">Action 2</IonButton>
    </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Stats;
