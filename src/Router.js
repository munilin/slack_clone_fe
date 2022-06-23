// page
import { Chat, Login, Signup, NotFound, Chatting } from './pages/index';

// router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// react
import React from 'react';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/chat/:id' element={<Chat />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
