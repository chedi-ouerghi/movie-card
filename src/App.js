import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import MovieList from './components/client/MovieList';
import MovieDetail from './components/client/MovieDetail';
import NotFound from './components/client/NotFound';
import Footer from './components/layout/Footer';
import Login from './components/client/Login';
import Register from './components/client/Register';
import Profile from './components/client/Profile';
import AdminRoutes from './AdminRoutes'; 
import { AuthProvider } from './services/AuthContext';

function App() {
  const [token, setToken] = useState(''); 
  return (
    <AuthProvider>
      <Router>
        <Navbar  />
        {/* <div className="App"> */}
          <Routes>
            <Route path="/" element={<MovieList />} />
      
            <Route path="/admin/*" element={<AdminRoutes />} />
            
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile token={token} />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
