import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import AppRouter from './router';
import { store } from '@/store/index';
import 'modern-normalize/modern-normalize.css';
import '@/assets/styles/base.css';
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </BrowserRouter>
);
