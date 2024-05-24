import React, { useState, useEffect } from 'react';
import './CarouselSection.css';

const baseApiUrl = 'http://localhost:5320';

const CarouselSection = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${baseApiUrl}/api/movies/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        return response.json();
      })
      .then(data => setMovies(data))
      .catch(error => setError(error.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <div className="gallery">
        {movies.map(movie => (
          <label key={movie.id} className="panel-container">
            <div className="panel">
              <input className="panel-control" type="radio" name="panel-control" />
              <img className="panel-img" src={`${baseApiUrl}/uploads/movies/${movie.image}`} alt={movie.title} />
              {/* <div className="panel-id">{movie.id}</div> */}
              <div className="panel-content">
                <div className="head">{movie.title}</div>
                <div className="subhead"></div>
                <div className="spacer" />
                <div className="body">
                  <div className="range">
                    <div className="title">Rating:</div>
                    <div className="value">{movie.rating}</div>
                  </div>
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CarouselSection;
