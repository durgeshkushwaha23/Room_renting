import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../axios/axios';

const GoogleCallback = () => {
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        if (token) {
          // Send the token to the backend for verification
          const res = await axios.post('/auth/google/callback', { token });
          console.log(res.data);
          // Store the token in local storage or state
          localStorage.setItem('token', res.data.token);
        }
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchData();
  }, [location]);

  return <div>Loading...</div>;
};

export default GoogleCallback;