import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  LoginSuccessfulPage,
  FigmaSuccessfulPage
} from './public';

const AppPages = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/successful" element={<LoginSuccessfulPage />} />
        <Route path="/figma-successful" element={<FigmaSuccessfulPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppPages;
