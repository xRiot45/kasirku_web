import axios from 'axios';
import Cookies from 'js-cookie';

const GET_ROLES = `${process.env.API_URL}/role/all`;
const accessToken: string | undefined = Cookies.get('access_token');

const getAllRoles = async () => {
  const res = await axios.get(GET_ROLES, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data.data;
};

export { getAllRoles };
