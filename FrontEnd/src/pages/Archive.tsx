import React, { useState } from 'react';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCheckbox, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonSelect, IonSelectOption, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { add, albums, albumsOutline, card, list } from 'ionicons/icons';
const Archive: React.FC = () => {
  const [isCardView, setIsCardView] = useState(true);
  const [musicList, setMusicList] = useState(["hahahahaha", "lalalalala", "lmao", "laugh my teeth off"]);
  const [isOpen, setIsOpen] = useState(false);
  const [seed, setSeed] = useState('');
  const [temperature, setTemperature] = useState('');
  const [nodes, setNodes] = useState(false);
  const [nodesValue, setNodesValue] = useState('');
  const [instrument, setInstrument] = useState(''); 
  
  const renderCardContent = () => (

    <IonList className="horizontal-list">
      {musicList.map((x, index) => (
        <IonItem key={index}>
          <IonThumbnail slot="start">
            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
          </IonThumbnail>
          <IonLabel style={{ color: "whote" }}>{x}</IonLabel>
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
              <p style={{ color: "whote" }}>{x}</p>
            </IonCard>
          </div>
        ))
      }

    </IonList>
  );







  return (
    <IonPage>
      <IonModal onDidDismiss={() => {
        setIsOpen(false)
      }} isOpen={isOpen}>
        <IonToolbar>
          <IonHeader>
            <IonButtons><IonButton onClick={() => {
              setIsOpen(false)
            }}>Close</IonButton></IonButtons>
            <IonTitle>Create new music</IonTitle>
          </IonHeader>
        </IonToolbar>
        <IonContent>


        <IonList>
          <IonItem>
            <IonLabel position="floating">Seed</IonLabel>
            <IonInput
              value={seed}
              onIonChange={(e) => setSeed(e.detail.value!)}
              type="tel"
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Temperature (Between 0 and 2)</IonLabel>
            <IonInput
              value={temperature}
              onIonChange={(e) => setTemperature(e.detail.value!)}
              type="number"
              placeholder='The higher the temp, the more random the output.'
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Drop a beat</IonLabel>
            <IonInput
              value={nodes}
              onIonChange={(e) => setNodes(e.detail.value!)}
              type="text"
            />
          </IonItem>

          <IonItem>
            <IonLabel>Instrument</IonLabel>
            <IonSelect
              value={instrument}
              placeholder="Select One"
              onIonChange={(e) => setInstrument(e.detail.value)}
            >
              <IonSelectOption value="piano">Piano</IonSelectOption>
              <IonSelectOption value="guitar">Guitar</IonSelectOption>
              <IonSelectOption value="drums">Drums</IonSelectOption>
              
            </IonSelect>
          </IonItem>
        </IonList>

        </IonContent>
      </IonModal>
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
          <IonFabButton onClick={() => {
            setIsOpen(true);
          }}><IonIcon icon={add}></IonIcon></IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Archive;
