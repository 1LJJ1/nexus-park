// src/mock/login.mock.ts
import type { MockMethod } from 'vite-plugin-mock';
const menuList = [
  {
    icon: 'DashboardOutlined',
    label: '工作台',
    key: '/dashboard',
  },
  {
    icon: 'TeamOutlined',
    label: '租户管理',
    key: '/users',
    children: [
      {
        icon: 'UnorderedListOutlined',
        label: '租户列表',
        key: '/users/list',
      },
      {
        icon: 'UserAddOutlined',
        label: '新增租户',
        key: '/users/add',
      },
    ],
  },
  {
    icon: 'LaptopOutlined',
    label: '物业管理',
    key: '/estate',
    children: [
      {
        icon: 'InsertRowLeftOutlined',
        label: '楼宇管理',
        key: '/estate/tenement',
      },
      {
        icon: 'BankOutlined',
        label: '房间管理',
        key: '/estate/room',
      },
      {
        icon: 'TruckOutlined',
        label: '车辆信息',
        key: '/estate/car',
      },
    ],
  },
  {
    icon: 'ToolOutlined',
    label: '报修管理',
    key: '/repair',
  },
  {
    icon: 'DollarOutlined',
    label: '财务管理',
    key: '/finance',
    children: [
      {
        icon: 'ProfileOutlined',
        label: '合同管理',
        key: '/finance/contract',
      },
      {
        icon: 'FrownOutlined',
        label: '合同详情',
        key: '/finance/surrender',
      },
      {
        icon: 'FileTextOutlined',
        label: '账单管理',
        key: '/finance/bill',
      },
    ],
  },
  {
    icon: 'TransactionOutlined',
    label: '招商管理',
    key: '/merchants',
  },
  {
    icon: 'FundProjectionScreenOutlined',
    label: '运营管理',
    key: '/operation',
    children: [
      {
        icon: 'FundViewOutlined',
        label: '运营总览',
        key: '/operation/all',
      },
      {
        icon: 'ReadOutlined',
        label: '文章发布',
        key: '/operation/article',
      },
      {
        icon: 'CommentOutlined',
        label: '内容评论',
        key: '/operation/comments',
      },
    ],
  },
  {
    icon: 'ToolOutlined',
    label: '设备管理',
    key: '/equipment',
  },
  {
    icon: 'ThunderboltOutlined',
    label: '能源消耗',
    key: '/energy',
  },
  {
    icon: 'SettingOutlined',
    label: '系统设置',
    key: '/settings',
  },
  {
    icon: 'UserOutlined',
    label: '个人中心',
    key: '/personal',
  },
];

const userMenuList = [
  {
    icon: 'DashboardOutlined',
    label: '工作台',
    key: '/dashboard',
  },
  {
    icon: 'TeamOutlined',
    label: '租户管理',
    key: '/users',
    children: [
      {
        icon: 'UnorderedListOutlined',
        label: '租户列表',
        key: '/users/list',
      },
      {
        icon: 'UserAddOutlined',
        label: '新增租户',
        key: '/users/add',
      },
    ],
  },
  {
    icon: 'LaptopOutlined',
    label: '物业管理',
    key: '/estate',
    children: [
      {
        icon: 'InsertRowLeftOutlined',
        label: '楼宇管理',
        key: '/estate/tenement',
      },
      {
        icon: 'BankOutlined',
        label: '房间管理',
        key: '/estate/room',
      },
      {
        icon: 'TruckOutlined',
        label: '车辆信息',
        key: '/estate/car',
      },
    ],
  },
  {
    icon: 'ToolOutlined',
    label: '报修管理',
    key: '/repair',
  },
  {
    icon: 'ToolOutlined',
    label: '设备管理',
    key: '/equipment',
  },
  {
    icon: 'ThunderboltOutlined',
    label: '能源消耗',
    key: '/energy',
  },
  {
    icon: 'UserOutlined',
    label: '个人中心',
    key: '/personal',
  },
];

