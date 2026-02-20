import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import AppWrapper from './App.tsx';

import './index.css';
// import RedirectComponent from './redirect-component.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppWrapper />} />
        {/* Route for short URLs */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
