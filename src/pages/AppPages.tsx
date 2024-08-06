import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { LoginPage } from './public';

const AppPages = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppPages;
