import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { generateRoutes } from './generateRoutes';
import { useSelector } from 'react-redux';
import RequireAuth from '@/components/RequireAuth';
import type { RootState } from '@/store';
const Home = lazy(() => import('@/views/home/index.tsx'));
const Login = lazy(() => import('@/views/login/index'));
const NoFound = lazy(() => import('@/views/notFound/index'));
const AppRouter = () => {
  const menuList = useSelector((state: RootState) => state.menuReducer.menu);
  const router = generateRoutes(menuList);
  console.log(router);
  return (
    <Suspense fallback={<div>加载中</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="home"
          element={
            <RequireAuth allowed redirectTo="/login">
              <Home />
            </RequireAuth>
          }
        >
          {router.map((item) => (
            <Route key={item.path} path={item.path} element={item.element} />
          ))}
        </Route>
        <Route
          path="login"
          element={
            <RequireAuth allowed={false} redirectTo="/home">
              <Login />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NoFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
