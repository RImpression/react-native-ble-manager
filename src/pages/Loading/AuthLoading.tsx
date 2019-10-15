import React, { Component } from "react";
import { Text, ActivityIndicator, StyleSheet } from "react-native";
import { Flex } from "@ant-design/react-native";
import strorge from "../../utils/strorge";
import navigation from "../../utils/navigation";
import { connect } from "../../utils/dva";
// import getDeviceInfo from '../../utils/device';

interface IProps {
  dispatch;
}

class AuthLoading extends Component<IProps> {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
    const userToken = await strorge.get("userToken");
    const { dispatch } = this.props;
    await dispatch({ type: "user/initLogin" });

    navigation.navigate(userToken ? "Index" : "Auth");
  };
  render() {
    return (
      <Flex
        direction="column"
        justify="center"
        align="center"
        style={StyleSheet.absoluteFill}
      >
        <ActivityIndicator size="large" style={{ marginBottom: 20 }} />
        <Text>加载中...</Text>
      </Flex>
    );
  }
}

export default connect()(AuthLoading);
