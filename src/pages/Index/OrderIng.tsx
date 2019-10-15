import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, Text, DeviceEventEmitter } from "react-native";
import { connect } from "react-redux";
import { MapView } from "../../components/AMap";
import OrderCard from "./OrderCard/OrderCard";
import { ListView ,DatePickerView, Toast} from "@ant-design/react-native";
import { delay } from "../../utils";
import strorge from "../../utils/strorge";
import { RoleType, LIST_VIEW_PAGE_SIZE } from "../../constants/index"
import dayjs, { Dayjs } from "dayjs";

import { getDeliveringOrder, getTrunkingOrder } from "../../servers/order";
import { TouchableOpacity } from "react-native-gesture-handler";
import { formatTime} from '../../utils/date';

type Props = {
  dispatch;
  role: any,
  user: any,
  location: {
    lat: number,
    lng: number
  },
};

type listViewType = {
  refresh: () => void
}

interface IState {
  isShowDelayDialog: boolean,
  isShowDatePicker: boolean,
  delayDate: any,
  delayTimeStart: any,
  delayTimeEnd: any
}

class OrderIng extends Component<Props, IState> {
  static navigationOptions = {
    header: null,
    tabBarLabel: "配送中"
  };

  state = {
    isShowDelayDialog: false,
    isShowDatePicker: false,
    delayDate: undefined,
    delayTimeStart: undefined,
    delayTimeEnd: undefined
  };
  listView: listViewType
  itemDelayId: undefined
  dateType: undefined
  orderUpdateListener: any

  componentWillMount() {
    this.orderUpdateListener = DeviceEventEmitter.addListener('orderUpdate',() => {
      this.onRefresh();
    })
  }

  componentWillUnmount() {
    this.orderUpdateListener && this.orderUpdateListener.remove();
  }

  onFetch = async (page = 1, startFetch, abortFetch) => {
    try {
      const { role, location } = this.props
      let res;
      if (role == RoleType.DELIVERY) {  //配送员
        res = await getDeliveringOrder({ status: 3, longitude:location.lng, latitude: location.lat, page, pageSize: LIST_VIEW_PAGE_SIZE })
      } else if (role == RoleType.DRIVER) { //司机
        res = await getTrunkingOrder({ status: 1, longitude:location.lng, latitude: location.lat, page, pageSize: LIST_VIEW_PAGE_SIZE });
      }

      startFetch(res.data, LIST_VIEW_PAGE_SIZE);
    } catch (err) {
      abortFetch();
      console.log(err);
    }
  };

  renderItem = (item: any, index, separators) => {
    return (
      <OrderCard
        role={this.props.role}
        itemData={item}
        style={{ marginBottom: 15 }}
        onSingFor={this.onRefresh}
        onDelayAction={this.onDelayAction}
        dispatch={this.props.dispatch}
      />
    );
  };

  onRefresh = () => {
    this.listView.refresh()
  }

  onListenLocation = ({ nativeEvent }) => {
    const { dispatch } = this.props;
    dispatch({
      type: "user/listenLocation",
      payload: {
        lat: nativeEvent.latitude,
        lng: nativeEvent.longitude
      }
    });
  };

  onDelayAction = (itemId) =>{
    this.itemDelayId = itemId;
    this.onDialogShow(false);
  }

  render() {
    return (
      <SafeAreaView style={styles.main}>
        <MapView
          locationEnabled
          locationInterval={60000}
          onLocation={this.onListenLocation}
        />
        <ListView
          ref={ref => { this.listView = ref } }
          onFetch={this.onFetch}
          keyExtractor={(item, index) => `${item.id} - ${index}`}
          renderItem={this.renderItem}
        />
        {this.state.isShowDelayDialog && this.renderDelayDateView()}
        {this.state.isShowDatePicker && this.renderDatePickerView()}
        
      </SafeAreaView>
    );
  }

