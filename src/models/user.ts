import { login, logout } from '../servers/user';
import strorge from '../utils/strorge';
import navigation from '../utils/navigation';
import {NavigationActions } from 'react-navigation'
// export default {
//   namespace: 'user',
//   state: {},
//   reducers: {},
//   effects: {},
//   subscriptions: {}
// }

export default {
  namespace: 'user',
  state: {
    userName: 'lili',
    phone: '',
    role: '',
    token: '',
    location: {
      lat: 23.1200520000,
      lng: 113.3270030000
    },
  },
  reducers: {
    saveLocation(state, { payload }) {
      return {
        ...state,
        location: {
          lat: payload.lat || 23.1200520000,
          lng: payload.lng || 113.3270030000
        }
      }
    },
    saveUserInfo(state, action) {
      const payload = action.payload || {}
      const { name, userId, userName, accessToken, role } = payload
      return {
        ...state,
        name,
        userId,
        userName,
        accessToken,
        role
      }
    }
  },
  effects: {
    *listenLocation({ payload }, { put }) {
      yield put({ type: 'saveLocation', payload })
    },
    *initLogin(_, { put }) {
      const data = yield strorge.get('login_data')
      return yield put({ type: 'saveUserInfo', payload: data})
    },
    *onLogin({ payload }, { put, call }) {
      console.log('1', payload);
      const data = yield call(login, payload)
      if (data && data.accessToken) {
        console.log('data',data);
        // yield strorge.set('token', data.token)
        yield strorge.set('login_data', {...data,role: payload.userType})
        yield strorge.set('userToken', data.accessToken)
        yield put({ type: 'saveUserInfo', payload: { ...data, role: payload.userType }})
        
        navigation.navigate('Index')
      }
    },
    *onLogout(_, { call, put }) {
      const res = yield call(logout)
      if (res) {
        yield strorge.remove('login_data')
        yield strorge.remove('userToken')
        navigation.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Login'})
          ]
        })
      }
    }
  },
  subscriptions: {}
}