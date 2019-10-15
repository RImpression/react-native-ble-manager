import React, { Component } from "react";
import { View, SafeAreaView, StyleSheet, ScrollView,DeviceEventEmitter } from "react-native";
import { Flex, List, Button, Tag, Toast } from "@ant-design/react-native";
import { getTrunkOrderDetailBySn, postTrunkOrderComfirmTake } from "../../servers/order";
import navigation from "../../utils/navigation";
import { connect } from "react-redux";

const styles = StyleSheet.create({
  container: StyleSheet.absoluteFillObject,
  bottomLongButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff"
  },
  boxs: {
    padding: 10
  },
  boxTag: {
    width: "33.33%",
    marginVertical: 5
  }
});
const Item = List.Item;


interface IProps {
  navigation: any,
  driverOrderTake: any,
  dispatch
}

interface IState {
}

class DriverOrderTake extends Component<IProps,IState> {
  static navigationOptions = {
    headerTitle: "作业单"
  };

  state:IState = {}

  //确认提货
  onTrunkJobComfirmTake = (sn) => {
    const { dispatch } = this.props;
    dispatch({
      type: "order/onTrunkJobComfirmTakect",
      payload: {
        sn
      }
    });
  }

  render() {
    const {
      id,
      sn,
      boxQty,
      sendAddress,
      linkAddress,
      boxCodes = []
    } = this.props.driverOrderTake
    const boxs = Array.from({ length: 15 }).map(
      (_, i) => `A20190000${i < 10 ? "0" + String(i) : i}`
    );
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <List renderHeader="基本信息">
            <Item>作业单号：{sn}</Item>
            <Item>提货：{linkAddress}</Item>
            <Item>送货：{sendAddress}</Item>
            <Item>箱子数量：{boxQty}</Item>
          </List>
          <List renderHeader="箱子编号">
            <Flex justify="start" wrap="wrap" style={styles.boxs}>
              {boxCodes.map(box => (
                <Flex key={box} style={styles.boxTag} justify="center">
                  <Tag>{box}</Tag>
                </Flex>
              ))}
            </Flex>
          </List>
        </ScrollView>

        <View style={styles.bottomLongButton}>
          <Button type="primary" size="large" onPress={() => this.onTrunkJobComfirmTake(sn)}>
            确认提货
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(({app}) => ({
  driverOrderTake: app.driverOrderTake
}))(DriverOrderTake);
