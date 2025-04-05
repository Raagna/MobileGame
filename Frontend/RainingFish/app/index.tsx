import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens
import TitleScreen from './screens/TitleScreen';
import GameScreen from './screens/GameLoad';
import EndGame from './screens/EndGame';
import MainGame from './mainGame';

const Stack = createStackNavigator();

export default function index() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
	  
        <Stack.Screen name="Title" component={TitleScreen} />
        <Stack.Screen name="GameLoad" component={GameScreen} />
		<Stack.Screen name="EndGame" component={EndGame} />
		<Stack.Screen name="MainGame" component={MainGame} />
      </Stack.Navigator>
  );
}