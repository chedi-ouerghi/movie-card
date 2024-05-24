<<<<<<< HEAD
import React, { useState } from 'react';
import { Form, Input, Button, message, Select, Checkbox } from 'antd';
import movieService from '../../../services/movieService';

const { TextArea } = Input;
const { Option } = Select;

const PostAdmin = () => {
    const [form] = Form.useForm();
    const [image, setImage] = useState(null);
    const [top, setTop] = useState(false);

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async (values) => {
        if (!image) {
            message.error('Please upload an image');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('rating', values.rating);
            formData.append('director', values.director);
            formData.append('trailer', values.trailer);
            formData.append('genre', values.genre);
            formData.append('duration', values.duration);
            formData.append('origin', values.origin);
            formData.append('age', values.age);
            formData.append('top', top ? '1' : '0');

            const newMovie = await movieService.createMovie(formData);
            console.log('New movie created:', newMovie);
            form.resetFields();
            setImage(null);
            setTop(false);
            message.success('Movie created successfully');
        } catch (error) {
            console.error('Error creating movie:', error);
            message.error('Failed to create movie');
        }
    };

    return (
        <div style={{ height: '81vh' }}>
            <Form form={form} onFinish={handleSubmit} id="form_post_movie">
                <Form.Item name="title" rules={[{ required: true, message: 'Please enter the title' }]}>
                    <Input className="custom-input" placeholder="Title" />
                </Form.Item>
                <Form.Item name="description">
                    <TextArea className="custom-textarea" placeholder="Description" />
                </Form.Item>
                <Form.Item name="image" rules={[{ required: true, message: 'Please upload the image' }]}>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </Form.Item>
                <Form.Item name="rating" rules={[{ required: true, message: 'Please enter the rating' }]}>
                    <Input className="custom-input" type="number" placeholder="Rating" />
                </Form.Item>
                <Form.Item name="director">
                    <Input className="custom-input" placeholder="Director" />
                </Form.Item>
                <Form.Item name="trailer">
                    <Input className="custom-input" placeholder="Trailer URL" />
                </Form.Item>
                <Form.Item name="genre">
                    <Input className="custom-input" placeholder="Genre" />
                </Form.Item>
                <Form.Item name="duration">
                    <Input className="custom-input" placeholder="Duration" />
                </Form.Item>
                <Form.Item name="origin">
                    <Input className="custom-input" placeholder="Origin" />
                </Form.Item>
                <Form.Item name="age">
                    <Select placeholder="Select age">
                        <Option value="+6">+6</Option>
                        <Option value="+12">+12</Option>
                        <Option value="+16">+16</Option>
                        <Option value="+18">+18</Option>
                        <Option value="+21">+21</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="top" valuePropName="checked">
                    <Checkbox onChange={(e) => setTop(e.target.checked)}>Top</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="btnsave">
                        Save
                    </Button>
                </Form.Item>
            </Form>
=======
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

>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
        </div>
    );
};

export default PostAdmin;
