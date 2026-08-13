import request from '../index';
export const loginAPI = <T>() => {
  return request<ResponseData<T>>({
    url: '/login',
    method: 'post',
  });
};
