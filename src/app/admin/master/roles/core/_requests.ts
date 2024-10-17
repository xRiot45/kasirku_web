import axios from 'axios';
import Cookies from 'js-cookie';
import { RoleRequest, RoleRespone } from './_models';

const GET_ROLES_URL = `${process.env.API_URL}/role/all`;
const CREATE_ROLE_URL = `${process.env.API_URL}/role/create`;
const accessToken: string | undefined = Cookies.get('access_token');

const getAllRoles = async () => {
  const res = await axios.get<IBaseResponse<RoleRespone[]>>(GET_ROLES_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

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

export { getAllRoles, createRole };
