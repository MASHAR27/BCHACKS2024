import React, { useEffect, useState } from 'react';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCheckbox, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonSelect, IonSelectOption, IonTextarea, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { add, albums, albumsOutline, card, list } from 'ionicons/icons';
const Archive: React.FC = () => {
  const [isCardView, setIsCardView] = useState(true);
  const [musicList, setMusicList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [seed, setSeed] = useState('');
  const [temperature, setTemperature] = useState('');
  const [nodes, setNodes] = useState("0");
  const [nodesValue, setNodesValue] = useState('');
  const [instrument, setInstrument] = useState('');
  useEffect(() => {
    fetch("https://8000-mashar27-bchacks2024-8xwj1wdkw0e.ws-us107.gitpod.io/list")
      .then(x => x.json()).then((x: any) => {
        setMusicList([...x])
      })
  }, [])
  const renderCardContent = () => (

    <IonList className="horizontal-list">
      {musicList.map((x, index) => (
        <IonItem key={index}>
          <IonThumbnail slot="start">
            <img src={"https://8000-mashar27-bchacks2024-8xwj1wdkw0e.ws-us107.gitpod.io/music/" + x + ".png"}></img>

          </IonThumbnail>
          <audio controls>
            <source src={"https://8000-mashar27-bchacks2024-8xwj1wdkw0e.ws-us107.gitpod.io/music/" + x + ".wav"} type="audio/ogg" />
          </audio>
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
              <img src={"https://8000-mashar27-bchacks2024-8xwj1wdkw0e.ws-us107.gitpod.io/music/" + x + ".png"}></img>
              <audio controls>
                <source src={"https://8000-mashar27-bchacks2024-8xwj1wdkw0e.ws-us107.gitpod.io/music/" + x + ".wav"} type="audio/ogg" />
              </audio>
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
              <IonLabel position="floating">Drop a beat</IonLabel>
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
              <IonLabel>Model</IonLabel>
              <IonSelect
              id="b"
                placeholder="Select One"
              >
                <IonSelectOption value="gpt">Fine-tunned GPT</IonSelectOption>
                <IonSelectOption value="own">Home Baked Transformer</IonSelectOption>

              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>A prompt for cover image</IonLabel>
              <IonTextarea id="a"></IonTextarea>
            </IonItem>
            <IonButton expand='block' onClick={()=>{
              const image_prompt = document.querySelector("#a").value
              const model = document.querySelector("#b").value
              console.log([seed, temperature, nodes, instrument, image_prompt, model])
              fetch(`https://8000-mashar27-bchacks2024-8xwj1wdkw0e.ws-us107.gitpod.io/gen_music?image_prompt=${image_prompt}&model=${model}&prompt=${nodes}&tempurture=${temperature}&seed=${seed}&pace=${instrument}&`)
              setIsOpen(false)
            }}>Submit</IonButton>
          </IonList>

        </IonContent>
      </IonModal>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Albums</IonTitle>
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
