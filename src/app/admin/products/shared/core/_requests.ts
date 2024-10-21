import api from '@/config/api';
import { ProductsResponse } from './_models';

const GET_PRODUCTS = `${process.env.API_URL}/api/products`;
const DELETE_PRODUCT = `${process.env.API_URL}/api/products/delete`;

export async function getAllProducts(
  search: {
    product_name?: string;
    product_code?: string;
    product_status?: string;
    product_category_name?: string;
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

export async function deleteProduct(id: string) {
  await api.delete<IBaseResponse<ProductsResponse>>(`${DELETE_PRODUCT}/${id}`);
}
