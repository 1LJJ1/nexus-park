declare global {
  interface ResponseData<T> {
    code: string;
    data: T;
    message: string;
  }
}
declare module 'modern-normalize' {
  const css: string;
  export default css;
}

export {};
