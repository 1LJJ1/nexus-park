import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
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
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const menus = mapMenuItems(menuList);
  // 处理展开/收起事件，只保留最后一个打开的 key
  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys[keys.length - 1];
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };
  const onClikeMenu = (item: MenuItem) => {
    navigate(item?.key);
  };
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
      <Menu
        theme="dark"
        mode="inline"
        onOpenChange={onOpenChange}
        onClick={onClikeMenu}
        items={menus}
        openKeys={openKeys}
      />
    </div>
  );
}
