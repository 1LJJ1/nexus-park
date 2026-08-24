import Mock from 'mockjs';
import type { MockMethod } from 'vite-plugin-mock';

export default [
  // 租户列表
  {
    url: '/api/userList',
    method: 'post',
    response: (req: any) => {
      const { pageSize, page, companyName, contact, phone } = req.body;

      console.log('租户列表接收到参数', page, pageSize, companyName, contact, phone);

      const mockData = Mock.mock({
        [`list|${pageSize}`]: [
          {
            id: '@string("number",6)',
            name: '@cname',
            'status|1': ['1', '2', '3'],
            tel: '@phone',
            'business|1': ['制造业', '互联网', '新媒体', '美业', '新能源', '物流', '电商'],
            email: '@email',
            creditCode: '@string("number",18)',
            industryNum: '@string("number",15)',
            organizationCode: '@string("upper",9)',
            legalPerson: '@cname',
          },
        ],
        total: 78,
      });

      return {
        code: 200,
        message: '成功',
        data: mockData,
      };
    },
  },
] as MockMethod[];
