export type Nullable<T> = T | null;

export interface Error {
  message: string;
  type: ResponseType;
}

export interface Response {
  message: string;
  response: ResponseType;
}

export type ResponseType = 'success' | 'warning' | 'error';
