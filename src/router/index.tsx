import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { useSelector } from 'react-redux';
import RequireAuth from '@/components/RequireAuth';
import type { RootState } from '@/store';
const Layout = lazy(() => import('@/views/layout/index.tsx'));
const Login = lazy(() => import('@/views/login/index'));
const NoFound = lazy(() => import('@/views/notFound/index'));
const AppRouter = () => {
  const menuList = useSelector((state: RootState) => state.menuReducer.menu);
  console.log(menuList);
  return (
    <Suspense fallback={<div>加载中</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/layout" replace />} />
        <Route
          path="layout"
          element={
            <RequireAuth allowed redirectTo="/login">
              <Layout />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="login"
          element={
            <RequireAuth allowed={false} redirectTo="/layout">
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
