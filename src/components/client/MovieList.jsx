import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import movieService from '../../services/movieService';
import ReactStars from 'react-rating-stars-component';
import TopRatedMovies from './TopRatedMovies';
import CarouselSection from './CarouselSection';
import BestStars from './BestStars';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchRate, setSearchRate] = useState(1);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [overlayPosition, setOverlayPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await movieService.getAllMovies();
        setMovies(movies);
        setIsLoading(false);
      } catch (error) {
        setError('Error fetching movies');
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const filtered = movies.filter(movie => 
      movie.movie_title && movie.movie_title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      movie.movie_rating >= searchRate
    );
    setFilteredMovies(filtered);
  }, [movies, searchTerm, searchRate]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const ratingChanged = (newRating) => {
    setSearchRate(newRating);
  };

  const handleMouseMove = (e) => {
    setOverlayPosition({ x: e.pageX, y: e.pageY });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-list" onMouseMove={handleMouseMove}>
      {error && <div className="error">{error}</div>}
      <CarouselSection/>
      <div className="group-input-rating">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
          classNames="rs-stars"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 className="filtered-movies-title">Filtered Movies</h2>
      <div className='list_cards'>
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.movie_id} movie={movie} overlayPosition={overlayPosition} />
        ))}
      </div>
   </div>   
      <div className='list_toRated_movies'>
        <h2 className="top-rated-movies-title">Top Rated Movies</h2>
        <TopRatedMovies />
      </div>

      <div className='list_Acteurs_movies'>
        <h2 className="actors-movies-title">Actors in Movies</h2>
      </div>

      <div className='BestStars'>
      <BestStars/>
      </div>
    </div>
  );
};

export default MovieList;
