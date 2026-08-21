import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { componentMap } from './componentMap';
import RequireAuth from './RequireAuth';
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
  const dynamicRouter = generateRoutes(menuList);
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Navigate to="/dashboard" replace />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          {dynamicRouter}
        </Route>

        <Route
          path="*"
          element={
            <RequireAuth>
              <NoFound />
            </RequireAuth>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
