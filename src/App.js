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
import { AdminRoutes, AdminHome } from './AdminRoutes';
import { AuthProvider } from './services/AuthContext';
import ActorsDetails from './components/client/ActorsDetails';
import ListCardMovies from './components/client/ListCardMovies.jsx';

function App() {
  const [token, setToken] = useState(''); 
  return (
    <AuthProvider>
      <Router>
        <Navbar  />
        <div style={{background:"#e5e5e5"}}>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movies" element={<ListCardMovies />} />
      
            <Route path="/admin/*" element={<AdminRoutes />} />
            
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/stars/:id" element={<ActorsDetails />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile token={token} />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
          </div>
        {/* <Footer /> */}
      </Router>
    </AuthProvider>
  );
}

export default App;
