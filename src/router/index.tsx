import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { componentMap } from './componentMap';
import RequireAuth from '@/components/RequireAuth';
import type { RootState } from '@/store';
import type { MenuItemResp } from '@/api/login/login.api';
const Layout = lazy(() => import('@/views/layout/index.tsx'));
const Login = lazy(() => import('@/views/login/index'));
const NoFound = lazy(() => import('@/views/notFound/index'));
function generateRoutes(menus: MenuItemResp[]): React.ReactNode[] {
  const result: React.ReactNode[] = [];

  for (const item of menus) {
    if (componentMap[item.key]) {
      result.push(<Route key={item.key} path={item.key} element={componentMap[item.key]} />);
    }

    if (item.children && item.children.length > 0) {
      const childRoutes = generateRoutes(item.children);
      result.push(...childRoutes);
    }
  }
  return result;
}
const AppRouter = () => {
  const menuList = useSelector((state: RootState) => state.menuReducer.menu);
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="login"
          element={
            <RequireAuth allowed={false} redirectTo="/">
              <Login />
            </RequireAuth>
          }
        />
        <Route
          element={
            <RequireAuth allowed redirectTo="/login">
              <Layout />
            </RequireAuth>
          }
        >
          {/* 动态生成所有业务路由，全部绝对路径挂在home的children下 */}
          {generateRoutes(menuList)}
        </Route>
        <Route path="*" element={<NoFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