  renderDelayDateView() {
    return(
      <View style={styles.dialogScreen}>
        <View style={styles.dialogView}>
          <View style={styles.dialogTitle}>
            <Text style={{fontSize:16,color:'#333',fontWeight:'600'}}>客户预约时间</Text>
          </View>
          <View style={styles.dialogInput}>
            <View style={styles.dialogInputDate}>
              <TouchableOpacity onPress={()=>this.onDatePickShow(0)}>
                <View >
                  <Text style={{fontSize:14,color:'#333'}}>{this.state.delayTimeStart ? formatTime(this.state.delayTimeStart) : '开始时间'}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text style={{fontSize:16}}>至</Text>
            <View style={styles.dialogInputDate}>
              <TouchableOpacity onPress={()=>this.onDatePickShow(1)}>
                <View>
                  <Text style={{fontSize:14,color:'#333'}}>{this.state.delayTimeEnd ? formatTime(this.state.delayTimeEnd) : '结束时间'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection:'row',borderTopWidth:1,borderColor:'#999',alignItems:'center'}}>
            <View style={styles.dialogBtn}>
              <TouchableOpacity onPress={()=>this.onDialogShow(false)}>
                <View>
                  <Text style={{fontSize:16,color:'grey'}}>取消</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.dialogLine}></View>
            <View style={styles.dialogBtn}>
              <TouchableOpacity onPress={()=>this.onDialogShow(true)}>
                <View>
                  <Text style={{fontSize:16,color:'green'}}>确认</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

  renderDatePickerView() {
    return(
      <View style={styles.dateView}>
        <View style={styles.dateTitle}>
          <View style={styles.dateBtn}>
            <TouchableOpacity onPress={()=>this.onDatePickDialogConfirm(false)}>
              <Text style={{fontSize:16,color:'grey'}}>取消</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dateBtn}>
            <TouchableOpacity onPress={()=>this.onDatePickDialogConfirm(true)}>
              <Text style={{fontSize:16,color:'blue'}}>确定</Text>
            </TouchableOpacity>
          </View>
        </View>
        <DatePickerView
              value={this.state.delayDate}
              mode="datetime"
              minDate={new Date()}
              onChange={this.onChange}
              format="MM-DD HH:MM"
        ></DatePickerView>
      </View>
    )
  }

  onChange = delayDate => {
    this.setState({ delayDate });
  };

  onDialogShow = isComfirm => {
    const { dispatch } = this.props
    if (isComfirm) {
      if (!this.state.delayTimeStart || !this.state.delayTimeEnd) {
        Toast.info('请选择时间段');
        return;
      } else if (Date.parse(this.state.delayTimeStart) > Date.parse(this.state.delayTimeEnd)) {
        Toast.info('时间选择有误');
        return
      } 
      dispatch({
        type: 'order/onDelayDeliveryOrder',
        payload: {
          id:this.itemDelayId,
          beginShippingTime: this.state.delayTimeStart,
          endShippingTime: this.state.delayTimeEnd,
          onRefresh: this.onRefresh
        }
      })
      this.setState({
        delayTimeStart: undefined,
        delayTimeEnd: undefined
      })
    }
    this.setState({ isShowDelayDialog: !this.state.isShowDelayDialog});
  }

  onDatePickShow = type => {
    this.dateType = type;
    this.setState({ isShowDatePicker: !this.state.isShowDatePicker })
  }

  onDatePickDialogConfirm = isComfirm => {
    this.setState({ isShowDatePicker: false });
    if (isComfirm && this.dateType === 0) {
      this.setState({
        delayTimeStart: this.state.delayDate.toString()
      })
    } else if(isComfirm && this.dateType === 1) {
      this.setState({
        delayTimeEnd: this.state.delayDate.toString()
      })
    }
    
  }
}

export default connect(({user}) => ({
  role: user.role,
  location: user.location,
}))(OrderIng);

const styles = StyleSheet.create({
  main: { backgroundColor: "#f5f5f5" },
  dialogScreen:{
    height: '100%',
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  dialogView:{
    width: '80%',
    flexDirection:'column',
    borderRadius: 20,
    backgroundColor: '#fff'
  },
  dialogTitle: {
    marginHorizontal: 15,
    marginTop: 20
  },
  dialogInput:{
    marginHorizontal:15,
    marginTop: 10,
    marginBottom: 20,
    height: 40,
    justifyContent: 'space-between',
    flexDirection:'row',
    alignItems: 'center'
  },
  dialogInputDate:{
    borderWidth:1,
    borderColor: '#999',
    paddingLeft: 2,
    height: 38,
    justifyContent: 'center',
    flex: 1
  },
  dialogBtn:{
    flex:1,
    height: 45,
    justifyContent:'center',
    alignItems: 'center',
  },
  dialogLine:{
    height: 20,
    width:1,
    backgroundColor: '#999'
  },
  dateView:{
    width: '100%',
    position: 'absolute',
    left:0,
    bottom: 0,
    backgroundColor: '#fff'
  },
  dateTitle:{
    width:'100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ededed'
  },
  dateBtn:{
    width: 40,
    height: 30,
    justifyContent:'center',
    alignItems: 'center',
  }
});
