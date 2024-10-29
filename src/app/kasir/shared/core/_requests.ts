import api from '@/config/api';
import { ProductsResponse } from './_models';

const GET_PRODUCTS = `${process.env.API_URL}/api/products`;
const GET_PRODUCT_BY_ID = `${process.env.API_URL}/api/products/show`;

export async function getAllProducts(
  search: {
    product_name?: string;
  },
  page: number = 1,
  limit?: number
) {
  const actualLimit = limit ?? 10;
  const res = await api.get<IBaseResponse<ProductsResponse[]>>(GET_PRODUCTS, {
    params: {
      ...search,
      page,
      limit: actualLimit,
    },
  });

  return res.data;
}

export async function getProductById(id: string | undefined) {
  const res = await api.get<IBaseResponse<ProductsResponse>>(
    `${GET_PRODUCT_BY_ID}/${id}`
  );

  return res.data.data;
}
