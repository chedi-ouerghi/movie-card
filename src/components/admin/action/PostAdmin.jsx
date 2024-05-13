import React, { useState } from 'react';
import movieService from '../../../services/movieService';

const PostAdmin = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [rating, setRating] = useState('');
    const [director, setDirector] = useState('');
    const [trailer, setTrailer] = useState('');
    const [top, setTop] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newMovie = await movieService.createMovie({ title, description, image, rating, director, trailer, top });
            // Gérer le nouveau film créé ici, par exemple, mettre à jour l'état ou effectuer d'autres actions nécessaires
            console.log('New movie created:', newMovie);
            // Réinitialiser les champs après la soumission réussie
            setTitle('');
            setDescription('');
            setImage('');
            setRating('');
            setDirector('');
            setTrailer('');
            setTop(false);
        } catch (error) {
            console.error('Error creating movie:', error);
            // Vous pouvez afficher un message d'erreur à l'utilisateur
        }
    };

    return (
        <div>
            <h2>Create New Movie</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required></textarea>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" required />
                <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating" required />
                <input type="text" value={director} onChange={(e) => setDirector(e.target.value)} placeholder="Director" />
                <input type="text" value={trailer} onChange={(e) => setTrailer(e.target.value)} placeholder="Trailer URL" />
                <label>
                    Top: <input type="checkbox" checked={top} onChange={() => setTop(!top)} />
                </label>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default PostAdmin;
