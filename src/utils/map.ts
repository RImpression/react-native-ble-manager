import { Platform, Linking, Alert, PermissionsAndroid } from 'react-native';
// import { Geolocation } from "react-native-amap-geolocation"

const appInfo = require('../app.json')

const os = Platform.OS

const isAndroid = os === 'android'
const isIos = os === 'ios'
console.log(appInfo);

export async function startGeolocation(listener?) {
  // const granted = await PermissionsAndroid.request(
  //   PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
  // );
  
  // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //   await Geolocation.init({
  //     ios: appInfo.iosAmapKey,
  //     android: appInfo.androidAmapKey
  //   })
  
  //   Geolocation.setOptions({
  //     interval: 8000,
  //     distanceFilter: 20
  //   })
  
  //   if (listener) {
  //     Geolocation.addLocationListener(listener)
  //   }
    
  //   Geolocation.start()
  //   return Geolocation
  // }
}

export function openMapApp(url: string) {
  Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      console.log('Can\'t handle url: ' + url);
      Alert.alert('打开失败', '不支持:' + url)
    } else {
      return Linking.openURL(url);
    }
  }).catch(err => {
    console.error('An error occurred', err)
    Alert.alert('打开失败', '错误:' + url)
  });
}

type location = {
  lng: number | string,
  lat: number | string,
  name?: string
}

/**
 * 百度地图打开参数
 * protocol://product/[service/]action[?parameters] //parameters功能参数定义，具体规范见功能协议说明
 *
 */

const getLocationStr = (locaion: location) => {
  const { lat, lng, name } = locaion
  const latlng = `${lat},${lng}`

  if (!name) return latlng
  else return `name:${name}|latlng:${latlng}`
}
/**
 * 百度地图路径规划
 * @param origin 起点
 * @param destination 终点
 */
export function baiduMapDirection(origin: location, destination: location) {
  const str = `baidumap://map/direction?origin=${getLocationStr(origin)}&destination=${getLocationStr(destination)}&coord_type=bd09ll&mode=driving&src=ios.baidu.openAPIdemo`
  openMapApp(str)
}

/**
 * 百度地图查看位置
 * @param location 地点
 */
export function baiduMapLocation(location: location) {
  const str = `baidumap://map/geocoder?location=${getLocationStr(location)}&src=ios.baidu.openAPIdemo&coord_type=gcj02`
  openMapApp(str)
}

/**
 * androidamap://navi?sourceApplication=appname&amp;poiname=fangheng&amp;lat=36.547901&amp;lon=104.258354&amp;dev=1&amp;style=2
 */

const amapProtocol = isAndroid ? 'amapuri://route/plan/' : 'iosamap://path'
export function amapDirection(origin: location, destination: location) {
  const params = {
    sourceApplication: appInfo.name,
    sid: 'BGVIS1', //源Id
    slat: origin.lat,
    slon: origin.lng,
    sname: origin.name || '',
    did: 'BGVIS2', // 目的id
    dlat: destination.lat,
    dlon: destination.lng,
    dname: destination.name || '',
    t: 3,
    rideType: 'elebike'
  }
  
  const str = Object.keys(params).filter(k => params[k]).map(key => `${key}=${params[key]}`).join('&')
  openMapApp(`${amapProtocol}?${str}`)
  // openMapApp('androidamap://navi?sourceApplication=appname&amp;poiname=fangheng&amp;lat=36.547901&amp;lon=104.258354&amp;dev=1&amp;style=2')
}

export function amapShowLocation(location: location) {
  const params = {
    sourceApplication: appInfo.name,
    poiname: location.name,
    lat: location.lat,
    lon: location.lng,
  }

  const str = Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
  openMapApp(`${amapProtocol}://viewMap?${str}`)
}
