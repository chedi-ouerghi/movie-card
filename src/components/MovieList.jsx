import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, searchTerm, searchRate }) => {
  return (
    <div className="movie-list">
      <div className="lines">
        <div className="line">
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
        <div className="line">
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
        <div className="line">
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      </div>
      {movies.filter((movie) => 
        movie.title.toUpperCase().includes(searchTerm.toUpperCase().trim()) &&
        movie.rating >= searchRate
      ).map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
