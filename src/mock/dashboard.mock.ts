import type { MockMethod } from 'vite-plugin-mock';
export default [
  // 能源消耗
  {
    url: '/api/energyData',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '请求成功',
        data: [
          { name: '煤', data: [120, 132, 101, 134, 90, 230, 210] },
          { name: '气', data: [220, 182, 191, 234, 290, 330, 310] },
          { name: '油', data: [150, 232, 201, 154, 190, 330, 410] },
          { name: '电', data: [320, 332, 301, 334, 390, 330, 320] },
          { name: '热', data: [820, 932, 901, 934, 1290, 1330, 1320] },
        ],
      };
    },
  },
  // 企业资质
  {
    url: '/api/enterpriseQualifications',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '请求成功',
        data: [
          {
            name: '科技企业',
            data: [40, 220, 378, 658, 1122, 1200],
          },
          {
            name: '高新企业',
            data: [20, 39, 443, 490, 559, 762],
          },
          {
            name: '国营企业',
            data: [78, 167, 229, 330, 380, 420],
          },
        ],
      };
    },
  },
  // 租赁情况
  {
    url: '/api/leaseInfo',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '请求成功',
        data: [
          { value: 40, name: '在营' },
          { value: 38, name: '已租' },
          { value: 32, name: '出租' },
          { value: 30, name: '续签' },
          { value: 28, name: '新签' },
          { value: 26, name: '待租' },
          { value: 22, name: '退租' },
        ],
      };
    },
  },
] as MockMethod[];
