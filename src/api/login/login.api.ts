import request from '../index';

interface LoginReq {
  username: string;
  password: string;
}

interface LoginResp {
  token: string;
  username: string;
  btnAuth: string[];
}
export interface MenuItemResp {
  icon: string;
  label: string;
  key: string;
  // 递归：children 自身也是 MenuItem[]，可选
  children?: MenuItemResp[];
}

export const loginAPI = (data: LoginReq) => {
  return request<ResponseData<LoginResp>>({
    url: '/login',
    method: 'post',
    data,
  });
};

export const getMenuAPI = () => {
  return request<ResponseData<MenuItemResp>>({
    url: '/menu',
    method: 'get',
  });
};
