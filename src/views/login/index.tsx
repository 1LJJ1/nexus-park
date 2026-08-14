import { Button, Form, Input, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import style from './index.module.scss';
import logo from '@/assets/images/logo.png';
import { loginAPI } from '@/api/login/login.api';
import type { RootState } from '@/stores/index';
import { setToken } from '@/stores/module/user.slice';
const formFields = [
  {
    name: 'username',
    label: '用户名',
    rules: [
      { required: true, message: '请输入用户名' },
      { max: 6, message: '用户名最长6位' },
      { min: 3, message: '用户名最短3位' },
    ],
    component: <Input placeholder="请输入用户名" />,
  },
  {
    name: 'password',
    label: '密码',
    rules: [
      { required: true, message: '请输入密码' },
      { max: 16, message: '密码最长16位' },
      { min: 6, message: '密码最短6位' },
    ],
    component: <Input.Password placeholder="请输入密码" />,
  },
];
function LoginForm() {
  const [form] = Form.useForm();
  const token = useSelector((state: RootState) => state.userReducer.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const submit = async () => {
    try {
      const value = await form.validateFields();
      const res = await loginAPI({
        username: value.username,
        password: value.password,
      });
      if (res.code !== 200) return messageApi.error(res.message);
      messageApi.success('登录成功');
      dispatch(setToken(res.data.token));
      navigate('/home', { replace: true });
    } catch (err) {
      console.error(err, '登录失败');
    }
  };
  return (
    <>
      {contextHolder}
      <div className={style['login-form']}>
        <div className={style.leftbg}></div>
        <div className={style.part}>
          <div className={style.title}>
            <img src={logo} />
            <p>{token}</p>
            <h3>智慧园区管理平台</h3>
          </div>

          <Form form={form} labelCol={{ span: 5 }}>
            {formFields.map((item) => {
              return (
                <Form.Item key={item.name} name={item.name} label={item.label} rules={item.rules}>
                  {item.component}
                </Form.Item>
              );
            })}
            <Form.Item wrapperCol={{ offset: 5, span: 20 }}>
              <Button type="primary" block onClick={submit}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
export default function Login() {
  return (
    <div className={style['login-container']}>
      <LoginForm />
    </div>
  );
}
