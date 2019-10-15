import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import { Flex, Icon, List, WingBlank, Toast } from "@ant-design/react-native";
// import { MapView } from 'react-native-amap3d'
import { MapView } from "../../components/AMap";
import { openMapApp, amapDirection } from "../../utils/map";
import { dimensions } from "../../styles";
import navigation from "../../utils/navigation";
import { connect } from "../../utils/dva";
import images from '../../assets/images';
import { padding, boxShadow, border } from '../../styles';
import { getDeliveryOrderDetail } from "../../servers/order";

const Brief = List.Item.Brief;

interface IProps {
  dispatch;
  location: {
    lng: number;
    lat: number;
  };
  navigation: any,
  deliveryOrderDetail: any
}

interface IState {
  id: any
}

class DeliveryOrderDetails extends Component<IProps,IState> {
  static navigationOptions = {
    // headerStyle: {
    //   elevation: 0,
    // },
    // header: null,
    headerTransparent: true,
    // headerLeft: <TouchableOpacity onPress={navigation.back}><Icon name="left" /></TouchableOpacity>,
    drawerLockMode: "locked-closed"
  };

  state:IState = {
    id: ''
  }

  async componentDidMount() {
    console.log(MapView);
    const { id } = this.props.navigation.state.params;
    const { dispatch } = this.props;
    dispatch({
      type: 'order/onDeliveryOrderDetail',
      payload: {
        id
      }
    })
  }

  onGoMap = () => {
    openMapApp(
      "androidamap://navi?sourceApplication=appname&amp;poiname=fangheng&amp;lat=36.547901&amp;lon=104.258354&amp;dev=1&amp;style=2"
    );
  };

  onGoMap2 = () => {
    amapDirection(
      {
        lat: "",
        lng: ""
      },
      {
        lat: 23.126115,
        lng: 113.339431,
        name: "目的地213"
      }
    );
  };

  render() {
    const { location } = this.props;
    return (
      <View style={StyleSheet.absoluteFill}>
        <MapView
          locationType="location_rotate"
          zoomLevel={14}
          tilt={80}
          showsLabels={true}
          showsTraffic={true}
          showsBuildings={true}
          style={styles.mapView}
          locationEnabled
          showsIndoorMap
          showsLocationButton
          zoomEnabled
          coordinate={{
            latitude: location.lat || 23.119625,
            longitude: location.lng || 113.327306
          }}
        >
          <MapView.Marker
            active={true}
            icon={() => <Image source={images.location} style={{ width: 26, height: 26 }} />}
            coordinate={{
              latitude: 23.125713,
              longitude: 113.339719
            }}
          >
            <View style={styles.markerInfo}>
              <Text>高志大厦</Text>
            </View>
          </MapView.Marker>
          <MapView.Marker
            title="我的位置"
            icon={() => <Image source={images.riderIcon} style={{ width: 20, height: 20 }} />}
            coordinate={{
              latitude: 23.119625,
              longitude: 113.327306
            }}
          />
        </MapView>
        <ScrollView style={styles.scroll}>
          <View>
            <WingBlank size="lg">
              <Flex justify="start" align="center" style={styles.shippingTime}>
                <Icon name="clock-circle" />
                <Text>60分钟内到达</Text>
              </Flex>
            </WingBlank>
          </View>

          <List>
            <List.Item
              extra={
                <TouchableOpacity onPress={this.onGoMap2}>
                  <Icon name="compass" color="#2d8cf0" size={26} />
                </TouchableOpacity>
              }
              wrap
            >
              tasts超市（正佳广场店）
              <Brief>广州天河区天河路222号负一层B101</Brief>
            </List.Item>
            <List.Item
              extra={
                <TouchableOpacity onPress={this.onGoMap}>
                  <Icon name="compass" color="#2d8cf0" size={26} />
                </TouchableOpacity>
              }
              wrap
            >
              tasts超市（正佳广场店）
              <Brief>广州天河区天河路222号负一层B101</Brief>
              <Brief>高高高（13539908052）</Brief>
            </List.Item>
          </List>

          <List renderHeader="基本信息">
            <List.Item wrap>运单编号：190323000001</List.Item>
            <List.Item wrap>物品重量：3.5公斤</List.Item>
            <List.Item wrap>运单备注：注意XXXX</List.Item>
          </List>

          <List renderHeader="物品明细">
            <List.Item extra={<Brief>X1</Brief>} wrap>
              红肉火龙果（果盒）300/盒
            </List.Item>
            <List.Item extra={<Brief>X3</Brief>} wrap>
              墨西哥吞拿鱼100g
            </List.Item>
          </List>

          <List renderHeader="时间节点">
            <List.Item extra="2019-03-02 12:00:02">提货时间：</List.Item>
            <List.Item extra="2019-03-03 22:00:02">送达时间：</List.Item>
          </List>
        </ScrollView>
      </View>
    );
  }
}

export default connect(({ user,order }) => ({
  location: user.location,
  deliveryOrderDetail: order.deliveryOrderDetail
}))(DeliveryOrderDetails);

const styles = StyleSheet.create({
  mapView: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    flex: 1,
    height: 200,
    width: dimensions.width
  },
  scroll: {
    ...StyleSheet.absoluteFillObject,
    top: 200
  },
  shippingTime: {
    height: 45
  },
  markerInfo: {
    backgroundColor: '#fff',
    ...padding([2, 4]),
    ...boxShadow(1, 1, 0.8, 3),
    ...border(1, '#2db7f5'),
    borderRadius: 2,
  }
});
