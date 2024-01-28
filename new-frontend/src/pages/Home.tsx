import React, { useEffect, useState } from 'react';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCheckbox, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonSelect, IonSelectOption, IonTextarea, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { add, albums, albumsOutline, card, list } from 'ionicons/icons';
const Archive: React.FC = () => {
  const [isCardView, setIsCardView] = useState(true);
  const [musicList, setMusicList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [seed, setSeed] = useState('');
  const [temperature, setTemperature] = useState('');
  const [nodes, setNodes] = useState(false);
  const [nodesValue, setNodesValue] = useState('');
  const [instrument, setInstrument] = useState('');
  useEffect(()=>{
    fetch("https://8000-mashar27-bchacks2024-8xwj1wdkw0e.ws-us107.gitpod.io/list").then(x=>x.json).then((x: any)=>{
      
    setMusicList([...x])
    })
  },[])
  const renderCardContent = () => (

    <IonList className="horizontal-list">
      {musicList.map((x, index) => (
        <IonItem key={index}>
          <IonThumbnail slot="start">
            <img src="/demo.png" />
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
        <IonContent fullscreen>
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
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Notes Value</IonLabel>
              <IonInput
                value={nodes}
                onIonChange={(e) => setNodes(e.detail.value!)}
                type="text"
              />
            </IonItem>

            <IonItem>
              <IonLabel>Pace</IonLabel>
              <IonSelect
                value={instrument}
                placeholder="Select One"
                onIonChange={(e) => setInstrument(e.detail.value)}
              >
                <IonSelectOption value="50">Very Fast</IonSelectOption>
                <IonSelectOption value="100">Fast</IonSelectOption>
                <IonSelectOption value="200">Slow</IonSelectOption>
                <IonSelectOption value="300">Very slow</IonSelectOption>

              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>A prompt for cover image</IonLabel>
              <IonTextarea></IonTextarea>
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
