import { AuthPaths } from '../interfaces/routes';

export const parseToDateTokenExpireIn = (expiresInMs: number): string =>
  new Date(new Date().getTime() + expiresInMs).toString();

export const parseFromDateTokenExpireIn = (expiresIn: string): Date => new Date(expiresIn);

export const isRegistrationRoute = (url: string): boolean => url.includes(AuthPaths.REGISTRATION);
