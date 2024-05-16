import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import movieService from '../../../services/movieService';
import './actionstyle.css';

const { TextArea } = Input;

const PostAdmin = () => {
    const [form] = Form.useForm();
    const [top, setTop] = useState(false);

    const handleSubmit = async (values) => {
        try {
            const newMovie = await movieService.createMovie({ ...values, top });
            console.log('New movie created:', newMovie);
            form.resetFields();
            setTop(false);
        } catch (error) {
            console.error('Error creating movie:', error);
        }
    };

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

    return (
        <div style={{ height: '81vh' }}>
<form onSubmit={handleSubmit} id="form_post_movie">
        <input className="custom-input" placeholder="Title" required />
    
        <textarea className="custom-textarea" placeholder="Description" required></textarea>
    
        <input className="custom-input" placeholder="Image URL" required />
    
        <input className="custom-input" type="number" placeholder="Rating" required />
    
        <input className="custom-input" placeholder="Director" />
    
        <input className="custom-input" placeholder="Trailer URL" />
    
        <input className="custom-input" placeholder="Genre" />

                <div style={{ display: 'flex', width: '100%', alignItems: 'center' }} >
              <span>Top</span>
        <input type="checkbox" onChange={(e) => setTop(e.target.checked)} style={{height:'1.5rem'}}/>      
</div>        
    
        <button type="submit" className='btnsave'>Save</button>
    
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

export default PostAdmin;
