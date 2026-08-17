import { useEffect, type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
type Props = PropsWithChildren<{
  allowed: boolean;
  redirectTo: string;
}>;
export default function RequireAuth({ children, allowed, redirectTo }: Props) {
  const token = useSelector((state: RootState) => state.userReducer.token);
  const navigate = useNavigate();
  const isLogin = token ? true : false;
  useEffect(() => {
    // 需要校验是否登录，但是校验不通过
    if (allowed !== isLogin) {
      navigate(redirectTo);
    }
  }, [allowed, isLogin, redirectTo, navigate]);

  return allowed === isLogin ? children : null;
}
