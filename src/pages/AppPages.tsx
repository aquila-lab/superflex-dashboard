import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { LoginPage } from './public';

const AppPages = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppPages;
