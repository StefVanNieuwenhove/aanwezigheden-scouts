/** @format */

import React from 'react';
import { NavBar, PrivateRoute } from './components';
import { Routes, Route } from 'react-router-dom';
import { AuthContextprovider } from './context/UserContext';
import {
  Add,
  Home,
  Kapoenen,
  Wouters,
  Jonggivers,
  Givers,
  Jins,
  Delete,
  Login,
} from './pages';

function App() {
  return (
    <div className="App">
      <AuthContextprovider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NavBar />} />
        </Routes>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/kapoen"
            element={
              <PrivateRoute>
                <Kapoenen />
              </PrivateRoute>
            }
          />
          <Route
            path="/wouter"
            element={
              <PrivateRoute>
                <Wouters />
              </PrivateRoute>
            }
          />
          <Route
            path="/jonggiver"
            element={
              <PrivateRoute>
                <Jonggivers />
              </PrivateRoute>
            }
          />
          <Route
            path="/giver"
            element={
              <PrivateRoute>
                <Givers />
              </PrivateRoute>
            }
          />
          <Route
            path="/jin"
            element={
              <PrivateRoute>
                <Jins />
              </PrivateRoute>
            }
          />
          <Route
            path="/add"
            element={
              <PrivateRoute>
                <Add />
              </PrivateRoute>
            }
          />
          <Route
            path="/delete"
            element={
              <PrivateRoute>
                <Delete />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthContextprovider>
    </div>
  );
}

export default App;
