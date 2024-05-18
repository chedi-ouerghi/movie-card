import React, { useState, useEffect } from 'react';
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

const MovieList = () => {
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
    const filtered = movies.filter(movie => 
      movie.title && movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
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
      <div className="group-input-rating">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
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
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
          classNames="rs-stars"
        />


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

    </div>
  );
};

export default MovieList;
