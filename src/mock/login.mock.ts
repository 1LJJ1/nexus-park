// src/mock/login.mock.ts
import type { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/login',
    method: 'post',
    response: ({ body }) => {
      // 获取前端传过来的账号密码
      const { username, password } = body;

      // 简单校验逻辑
      if (username === 'admin' && password === '123456') {
        return {
          code: 200,
          message: '登录成功',
          data: {
            token: 'Bearer mock-token-668899',
            userId: 1,
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
  // 获取用户信息接口，需要携带token
  {
    url: '/api/getUserInfo',
    method: 'get',
    delay: 200,
    response: ({ headers }) => {
      const token = headers.authorization;
      if (!token) {
        return {
          code: 401,
          message: '未登录，请重新登录',
          data: null,
        };
      }
      return {
        code: 200,
        message: '获取用户信息成功',
        data: {
          userId: 10001,
          username: 'admin',
          nickname: '管理员',
          avatar: 'https://picsum.photos/id/237/100/100',
          roles: ['admin'],
        },
      };
    },
  },
  // 退出登录
  {
    url: '/api/logout',
    method: 'post',
    delay: 200,
    response: () => {
      return {
        code: 200,
        message: '退出登录成功',
        data: null,
      };
    },
  },
] as MockMethod[];
