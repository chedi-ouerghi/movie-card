import React, { useState } from 'react';
import axios from 'axios';
import './actionstyle.css';

const baseApiUrl = 'http://localhost:5320';

const StarForm = ({ token }) => {
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('date_of_birth', new Date(dateOfBirth).toISOString().split('T')[0]);
        formData.append('country', country);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        try {
            // Création de la star
            const response = await axios.post(`${baseApiUrl}/api/stars`, formData, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
            });
            const newStar = response.data;
            console.log('Star created successfully:', newStar);

            // Réinitialisation des champs du formulaire
            setName('');
            setDateOfBirth('');
            setCountry('');
            setDescription('');
            setImage(null);

            // Appel API supplémentaire après la création de la star
            const additionalAPIResponse = await axios.post(
                `${baseApiUrl}/api/stars/${newStar.starId}/additional`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log('Additional API response:', additionalAPIResponse.data);
        } catch (error) {
            console.error('Error creating star:', error);
        }
    };

    return (
        <div style={{ height: '81vh' }}>
            <form onSubmit={handleSubmit} id="form_post_stars" encType="multipart/form-data">
                <input
                    className="custom-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
                <input
                    className="custom-input"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    placeholder="Date of Birth"
                    required
                />
                <input
                    className="custom-input"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                    required
                />
                <textarea
                    className="custom-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                ></textarea>
                <input
                    className="custom-input"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    placeholder="Image"
                    required
                />
                <button type="submit" className="btnsave">Save</button>
            </form>
        </div>
    );
};

export default StarForm;
