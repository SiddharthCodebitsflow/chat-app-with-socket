import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import Register from './features/admin/Register';
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from './features/admin/Login';
import Home from './pages/Home';
import Header from './features/Header/Header';
import PrivateRoute from './routes/PrivateRoute';
import Profile from './pages/Profile';
import PublicRoute from './routes/PublicRoute';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userDetail, token } from './features/admin/adminSlice';
import UserContext from './Context/UserContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setUserDeatailState = useCallback((response) => {
    dispatch(userDetail(response.data));
    dispatch(token(JSON.parse(localStorage.getItem('login')).token));
  }, [isAuthenticated]);
  const logOut = () => {
    localStorage.removeItem('login');
    user();
  }

  const user = async () => {
    try {
      const login = localStorage.getItem('login');
      const token = login ? JSON.parse(login).token : null;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}user`, config);
      setIsAuthenticated(response.data.login);
      if (response.data.login) {
        setUserDeatailState(response);
        navigate('/home');
      } else {
        localStorage.removeItem('login');
        dispatch(userDetail({}));
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
      localStorage.removeItem('login');
      dispatch(userDetail({}));
      navigate('/login');
    }
  };

  useEffect(() => {
    user();
  }, [isAuthenticated]);

  return (
    <div className='container'>
      <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        {isAuthenticated && <Header isAuthenticated={isAuthenticated} logOut={logOut} />}
        <Routes>
          <Route path="/" element={<PublicRoute isAuthenticated={isAuthenticated} children={<Register />} />} />
          <Route path="/login" element={<PublicRoute isAuthenticated={isAuthenticated} children={<Login />} />} />
          <Route path="/home" element={<PrivateRoute isAuthenticated={isAuthenticated} children={<Home />} />} />
          <Route path="/profile" element={<PrivateRoute isAuthenticated={isAuthenticated} children={<Profile />} />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
