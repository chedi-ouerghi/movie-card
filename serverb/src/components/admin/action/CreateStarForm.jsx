import React, { useState } from 'react';
import axios from 'axios';

const baseApiUrl = 'http://localhost:5320';

const CreateStarForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        date_of_birth: '',
        country: '',
        description: '',
        image: null,
    });

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
            await axios.post(`${baseApiUrl}/api/stars`, formDataToSend);
            // Ajouter ici une logique pour rediriger l'utilisateur ou afficher un message de succès
        } catch (error) {
            console.error('Erreur lors de la création de la star:', error);
            // Ajouter ici une logique pour afficher un message d'erreur à l'utilisateur
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} placeholder="Nom" onChange={handleChange} required />
            <input type="date" name="date_of_birth" value={formData.date_of_birth} placeholder="Date de naissance" onChange={handleChange} required />
            <input type="text" name="country" value={formData.country} placeholder="Pays" onChange={handleChange} required />
            <input type="text" name="description" value={formData.description} placeholder="Description" onChange={handleChange} required />
            <input type="file" name="image" onChange={handleImageChange} required />
            <button type="submit">Créer Star</button>
        </form>
    );
};

export default CreateStarForm;
