import { useState } from 'react';
import { Layout, theme, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '@/store/index';
import { setUserInfo, setToken } from '@/store/module/user.slice';
import { DownOutlined } from '@ant-design/icons';
import LeftMenu from './components/leftMenu';
const { Header, Content, Sider } = Layout;
const DropdownItems: MenuProps['items'] = [
  {
    key: 1,
    label: '个人中心',
  },
  {
    key: 2,
    label: '退出登录',
  },
];
export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const username = useSelector((state: RootState) => state.userReducer.userInfo);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const outLogin = () => {
    dispatch(setUserInfo(''));
    dispatch(setToken(''));
    localStorage.clear();
    navigate('/login', { replace: true });
  };
  const personalCenter = () => {
    console.log('个人中心');
  };
  const menuClick: MenuProps['onClick'] = ({ key }) => {
    const eventFn: Record<string, () => void> = {
      '1': personalCenter,
      '2': outLogin,
    };
    eventFn[key]?.();
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <LeftMenu />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div style={{ float: 'right', marginRight: 30 }}>
            <Dropdown menu={{ items: DropdownItems, onClick: menuClick }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {username}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div>工作台</div>
          <div
            style={{
              minHeight: 360,
            }}
          >
            主体内容
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
