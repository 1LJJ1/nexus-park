import request from '../index';

interface LoginReq {
  username: string;
  password: string;
}

interface LoginResp {
  token: string;
  userId: string;
}
export const loginAPI = (data: LoginReq) => {
  return request<ResponseData<LoginResp>>({
    url: '/login',
    method: 'post',
    data,
  });
};
