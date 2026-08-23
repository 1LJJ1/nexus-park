import request from '../index';

export interface EnergyInfo {
  name: string;
  data: number[];
}

export interface LeaseInfo {
  value: number;
  name: string;
}
// 获取能源信息
export const getEnergyInfo = () => {
  return request<ResponseData<EnergyInfo[]>>({
    url: '/energyData',
  });
};
// 获取企业资质信息
export const getEnterpriseQualifications = () => {
  return request<ResponseData<EnergyInfo[]>>({
    url: '/enterpriseQualifications',
  });
};
// 租赁情况
export const getLeaseInfo = () => {
  return request<ResponseData<LeaseInfo[]>>({
    url: '/leaseInfo',
  });
};
