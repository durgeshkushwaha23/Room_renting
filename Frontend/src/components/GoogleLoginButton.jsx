import React from 'react';
import dotenv from 'dotenv';
dotenv.config();
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const googleId = import.meta.env.VITE_FIREBASE_GOOGLE_CLIENT_ID;

const GoogleLoginButton = () => {
  const handleSuccess = (response) => {
    console.log(response);
    // Handle the response from Google
    // You can send the token to your backend for further processing
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <GoogleOAuthProvider clientId={googleId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        redirectUri="http://localhost:5173/auth/google/callback" // Frontend callback URL
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;