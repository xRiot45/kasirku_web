export interface IUsers {
  id: string;
  full_name: string;
  employee_number: string;
  birthday_date: string;
  place_of_birth: string;
  phone_number: string;
  gender: string;
  address: string;
  photo: string;
  email: string;
  role: {
    id: string;
    role_name: string;
  };
}

export interface IRegisterRequest {
  email: string;
  full_name: string;
  roleId: string;
}

export interface IRegisterResponse {
  id: string;
  email: string;
  full_name: string;
  role: {
    id: string;
    role_name: string;
  };
}

export interface IUpdateProfileRequest {
  full_name: string;
  birthday_date: string | null;
  place_of_birth: string;
  phone_number: string;
  gender: string;
  address: string;
  photo: string;
}
