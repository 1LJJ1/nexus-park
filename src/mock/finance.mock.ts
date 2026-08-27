import Mock from 'mockjs';

// 先生成全部54条基础数据
const allList = Mock.mock({
  [`list|54`]: [
    {
      contractNo: '@string("number", 6)',
      'type|1': ['租赁合同', '自定义合同', '购买合同'],
      'name|1': ['房屋租赁合同通用模版', '车位租赁合同通用模版', '商业房产买卖合同'],
      'startDate|1': ['2023-01-01', '2023-03-05', '2023-04-01'],
      'endDate|1': ['2024-01-01', '2024-03-05', '2024-04-01'],
      'jia|1': ['万物科技有限公司', '大鱼网络科技', '六六信息技术有限公司'],
      yi: '天明物业有限公司',
      'status|1': ['1', '2', '3'],
    },
  ],
});

export default [
  {
    url: '/api/contractList',
    method: 'post',
    response: (options: { body: { page: number; pageSize: number } }) => {
      const { page, pageSize } = options.body;
      console.log('finance mock参数', { page, pageSize });
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const list = allList.list.slice(start, end);
      return {
        code: 200,
        message: '成功',
        data: {
          list,
          total: 54,
        },
      };
    },
  },
];
