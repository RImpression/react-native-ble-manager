import { $get, $post } from '../utils/request';
import * as Urls from '../servers/Urls';

export const getDeliveringOrder = o => $get('/api/deliveringOrder', o)
export const getDeliverFinishOrder = o => $get('/api/deliverFinishOrder', o)
// export const getDeliveringOrder = o => $get(Urls.DELIVERY_ORDER_LIST, o)
// export const getDeliverFinishOrder = o => $get(Urls.DELIVERY_ORDER_LIST, o)
// export const getTrunkingOrder = o => $get(Urls.TRUNK_JOB_ORDER,o)
// export const getTrunkFinishOrder = o => $get(Urls.TRUNK_JOB_ORDER,o)
export const getTrunkingOrder = o => $get('/api/deliveringOrder',o)
export const getTrunkFinishOrder = o => $get('/api/deliverFinishOrder',o)
export const postReceiptCompleted = o => $post(Urls.DELIVERY_ORDER_RECEIPT,o)
export const postDelayDeliveryOrder = o => $post(Urls.DELIVERY_ORDER_DELAY,o)
//id获取作业单详情
export const getTrunkOrderDetailById = o => $get(Urls.TRUNK_JOB_ORDER_DETAIL,o)
//司机根据sn获取作业单
export const getTrunkOrderDetailBySn = o => $get(Urls.TRUNK_JOB_ORDER_BYSN,o)
//司机确认提货
export const postTrunkOrderComfirmTake = o => $post(Urls.TRUNK_JOB_ORDER_CONFIRM,o)
//骑手获取运单详情
export const getDeliveryOrderDetail = o => $get(Urls.DELIVERY_ORDER_DELAY,o)
export const postTrunkOrderArrivalSite = o => $post(Urls.TRUNK_JOB_ORDER_ARRIVAL,o)