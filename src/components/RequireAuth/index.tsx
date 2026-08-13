import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

type Props = PropsWithChildren<any>;
export default function RequireAuth({ children }: Props) {
  const token = localStorage.getItem('nexus-token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
