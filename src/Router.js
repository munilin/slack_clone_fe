// page
import { Chat, Login, Signup, NotFound } from './pages/index';
// import Auth from './shared/auth';
// token
import { getStorage } from './shared/localStorage';

// router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// react
import React from 'react';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/chat' element={<Chat />} />
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
