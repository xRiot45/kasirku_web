import api from '@/config/api';
import { UsersResponse } from './_models';

const GET_USERS = `${process.env.API_URL}/users`;

export async function getAllUsers(
  search: {
    full_name?: string;
    email?: string;
    role_name?: string;
    employee_number?: string;
    gender?: string;
  },
  page: number = 1,
  limit?: number
) {
  const actualLimit = limit ?? 10;
  const res = await api.get<IBaseResponse<UsersResponse[]>>(GET_USERS, {
    params: {
      ...search,
      page,
      limit: actualLimit,
    },
  });

  return res.data;
}

export async function deleteUser(id: string) {
  await api.delete<IBaseResponse<UsersResponse>>(`${GET_USERS}/${id}`);
}
