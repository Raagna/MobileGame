// IMPORTS
import React, { Component } from "react";
import { GameEngine } from "react-native-game-engine";
import { StyleSheet, View, Text, Dimensions, ImageBackground } from "react-native";
import Matter from "matter-js";
import { BarrelBox } from "./entities/BarrelBox";
import { Floor } from "./entities/Floor";
import { FBox } from "./entities/FishBox";
import { SHBox } from "./entities/SharkBox";
import { MoveBox, CollisionSystem, Physics, MoveSystem } from "./system";
import { useNavigation } from '@react-navigation/native';
// IMPORTS


// SCREEN DIMENSIONS
const SCREEN_DIMENSIONS = Dimensions.get('window');
const SCREEN_WIDTH = SCREEN_DIMENSIONS.width;
const SCREEN_HEIGHT = SCREEN_DIMENSIONS.height;


//Helper function
export class MainGame extends Component {
	
  	constructor(props) {
    	super(props);
		

    
	    // Create Matter.js engine and world
	    this.engine = Matter.Engine.create();
	    this.world = this.engine.world;
	    
	    // Disable gravity
	    this.engine.gravity.y = 0;
	    
	    // Create barrel
	    const barrel = Matter.Bodies.rectangle(
	      SCREEN_WIDTH / 2, 
	      SCREEN_HEIGHT - 100, 
	      80, 
	      80
	    );
	    
	    // Create floor
	    const floor = Matter.Bodies.rectangle(
	      SCREEN_WIDTH / 2, 
	      SCREEN_HEIGHT - 10, 
	      SCREEN_WIDTH * 2, 
	      20, 
	      { isStatic: true }
	    );
		
	
	    // Create fish and sharks (hard-coded)
	    const fishBodies = [];
	    const sharkBodies = [];
	    
	    // Create 3 fish at different positions
	    const fish1 = Matter.Bodies.rectangle(SCREEN_WIDTH * 0.2, -40, 40, 20);
	    const fish2 = Matter.Bodies.rectangle(SCREEN_WIDTH * 0.5, -20, 40, 20);
	    const fish3 = Matter.Bodies.rectangle(SCREEN_WIDTH * 0.8, -60, 40, 20);
		const fish4 = Matter.Bodies.rectangle(SCREEN_WIDTH * 0.3, -8, 40, 20);
	    const fish5 = Matter.Bodies.rectangle(SCREEN_WIDTH * 0.9, 0, 40, 20);
	    
	    // Create 2 sharks at different positions
	    const shark1 = Matter.Bodies.rectangle(SCREEN_WIDTH * 0.4, 0, 40, 10);
	    const shark2 = Matter.Bodies.rectangle(SCREEN_WIDTH * 0.7, -100, 40, 10);
		const shark3 = Matter.Bodies.rectangle(SCREEN_WIDTH * 0.6, -90, 40, 10);
		const shark4 = Matter.Bodies.rectangle(SCREEN_WIDTH * 0.1, -110, 40, 10);
	    
	    fishBodies.push(fish1, fish2, fish3, fish4, fish5);
	    sharkBodies.push(shark1, shark2, shark3, shark4);
	    
	    // Add all bodies to the world
	    Matter.World.add(this.world, [barrel, floor, ...fishBodies, ...sharkBodies]);
	    
	    // Set up entities
	    const entities = {
	      physics: { 
	        engine: this.engine, 
	        world: this.world
	      },
	      barrel: {
	        body: barrel,
	        size: [80, 80],
	        renderer: BarrelBox
	      },
	      floor: {
	        body: floor,
	        size: [SCREEN_WIDTH * 2, 20],
	        renderer: Floor
	      },
		  
	    };
	    
	    // Add fish entities
	    fishBodies.forEach((body, index) => {
	      const initialY = body.position.y;
	      entities[`fish_${index}`] = {
	        body: body,
	        size: [40, 20],
	        type: 'fish',
	        initialY: initialY,
	        renderer: FBox
	      };
	    });
	    
	    // Add shark entities
	    sharkBodies.forEach((body, index) => {
	      const initialY = body.position.y;
	      entities[`shark_${index}`] = {
	        body: body,
	        size: [80, 40],
	        type: 'shark',
	        initialY: initialY,
	        renderer: SHBox
	      };
	    });
	    
	    // Set initial state
	    this.state = {
	      running: true,
	      score: 0,
		  heart: 3,
	      entities: entities
	    };
	    
	    // Bind methods
	    this.onEvent = this.onEvent.bind(this);
	  }
	  // Add this method inside your class
	   endGame() {
	     const { navigation } = this.props;
	     navigation.navigate('EndGame', {
			finalScore: this.state.score 
		 });
	   }
	  onEvent(e) {
	    if (e.type === "score") {
	      this.setState({
	        score: this.state.score + 1
	      });
	    }
		if (e.type === "heart") {
	      this.setState({
	        heart: this.state.heart - 1
	      });
		  if (this.state.heart - 1 == 0){
		  	this.endGame();
		  }
	    }
	  }
  
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/Background/Ocean_3/1.png")}
          style={styles.backgroundImage}
        >
          <GameEngine
            ref={(ref) => { this.gameEngine = ref; }}
            style={styles.gameContainer}
            systems={[Physics, MoveSystem, MoveBox, CollisionSystem ]}//CollisionSystem
            entities={this.state.entities}
            onEvent={this.onEvent}
            running={this.state.running}
			gamescore={this.state.score}
          />
          <Text style={styles.score}>Score: {this.state.score}</Text>
		  <Text style={styles.heart}>Hearts: {this.state.heart}</Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  score: { 
    position: "absolute", 
    top: 20, 
    left: 20, 
    fontSize: 24, 
    color: "white",
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  heart: { 
      position: "absolute", 
      top: 20, 
      left: SCREEN_WIDTH - 120, 
      fontSize: 24, 
      color: "white",
      fontWeight: "bold",
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10
    }
});

export default MainGame;