import { Routes, Route } from "react-router-dom";
import { Givers, Home, Jins, Jonggivers, Kapoenen, Wouters, Add, Delete, NotFound } from "./pages";
import { NavBar } from "./components";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/kapoenen' element={<Kapoenen />} />
        <Route path='/wouters' element={<Wouters />} />
        <Route path='/jonggivers' element={<Jonggivers />} />
        <Route path='/givers' element={<Givers />} />
        <Route path='/jins' element={<Jins />} />
        <Route path='/add' element={<Add />} />
        <Route path='/delete' element={<Delete />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
