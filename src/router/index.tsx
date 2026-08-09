import { Routes, Route } from 'react-router-dom';

import Login from '../views/login';
import Home from '../views/home';
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default AppRouter;
