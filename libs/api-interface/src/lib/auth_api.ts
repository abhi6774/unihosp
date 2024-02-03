import { UserResponse } from './api-interface';

export type LogoutResponse = {
  success: boolean;
  message: string;
};

export type LoginResult = {
  accessToken: string;
  refreshToken: string;
  refreshTokenId: string;
  user: UserResponse;
};

export type LoginResponse = {
  message: string;
  data: LoginResult | null;
};
