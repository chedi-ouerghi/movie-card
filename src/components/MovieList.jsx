import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ searchTerm, searchRate, movies, error }) => {
    const totalMovies = movies.length;

  return (
    <div className="movie-list">
      {error && <div className="error">{error}</div>}
            <span>Movies: {totalMovies}</span>
      {movies
        .filter((movie) => 
          movie.title.toUpperCase().includes(searchTerm.toUpperCase().trim()) &&
          movie.rating >= searchRate
        )
        .map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
          
        ))}
    </div>
  );
};

export default MovieList;
