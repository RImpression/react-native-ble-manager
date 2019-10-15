import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Flex, List, Button, Tag, Toast } from "@ant-design/react-native";
import QRCode from "../../components/QRCode";
import { getTrunkOrderDetailById, getTrunkOrderDetailBySn } from "../../servers/order";
// import navigation from "../../utils/navigation";

const styles = StyleSheet.create({
  container: StyleSheet.absoluteFillObject,
  boxs: {
    padding: 10
  },
  boxTag: {
    width: "33.33%",
    marginVertical: 5
  },
  qrcode: {
    paddingVertical: 5,
  }
});
const Item = List.Item;

interface IProps {
  navigation: any
}

interface IState {
  jobOrder: any,
  id: any
}

class DriverOrderInfo extends Component<IProps,IState> {
  static navigationOptions = {
    headerTitle: "作业单"
  };

  state:IState = {
    jobOrder:{},
    id: ''
  }

  async componentDidMount() {
    const { id } = this.props.navigation.state.params;
    var jobOrder;
    if (id) {
      jobOrder = await getTrunkOrderDetailById({ id });
    } else {
      Toast.info('参数错误');
      return
    }
    this.setState({
      id,
      jobOrder
    })
  }


  render() {
    const { 
      id,
      sn,
      boxQty,
      linkman,
      linkmanPhone,
      linkAddress,
      takeTime,
      creationTime,
      finishTime,
      boxCodes = [],
      sender,
      senderPhone,
      sendAddress
    } = this.state.jobOrder
    // const {
    //   sn,
    //   boxQty
    // } = this.state.jobOrder
    const boxs = Array.from({ length: 15 }).map(
      (_, i) => `A20190000${i < 10 ? "0" + String(i) : i}`
    );
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <List renderHeader="二维码">
            <Flex direction="column" justify="center" align="center" style={styles.qrcode}>
              <QRCode value={id} size={128} />
            </Flex>
          </List>
          <List renderHeader="基本信息">
            <Item>作业单号：{id}</Item>
            <Item>箱子数量：{boxQty}</Item>
            <Item>提货点：{sendAddress}
              <Item.Brief>{sender}（{senderPhone}）</Item.Brief>
            </Item>
            <Item>收货点：{linkAddress}
              {/* <Item.Brief>{linkAddress}</Item.Brief> */}
              <Item.Brief>{linkman}（{linkmanPhone}）</Item.Brief>
            </Item>
          </List>
          <List renderHeader="箱子编号">
            <Flex justify="start" wrap="wrap" style={styles.boxs}>
              {boxCodes.map(box => (
                <Flex key={box} style={styles.boxTag} justify="center">
                  <Tag small>{box}</Tag>
                </Flex>
              ))}
            </Flex>
          </List>

          <List renderHeader="时间节点">
            <Item extra={creationTime}>创建时间</Item>
            <Item extra={takeTime}>提货时间</Item>
            <Item extra={finishTime || '未送达'}>送达时间</Item>
          </List>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default DriverOrderInfo;
