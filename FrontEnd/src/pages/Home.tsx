import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonButton, IonIcon } from '@ionic/react';

import { logoGithub } from 'ionicons/icons'; 

const Home: React.FC = () => {
  const styles = {
    background: 'linear-gradient(to bottom, #1DB954, #191414)',
    color: '#fff',
  };

  const headingStyles = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
    fontSize: '2rem',
  };

  const paragraphStyles = {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1.2rem',
  };

  const iconStyles = {
    maxWidth: '100px',
    maxHeight: '100px',
  };

  const loginButtonStyles = {
    fontSize: '0.8rem', 
    padding: '10px 20px', 
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={styles}>Multi Music Madness</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="hero" style={styles}>
          <img src="new_icon.png" alt="Music Player" style={iconStyles} />
          <h1 style={headingStyles}>Welcome to Multi Music Madness</h1>
          <p style={paragraphStyles}>Customise and Create your own Music!</p>
          <IonButton expand="full" fill="solid" color="primary" routerLink="/explore" style={loginButtonStyles}>
            <IonIcon icon={logoGithub} slot="start" /> Login with GitHub
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
