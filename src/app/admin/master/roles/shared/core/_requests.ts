import axios from 'axios';
import Cookies from 'js-cookie';
import { RoleRequest, RoleRespone } from './_models';

const GET_ROLES_URL = `${process.env.API_URL}/role/all`;
const CREATE_ROLE_URL = `${process.env.API_URL}/role/create`;
const GET_ROLE_BY_ID = `${process.env.API_URL}/role/show`;
const UPDATE_ROLE_URL = `${process.env.API_URL}/role/update`;
const DELETE_ROLE_URL = `${process.env.API_URL}/role/delete`;
const SEARCH_ROLE_URL = `${process.env.API_URL}/role/search`;

const accessToken: string | undefined = Cookies.get('access_token');

const getAllRoles = async (page: number = 1, limit?: number) => {
  const actualLimit = limit ?? 10;
  const res = await axios.get<IBaseResponse<RoleRespone[]>>(
    `${GET_ROLES_URL}?page=${page}?limit=${actualLimit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data;
};

const createRole = async (data: RoleRequest) => {
  const res = await axios.post<IBaseResponse<RoleRespone>>(
    CREATE_ROLE_URL,
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data.data;
};

const getRoleById = async (id: string | undefined) => {
  const res = await axios.get<IBaseResponse<RoleRespone>>(
    `${GET_ROLE_BY_ID}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data.data;
};

const updateRole = async (id: string | undefined, data: RoleRequest) => {
  const res = await axios.put<WebResponse>(`${UPDATE_ROLE_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
};

const searchRole = async (
  role_name: string,
  page: number = 1,
  limit?: number
) => {
  const actualLimit = limit ?? 10;
  const res = await axios.get<IBaseResponse<RoleRespone[]>>(
    `${SEARCH_ROLE_URL}?role_name=${role_name}&page=${page}&limit=${actualLimit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data;
};

const deleteRole = async (id: string) => {
  await axios.delete<WebResponse>(`${DELETE_ROLE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  searchRole,
};
