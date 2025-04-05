/*
Creates an array of cloud images that scrolls horizontally and resets back to original position
after reaching the negative width of the screen creating a looping effect

*/

import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function ScrollingImage() {
  const translateX = useSharedValue(0);
  
  
  // Animation Intialization
  useEffect(() => {translateX.value = withRepeat(withTiming(-width, { duration: 5000, easing: Easing.linear }), -1, false);}, []); //looping and timing logic
  
  
  //Cloud Object, What updates clouds postion
  const animatedStyle = useAnimatedStyle(() => {
    'worklet'; 
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, animatedStyle]}>
        {[...Array(2)].map((_, index) => (
          <Image
            key={index}
            source={require('../../assets/images/Background/Ocean_8/3.png')}
            style={styles.image}
            resizeMode="contain"
          />
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
	
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  
  imageContainer: {
    flexDirection: 'row',
    width: width,
    height: height,
	resizeMode: 'cover'
  },
  
  image: {
    width: width,
    height: height / 3 ,
  },
});
