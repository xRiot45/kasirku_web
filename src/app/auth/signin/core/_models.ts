export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    statusCode: number;
    message: string;
    data: {
      access_token: string;
      refresh_token: string;
    };
  }