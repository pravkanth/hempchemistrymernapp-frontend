import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react';

import HomePage from './components/homepage/HomePage';
import Nav from './components/nav/Nav';
import Register from './components/user/Register'
import Login from './components/user/Login'

function App() {
  const [edit,setEdit] = useState(false)
  return (
    <>
      <Router key="router">
        <div className="container">
          <Nav/>
          <Routes>
            <Route path='/' element={<HomePage setEdit={setEdit}/>} key="homepage"/>
            <Route path='/register' element={<Register edit={edit} setEdit={setEdit}/>} key="register"/>
            <Route path='/login' element={<Login/>} key="login"/>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>

  );
}

export default App;
