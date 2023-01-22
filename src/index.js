import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Detail from './pages/Detail';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Detail />} path="/detail/:theid" />
                <Route element={<h1>Not found!</h1>} />
            </Routes>
        </BrowserRouter>
    );
}
ReactDOM.render(<App />, document.getElementById('root'));