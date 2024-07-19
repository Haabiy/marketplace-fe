import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './SideBar.jsx'; 
import LoginPage from './Auth/Login.jsx';
import ListSource from './AddList/ListSource.jsx';
import { AuthProvider } from './Auth/AuthWrapper.jsx';
import Sidebar from './SideBar.jsx';
import RegisterPage from './Auth/Register.jsx';
import DataLibrary from './Home/DataLibrary.jsx';
import DataLibraryTest from './WebSocket/Test/Test.jsx';
import Sample from './WebSocket/Test/Sample.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/list-source" element={<ListSource />} />
          <Route path="/data-lib" element={<DataLibrary />} />
          <Route path="/test" element={<DataLibraryTest />} />
          <Route path="/main" element={<Sidebar />} />
          <Route path="/sample" element={<Sample />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;