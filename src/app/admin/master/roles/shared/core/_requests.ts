import api from '@/config/api';
import { RoleRequest, RoleRespone } from './_models';

const GET_ROLES = `${process.env.API_URL}/role`;
const CREATE_ROLE = `${process.env.API_URL}/role/create`;
const GET_ROLE_BY_ID = `${process.env.API_URL}/role/show`;
const UPDATE_ROLE = `${process.env.API_URL}/role/update`;
const DELETE_ROLE = `${process.env.API_URL}/role/delete`;

export async function getAllRoles(
  role_name: string,
  page: number = 1,
  limit?: number
) {
  const actualLimit = limit ?? 10;
  const res = await api.get<IBaseResponse<RoleRespone[]>>(GET_ROLES, {
    params: {
      role_name,
      page,
      limit: actualLimit,
    },
  });

  return res.data;
}

export async function createRole(data: RoleRequest) {
  const res = await api.post<IBaseResponse<RoleRespone>>(CREATE_ROLE, data);
  return res.data.data;
}

export async function getRoleById(id: string | undefined) {
  const res = await api.get<IBaseResponse<RoleRespone>>(
    `${GET_ROLE_BY_ID}/${id}`
  );
  return res.data.data;
}

// export async function updateRole(id: string | undefined, data: RoleRequest) {
//   const res = await axios.put<IBaseResponse<RoleRespone>>(
//     `${UPDATE_ROLE}/${id}`,
//     data,
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     }
//   );

//   return res.data;
// }

export async function updateRole(id: string | undefined, data: RoleRequest) {
  const res = await api.put<IBaseResponse<RoleRespone>>(
    `${UPDATE_ROLE}/${id}`,
    data
  );
  return res.data.data;
}

export async function deleteRole(id: string) {
  await api.delete<IBaseResponse<RoleRespone>>(`${DELETE_ROLE}/${id}`);
}
