import request from '../index';
// 合同单项类型
export interface ContractItem {
  contractNo: string;
  type: '租赁合同' | '自定义合同' | '购买合同';
  name: '房屋租赁合同通用模版' | '车位租赁合同通用模版' | '商业房产买卖合同';
  startDate: string;
  endDate: string;
  jia: '万物科技有限公司' | '大鱼网络科技' | '六六信息技术有限公司';
  yi: string;
  status: '1' | '2' | '3';
}

// mock返回data结构
export interface ContractListData {
  list: ContractItem[];
  total: number;
}
// 接口post请求入参
export interface ContractListQuery {
  page: number;
  pageSize: number;
  contractNo?: string;
  person?: string;
  tel?: string;
}
// 获取合同列表
export const getContractListAPI = (data: ContractListQuery) => {
  return request<ResponseData<ContractListData>>({
    url: '/contractList',
    method: 'post',
    data,
  });
};
