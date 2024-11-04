import api from '@/config/api';
import { ICheckout, ICheckoutOrdersRequest } from './_models';

const CHECKOUT_ORDERS = `${process.env.API_URL}/api/checkout/create`;
const GET_CHECKOUT = `${process.env.API_URL}/api/checkout/all`;
const CONFIRMED_CHECKOUT = `${process.env.API_URL}/api/checkout/status/confirmed`;
const PROCESSED_CHECKOUT = `${process.env.API_URL}/api/checkout/status/processed`;
const COMPLETED_CHECKOUT = `${process.env.API_URL}/api/checkout/status/completed`;
const CANCELLED_CHECKOUT = `${process.env.API_URL}/api/checkout/status/cancelled`;
const DETAIL_CHECKOUTS = `${process.env.API_URL}/api/checkout/show`;

export async function checkout(data: ICheckoutOrdersRequest) {
  const res = await api.post(CHECKOUT_ORDERS, data);
  return res.data.data;
}

export async function getAllCheckouts(
  page: number = 1,
  limit?: number,
  order_status?: string
) {
  const actualLimit = limit ?? 10;
  const res = await api.get<IBaseResponse<ICheckout[]>>(GET_CHECKOUT, {
    params: {
      order_status,
      page,
      limit: actualLimit,
    },
  });

  return res.data;
}

export async function confirmedCheckout(id: string) {
  const res = await api.put(`${CONFIRMED_CHECKOUT}/${id}`);
  return res.data.data;
}

export async function processedCheckout(id: string) {
  const res = await api.put(`${PROCESSED_CHECKOUT}/${id}`);
  return res.data.data;
}

export async function completedCheckout(id: string) {
  const res = await api.put(`${COMPLETED_CHECKOUT}/${id}`);
  return res.data.data;
}

export async function cancelledCheckout(id: string) {
  const res = await api.put(`${CANCELLED_CHECKOUT}/${id}`);
  return res.data.data;
}

export async function getDetailCheckout(id: string | undefined) {
  const res = await api.get<IBaseResponse<ICheckout>>(
    `${DETAIL_CHECKOUTS}/${id}`
  );

  return res.data.data;
}
