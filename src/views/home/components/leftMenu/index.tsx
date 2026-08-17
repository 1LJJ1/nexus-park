import { Menu } from 'antd';
import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
  {
    key: 1,
    label: '测试菜单',
  },
];

export default function LeftMenu() {
  return (
    <div>
      <div
        style={{
          height: '64px',
          textAlign: 'center',
          color: '#fff',
          lineHeight: '64px',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        智慧中台
      </div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </div>
  );
}
