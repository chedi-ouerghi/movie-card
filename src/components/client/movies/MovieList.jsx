import React, { useState, useEffect } from 'react';
import { Dropdown, Menu, Space, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import movieService from '../../../services/movieService';
import ReactStars from 'react-rating-stars-component';
import CarouselSection from './CarouselSection';
import axios from 'axios';
import MovieCard from './MovieCard';
import TopActuality from './TopActuality';
import { Link } from 'react-router-dom';
import ContactSection from '../../layout/ContactSection';
import FeedbackWatcher from '../feedbacks/FeedbackWatcher';
import BestStars from '../stars/BestStars';


const baseApiUrl = 'http://localhost:5320';

const MovieList = () => {
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
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${baseApiUrl}/filtre/movies/genres`);
        setGenres(response.data.map(genre => genre.genre));
      } catch (err) {
        console.error('Error fetching genres:', err);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const filtered = movies.filter(movie => 
      (!selectedGenre || movie.genre === selectedGenre) &&
      movie.title && movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
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
        setResetKey(prevKey => prevKey + 1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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

  return (
    <div className="movie-list" onMouseMove={handleMouseMove}>
      {error && <div className="error">{error}</div>}
      {/* <div className='banner_section'> */}
      <div>
        <CarouselSection />
      </div>
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
            <a onClick={(e) => e.preventDefault()} style={{color:'rgb(255 162 0)'}}>
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
        <div className='genre_div_style' style={{color:'rgb(255 162 0)'}} onClick={handleResetFilters}>
          Reset Filters
        </div>
       
      </div>
    
      <div style={{ display: 'flex', flexDirection: 'column'  }}>
     
        <div style={{ display: 'flex', width:'100%',flexDirection: 'column' }} >
           <div className='title_link_movies_home' >
        <h2 className="filtered-movies-title"> Movies</h2>
          <Link to='/movies'> <span className="see-all-button">See All  </span></Link>
        </div>
          <div className='list_cards'>
            
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} overlayPosition={overlayPosition} />
          ))}
            </div>

        </div>
      </div>

        <TopActuality />
      

              <div className='best_Stars'>
                  <h2 className="filtered-movies-title"> Our Stars</h2>
<BestStars/>  
      </div>
      
<div className="responsive-container">
      <ContactSection/>

        <div className='section_feedback-watcher'>
                  <FeedbackWatcher/>
      </div>


      
      </div>

      <div className="footer">
        <p style={{ marginBottom: '0' }}>&copy; {new Date().getFullYear()} Movie App</p>
      </div>
    </div>
  );
};

export default MovieList;
