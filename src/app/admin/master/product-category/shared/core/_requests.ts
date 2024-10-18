import axios from 'axios';
import Cookies from 'js-cookie';
import { ProductCategoryRequest, ProductCategoryResponse } from './_models';

const GET_PRODUCT_CATEGORY_ALL = `${process.env.API_URL}/product-category/all`;
const CREATE_PRODUCT_CATEGORY = `${process.env.API_URL}/product-category/create`;
const DELETE_PRODUCT_CATEGORY = `${process.env.API_URL}/product-category/delete`;
const GET_PRODUCT_CATEGORY_BY_ID = `${process.env.API_URL}/product-category/show`;
const UPDATE_PRODUCT_CATEGORY = `${process.env.API_URL}/product-category/update`;

const accessToken: string | undefined = Cookies.get('access_token');

const getAllProductCategory = async (page: number = 1, limit?: number) => {
  const actualLimit = limit ?? 10;
  const res = await axios.get<IBaseResponse<ProductCategoryResponse[]>>(
    `${GET_PRODUCT_CATEGORY_ALL}?page=${page}&limit=${actualLimit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data;
};

const createProductCategory = async (data: ProductCategoryRequest) => {
  const res = await axios.post<IBaseResponse<ProductCategoryResponse>>(
    CREATE_PRODUCT_CATEGORY,
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data.data;
};

const getProductCategoryById = async (id: string | undefined) => {
  const res = await axios.get<IBaseResponse<ProductCategoryResponse>>(
    `${GET_PRODUCT_CATEGORY_BY_ID}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data.data;
};

const updateProductCategory = async (
  id: string | undefined,
  data: ProductCategoryRequest
) => {
  const res = await axios.put<IBaseResponse<ProductCategoryResponse>>(
    `${UPDATE_PRODUCT_CATEGORY}/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data;
};

const deleteProductCategory = async (id: string) => {
  await axios.delete<WebResponse>(`${DELETE_PRODUCT_CATEGORY}/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export {
  getAllProductCategory,
  createProductCategory,
  deleteProductCategory,
  getProductCategoryById,
  updateProductCategory,
};
