import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseApiUrl = 'http://localhost:5320';

const UpdateMovieForm = ({ movieId }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        rating: '',
        director: '',
        trailer: '',
        top: '',
        genre: '',
        duration: '',
        origin: '',
        age: '',
        image: null,
    });

    const [currentImage, setCurrentImage] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`${baseApiUrl}/api/movies/${movieId}`);
                const movieData = response.data;
                setFormData({
                    ...movieData,
                    top: movieData.top ? '1' : '0',
                });
                setCurrentImage(movieData.image);
            } catch (error) {
                console.error('Erreur lors de la récupération du film à mettre à jour:', error);
            }
        };
        fetchMovie();
    }, [movieId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            for (let key in formData) {
                formDataToSend.append(key, formData[key]);
            }
            await axios.put(`${baseApiUrl}/api/movies/${movieId}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Film mis à jour avec succès');
        } catch (error) {
            console.error('Erreur lors de la mise à jour du film:', error);
            alert('Erreur lors de la mise à jour du film');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={formData.title} placeholder="Titre" onChange={handleChange} required />
            <input type="text" name="description" value={formData.description} placeholder="Description" onChange={handleChange} required />
            <input type="number" name="rating" value={formData.rating} placeholder="Note" onChange={handleChange} required />
            <input type="text" name="director" value={formData.director} placeholder="Réalisateur" onChange={handleChange} required />
            <input type="text" name="trailer" value={formData.trailer} placeholder="Lien vers la bande-annonce" onChange={handleChange} required />
            <input type="text" name="genre" value={formData.genre} placeholder="Genre" onChange={handleChange} required />
            <input type="number" name="duration" value={formData.duration} placeholder="Durée (en minutes)" onChange={handleChange} required />
            <input type="text" name="origin" value={formData.origin} placeholder="Origine" onChange={handleChange} required />
            <select name="age" value={formData.age} onChange={handleChange} required>
                <option value="+6">+6</option>
                <option value="+12">+12</option>
                <option value="+16">+16</option>
                <option value="+18">+18</option>
                <option value="+21">+21</option>
            </select>
            <input type="checkbox" name="top" checked={formData.top === '1'} onChange={(e) => setFormData({ ...formData, top: e.target.checked ? '1' : '0' })} />
            <div>
                {currentImage && <img src={`${baseApiUrl}/uploads/${currentImage}`} alt="Current" style={{ width: '100px', height: '100px' }} />}
                <input type="file" name="image" onChange={handleImageChange} />
            </div>
            <button type="submit">Mettre à jour Film</button>
        </form>
    );
};

export default UpdateMovieForm;
