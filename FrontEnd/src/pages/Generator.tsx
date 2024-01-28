// Generator.tsx
import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonSelect,
  IonSelectOption
} from '@ionic/react';

const Generator: React.FC = () => {
  const [seed, setSeed] = useState('');
  const [temperature, setTemperature] = useState('');
  const [nodes, setNodes] = useState(''); 
  const [instrument, setInstrument] = useState(''); 

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Generate Your Music</IonTitle>
        </IonToolbar>
      </IonHeader>
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
    </IonPage>
  );
};

export default Generator;