const managerMenuList = [
  {
    icon: 'DashboardOutlined',
    label: '工作台',
    key: '/dashboard',
  },
  {
    icon: 'TeamOutlined',
    label: '租户管理',
    key: '/users',
    children: [
      {
        icon: 'UnorderedListOutlined',
        label: '租户列表',
        key: '/users/list',
      },
      {
        icon: 'UserAddOutlined',
        label: '新增租户',
        key: '/users/add',
      },
    ],
  },
  {
    icon: 'LaptopOutlined',
    label: '物业管理',
    key: '/estate',
    children: [
      {
        icon: 'InsertRowLeftOutlined',
        label: '楼宇管理',
        key: '/estate/tenement',
      },
      {
        icon: 'BankOutlined',
        label: '房间管理',
        key: '/estate/room',
      },
      {
        icon: 'TruckOutlined',
        label: '车辆信息',
        key: '/estate/car',
      },
    ],
  },
  {
    icon: 'ToolOutlined',
    label: '报修管理',
    key: '/repair',
  },
  {
    icon: 'TransactionOutlined',
    label: '招商管理',
    key: '/merchants',
  },
  {
    icon: 'FundProjectionScreenOutlined',
    label: '运营管理',
    key: '/operation',
    children: [
      {
        icon: 'FundViewOutlined',
        label: '运营总览',
        key: '/operation/all',
      },
      {
        icon: 'ReadOutlined',
        label: '文章发布',
        key: '/operation/article',
      },
      {
        icon: 'CommentOutlined',
        label: '内容评论',
        key: '/operation/comments',
      },
    ],
  },
  {
    icon: 'ToolOutlined',
    label: '设备管理',
    key: '/equipment',
  },
  {
    icon: 'ThunderboltOutlined',
    label: '能源消耗',
    key: '/energy',
  },
  {
    icon: 'SettingOutlined',
    label: '系统设置',
    key: '/settings',
  },
  {
    icon: 'UserOutlined',
    label: '个人中心',
    key: '/personal',
  },
];

const customizeMenuList = [
  {
    icon: 'DashboardOutlined',
    label: '工作台',
    key: '/dashboard',
  },
  {
    icon: 'TeamOutlined',
    label: '租户管理',
    key: '/users',
    children: [
      {
        icon: 'UnorderedListOutlined',
        label: '租户列表',
        key: '/users/list',
      },
    ],
  },
  {
    icon: 'LaptopOutlined',
    label: '物业管理',
    key: '/estate',
    children: [
      {
        icon: 'InsertRowLeftOutlined',
        label: '楼宇管理',
        key: '/estate/tenement',
      },
    ],
  },
  {
    icon: 'ToolOutlined',
    label: '报修管理',
    key: '/repair',
  },
  {
    icon: 'ToolOutlined',
    label: '设备管理',
    key: '/equipment',
  },
  {
    icon: 'ThunderboltOutlined',
    label: '能源消耗',
    key: '/energy',
  },
  {
    icon: 'UserOutlined',
    label: '个人中心',
    key: '/personal',
  },
];
export default [
  // 登录
  {
    url: '/api/login',
    method: 'post',
    response: ({ body }) => {
      // 获取前端传过来的账号密码
      const { username, password } = body;

      // 简单校验逻辑
      if (username === 'admin' && password === 'admin123123') {
        return {
          code: 200,
          message: '登录成功',
          data: {
            username: '赵铁柱',
            token: 'mocktoken123456admin',
            btnAuth: ['add', 'edit', 'delete'],
          },
        };
      } else if (username === 'manager' && password === 'manager123123') {
        return {
          code: 200,
          message: '登录成功',
          data: {
            username: 'manager',
            token: 'mocktoken123456manager',
            btnAuth: ['add', 'edit'],
          },
        };
      } else if (username == 'user' && password === 'user123123') {
        return {
          code: 200,
          message: '登录成功',
          data: {
            username: 'user',
            token: 'mocktoken123456user',
            btnAuth: ['add'],
          },
        };
      } else {
        return {
          code: 400,
          message: '账号或密码错误',
          data: null,
        };
      }
    },
  },
  // 获取菜单
  {
    url: '/api/menu',
    method: 'get',
    response: ({ headers }) => {
      // vite‑plugin‑mock 在node环境，不能读取sessionStorage，从请求头拿token
      const authorization = headers.authorization ?? '';
      // 去掉 Bearer 前缀
      const token = authorization.replace(/^Bearer\s+/, '');

      if (token === 'mocktoken123456admin') {
        return {
          code: 200,
          message: '请求成功',
          data: menuList,
        };
      } else if (token === 'mocktoken123456user') {
        return {
          code: 200,
          message: '请求成功',
          data: userMenuList,
        };
      } else if (token === 'mocktoken123456manager') {
        return {
          code: 200,
          message: '请求成功',
          data: managerMenuList,
        };
      } else {
        return {
          code: 401,
          message: 'token无效',
          data: [],
        };
      }
    },
  },
] as MockMethod[];
