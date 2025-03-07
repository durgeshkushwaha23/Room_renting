import React, { useEffect } from 'react';
import axios from '../axios/axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post('/auth/logout');
        localStorage.removeItem('token');
        navigate('/login');
      } catch (err) {
        console.error(err.response.data);
      }
    };

    logout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;