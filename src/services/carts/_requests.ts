import api from '@/config/api';
import { IAddProductToCartRequest, ICarts } from './_models';

const ADD_PRODUCT_TO_CART = `${process.env.API_URL}/api/carts/add-product-to-cart`;
const GET_ALL_CARTS = `${process.env.API_URL}/api/carts/all`;
const DELETE_CART_ITEM_BY_ID = `${process.env.API_URL}/api/carts/delete`;
const DELETE_ALL_CART_ITEMS = `${process.env.API_URL}/api/carts/delete/all`;

export async function addProductToCart(data: IAddProductToCartRequest) {
  const res = await api.post<IBaseResponse<ICarts>>(ADD_PRODUCT_TO_CART, data);
  return res.data.data;
}

export async function getAllCarts() {
  const res = await api.get<IBaseResponse<ICarts[]>>(GET_ALL_CARTS);
  return res.data;
}

export async function deleteCartById(id: string) {
  const res = await api.delete<IBaseResponse<ICarts>>(
    `${DELETE_CART_ITEM_BY_ID}/${id}`
  );
  return res.data;
}

export async function deleteAllCarts() {
  await api.delete<IBaseResponse<ICarts>>(DELETE_ALL_CART_ITEMS);
}
