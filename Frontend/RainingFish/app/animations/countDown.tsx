/*
Animated Countdown: uses timer and switch cases to mask the numbers with images
*/

import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const {height: windowHeight, width: windowWidth}= Dimensions.get('window');



// COUNTDOWN 
export const Countdown = ({ onComplete }) => {
  const [count, setCount] = useState(4);

  useEffect(() => {
    if (count === 0) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => setCount(count - 1), 1000);
    return () => clearTimeout(timer);
  }, [count]);

  // Map the numbers to their corresponding images
  const getImageSource = () => {
    switch (count) {
      case 4:
        return require('../../assets/images/number3.png');
      case 3:
        return require('../../assets/images/number2.png');
      case 2:
        return require('../../assets/images/number1.png');
      case 1:
        return require('../../assets/images/catch.png'); // 'CATCH!' Image
      default:
        return null; // Return null when count is 0	
    }
  };

  return (
    <View style={styles.overlay}>
      {count > 0 && (
        <Image source={getImageSource()} style={[styles.image, count === 1 ? styles.Limage : null]} />
      )}
    </View>
  );
};




//  Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },
  overlay: {
	...StyleSheet.absoluteFillObject,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,},
    image: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
    },
    Limage: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
    },
});


export default Countdown; 