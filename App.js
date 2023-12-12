import React, { useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { SafeAreaView, StyleSheet, Text, ImageBackground } from 'react-native';
import CountdownTimer from './components/timer/CountdownTimer'
import BrownBag from './components/inventory/BrownBag'
import Incubator from './components/incubator/Incubator'
import LineChart from './components/metrics/LineChart'
import { styles } from './styles/styles'
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  
  return (
    <AppProvider>
      <ImageBackground 
        source={require('./assets/background/spooky_backgroundv1.png')}
        style={styles.image}
        >
      <BrownBag />
      <Incubator />
      <CountdownTimer />

      </ImageBackground>
    </AppProvider>
  );
};
