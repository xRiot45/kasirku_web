import api from '@/config/api';
import { ICountData } from './_models';

const GET_COUNT_DATA = `${process.env.API_URL}/api/charts/count-data`;
const GET_COUNT_SALE_BY_YEAR = `${process.env.API_URL}/api/charts/sale-by-year`;
const GET_COUNT_TOTAL_PROFIT = `${process.env.API_URL}/api/charts/total-profit`;
const GET_COUNT_ORDER_STATUS = `${process.env.API_URL}/api/charts/count-order-status`;

export async function getCountData(): Promise<ICountData> {
  const res = await api.get(GET_COUNT_DATA);
  return res.data.data;
}

export async function getCountSaleByYear(search?: {
  year: string;
}): Promise<IBaseResponse> {
  const res = await api.get(GET_COUNT_SALE_BY_YEAR, {
    params: {
      ...search,
    },
  });

  return res.data.data;
}

export async function getCountTotalProfit(): Promise<IBaseResponse> {
  const res = await api.get(GET_COUNT_TOTAL_PROFIT);
  return res.data.data;
}

export async function getCountOrderStatus(): Promise<IBaseResponse> {
  const res = await api.get(GET_COUNT_ORDER_STATUS);
  return res.data.data;
}
