import api, { updateData, uploadData } from '@/config/api';
import { ProductsRequest, ProductsResponse } from './_models';

const GET_PRODUCTS = `${process.env.API_URL}/api/products`;
const CREATE_PRODUCT = `${process.env.API_URL}/api/products/create`;
const DELETE_PRODUCT = `${process.env.API_URL}/api/products/delete`;
const GET_PRODUCT_BY_ID = `${process.env.API_URL}/api/products/show`;
const UPDATE_PRODUCT = `${process.env.API_URL}/api/products/update`;

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

export async function createProduct(data: ProductsRequest) {
  const res = await uploadData(CREATE_PRODUCT, data);
  return res.data.data;
}

export async function getProductById(id: string | undefined) {
  const res = await api.get<IBaseResponse<ProductsResponse>>(
    `${GET_PRODUCT_BY_ID}/${id}`
  );

  return res.data.data;
}

export async function updateProduct(
  id: string | undefined,
  data: ProductsRequest
) {
  const res = await updateData(`${UPDATE_PRODUCT}/${id}`, data);
  return res.data.data;
}

export async function deleteProduct(id: string) {
  await api.delete<IBaseResponse<ProductsResponse>>(`${DELETE_PRODUCT}/${id}`);
}
