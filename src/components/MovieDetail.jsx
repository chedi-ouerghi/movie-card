import React from 'react';
import { useParams } from 'react-router-dom';
import moviesData from '../data/moviesData';
import ReactStars from 'react-rating-stars-component'; // Importing ReactStars
import './movieDetails.css'

const MovieDetail = () => {
  const { id } = useParams();

  // Convert id to number
  const movieId = parseInt(id, 10);

  console.log("MovieDetail ID:", movieId); // Logging the id

  // Check if id is undefined or not a number
  if (!movieId || isNaN(movieId)) {
    return <div>Invalid movie ID</div>;
  }

  const movie = moviesData.find((movie) => movie.id === movieId);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const ratingChanged = (newRating) => {
    console.log(newRating); // You can handle rating changes here if needed
  };

  return (
  <div className="movie_card" id="tomb">
    <div className="info_section">
      <div className="movie_header">
        <img className="locandina" src={movie.image} alt={movie.title} />
        <h1>{movie.title}</h1>
        <h4>{movie.director}</h4>
        <h5>{movie.stars.join(', ')}</h5>
        
      </div>
      <div className="movie_desc">
        <p className="text">{movie.description}</p>
        <ReactStars
          count={5}
          value={movie.rating}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
          edit={false}
          half={false}
          classNames="rs-stars"
          />
           <a href={movie.trailer} target="_blank" rel="noopener noreferrer" className="trailer_link">
          Watch Trailer
        </a>
        </div>
       
    </div>
      <div className="blur_back" style={{ backgroundImage: `url(${movie.image})` }}/>
      </div>
);

};

export default MovieDetail;
