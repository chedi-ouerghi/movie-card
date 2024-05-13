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

const MovieCard = ({ movie }) => {
  const truncatedDescription = truncateText(movie.movie_description, 30);
  const truncatedActors = truncateActors(movie.actor_names ? movie.actor_names.split(',') : [], 25);

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <div className="movie-card">
      <div className="card-img">
        <img src="/image.jpg" alt={movie.movie_movie_title} className="blur-image" />
        <div className="card-overlay">
          <div className="card-title">{movie.movie_title}</div>
          <div className="card-director">
            <strong>Director:</strong> {movie.movie_director}
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
            value={movie.movie_rating}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
            edit={false}
            half={false}
            classNames="rs-stars"
          />
          {movie.movie_id && (
            <Link to={`/movie/${movie.movie_id}`}
              style={{ textDecoration: 'none', color: '#fff', background: '#007bff', padding: '8px 16px', borderRadius: '4px', marginTop: '8px', display: 'inline-block' }}>
              View movie
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
