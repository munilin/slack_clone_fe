import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";

import { Chat, Login, Home, Signup } from "./pages/index";

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/chat" element={<Chat/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
