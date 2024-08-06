import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ForgotPasswordPage, LoginPage, RegisterPage } from './public';

const AppPages = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppPages;
