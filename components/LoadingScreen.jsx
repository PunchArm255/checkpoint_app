import React from 'react';
import { ActivityIndicator, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useGlobalContext } from "../context/GlobalProvider";
import { images } from '../constants';
import {BarIndicator} from 'react-native-indicators';

const LoadingScreen = () => {
  const { darkMode } = useGlobalContext();

  return (
    <LinearGradient colors={darkMode ? ['#000000', '#000000'] : ['#1c063b', '#080019']} style={styles.container}>
      <Image
        source={images.glow}
        style={StyleSheet.absoluteFillObject}
        className="w-full h-full absolute contain top-0 left-0"
      />
      <BarIndicator  count={5} color={`${darkMode ? '#8c8c8c' : '#c5b0ef'}`} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
