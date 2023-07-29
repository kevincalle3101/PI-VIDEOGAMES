import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';  //here i import all of i'll need
import { useState, useEffect } from 'react';
import { Landing } from './components/Landing/Landing';
import { Home } from './components/Home/Home';
import { Detail } from './components/Detail/Detail';
import { Create } from './components/Create/Create';
import {Nav} from './components/Nav/Nav';

function App() {
  const location = useLocation();     //this is for the navBar

  return (
    <div className="App">
      {location.pathname !== "/" && <Nav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
