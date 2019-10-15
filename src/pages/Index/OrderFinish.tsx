import React, { Component } from 'react';
import { View, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import { ListView } from '@ant-design/react-native';
// import { startGeolocation } from '../../utils/map';
import OrderCard from "./OrderCard/OrderCard";
import { getDeliverFinishOrder, getTrunkFinishOrder } from "../../servers/order";
import { RoleType, LIST_VIEW_PAGE_SIZE } from '../../constants';

type Props = {
  location: {
    lat: number,
    lng: number
  },
  role: any
}


class OrderFinish extends Component <Props>{
  static navigationOptions = {
    header: null,
    tabBarLabel: '已完成'
  };
  state = {
    location: {}
  }
  componentDidMount() {
    // startGeolocation().then(Geolocation => {
    //   return Geolocation.getLastLocation()
    // }).then((location) => {
    //   this.setState({ location })
    // })
  }

  onFetch = async (page = 1, startFetch, abortFetch) => {
    try {
      const { role, location } = this.props;
      let res;
      if (role === RoleType.DELIVERY) {
        res = await getDeliverFinishOrder({ status: 4, longitude:location.lng, latitude: location.lat, page, pageSize: LIST_VIEW_PAGE_SIZE });
      } else if (role === RoleType.DRIVER) {
        res = await getTrunkFinishOrder({ status: 2, longitude:location.lng, latitude: location.lat, page, pageSize: LIST_VIEW_PAGE_SIZE })
      }

      startFetch(res.data, LIST_VIEW_PAGE_SIZE);
    } catch (err) {
      abortFetch();
      console.log(err);
    }
  };

  renderItem = (item: any, index, separators) => {
    return (
      <OrderCard role={this.props.role} itemData={item} style={{ marginBottom: 15 }} />
    );
  };
  
  render() {
    return (
      <View style={styles.main}>
        <ListView
          onFetch={this.onFetch}
          keyExtractor={(item, index) => `${item.id} - ${index}`}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default connect(({ user }) => ({
  location: user.location,
  role: user.role
}))(OrderFinish);

const styles = StyleSheet.create({
  main: { backgroundColor: "#f5f5f5" }
});