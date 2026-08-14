import type { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type Props = PropsWithChildren<any>;
export default function RequireAuth({ children }: Props) {
  const token = localStorage.getItem('nexus-token');
  const location = useLocation();
  console.log(location);
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
