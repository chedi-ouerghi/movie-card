import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const MovieCard = ({ movie }) => {
  const truncatedDescription = truncateText(movie.description, 50);

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const isValidLink = movie.id ? true : false;

  return (
    <div className="movie-card">
      <div className="card-img">
        <img src={movie.image} alt={movie.title}
          className="blur-image"
        />
        <div className="card-overlay">
          <div className="card-title">{movie.title}</div>
          <div className="card-director">
            <strong>Director:</strong> {movie.director}
          </div>
  <div className="card-Acteurs">
            <strong>Acteurs:</strong> {movie.stars.join(', ')}
          </div>
          <div className="card-text"><strong>Description</strong> :{truncatedDescription}</div>
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
          {isValidLink && (
            <Link to={`/movie/${movie.id}`} className="view_movie">
              View movie
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};


export default MovieCard;
