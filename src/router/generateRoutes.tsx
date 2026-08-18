import type { MenuItemResp } from '@/api/login/login.api';
import type { RouteObject } from 'react-router-dom';
import { componentMap } from './componentMap';

export function generateRoutes(menu: MenuItemResp[]): RouteObject[] {
  return menu.map((item) => {
    const routerObj = {
      path: item.key,
      element: componentMap[item.key] ?? null,
    };
    if (item.children) {
      generateRoutes(item.children);
    }
    return routerObj;
  });
}
