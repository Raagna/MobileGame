import React, { Component } from "react";
import { Image, View, Dimensions} from "react-native";
import { Floor } from "./entities/Box2";
import Matter from 'matter-js';


// Get screen dimensions only once to avoid potential recalculation issues
const SCREEN_DIMENSIONS = Dimensions.get('window');
const SCREEN_WIDTH = SCREEN_DIMENSIONS.width;
const SCREEN_HEIGHT = SCREEN_DIMENSIONS.height;

class BarrelBox extends Component {
  render() {
	const { body, size, backgroundColor} = this.props;
	const width = size[0];
	const height = size[1];
	const x = body?.position?.x - width/ 2;
	const y = body?.position?.y - height /2;
	
    return (
      <View style={{ position: "absolute", width: width, height: height, left: x, top: y, backgroundColor: backgroundColor}}>
	  <Image
	            source={require("../../assets/images/Barrel.png")}
	            style={{ width: width, height: height,}}
	          />
	</View>
    );
  }
}

export { BarrelBox };