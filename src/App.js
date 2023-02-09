/** @format */

import React from 'react';
import { NavBar } from './components';
import { Routes, Route } from 'react-router-dom';
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
  NotFound,
} from './pages';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/kapoen" element={<Kapoenen />} />
        <Route path="/wouter" element={<Wouters />} />
        <Route path="/jonggiver" element={<Jonggivers />} />
        <Route path="/giver" element={<Givers />} />
        <Route path="/jin" element={<Jins />} />
        <Route path="/add" element={<Add />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
