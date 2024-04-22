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
  console.log(`Link is ${isValidLink ? 'valid' : 'invalid'}`);

  return (
    <div className="movie-card">
      <div className="card-img-top">
        <img src={movie.image} alt={movie.title} />
      </div>
      <div className="card-body">
        <div className="card-title">{movie.title}</div>
        <div className="card-text">{truncatedDescription}</div>
        <div className="card-director">
          <strong>Director:</strong> {movie.director}
        </div>
        <div className="card-stars">
          <strong>Stars:</strong> {movie.stars.join(', ')}
        </div>
        <div className="card-footer">
          <ReactStars
            count={5}
            value={movie.rating} // Set value to movie's rating
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700" // Yellow color for active stars
            edit={false}
            half={false}
            classNames="rs-stars"
          />

          {isValidLink && (
            <Link to={`/movie/${movie.id}`} className='view_movie'>
              view movie
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
