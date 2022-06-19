// page
import { Chat, Login, Home, Signup, NotFound } from './pages/index';

// token
import { getToken } from './shared/token';

// router
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

// react
import React, { useEffect } from 'react';

const Router = () => {
  const isToken = getToken() ? true : false;
  console.log('isToken?', isToken);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
