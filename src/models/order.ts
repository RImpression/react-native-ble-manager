// import { delay } from '../utils';
import navigation from '../utils/navigation';
import { RoleType } from '../constants/index'
import { getTrunkOrderDetailBySn, postTrunkOrderComfirmTake, postReceiptCompleted, getDeliveryOrderDetail, postDelayDeliveryOrder, postTrunkOrderArrivalSite } from '../servers/order';
import { Toast } from '@ant-design/react-native';
import { DeviceEventEmitter } from 'react-native'
import { statement } from '@babel/template';

export default {
  namespace: "order",
  state: {
    loading: false
  },
  reducers: {
    showLoading: state => ({ ...state, loading: true }),
    hiddenLoading: state => ({ ...state, loading: false }),
    saveDeliveryOrderDetail(state,{payload}) {
        return {
            ...state,
            deliveryOrderDetail: payload
        }
    }
  },
  effects: {
    //司机提货
    *onTrunkJobComfirmTakect({ payload }, { call}) {
        const res = yield call(postTrunkOrderComfirmTake,payload);
        if (res && JSON.stringify(res) === '{}') {
            Toast.info('提货成功');
            DeviceEventEmitter.emit('orderUpdate');
            navigation.back();
        }
    },

    //骑手签收
    *onReceiptCompleted({ payload },{call}) {
        const res = yield call(postReceiptCompleted,payload);
        if (res && JSON.stringify(res) === '{}') {
            //签收成功
            Toast.info('送达成功')
            if(payload.onSingFor) payload.onSingFor();
        }
    },

    //骑手延迟签收
    *onDelayDeliveryOrder({payload},{call}) {
        const res = yield call(postDelayDeliveryOrder,payload);
        if(res && JSON.stringify(res) === '{}') {
            Toast.info('延迟成功');
            payload.onRefresh && payload.onRefresh();
        }
    },

    //骑手运单详情
    *onDeliveryOrderDetail({ payload },{call,pull}) {
        console.log('order detail',payload)
        const res = yield call(getDeliveryOrderDetail,payload);
        if (res && res.id) {
            yield pull({ type: 'saveDeliveryOrderDetail',payload: res})
        }
    },

    //骑手干线结束确认
    *onArrivalSite({ payload }, {call}) {
        const res = yield call(postTrunkOrderArrivalSite,payload);
        if (res && JSON.stringify(res) === '{}') {
            Toast.info('操作成功');
            DeviceEventEmitter.emit('orderUpdate');
            navigation.back();
        }
    }
  },

  subscriptions: {}
};
