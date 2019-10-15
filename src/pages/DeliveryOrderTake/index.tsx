import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView } from "react-native";
import { List, Button } from '@ant-design/react-native';
import styles from './styles';
import { getDeliveringOrder } from "../../servers/order";
import OrderCard from "../Index/OrderCard/OrderCard";
import navigation from '../../utils/navigation';

const Item = List.Item

interface IProps {

}

class DeliveryOrderTake extends Component<IProps> {
  static navigationOptions = {
    headerTitle: '配送作业单提货',
  };

  // onFetch = async (page = 1, startFetch, abortFetch) => {
  //   try {
  //     let pageLimit = 10;
  //     const res = await getDeliveringOrder({ page, pageSize: pageLimit });

  //     startFetch(res.data, pageLimit);
  //   } catch (err) {
  //     abortFetch();
  //     console.log(err);
  //   }
  // };
  state = {
    orderList: []
  }
  componentDidMount() {
    this.onGet()
  }

  onGet = async (page = 1, pageSize = 1) => {
    const res = await getDeliveringOrder({ page, pageSize });
    this.setState({ orderList: res.data })
  }

  renderItem = (item: any) => {
    return (
      <OrderCard showActions={false} key={item.id} role="rider" itemData={item} style={{ marginBottom: 15 }} />
    );
  };

  onConfirmTake = () => {
    if (false) {
      // 正常可以提货
    } else {
      // 还有箱子没提完需要在次扫码
      navigation.replace({routeName:  'Scan'})
    }
  }

  render() {
    const { orderList } = this.state
    const boxs = Array.from({ length: 3 }).map((_, i) => ({ status: i, sn: `A20190000${i < 10 ? '0' + String(i) : i}` }))
    const getBoxStatus = (status) => {
      switch (status) {
        case 0: return '未提货'
        case 1: return '已提货'
        case 2: return '本次已提'
      }
    }
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <List renderHeader="基本信息">
            <Item>作业单号：123124412423</Item>
            <Item>配送时间段：09:24 - 09:25:04</Item>
            <Item>提货：广州市白云区东平物流点</Item>
            <Item>箱子数量：3</Item>
          </List>
          <List renderHeader="箱子明细">
            {
              boxs.map(box => (
                <Item key={box.sn} extra={getBoxStatus(box.status)}>{box.sn}</Item>
              ))
            }
          </List>
          <List renderHeader="运单明细">
          {/* <ListView
            onFetch={this.onFetch}
            keyExtractor={(item, index) => `${item.id} - ${index}`}
            renderItem={this.renderItem}
          /> */}
            {
              orderList.map(this.renderItem)
            }
          </List>
        </ScrollView>
        

        <View style={styles.bottomLongButton}>
          <Button
            onPress={this.onConfirmTake}
            type="primary" size="large">确认提货</Button>
        </View>
      </SafeAreaView>
    );
  }
}

export default DeliveryOrderTake;