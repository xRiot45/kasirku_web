import api from '@/config/api';
import { IRoleRequest, IRole } from './_models';

const GET_ROLES = `${process.env.API_URL}/api/role`;
const CREATE_ROLE = `${process.env.API_URL}/api/role/create`;
const GET_ROLE_BY_ID = `${process.env.API_URL}/api/role/show`;
const UPDATE_ROLE = `${process.env.API_URL}/api/role/update`;
const DELETE_ROLE = `${process.env.API_URL}/api/role/delete`;

export async function getAllRoles(
  page: number = 1,
  limit?: number,
  role_name?: string
) {
  const actualLimit = limit ?? 10;
  const res = await api.get<IBaseResponse<IRole[]>>(GET_ROLES, {
    params: {
      role_name,
      page,
      limit: actualLimit,
    },
  });

  return res.data;
}

export async function createRole(data: IRoleRequest) {
  const res = await api.post<IBaseResponse<IRole>>(CREATE_ROLE, data);
  return res.data.data;
}

export async function getRoleById(id: string | undefined) {
  const res = await api.get<IBaseResponse<IRole>>(`${GET_ROLE_BY_ID}/${id}`);
  return res.data.data;
}

export async function updateRole(id: string | undefined, data: IRoleRequest) {
  const res = await api.put<IBaseResponse<IRole>>(`${UPDATE_ROLE}/${id}`, data);
  return res.data.data;
}

export async function deleteRole(id: string) {
  await api.delete<IBaseResponse<IRole>>(`${DELETE_ROLE}/${id}`);
}
