import { useState } from 'react';
import { Breadcrumb, Layout } from 'antd';
import LeftMenu from './components/leftMenu';
const { Header, Content, Sider } = Layout;
export default function Home() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <LeftMenu />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'Bill' }]} />
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          ></div>
        </Content>
      </Layout>
    </Layout>
  );
}
