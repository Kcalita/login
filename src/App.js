import React from "react";
// import logo from "./logo.svg";
// import { Counter } from './features/counter/Counter';
import LoginFormik from "./Pages/Login";
import Home from "./Pages/Home";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginFormik />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
