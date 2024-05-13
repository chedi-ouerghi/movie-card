import React, { useState } from 'react';
import starService from '../../../services/starService';

const StarForm = ({ token }) => {
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [country, setCountry] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newStarData = {
                name,
                date_of_birth: new Date(dateOfBirth).toISOString().split('T')[0], // Convertir et formater la date
                country,
                image
            };
            const newStar = await starService.createStar(newStarData, token);
            // Afficher un message de succès à l'utilisateur ou effectuer une redirection si nécessaire
            console.log('Star created successfully:', newStar);
            // Réinitialiser les champs après la soumission réussie
            setName('');
            setDateOfBirth('');
            setCountry('');
            setImage('');
        } catch (error) {
            console.error('Error creating star:', error);
            // Afficher un message d'erreur à l'utilisateur
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} placeholder="Date of Birth" />
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" />
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" />
            <button type="submit">Save</button>
        </form>
    );
};

export default StarForm;
