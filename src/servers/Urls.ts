export const env = 'pre';
let HOST;
if (env == 'pre') {
    HOST = 'http://192.168.225.6:7001/';
} else if (env == 'prod') {
    HOST = '';
}

//登录
export const SIGNIN_URL = `${HOST}api/OAuth/SignIn`;
//退出登录
export const SIGNOUT_URL = `${HOST}api/OAuth/SignOut`;
//刷新令牌
export const REFRESH_TOKEN = `${HOST}api/OAuth/RefreshToken`;
//分页获取干线作业单 POST:PDA创建作业单
export const TRUNK_JOB_ORDER = `${HOST}api/TrunkJobOrder`;
//干线作业单详情
export const TRUNK_JOB_ORDER_DETAIL = `${HOST}api/TrunkJobOrder/GetById`;
//根据sn号获取干线作业单
export const TRUNK_JOB_ORDER_BYSN = `${HOST}api/TrunkJobOrder/GetBySn`;
//干线作业单确认提货
export const TRUNK_JOB_ORDER_CONFIRM = `${HOST}api/TrunkJobOrder/ConfirmTake`;
//干线作业单确认到站
export const TRUNK_JOB_ORDER_ARRIVAL = `${HOST}api/TrunkJobOrder/ArrivalSite`;
//配送员扫货箱
export const DELIVERY_BOX_SCAN = `${HOST}api/DeliveryBox/ScanBox`;
//配送员确认提货
export const DELIVERY_BOX_CONFIRM = `${HOST}api/DeliveryBox/Confirm`;
//配送员移出货箱
export const DELIVERY_BOX_REMOVE = `${HOST}api/DeliveryBox/RemoveBox`;
//配送员生成配送作业单
export const DELIVERY_JOB_ORDER = `${HOST}api/DeliveryJobOrder`;
//获取配送运单
export const DELIVERY_ORDER_LIST = `${HOST}api/DeliveryOrder/PagerQuery`;
//配送员签收完成
export const DELIVERY_ORDER_RECEIPT = `${HOST}api/DeliveryOrder/ReceiptCompleted`;
//配送员获取运单详情
export const DELIVERY_ORDER_DETAIL = `${HOST}api/DeliveryOrder`;
//配送员延迟签收
export const DELIVERY_ORDER_DELAY = `${HOST}api/DeliveryOrder/DelayDeliveryOrder`;
//货箱解绑（发货员）
export const BOX_UNBIND = `${HOST}api/Box/Unbind`;