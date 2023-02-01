/** @format */

import { NavBar } from './components';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kapoenen" element={<Home />} />
        <Route path="/wouters" element={<Home />} />
        <Route path="/jonggivers" element={<Home />} />
        <Route path="/givers" element={<Home />} />
        <Route path="/jins" element={<Home />} />
        <Route path="/add" element={<Home />} />
        <Route path="/delete" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
