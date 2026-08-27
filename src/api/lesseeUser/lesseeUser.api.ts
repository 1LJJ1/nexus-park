import request from '../index';
export interface LesseeUserListReq {
  pageSize: number;
  page: number;
  companyName?: string;
  contact?: string;
  phone?: string;
}
// 单条列表项
export interface LesseeUserItem {
  id: string;
  name: string;
  status: '1' | '2' | '3';
  tel: string;
  business: string;
  email: string;
  creditCode: string;
  industryNum: string;
  organizationCode: string;
  legalPerson: string;
}

// mock接口返回的data结构
export interface LesseeUserData {
  list: LesseeUserItem[];
  total: number;
}

// 获取租户列表
export const getLesseeUserListAPI = (data: LesseeUserListReq) => {
  return request<ResponseData<LesseeUserData>>({
    url: '/userList',
    method: 'post',
    data,
  });
};
