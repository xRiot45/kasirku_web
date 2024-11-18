import api from '@/config/api';

const CREATE_ORDERS = `${process.env.API_URL}/api/orders/create`;
const GET_ORDERS = `${process.env.API_URL}/api/orders/all`;
const DELETE_ORDER_BY_ID = `${process.env.API_URL}/api/orders/delete`;

export async function createOrders() {
  const res = await api.post(CREATE_ORDERS);
  return res.data.data;
}

export async function getAllOrders() {
  const res = await api.get(GET_ORDERS);
  return res.data;
}

export async function deleteOrderById(id: string) {
  await api.delete(`${DELETE_ORDER_BY_ID}/${id}`);
}
