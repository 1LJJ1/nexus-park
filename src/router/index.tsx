import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import RequireAuth from '@/components/RequireAuth';
const Home = lazy(() => import('@/views/home/index.tsx'));
const Login = lazy(() => import('@/views/login/index'));
const NoFound = lazy(() => import('@/views/notFound/index'));
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route
        index
        path="/home"
        element={
          <RequireAuth allowed redirectTo="/login">
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/login"
        element={
          <RequireAuth allowed={false} redirectTo="/home">
            <Login />
          </RequireAuth>
        }
      />
      <Route path="*" element={<NoFound />} />
    </Routes>
  );
};

export default AppRouter;
