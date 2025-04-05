/*
GameLoad Screen for showing countdown to transitioning to the game.
*/
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Button } from 'react-native';
import MainGame from '../mainGame';
import { Countdown } from '../animations/countDown';

export default function GameLoad({ navigation }) {
  const [isCountdownComplete, setIsCountdownComplete] = useState(false); // sets countdown to false initially

  useEffect(() => {                // on countdown completion switch screens
    if (isCountdownComplete) {
      navigation.navigate('MainGame');
    }
  }, [isCountdownComplete]);

  return (
    <View style={styles.container}>
	{!isCountdownComplete ? (
	  <ImageBackground
	    style={styles.backgroundImage}
	    source={require('../../assets/images/Background/Ocean_3/1.png')}
	  >
	    <Countdown onComplete={() => setIsCountdownComplete(true)} />
	  </ImageBackground>
	) : (
	  console.log("Game start!")
	)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  gameContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: 'white',
  },
});
