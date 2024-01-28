import React, { useState } from 'react';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import './Archive.css';
import { add, albums, albumsOutline, card, list } from 'ionicons/icons';
const Archive: React.FC = () => {
  const [isCardView, setIsCardView] = useState(true);
  const [musicList, setMusicList] = useState(["hahahahaha", "lalalalala", "lmao", "laugh my teeth off"]);
  // musicList = A X. setusicList(something)
  const renderCardContent = () => (

    <IonList className="horizontal-list">
      {musicList.map((x, index) => (
        <IonItem key={index}>
          <IonThumbnail slot="start">
            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
          </IonThumbnail>
          <IonLabel>{x}</IonLabel>
        </IonItem>
      ))}
    </IonList>

  );


  const renderListContent = () => (
    <IonList>
      {
        musicList.map((x, index) => (
          <div key={index}>
            <IonCard>
              <img src="/demo.png"></img>
              <p style={{color:"whote"}}>{x}</p>
            </IonCard>
          </div>
        ))
      }

    </IonList>
  );







  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Albumns</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsCardView(!isCardView)}>
              {isCardView ? <IonIcon icon={list}></IonIcon> : <IonIcon icon={albumsOutline}></IonIcon>}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {isCardView ? renderCardContent() : renderListContent()}
        <IonFab style={{ padding: "20px" }} slot="fixed" horizontal="end" vertical="bottom">
          <IonFabButton><IonIcon icon={add}></IonIcon></IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Archive;
