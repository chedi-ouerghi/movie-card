import React, { useState, useEffect } from 'react';
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
  );
};

export default CarouselSection;
