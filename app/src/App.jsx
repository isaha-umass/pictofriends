//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './components/registration/Registration';
import Canvas from './components/canvas/Canvas';
import Feed from './components/feed/Feed';
import Join from './components/join/Join';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/canvas" element={<Canvas/>} />
        <Route path="/feed" element={<Feed/>} />
        <Route path="/join" element={<Join/>} />
      </Routes>
    </BrowserRouter>
  )
}
export default App

