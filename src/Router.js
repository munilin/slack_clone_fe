// page
import { Chat, Login, Signup, NotFound } from './pages/index';

// token
import { getToken } from './shared/token';

// router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// react
import React from 'react';

const Router = () => {
  const isToken = getToken() ? true : false;
  console.log('isToken?', isToken);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/chat' element={<Chat />} />
        <Route path='/chat/:id' element={<Chat />} />
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
