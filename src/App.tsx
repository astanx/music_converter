import React from 'react';
import Header from './components/Header.tsx';
import { Route, Routes } from 'react-router-dom';
import MusicConverter from './components/MusicConverter.tsx';
import History from './components/History.tsx';


function App() {
  return (
    <div>
    <Header />
    <Routes>
      <Route path='/' element={<MusicConverter />}/>
      <Route path='/history' element={<History />}/>
    </Routes>
    </div>
  );
}

export default App;
