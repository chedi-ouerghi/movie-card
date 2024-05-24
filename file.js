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
      
        {/* <div className='section_topActuality'>
        <h2 className="top-rated-movies-title">Top Actuality Movies</h2>
        <TopActuality />
      </div> */}
 </div>
      <div className="group-input-rating">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
               {/* <Link to='/movies'> <button style={{
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
        }}>view more movies</button></Link> */}

        <div className='groupe_filtre_button'>
          <div className='genre_div_style'>action</div>
        </div>
        
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
          classNames="rs-stars"
        />


      </div>
      {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 className="filtered-movies-title">Filtered Movies</h2>
      <div className='list_cards'>
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} overlayPosition={overlayPosition} />
        ))}
      </div>
   </div>    */}
      {/* <div className='list_toRated_movies'>
        <h2 className="top-rated-movies-title">Top Rated Movies</h2>
        
        <TopRatedMovies />
      </div> */}

      {/* <div className='BestStars'>
      <BestStars/>
      </div> */}

  {/* <div className="responsive-container">
            <div className="feedback-section">

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
        
      </div> */}

      <div className="footer">
      <p style={{marginBottom:'0'}}>&copy; {new Date().getFullYear()} Movie App</p>
    </div>

    </div>
  );
};

export default MovieList;



  return (
    <div className="movies-container_actuality">
      {/* <h2 className="movies-title"></h2> */}
      <ul className="movies-list_actuality">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-actuality">
            <h3 className="movie-title_actuality">{movie.title}</h3>
            {/* <p className="movie-data_actuality"><b>Director:</b> {movie.director}</p> */}
            {/* <p className="movie-data_actuality"><b>Genre:</b> {movie.genre}</p> */}
            <p className="movie-data_actuality"><b>Duration:</b> {movie.duration} minutes</p>
                <p className="movie-data_actuality"><b>Origin:</b> {movie.origin}</p>
                <p className="movie-data_actuality"><b>Stars:</b> {movie.stars_names}</p>
            <p className="movie-data_actuality"><b>Age:</b> <span className="age-red">{movie.age}</span></p>
          </div>
        ))}
      </ul>
    </div>
);
  








                const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        // Au chargement initial, effectue une recherche météorologique pour Tunis
        handleWeatherSearch('Tunis');
    }, []); // Le tableau vide assure que cela ne se déclenche qu'une seule fois au chargement initial


            const handleWeatherSearch = async (location) => {
    const APIKey = '51dc6ba13cd003bf6a7e78fa33094048';
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${APIKey}&units=metric`);
        const data = await response.json();
        console.log("Weather Data:", data);
        if (response.ok) {
            setWeatherData(data);
        } else {
            setWeatherData(null);
        }
    } catch (error) {
        console.log("Error:", error);
        setWeatherData(null);
    }
};
const renderWeatherData = () => {
    if (weatherData && weatherData.name) {
        // Déterminer l'icône à afficher en fonction de la condition météorologique
        const iconCode = weatherData.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

        // Déterminer la classe CSS pour l'arrière-plan en fonction du type de temps
        const weatherMain = weatherData.weather[0].main.toLowerCase();
        let weatherClass = '';
        switch (weatherMain) {
            case 'clear':
                weatherClass = 'sunny-bg'; // Classe CSS pour le temps ensoleillé
                break;
            case 'clouds':
                weatherClass = 'cloudy-bg'; // Classe CSS pour le temps nuageux
                break;
            case 'rain':
                weatherClass = 'rainy-bg'; // Classe CSS pour la pluie
                break;
            // Ajoutez d'autres cas selon vos besoins
            default:
                weatherClass = 'default-bg'; // Classe CSS par défaut
        }

        return (
            <div className={`text-center weather-container ${weatherClass}`}>
                <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                <img src={iconUrl} alt={weatherData.weather[0].description} />
                <p>{weatherData.weather[0].description}</p>
                <p>Temperature: {weatherData.main.temp}°C</p>
                <p>Feels Like: {weatherData.main.feels_like}°C</p>
                <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                <p>Humidity: {weatherData.main.humidity}%</p>
            </div>
        );
    } else {
        return <p className="text-danger">Please try again!</p>;
    }
};
            <div className='right_section'>
                <div className="container">
                    <div className="weather-card">
                        <h1 className="text-center"> Weather</h1>
                        <div id="weather-info" className="mt-4">
                            {renderWeatherData()}
                        </div>
                    </div>
                </div>
            </div>
