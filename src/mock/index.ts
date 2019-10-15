import { login, logout } from './user';
import { getDeliveringOrder, getDeliverFinishOrder } from './order';

export default {
  '/api/login': login,
  '/api/logout': logout,
  '/api/deliveringOrder': getDeliveringOrder,
  '/api/deliverFinishOrder': getDeliverFinishOrder
}