import type { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
type Props = PropsWithChildren<any>;
export default function RequireAuth({ children }: Props) {
  const token = useSelector((state: RootState) => state.userReducer.token);
  const location = useLocation();
  console.log(location);
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
