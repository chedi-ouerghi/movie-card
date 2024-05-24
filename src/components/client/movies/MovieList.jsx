import React, { useState, useEffect } from 'react';   
<<<<<<< HEAD
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
=======
import MovieCard from './MovieCard';
import movieService from '../../../services/movieService';
import ReactStars from 'react-rating-stars-component';
import TopRatedMovies from './TopRatedMovies';
import CarouselSection from './CarouselSection';
import BestStars from '../stars/BestStars';
import './contactstyle.css'
import TopActuality from './TopActuality';
import FeedbackWatcher from '../feedbacks/FeedbackWatcher';
import { Link } from 'react-router-dom';
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8

const MovieList = () => {
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
<<<<<<< HEAD
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
=======
    const filtered = movies.filter(movie => 
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
      movie.title && movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
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
        setResetKey(prevKey => prevKey + 1);
  };

=======
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
  if (isLoading) {
    return <div>Loading...</div>;
  }

<<<<<<< HEAD
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
=======
  return (
    <div className="movie-list" onMouseMove={handleMouseMove}>
      {error && <div className="error">{error}</div>}
      <div className='banner_section'>
      <CarouselSection />
      
        <div className='section_topActuality'>
        <h2 className="top-rated-movies-title">Top Actuality Movies</h2>
        <TopActuality />
      </div>
</div>
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
      <div className="group-input-rating">
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
=======
               <Link to='/movies'> <button style={{
          padding: '10px 20px',
                  marginTop:'0',
        fontSize: '13px',
        color: '#0D47A1',
        background: 'linear-gradient(90deg, #FFD600 0%, #ffd5008d 100%)',
        border: 'none',
          borderRadius: '25px',
        width:'100%',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s, box-shadow 0.3s'
        }}>view more movies</button></Link>
        
        <ReactStars
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
          classNames="rs-stars"
        />
<<<<<<< HEAD
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
=======


      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* <h2 className="filtered-movies-title">Filtered Movies</h2> */}
      <div className='list_cards'>
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} overlayPosition={overlayPosition} />
        ))}
      </div>
   </div>   
      <div className='list_toRated_movies'>
        <h2 className="top-rated-movies-title">Top Rated Movies</h2>
        
        <TopRatedMovies />
      </div>

      <div className='BestStars'>
      <BestStars/>
      </div>

<div style={{display:'flex',width:'100%',gap:'2%'}}>
        <div style={{ width: '60%' }}>
                <h2>Feedback Watcher</h2>

        <FeedbackWatcher/>
      </div>

        <div className="contact">
  <h2 className="contact-title">
    Need Assistance?<br />Let's Chat!
  </h2>
  <div className="contact-form">
    <label htmlFor="name">
      <span className="input-name">Name:</span>
      <input type="text" name="name" id="name" className="name" />
    </label>
    <label htmlFor="email">
      <span className="input-name">Email address:</span>
      <input type="text" name="email" id="email" className="email" />
    </label>
    <label htmlFor="project-info">
      <span className="input-name">Tell about your project:</span>
      <textarea
        name="project-info"
        id="project-info"
        className="project-info"
        defaultValue={""}
      />
    </label>
    <button className="btn send-btn">Send</button>
  </div>
        </div>
        
      </div>

      <div className="footer">
      <p style={{marginBottom:'0'}}>&copy; {new Date().getFullYear()} Movie App</p>
    </div>

>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
    </div>
  );
};

export default MovieList;
