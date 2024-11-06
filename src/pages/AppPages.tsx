import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ProtectedRoute } from '@/components';
import { useAppSelector } from '@/core/store';
import {
  LoginPage,
  PricingPage,
  RegisterPage,
  ResetPasswordPage,
  ForgotPasswordPage,
  LoginSuccessfulPage,
  FigmaSuccessfulPage,
  CollectUserInformationPage
} from './public';

const AppPages = (): JSX.Element => {
  const isLoggedIn = useAppSelector((state) => state.auth.loggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register-step-1" element={<CollectUserInformationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/successful" element={<LoginSuccessfulPage />} />
        <Route path="/figma-successful" element={<FigmaSuccessfulPage />} />

        <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
          <Route path="/pricing" element={<PricingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppPages;
