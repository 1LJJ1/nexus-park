import { useState } from 'react';
import { Layout, theme, Dropdown, Space, Breadcrumb } from 'antd';
import type { MenuProps } from 'antd';
import type { MenuItemResp } from '@/api/login/login.api';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
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

function findBreadCrumbPathObj(
  path: string,
  menuItems: MenuItemResp[]
): Array<Pick<MenuItemResp, 'key' | 'label'>> {
  for (const item of menuItems) {
    // 当前节点完全匹配路径
    if (item.key === path) {
      return [{ key: item.key, label: item.label }];
    }

    if (item.children && item.children.length > 0) {
      const childResult = findBreadCrumbPathObj(path, item.children);
      if (childResult.length > 0) {
        // 父节点对象放在前面，拼接子节点链路
        return [{ key: item.key, label: item.label }, ...childResult];
      }
    }
  }
  return [];
}
export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const username = useSelector((state: RootState) => state.userReducer.userInfo);
  const menuList = useSelector((state: RootState) => state.menuReducer.menu);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const breadList = findBreadCrumbPathObj(location.pathname, menuList);
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
          <div style={{ margin: '10px 0' }}>
            <Breadcrumb
              items={breadList.map((item) => ({
                title: item.label,
              }))}
            />
          </div>
          <div
            style={{
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
