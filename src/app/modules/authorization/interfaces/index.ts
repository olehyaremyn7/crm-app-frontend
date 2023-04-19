import { Response } from '../../../shared/interfaces';

export interface User {
  id?: UserId;
  email: string;
  password: string;
  username?: string;
}

export interface LoginResponse extends Response {
  token: Token;
  expiresIn: number;
  user: User;
}

export type Token = string;
export type UserId = string;

export enum StorageKeys {
  TOKEN = 'auth-token',
  TOKEN_EXPIRE_IN = 'auth-token-exp',
  USER = 'logged-user',
}

export enum LoginQueryParams {
  NOT_LOGIN = 'notLogin',
  REGISTERED = 'registered',
  AUTH_FAILED = 'authFailed',
  LOGOUT = 'logout',
}
