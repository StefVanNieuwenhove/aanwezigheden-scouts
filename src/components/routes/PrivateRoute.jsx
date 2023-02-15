/** @format */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../../context/UserContext';

const PrivateRoute = ({ children }) => {
  const { user } = UserAuth();

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
