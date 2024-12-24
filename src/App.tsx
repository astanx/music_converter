import React from "react";
import Header from "./components/Header.tsx";
import { Navigate, Route, Routes } from "react-router-dom";
import MusicConverter from "./components/MusicConverter.tsx";
import History from "./components/History.tsx";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="*" element={<Navigate to="/music_converter" />} />
        <Route path="/" element={<Navigate to="/music_converter" />} />
        <Route path="/music_converter" element={<MusicConverter />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
    </div>
  );
}

export default App;
