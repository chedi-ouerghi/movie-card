import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import NotFound from './components/NotFound';
import Footer from './components/Footer'; // Importez le composant Footer
import moviesData from './data/moviesData';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchRate, setSearchRate] = useState(1);
  const [movies, setMovies] = useState(moviesData);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filteredMovies = moviesData.filter((movie) =>
      movie.title.toLowerCase().includes(term.toLowerCase())
    );
    setMovies(filteredMovies);
  };

  const handleRatingFilter = (newRating) => {
    setSearchRate(newRating);
    const filteredMovies = moviesData.filter((movie) => {
      const titleMatch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const ratingMatch = movie.rating >= newRating;
      return titleMatch && ratingMatch;
    });
    setMovies(filteredMovies);
  };

  return (
    <Router>
      <div className="App">
        <Navbar handleSearch={handleSearch} handleRatingFilter={handleRatingFilter} />
        {movies.length === 0 &&
          <div className='pageNotfound'>
            <NotFound message="Aucun film trouvé." />
          </div>
        }
        <Routes>
          <Route path="/" element={<MovieList movies={movies} searchTerm={searchTerm} searchRate={searchRate} />} />
          <Route path="/movie/:id" element={<MovieDetail movies={movies} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
