import React, { Component } from "react";
import { View, Text } from "react-native";

interface IProps {}

class Loading extends Component<IProps> {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
}

export default Loading;
