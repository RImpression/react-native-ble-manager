import React, { Component } from 'react';
import { View, SafeAreaView } from "react-native";
import { Flex, List, Button, Tag } from '@ant-design/react-native';
import styles from './styles';
import { connect } from "react-redux";

const Item = List.Item

interface IProps {
  driverOrderTake: any,
  dispatch
}

class JobOrderConfirm extends Component<IProps> {
  static navigationOptions = {
    headerTitle: '干线结束',
  };

//干线结束确认
onArrivalSite = (sn) => {
  const { dispatch } = this.props;
  dispatch({
    type: "order/onArrivalSite",
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
    const boxs = Array.from({ length: 15 }).map((_, i) => `A20190000${i < 10 ? '0' + String(i) : i}`)
    return (
      <SafeAreaView style={styles.container}>
        <List renderHeader="基本信息">
          <Item>作业单号：{sn}</Item>
          <Item>提货：{linkAddress}</Item>
          <Item>提货：{sendAddress}</Item>
          <Item>箱子数量：{boxQty}</Item>
        </List>
        <List renderHeader="箱子编号">
          <Flex justify="start" wrap="wrap" style={styles.boxs}>
            {
              boxCodes.map(box => (
                <Flex key={box} style={styles.boxTag} justify="center">
                  <Tag small>{box}</Tag>
                </Flex>
                
              ))
            }
          </Flex>
          
        </List>

        <View style={styles.bottomLongButton}>
          <Button type="primary" size="large" onPress={()=>onArrivalSite(sn)}>确认到站</Button>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(({app}) => ({
  driverOrderTake: app.driverOrderTake
}))(JobOrderConfirm);