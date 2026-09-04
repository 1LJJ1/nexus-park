import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </Provider>
    </ConfigProvider>
  </BrowserRouter>
);
