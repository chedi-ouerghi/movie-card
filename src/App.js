  import React, { useState, useEffect } from 'react';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import './App.css';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import Navbar from './components/Navbar';
  import MovieList from './components/MovieList';
  import MovieDetail from './components/MovieDetail';
  import NotFound from './components/NotFound';
  import Footer from './components/Footer';
  import Login from './components/Login';
  import Register from './components/Register';
  import Profile from './components/Profile';
  import axios from 'axios';
  import ListMoviesAdmin from './components/admin/ListMoviesAdmin';
  import PostAdmin from './components/admin/PostAdmin';

  function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchRate, setSearchRate] = useState(1);
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [token, setToken] = useState('');

    const handleSearch = (term) => {
      setSearchTerm(term);
    };

    const handleRatingFilter = (newRating) => {
      setSearchRate(newRating);
    };

    useEffect(() => {
      const fetchMovies = async () => {
        try {
          const response = await axios.get('http://localhost:5320/api/movies/getAll-Movie', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          setMovies(response.data);
        } catch (err) {
          console.error('Error fetching movies:', err);
          setError('Error fetching movies');
        } finally {
          setIsLoading(false);
        }
      };

      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }

      fetchMovies();
    }, []);

    useEffect(() => {
      const filtered = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        movie.rating >= searchRate
      );

      setFilteredMovies(filtered);
    }, [movies, searchTerm, searchRate]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <Router>
          <Navbar handleSearch={handleSearch} handleRatingFilter={handleRatingFilter} />
          <div className="App">
            {filteredMovies.length === 0 && searchTerm && <NotFound />}
            <Routes>
              <Route path="/" element={<MovieList movies={filteredMovies} searchTerm={searchTerm} searchRate={searchRate} error={error} />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile token={token} />} />
              <Route path="/admin/list-movies" element={<ListMoviesAdmin token={token} />} /> 
              <Route path="/admin/post-movie" element={<PostAdmin token={token} />} /> 
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </>
    );
  }

  export default App;
