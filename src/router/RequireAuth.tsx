import { useEffect, type PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store';
import { setMenu, setMenuLoading } from '@/store/module/menu.slice';
import { getMenuAPI } from '@/api/login/login.api';
type Props = PropsWithChildren<any>;
export default function RequireAuth({ children }: Props) {
  const token = useSelector((state: RootState) => state.userReducer.token);
  const menuList = useSelector((state: RootState) => state.menuReducer.menu);
  const loading = useSelector((state: RootState) => state.menuReducer.loading);
  const location = useLocation();
  const dispatch = useDispatch();
  const isLogin = token ? true : false;
  useEffect(() => {
    if (isLogin && menuList.length === 0 && loading === false) {
      getMenuAPI()
        .then((res) => {
          dispatch(setMenu(res.data));
        })
        .catch((err) => console.error(err, '菜单加载失败'))
        .finally(() => dispatch(setMenuLoading(false)));
    } else {
      dispatch(setMenuLoading(false));
    }
  }, [isLogin, menuList.length, dispatch, loading]);
  if (location.pathname !== '/login' && !isLogin) {
    return <Navigate to="/login" replace />;
  }
  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }
  if (loading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        菜单加载中，请稍候...
      </div>
    );
  }

  return <>{children}</>;
}
