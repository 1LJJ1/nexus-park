import style from './index.module.scss';
import logo from '@/assets/images/logo.png';
import { Button, Form, Input } from 'antd';

type FieldType = {
  username?: string;
  password?: string;
};

function LoginForm() {
  return (
    <div className={style['login-form']}>
      <div className={style.leftbg}></div>
      <div className={style.part}>
        <div className={style.title}>
          <img src={logo} />
          <h3>智慧园区管理平台</h3>
        </div>
        <Form labelCol={{ span: 4 }}>
          <Form.Item<FieldType> label="用户名" name="username">
            <Input />
          </Form.Item>
          <Form.Item<FieldType> label="密码" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button type="primary">登录</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default function Login() {
  return (
    <div className={style['login-container']}>
      <LoginForm />
    </div>
  );
}
