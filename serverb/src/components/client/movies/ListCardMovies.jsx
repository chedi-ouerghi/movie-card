import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import { Dropdown, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './ListCardMovies.css';

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const baseApiUrl = 'http://localhost:5320';

const ListCardMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchRate, setSearchRate] = useState(1);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [overlayPosition, setOverlayPosition] = useState({ x: 0, y: 0 });
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${baseApiUrl}/api/movies`);
        setMovies(response.data);
        setIsLoading(false);
        console.log('Movies fetched:', response.data);
      } catch (error) {
        setError('Error fetching movies');
        setIsLoading(false);
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
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
        movie.title &&
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        movie.rating >= searchRate
    );
    setFilteredMovies(filtered);
  }, [movies, searchTerm, searchRate, selectedGenre]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const ratingChanged = (newRating) => {
    setSearchRate(newRating);
  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  const handleMouseMove = (e) => {
    setOverlayPosition({ x: e.pageX, y: e.pageY });
  };

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="list_div_movies" onMouseMove={handleMouseMove}>
      <div className="group-input-rating">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
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
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
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
    </div>
  );
};

export default ListCardMovies;
