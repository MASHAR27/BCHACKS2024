import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';

const Logo: React.FC = () => {
  // Add a function to handle logout logic here
  const handleLogout = () => {
    console.log('Logging out...');
    // Implement your logout logic here
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Log Out</IonTitle>
          <IonButton slot="end" onClick={handleLogout}>Logout</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Log Out</IonTitle>
          </IonToolbar>
        </IonHeader>
   
      </IonContent>
    </IonPage>
  );
};

export default Logo;
