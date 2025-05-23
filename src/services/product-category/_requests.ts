import api from '@/config/api';
import { IProductCategoryRequest, IProductCategory } from './_models';

const GET_PRODUCT_CATEGORY = `${process.env.API_URL}/api/product-category`;
const CREATE_PRODUCT_CATEGORY = `${process.env.API_URL}/api/product-category/create`;
const DELETE_PRODUCT_CATEGORY = `${process.env.API_URL}/api/product-category/delete`;
const GET_PRODUCT_CATEGORY_BY_ID = `${process.env.API_URL}/api/product-category/show`;
const UPDATE_PRODUCT_CATEGORY = `${process.env.API_URL}/api/product-category/update`;

export async function getAllProductCategory(
  page: number = 1,
  limit?: number,
  product_category_name?: string
) {
  const actualLimit = limit ?? 10;
  const res = await api.get<IBaseResponse<IProductCategory[]>>(
    GET_PRODUCT_CATEGORY,
    {
      params: {
        product_category_name,
        page,
        limit: actualLimit,
      },
    }
  );

  return res.data;
}

export async function createProductCategory(data: IProductCategoryRequest) {
  const res = await api.post<IBaseResponse<IProductCategory>>(
    CREATE_PRODUCT_CATEGORY,
    data
  );
  return res.data.data;
}

export async function getProductCategoryById(id: string | undefined) {
  const res = await api.get<IBaseResponse<IProductCategory>>(
    `${GET_PRODUCT_CATEGORY_BY_ID}/${id}`
  );
  return res.data.data;
}

export async function updateProductCategory(
  id: string | undefined,
  data: IProductCategoryRequest
) {
  const res = await api.put<IBaseResponse<IProductCategory>>(
    `${UPDATE_PRODUCT_CATEGORY}/${id}`,
    data
  );
  return res.data.data;
}

export async function deleteProductCategory(id: string) {
  await api.delete<IBaseResponse<IProductCategory>>(
    `${DELETE_PRODUCT_CATEGORY}/${id}`
  );
}
