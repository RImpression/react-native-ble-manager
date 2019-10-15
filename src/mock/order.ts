import { delay } from "../utils";
import result from "./result";

function randomString(len = 32) {
  　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678-';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  　　var maxPos = $chars.length;
  　　var pwd = '';
  　　for (let i = 0; i < len; i++) {
  　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  　　}
  　　return pwd;
}
  
interface IDeliveringOrder {}

const _pageSize = 20;

export const getDeliveringOrder = async ({ page, pageSize = _pageSize }, status = 3) => {
  await delay(500);
  const totalCount = 10;
  const startId = (page - 1) * pageSize;
  const address = [
    '冬广场11楼',
    '广州市天河区花城大道68号-环球都会广场9楼901',
    '广州市天河区珠江新城猎德大道20号猎德花园G栋1011',
    '海珠区赤岗北路珠江帝景苑A栋0802',
    '天河区车陂东溪大街17号车陂幼儿园'
  ]
  const signBuilding = [
    '高德置地广场冬',
    '环球都会广场',
    '猎德花园',
    '江帝景苑',
    '车陂幼儿园'
  ]
  const latlngs = [
    [113.327013, 23.119987],
    [113.327236, 23.118188],
    [113.336127, 23.113409],
    [113.328764, 23.104183],
    [113.395765,23.119133]
  ]

  const takeAddress = [
    '高志大厦门店',
    '珠江新城CBD kanisa',
    '车陂南物流点'
  ]

  return result.success({
    pageCount: Math.ceil(totalCount / pageSize),
    page,
    pageSize,
    totalCount,
    order: "",
    data: Array.from({ length: totalCount })
      .filter((v, i) => i + startId < totalCount)
      .map((_, i) => {
        const latlng = latlngs[i % 5]
        return {
          id: randomString(),
          orderNo: randomString(12),
          endShippingTime: '2019-04-18 18:16:26',
          beginShippingTime: '2019-04-18 15:16:37',
          shippingType: 2 % 1,
          consignee: '陈某' + i + Math.floor(Math.random() * 100),
          mobile: '13539908312',
          custom: signBuilding[i % 5],
          address: address[i % 5],
          longitude: latlng[0],
          latitude: latlng[1],
          status,
          deliveryTakeTime: '2019-04-18 14:59:23',
          deliveryReceivingTime: '2019-04-18 15:59:43',
          deliveryId: randomString(),
          takeAddress: takeAddress[i%3],
          takerId: randomString(),
          taker: '陈某',
          takerPhone: '13800138000',
          networkReceivingTime: '2019-04-18 13:00:11',
          driverId: randomString(),
          driverTakeTime: '2019-04-17 15:11:53'
        };
      })
  });
};


export const getDeliverFinishOrder = (options) => {
  return getDeliveringOrder(options, 4)
}