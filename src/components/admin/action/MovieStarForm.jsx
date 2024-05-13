import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Checkbox, List,  Divider, Select } from 'antd';

const { Option } = Select;

const MovieStarForm = () => {
  const [movieStarData, setMovieStarData] = useState({
    movie_id: null,
    star_id: [], // Changed to hold an array of star IDs
  });

  const [movies, setMovies] = useState([]);
  const [stars, setStars] = useState([]);
  const [token, setToken] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

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
      setModalVisible(false);
      alert('MovieStar association created successfully');
    } catch (error) {
      alert('An error occurred while creating MovieStar association');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add Movie Star Association</h2>
      <Button type="primary" onClick={() => setModalVisible(true)}>Open Modal</Button>

      <Modal
        title="Select Movie and Stars"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Done
          </Button>
        ]}
      >
        <Divider orientation="left">Movies</Divider>
        <div>
          <label htmlFor="movie_id">Select Movie:</label>
          <Select style={{ width: 200 }} onChange={handleMovieSelect} value={movieStarData.movie_id}>
            {movies.map(movie => (
              <Option key={movie.movie_id} value={movie.movie_id}>{movie.movie_title}</Option>
            ))}
          </Select>
        </div>

        <Divider orientation="left">Stars</Divider>
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
      </Modal>
    </div>
  );
};

export default MovieStarForm;
