import React, { Component } from "react";
import { Image, View, Dimensions } from "react-native";

// Get screen dimensions only once to avoid potential recalculation issues
const SCREEN_DIMENSIONS = Dimensions.get('window');
const SCREEN_WIDTH = SCREEN_DIMENSIONS.width;
const SCREEN_HEIGHT = SCREEN_DIMENSIONS.height;

class SHBox extends Component {
  constructor(props) {
    super(props);
    //console.log("SharkBox component created!"); // Fixed log message
  }

  render() {
    const { body, size, backgroundColor } = this.props;
    /*
    if (!body || !body.position) {
      console.log("Warning: SharkBox rendering with missing body or position");
      return null;
    }
    */
    const width = size[0];
    const height = size[1];

    const x = body.position.x - width / 2; // Center-based positioning
    const y = body.position.y - height / 2; // Center-based positioning
    
    //console.log(`Rendering shark at (${x}, ${y})`);
    
    return (
      <View 
        style={{ 
          position: "absolute", 
          width: width, 
          height: height, 
          left: x, 
          top: y,
		  //backgroundColor:'red',
          // Remove backgroundColor for transparent background
        }}
      >
        <Image
          source={require("../../assets/images/Shark.png")}
          style={{ 
            width: '100%', 
            height: '100%',
            resizeMode: 'contain' 
          }}
        />
      </View>
    );
  }
}

export { SHBox };
