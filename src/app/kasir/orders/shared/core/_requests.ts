import api from '@/config/api';
import { CheckoutOrdersRequest } from './_models';

// Orders API
const CREATE_ORDERS = `${process.env.API_URL}/api/orders/create`;
const GET_ORDERS = `${process.env.API_URL}/api/orders/all`;

// Checkouts API
const CHECKOUT_ORDERS = `${process.env.API_URL}/api/checkout/create`;
// const GET_CHECKOUTS = `${process.env.API_URL}/api/checkouts/all`;

export async function createOrders() {
  const res = await api.post(CREATE_ORDERS);
  return res.data.data;
}

export async function getAllOrders() {
  const res = await api.get(GET_ORDERS);
  return res.data;
}

export async function checkout(data: CheckoutOrdersRequest) {
  const res = await api.post(CHECKOUT_ORDERS, data);
  return res.data.data;
}
