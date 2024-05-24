import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Checkbox, List, Divider, Select, Popover } from 'antd';

const { Option } = Select;

<<<<<<< HEAD

=======
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
const MovieStarForm = () => {
  const [movieStarData, setMovieStarData] = useState({
    movie_id: null,
    star_id: [], // Changed to hold an array of star IDs
  });

  const [movies, setMovies] = useState([]);
  const [stars, setStars] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const [moviesResponse, starsResponse] = await Promise.all([
          axios.get('http://localhost:5320/api/movies'),
          axios.get('http://localhost:5320/api/stars'),
        ]);
        setMovies(moviesResponse.data);
        setStars(starsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleStarSelect = (starId) => {
    // Check if the starId is already selected
    const isSelected = movieStarData.star_id.includes(starId);
    let updatedStarIds;

    if (isSelected) {
      // If already selected, remove from the array
      updatedStarIds = movieStarData.star_id.filter(id => id !== starId);
    } else {
      // If not selected, add to the array
      updatedStarIds = [...movieStarData.star_id, starId];
    }

    setMovieStarData({
      ...movieStarData,
      star_id: updatedStarIds,
    });
  };

  const handleMovieSelect = (value) => {
    setMovieStarData({
      ...movieStarData,
      movie_id: value,
    });
  };

  const handleSubmit = async () => {
    try {
      console.log('Data to be sent:', movieStarData);
      await axios.post('http://localhost:5320/api/movie-stars', {
        movie_id: movieStarData.movie_id,
        star_id: movieStarData.star_id,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMovieStarData({
        movie_id: null,
        star_id: [],
      });
      alert('MovieStar association created successfully');
    } catch (error) {
      alert('An error occurred while creating MovieStar association');
      console.error(error);
    }
  };

  const content = (
    <List
      dataSource={stars}
      renderItem={star => (
        <List.Item key={star.id}>
          <Checkbox
            checked={movieStarData.star_id.includes(star.id)}
            onChange={() => handleStarSelect(star.id)}
          >
            {star.name}
          </Checkbox>
        </List.Item>
      )}
    />
  );

      const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        // Au chargement initial, effectue une recherche météorologique pour Tunis
        handleWeatherSearch('Tunis');
    }, []); 
  
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

  return (
    <div style={{ height: '81vh' }}>
      {/* <h2>Add Movie Star Association</h2> */}

      <form onSubmit={handleSubmit} id="form_post_movieStars">
        <div>
          <label htmlFor="movie_id">Select Movie:</label>
          <Select style={{ width: 200 }} onChange={handleMovieSelect} value={movieStarData.movie_id}>
            {movies.map(movie => (
              <Option key={movie.movie_id} value={movie.movie_id}>{movie.movie_title}</Option>
            ))}
          </Select>
        </div>

        <Divider orientation="left">Stars</Divider>
        <Popover content={content} title="Select Stars" trigger="click">
          <Button type="primary">Select Stars</Button>
        </Popover>

        <button type="submit">Submit</button>
      </form>

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
      
    </div>
  );
};

export default MovieStarForm;
