import React, { Component } from "react";
import { View, Dimensions} from "react-native";
import Matter from 'matter-js';

// Get screen dimensions only once to avoid potential recalculation issues
const SCREEN_DIMENSIONS = Dimensions.get('window');
const SCREEN_WIDTH = SCREEN_DIMENSIONS.width;
const SCREEN_HEIGHT = SCREEN_DIMENSIONS.height;

class Floor extends Component {
  render() {
	const { body, size, color } = this.props;
	const width = size[0];
	const height = size[1];
	const x = body?.position?.x - width / 2 ;
	const y = body?.position?.y - height / 2;
    return (
      <View style={{ position: "absolute", width: width, height: height, backgroundColor: 'green', left: x, top: y }}>
	</View>
    );
  }
}

export { Floor };