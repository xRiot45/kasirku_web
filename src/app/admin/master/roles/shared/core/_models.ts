export type RoleType = {
  id: string;
  role_name: string;
};

export interface RoleRequest {
  role_name: string;
}

export interface RoleRespone {
  id: string;
  role_name: string;
}
