import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
  LoginPage,
  RegisterPage,
  NotFoundPage,
  InternalServerErrorPage,
  RequestResetPasswordPage,
  ResetPasswordPage
} from './public';

const AppPages = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<RequestResetPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/500" element={<InternalServerErrorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppPages;
