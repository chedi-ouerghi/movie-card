import React, { useState } from "react";
import styled from 'styled-components';
import axios from 'axios';

const PostAdmin = () => {
    const [movie, setMovie] = useState({
        title: '',
        director: '',
        stars: [],
        description: '',
        image: '',
        trailer: '',
        rating: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Vérifiez si movie.stars est un tableau
            const stars = Array.isArray(movie.stars) ? movie.stars : [movie.stars];

            const response = await axios.post('http://localhost:5320/api/movies/', {
                ...movie,
                stars: stars
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log(response.data);
            alert('Movie created successfully!');
            setMovie({
                title: '',
                director: '',
                stars: [],
                description: '',
                image: '',
                trailer: '',
                rating: 0
            });
        } catch (err) {
            console.error('Error creating movie:', err);
            alert('Failed to create movie. Please try again.');
        }
    };

    // Styles du composant avec styled-components
    const Container = styled.div`
        width: 100%;
        margin: auto;
    `;

    const Form = styled.form`
        width: 60%;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        @media only screen and (max-width: 600px) {
        width: 80%;
        height: 60%;
    }
        `;

    const FormGroup = styled.div`
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        width: 100%;
    `;

    const Label = styled.label`
        width: 30%;
        margin-right: 10px;

        @media only screen and (max-width: 600px) {
            width: 40%; /* Modifier la largeur de l'étiquette pour les appareils mobiles */
        }
    `;

    const Input = styled.input`
        flex: 1;
        padding: 10px;
        border-radius: 4px;
        height: 10vh;
        width: 100%;

        @media only screen and (max-width: 600px) {
            height: 8vh; /* Modifier la hauteur de l'entrée pour les appareils mobiles */
        }
    `;

    const Button = styled.button`
        padding: 10px;
        background-color: #007bff;
        color: #ffffff;
        border-radius: 4px;
        border: 1px solid;
        cursor: pointer;
        width: 20%;

        @media only screen and (max-width: 600px) {
            width: 30%; /* Modifier la largeur du bouton pour les appareils mobiles */
        }
    `;

    return (
        <Container>
            <h2>Create Movie</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label className="label-post">Title:</Label>
                    <Input className="input-post" type="text" name="title" value={movie.title} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label className="label-post">Director:</Label>
                    <Input className="input-post" type="text" name="director" value={movie.director} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label className="label-post">Stars:</Label>
                    <Input className="input-post" type="text" name="stars" value={Array.isArray(movie.stars) ? movie.stars.join(',') : movie.stars} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label className="label-post">Description:</Label>
                    <textarea name="description" value={movie.description} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label className="label-post">Image URL:</Label>
                    <Input className="input-post" type="file" name="image" value={movie.image} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label className="label-post">Trailer URL:</Label>
                    <Input className="input-post" type="text" name="trailer" value={movie.trailer} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label className="label-post">Rating:</Label>
                    <Input className="input-post" type="number" name="rating" value={movie.rating} onChange={handleChange} required />
                </FormGroup>
                <Button type="submit">Create</Button>
            </Form>
        </Container>
    );
};

export default PostAdmin;
