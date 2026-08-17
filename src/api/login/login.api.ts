import request from '../index';

interface LoginReq {
  username: string;
  password: string;
}

interface LoginResp {
  token: string;
  userId: string;
}
interface MenuItem {
  icon: string;
  label: string;
  key: string;
  // 递归：children 自身也是 MenuItem[]，可选
  children?: MenuItem[];
}

export const loginAPI = (data: LoginReq) => {
  return request<ResponseData<LoginResp>>({
    url: '/login',
    method: 'post',
    data,
  });
};

export const getMenuAPI = () => {
  return request<ResponseData<MenuItem>>({
    url: '/menu',
    method: 'get',
  });
};
