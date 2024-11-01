import api from '@/config/api';

// Orders API
const CREATE_ORDERS = `${process.env.API_URL}/api/orders/create`;
const GET_ORDERS = `${process.env.API_URL}/api/orders/all`;

export async function createOrders() {
  const res = await api.post(CREATE_ORDERS);
  return res.data.data;
}

export async function getAllOrders() {
  const res = await api.get(GET_ORDERS);
  return res.data;
}
