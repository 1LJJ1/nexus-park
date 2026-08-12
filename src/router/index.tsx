import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';

const Home = lazy(() => import('@/views/home/index.tsx'));
const Login = lazy(() => import('@/views/login/index'));
const NoFound = lazy(() => import('@/views/notFound/index'));
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route index path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NoFound />} />
    </Routes>
  );
};

export default AppRouter;
