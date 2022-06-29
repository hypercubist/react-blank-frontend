export interface IPaging {
  page: number;
  size: number;
}

export interface IError {
  errorCode: string;
  message: string;
}

export interface IResponse<T> {
  data: T;
  error: IError;
}
