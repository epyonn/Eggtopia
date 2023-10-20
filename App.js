import React, {useReducer} from 'react';
import { AppProvider } from './context/AppContext';
import { SafeAreaView, StyleSheet, Text, ImageBackground } from 'react-native';
import CountdownTimer from './components/CountdownTimer'
import BrownBag from './components/BrownBag'
import Incubator from './components/Incubator'
import { styles } from './styles/styles'


export default function App() {


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

