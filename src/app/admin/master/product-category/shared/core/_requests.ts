import axios from 'axios';
import Cookies from 'js-cookie';
import { ProductCategoryRequest, ProductCategoryResponse } from './_models';

const GET_PRODUCT_CATEGORY_ALL = `${process.env.API_URL}/product-category/all`;
const CREATE_PRODUCT_CATEGORY = `${process.env.API_URL}/product-category/create`;
const DELETE_PRODUCT_CATEGORY = `${process.env.API_URL}/product-category/delete`;

const accessToken: string | undefined = Cookies.get('access_token');

const getAllProductCategory = async (page: number = 1) => {
  const res = await axios.get<IBaseResponse<ProductCategoryResponse[]>>(
    `${GET_PRODUCT_CATEGORY_ALL}?page=${page}`,
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

const deleteProductCategory = async (id: string) => {
  await axios.delete<WebResponse>(`${DELETE_PRODUCT_CATEGORY}/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export { getAllProductCategory, createProductCategory, deleteProductCategory };
