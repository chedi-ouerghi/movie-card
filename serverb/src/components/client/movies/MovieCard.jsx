import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const truncateActors = (actors, maxLength) => {
  const truncatedActors = actors.join(', ');
  if (truncatedActors.length <= maxLength) return truncatedActors;
  return truncatedActors.slice(0, maxLength) + "...";
};

const MovieCard = ({ movie, overlayPosition }) => {
  const truncatedDescription = truncateText(movie.description, 30);
  const truncatedActors = truncateActors(movie.stars_names ? movie.stars_names.split(',') : [], 25);

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };


  return (
    <div className="movie-card_component">
      <div className="card-img">
        <img src={`http://localhost:5320/uploads/movies/${movie.image}`}  alt={movie.title} className="blur-image" />
        <div className="card-overlay">
          <div className="card-title">{movie.title}</div>
          <div className="card-director">
            <strong>Director:</strong> {movie.director}
          </div>
          <div className="card-Acteurs">
            <strong>Acteurs:</strong> {truncatedActors}
          </div>
          <div className="card-text">
            <strong>Description:</strong>
            <p>{truncatedDescription}</p>
          </div>
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
          {movie.id && (
            <Link to={`/movie/${movie.id}`}
              style={{ textDecoration: 'none', color: '#FFD600', background: '#0D47A1', padding: '8px 16px', borderRadius: '25px', marginTop: '8px', display: 'inline-block' }}>
              View movie
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
