import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './pages/Login';
import './App.css';
import ProductPage from './pages/ProductPage';
import Home from './pages/Home';
import { messaging, onMessage, getToken } from './firebase'
const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.authReducer);
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const { userData } = useSelector((state) => state.authReducer);
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          getMessagingToken();
        } else {
          console.log('Unable to get permission to notify.');
        }
      } catch (error) {
        console.error('An error occurred while requesting permission:', error);
      }
    };

    const getMessagingToken = async () => {
      try {
        const currentToken = await getToken(messaging, { vapidKey: "BEc91nz4SpkgoOq270x5ocgJIDGZHxPwI-2j0ixvhmZoO_hJOCSKFpONmP5ZIC8FBR_05JSU36m8JBNIDcutbjs" });
        if (currentToken) {
          console.log('Current token:', currentToken);
          await sendTokenToServer(currentToken);
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      } catch (error) {
        console.log('An error occurred while retrieving token. ', error);
      }
    };

    requestPermission();

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // Customize notification here
    });
  }, []);

  const sendTokenToServer = async (token) => {
    try {
      await fetch('http://localhost:3000/chat/store-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId:userData.user_id, token }),
      });
    } catch (error) {
      console.error('Error sending token to server:', error);
    }
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute><ProductPage /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<PrivateRoute><Home /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
