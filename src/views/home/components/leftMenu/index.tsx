import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useSelector } from 'react-redux';
import icons from './icons';
import type { MenuItemResp } from '@/api/login/login.api';
import type { RootState } from '@/store';
type MenuItem = Required<MenuProps>['items'][number];

// 过滤菜单
function mapMenuItems(items: MenuItemResp[]): MenuItem[] {
  if (items.length <= 0) return [];
  return items.map((i) => ({
    key: i.key,
    label: i.label,
    icon: icons[i.icon],
    children: i.children ? mapMenuItems(i.children) : null,
  }));
}
export default function LeftMenu() {
  const menuList = useSelector((state: RootState) => state.menuReducer.menu);
  const menus = mapMenuItems(menuList);

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
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menus} />
    </div>
  );
}
