export interface IResponse<T extends Record<string, any>>{
  status: 'OK' | string;
  error_message: string;
  data: T;
}
