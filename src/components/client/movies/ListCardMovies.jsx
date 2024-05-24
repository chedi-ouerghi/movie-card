import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import { Dropdown, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
=======
import movieService from '../../../services/movieService';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
import './ListCardMovies.css';

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

<<<<<<< HEAD
const baseApiUrl = 'http://localhost:5320';
=======
const truncateActors = (actors, maxLength) => {
  const truncatedActors = actors.join(', ');
  if (truncatedActors.length <= maxLength) return truncatedActors;
  return truncatedActors.slice(0, maxLength) + "...";
};
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8

const ListCardMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchRate, setSearchRate] = useState(1);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [overlayPosition, setOverlayPosition] = useState({ x: 0, y: 0 });
<<<<<<< HEAD
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [resetKey, setResetKey] = useState(0);
=======
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8

  useEffect(() => {
    const fetchMovies = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get(`${baseApiUrl}/api/movies`);
        setMovies(response.data);
        setIsLoading(false);
        console.log('Movies fetched:', response.data);
      } catch (error) {
        setError('Error fetching movies');
        setIsLoading(false);
        console.error('Error fetching movies:', error);
=======
        const movies = await movieService.getAllMovies();
        setMovies(movies);
        setIsLoading(false);
      } catch (error) {
        setError('Error fetching movies');
        setIsLoading(false);
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
<<<<<<< HEAD
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${baseApiUrl}/filtre/movies/genres`);
        setGenres(response.data.map((genre) => genre.genre));
        console.log('Genres fetched:', response.data);
      } catch (err) {
        console.error('Error fetching genres:', err);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const filtered = movies.filter(
      (movie) =>
        (!selectedGenre || movie.genre === selectedGenre) &&
=======
    const filtered = movies.filter(
      (movie) =>
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
        movie.title &&
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        movie.rating >= searchRate
    );
    setFilteredMovies(filtered);
<<<<<<< HEAD
  }, [movies, searchTerm, searchRate, selectedGenre]);
=======
  }, [movies, searchTerm, searchRate]);
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const ratingChanged = (newRating) => {
    setSearchRate(newRating);
  };

<<<<<<< HEAD
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

=======
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
  const handleMouseMove = (e) => {
    setOverlayPosition({ x: e.pageX, y: e.pageY });
  };

<<<<<<< HEAD
  const handleResetFilters = () => {
    setSelectedGenre('');
    setSearchTerm('');
    setSearchRate(1);
    setResetKey((prevKey) => prevKey + 1);
  };

  const displayedGenres = genres.slice(0, 4);
  const additionalGenres = genres.slice(4);

  const menu = (
    <Menu>
      {additionalGenres.map((genre, index) => (
        <Menu.Item key={index} onClick={() => handleGenreClick(genre)}>
          {genre}
        </Menu.Item>
      ))}
    </Menu>
  );

  const handleImageLoad = (image, title) => {
    console.log(`Image loaded: ${image}, Title: ${title}`);
  };

=======
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="list_div_movies" onMouseMove={handleMouseMove}>
<<<<<<< HEAD
      <div className="group-input-rating">
=======
      <div className="group-input-rating_list_cards">
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
<<<<<<< HEAD
        <div className='groupe_filtre_button'>
          {displayedGenres.map((genre, index) => (
            <div key={index} className='genre_div_style' onClick={() => handleGenreClick(genre)}>
              {genre}
            </div>
          ))}
          {additionalGenres.length > 0 && (
            <Dropdown overlay={menu} trigger={['click']} className='genre_div_style'>
              <a onClick={(e) => e.preventDefault()} style={{ color: 'rgb(255 162 0)' }}>
                <Space>
                  More
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          )}
        </div>
        <ReactStars
          key={resetKey}
=======
        <ReactStars
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
<<<<<<< HEAD
          classNames="rs-stars"
        />
        <div className='genre_div_style' style={{ color: 'rgb(255 162 0)' }} onClick={handleResetFilters}>
          Reset Filters
        </div>
      </div>
      <div className="list_cards_movies">
        {filteredMovies.map((movie) => (
          <div className="movie-card_movies" key={movie.id}>
            <div className="card-img_movies">
              {movie.image && (
                <img
                  src={`${baseApiUrl}/uploads/movies/${movie.image}`}
                  alt={movie.title}
                  className="blur-image_movies"
                  onLoad={() => handleImageLoad(movie.image, movie.title)}
                />
              )}
              <div className="card-overlay_movies">
                <div className="card-title_movies">{movie.title}</div>
                <div className="card-director_movies">
                  <strong>Director:</strong> {movie.director}
                </div>
                <div className="card-text_movies">
                  <p style={{ color: '#fff' }}><b>Origin:</b> {movie.origin}</p>
                </div>
                <div className="card-text_movies">
                  <strong>Description:</strong>
                  <p>{truncateText(movie.description, 30)}</p>
                </div>
                <ReactStars
                  count={5}
                  value={movie.rating}
                  size={24}
                  activeColor="#ffd700"
                  edit={false}
                  half={false}
                  className="rs-stars"
                />
                {movie.id && (
                  <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: '#FFD600', background: '#0D47A1', padding: '8px 16px', borderRadius: '25px', marginTop: '8px', display: 'inline-block' }}>
                    View movie
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
=======
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
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
    </div>
  );
};

export default ListCardMovies;
