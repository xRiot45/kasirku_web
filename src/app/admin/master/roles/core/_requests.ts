import axios from 'axios';
import Cookies from 'js-cookie';
import { RoleRespone } from './_models';

const GET_ROLES = `${process.env.API_URL}/role/all`;
const accessToken: string | undefined = Cookies.get('access_token');

const getAllRoles = async () => {
  const res = await axios.get<IBaseResponse<RoleRespone[]>>(GET_ROLES, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
};

export { getAllRoles };
