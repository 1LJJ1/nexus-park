import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import AppRouter from './router';
import { store } from '@/store/index';
import 'modern-normalize/modern-normalize.css';
import '@/assets/styles/base.css';
import zhCN from 'antd/locale/zh_CN';
// import en_GB from 'antd/locale/en_GB';
// for date-picker i18n
import 'dayjs/locale/zh-cn';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ConfigProvider>
  </BrowserRouter>
);
