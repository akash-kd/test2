import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import axios from 'axios';
import Signup from './components/signup';
import Login from './components/login'
import User from './components/user';
import React from "react";
import { UserCtx } from './context/userCtx';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  const [user,setUser] = useState({})

  return (
    <UserCtx.Provider value={{"user":user,"setUser":setUser}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login/>} />
          <Route path='/user' element={<User />} />
        </Routes>
      </BrowserRouter>
    </UserCtx.Provider>

  );
}

export default App;
