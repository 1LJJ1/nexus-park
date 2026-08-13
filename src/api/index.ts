import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

const http = axios.create({
  baseURL: '/api',
  timeout: 10000,
});
// 添加请求拦截器
http.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    return response.data; // 返回data
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default async <T>({ url = '/', method = 'get', data }: AxiosRequestConfig): Promise<T> => {
  const res = await http({
    url,
    method,
    [method!.toUpperCase() === 'GET' ? 'params' : 'data']: data,
  });
  return res as T;
};
