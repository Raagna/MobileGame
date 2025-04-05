/*
End game screen holding the menu buttons and play buttons

*/
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Button, TouchableOpacity, Image } from 'react-native';
import MainGame from '../mainGame';
import { Countdown } from '../animations/countDown';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { getHighScore, updateHighScore, isHighScore } from '../highScoreService';

export default function EndGame({ navigation, route }) {
	const [highScore, setHighScore] = useState();
	const [isNewHighScore, setIsNewHighScore] = useState(false);
 
	 // Get the score from the previous screen if available
	const { finalScore = 0 } = route.params || {};
	const scale = useSharedValue(1);
	const animatedStyle = useAnimatedStyle(() => ({
    	transform: [{ scale: scale.value }],
		}));
		
	// Score Loader for high score
	useEffect(() => {
	    const loadScores = async () => {
			try {
		        const oldScore = await getHighScore();
		        if (finalScore > oldScore.score) {
					await updateHighScore(finalScore);
					setIsNewHighScore(true);
					setHighScore(finalScore)
		        }else{
					setHighScore(oldScore.score)
				}

			} catch{
				console.error('Error loading high score:', error);
			}
		};
		
		loadScores();
		
	}, [finalScore])

  return (
	<View style={styles.container}>
	     <ImageBackground 
	       source={require('../../assets/images/Background/Ocean_3/1.png')}
	       style={styles.imageBackground}
	     >
	       {/* Menu Container */}
	       <View style={styles.menuContainer}>
	         {/* Title Image */}
	         <Image 
	           resizeMode='contain' 
	           source={require('../../assets/images/endTitle.png')} 
	           style={styles.titleImage}
	         />
			 {/* Score Display */}
			 <View style={styles.sc}>
				 {isNewHighScore ? 
			           <Text style={styles.scoreText}>New High Score: {finalScore}!</Text>
			        :  				 
			           <Text style={styles.scoreText}>Current High Score: {highScore}</Text>
					}
				  <Text style={styles.scoreText}>Final Score: {finalScore}</Text>
			  </View>
	         {/* Menu Button */}
	         <TouchableOpacity
	           onPress={() => {
	             scale.value = withSpring(1.1, {}, () => (scale.value = withSpring(1)));
	             navigation.navigate('Title');
	           }}
	         >
	           <Animated.Image 
	             source={require('../../assets/images/titleButton.png')} 
	             style={[styles.menuButton, animatedStyle]}
	           />
	         </TouchableOpacity>
			 
			 {/* Play Button */}
 	         <TouchableOpacity
 	           onPress={() => {
 	             scale.value = withSpring(1.1, {}, () => (scale.value = withSpring(1)));
 	             navigation.navigate('GameLoad');
 	           }}
 	         >
 	           <Animated.Image 
 	             source={require('../../assets/images/playButton.png')} 
 	             style={[styles.menuButton, animatedStyle]}
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
  menuButton: {
    marginTop: 20,
  },

  scoreText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
});
