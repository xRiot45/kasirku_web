import {
  IRegisterRequest,
  IRegisterResponse,
  IUpdateProfileRequest,
  IUsers,
} from './_models';
import api, { updateData } from '@/config/api';

const GET_USERS = `${process.env.API_URL}/api/users`;
const GET_USER_BY_ID = `${process.env.API_URL}/api/users/show`;
const REGISTER_USER = `${process.env.API_URL}/api/auth/register`;
const DELETE_USER = `${process.env.API_URL}/api/users/delete`;
const RESET_PASSWORD = `${process.env.API_URL}/api/users/reset-password`;
const UPDATE_USER_BY_ADMIN = `${process.env.API_URL}/api/users/update-profile`;

export async function getAllUsers(
  search: {
    full_name?: string;
    email?: string;
    employee_number?: string;
  },
  page: number = 1,
  limit?: number
) {
  const actualLimit = limit ?? 10;
  const res = await api.get<IBaseResponse<IUsers[]>>(GET_USERS, {
    params: {
      ...search,
      page,
      limit: actualLimit,
    },
  });

  return res.data;
}

export async function getUserById(id: string | undefined) {
  const res = await api.get<IBaseResponse<IUsers>>(`${GET_USER_BY_ID}/${id}`);
  return res.data.data;
}

export async function registerUser(data: IRegisterRequest) {
  const res = await api.post<IBaseResponse<IRegisterResponse>>(
    REGISTER_USER,
    data
  );

  return res.data.data;
}

export async function resetPassword(id: string) {
  await api.put<WebResponse>(`${RESET_PASSWORD}/${id}`);
}

export async function deleteUser(id: string) {
  await api.delete<IBaseResponse<IUsers>>(`${DELETE_USER}/${id}`);
}

export async function updateProfileByAdmin(
  id: string | undefined,
  data: IUpdateProfileRequest
) {
  const res = await updateData(`${UPDATE_USER_BY_ADMIN}/${id}`, data);
  return res.data.data;
}
