import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Window.jsx'; 
import LoginPage from './Login.jsx';
import ListSource from './ListSource.jsx';


function App() {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/list-source" element={<ListSource />} /> {/* Route for ListSource */}
    </Routes>
</Router>
  );
}







//////To create for xxl screen


export default App;
