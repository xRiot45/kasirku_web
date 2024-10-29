import api from '@/config/api';
import { ProductsRequest, ProductsResponse } from './_models';

const GET_PRODUCTS = `${process.env.API_URL}/api/products`;

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
