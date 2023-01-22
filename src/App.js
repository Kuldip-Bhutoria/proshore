import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NoMatch } from './components/notFound';
import Detail from './pages/Detail';
import Home from './pages/Home';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Detail />} path="/detail/:theid" />
        <Route element={<h1>Not found!</h1>} />
        <Route element={<NoMatch />} path='*' />
      </Routes>
    </Router>
  );
}

