/*
Title Screen holding play button and Looping Image

*/
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { getHighScore, updateHighScore, isHighScore } from '../highScoreService';
import ScrollingImage from '../animations/Clouds';

export default function TitleScreen({ navigation }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
	
    <View style={styles.container}>

      
      <ImageBackground 
        source={require('../../assets/images/Background/Ocean_8/1.png')} 
        style={styles.imageBackground}
      >
	  {/* Looping Clouds */}
	  <ScrollingImage />
        {/* Menu Container */}
        <View style={styles.menuContainer}>
          {/* Title Image */}
          <Image 
            resizeMode='contain' 
            source={require('../../assets/images/title.png')} 
            style={styles.titleImage}
          />

          {/* Play Button */}
          <TouchableOpacity
            onPress={() => {
              scale.value = withSpring(1.1, {}, () => (scale.value = withSpring(1)));
              navigation.navigate('GameLoad');
            }}
          >
            <Animated.Image 
              source={require('../../assets/images/playButton.png')} 
              style={[styles.playButton, animatedStyle]}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center', // Ensures content is vertically centered
    alignItems: 'center', // Ensures content is horizontally centered
    zIndex: 1, // Image background is behind
  },

  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3, // Ensure menu is above the background and parallax
  },
  titleImage: {
    marginBottom: 50,
  },
  playButton: {
    marginTop: 20,
  },
});
