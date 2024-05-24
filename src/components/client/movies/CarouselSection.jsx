import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
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
=======
import { Carousel } from 'antd';
import './CarouselSection.css';

const CarouselSection = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5320/api/movies/')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.log(error));
  }, []);

  return (
      <Carousel arrows
          autoplay    autoplaySpeed={3000}
          infinite={false}    
          >
      {movies.map(movie => (
        <div key={movie.id} className='data-carousel' 
         >
          <div className="movie-card-carousel" 
          >
            <div className="card-img-carousel">
              <img src="/image.jpg" alt={movie.title} className="blur-image-carousel" />
              <div className="card-overlay-carousel">
                <div className="card-title">{movie.title}</div>
                <div className="card-rating">Rating: {movie.rating}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
  );
};

export default CarouselSection;
