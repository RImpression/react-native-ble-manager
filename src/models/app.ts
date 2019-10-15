// import { delay } from '../utils';
import navigation from '../utils/navigation';
import { RoleType } from '../constants/index'
import { getTrunkOrderDetailBySn } from '../servers/order';
import { Toast } from '@ant-design/react-native';

export default {
  namespace: "app",
  state: {
    loading: false
  },
  reducers: {
    showLoading: state => ({ ...state, loading: true }),
    hiddenLoading: state => ({ ...state, loading: false }),
    saveDriverOrderTake(state,{payload}) {
      return {
        ...state,
        driverOrderTake:payload
      }
    }
  },
  effects: {
    *resolveScanData({ payload }, { select,put,call }) {
      const role = yield select((state) => state.user.role)
      console.log('scan role',role + '--' + payload.data);
      if (role === RoleType.DELIVERY) {//配送员
        if (payload.data === '123456') {
          //配送员订单确认提货
          return navigation.replace({ routeName: 'DeliveryOrderTake', params: { id: payload.data }})
        }else {
          //干线结束
          const res = yield call(getTrunkOrderDetailBySn,{sn:payload.data});
          if (res && res.id) {
            yield put({ type:'saveriverOrderTake',payload:res})
            return navigation.replace({ routeName: 'JobOrderConfirm',params: { id: payload.data}})
          }
        }
      } else if (role === RoleType.DRIVER) {//干线司机
        // if (payload.data === 'abcdefg') {
          //司机作业单确认提货sn
          const res = yield call(getTrunkOrderDetailBySn,{sn:payload.data})
          if(res && res.id) {
            yield put({ type:'saveDriverOrderTake',payload:res})
            return navigation.replace({ routeName: 'DriverOrderTake' })
          } else {
            return false
          }
          
        // }
      } else if (role === RoleType.PDA) {//PDA
        
      }

      return false
    },

  },

  subscriptions: {}
};
