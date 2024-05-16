import React, { useState, useEffect } from 'react';
import movieService from '../../services/movieService';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import './ListCardMovies.css';

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const truncateActors = (actors, maxLength) => {
  const truncatedActors = actors.join(', ');
  if (truncatedActors.length <= maxLength) return truncatedActors;
  return truncatedActors.slice(0, maxLength) + "...";
};

const ListCardMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchRate, setSearchRate] = useState(1);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [overlayPosition, setOverlayPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await movieService.getAllMovies();
        setMovies(movies);
        setIsLoading(false);
      } catch (error) {
        setError('Error fetching movies');
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const filtered = movies.filter(
      (movie) =>
        movie.title &&
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        movie.rating >= searchRate
    );
    setFilteredMovies(filtered);
  }, [movies, searchTerm, searchRate]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const ratingChanged = (newRating) => {
    setSearchRate(newRating);
  };

  const handleMouseMove = (e) => {
    setOverlayPosition({ x: e.pageX, y: e.pageY });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="list_div_movies" onMouseMove={handleMouseMove}>
      <div className="group-input-rating_list_cards">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
          className="rs-stars"
        />
      </div>

      {/* <div style={{ display: 'flex', flexDirection: 'column' }}> */}
        <div className="list_cards_movies">
          {filteredMovies.map((movie) => (
            <div className="movie-card_movies" key={movie.id}>
              <div className="card-img_movies">
        <img src="/image.jpg" alt={movie.title} className="blur-image_movies" />
                <div className="card-overlay_movies">
                  <div className="card-title_movies">{movie.title}</div>
                  <div className="card-director_movies">
                    <strong>Director:</strong> {movie.director}
                  </div>
                  <div className="card-Acteurs_movies">
                    <strong>Acteurs:</strong> {truncateActors(movie.stars_names ? movie.stars_names.split(',') : [], 25)}
                  </div>
                  <div className="card-text_movies">
                    <strong>Description:</strong>
                    <p>{truncateText(movie.description, 30)}</p>
                  </div>
                  <ReactStars
                    count={5}
                    value={movie.rating}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                    edit={false}
                    half={false}
                    className="rs-stars"
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
          ))}
        </div>
      {/* </div> */}
    </div>
  );
};

export default ListCardMovies;
