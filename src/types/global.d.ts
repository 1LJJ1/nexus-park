export {};
declare global {
  interface ResponseData<T> {
    code: string | number;
    data: T;
    message: string;
  }
}
