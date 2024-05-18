import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import MovieList from './components/client/movies/MovieList.jsx';
import MovieDetail from './components/client/movies/MovieDetail.jsx';
import NotFound from './components/layout/NotFound.jsx';
import Login from './components/client/auth/Login.jsx';
import Register from './components/client/auth/Register.jsx';
import Profile from './components/client/auth/Profile.jsx';
import { AdminRoutes, AdminHome } from './routes/AdminRoutes.jsx';
import { AuthProvider } from './services/AuthContext';
import ActorsDetails from './components/client/stars/ActorsDetails.jsx';
import ListCardMovies from './components/client/movies/ListCardMovies.jsx';

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
