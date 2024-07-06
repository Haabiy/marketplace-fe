import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './SideBar.jsx'; 
import LoginPage from './Auth/Login.jsx';
import ListSource from './AddList/ListSource.jsx';
import { AuthProvider } from './Auth/AuthWrapper.jsx';
import Sidebar from './SideBar.jsx';

function App() {
  return (
    <AuthProvider>
    <Router>
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/list-source" element={<ListSource />} /> {/* Route for ListSource */}
        <Route path="/sidebar" element={<Sidebar />} /> {/* Route for ListSource */}
    </Routes>
</Router>
</AuthProvider>
  );
}

export default App;
