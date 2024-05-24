import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { Modal, Button, Popover, Select, Input, Upload, Form } from 'antd';
=======
import { Modal, Button, Popover, Select, Input } from 'antd';
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8

const { Option } = Select;
const { Search } = Input;

const baseApiUrl = 'http://localhost:5320';

const ListMoviesAdmin = ({ token }) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [popoverContent, setPopoverContent] = useState(null);
  const [popoverVisible, setPopoverVisible] = useState(false);
<<<<<<< HEAD
    const [form] = Form.useForm();

=======
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8

  useEffect(() => {
    const fetchMovies = async () => {
      let url = `${baseApiUrl}/api/movies/`;
      if (selectedGenre) {
        url = `${baseApiUrl}/filtre/movies/genre/${selectedGenre}`;
      }
      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setMovies(response.data);
      } catch (err) {
        console.error('Error fetching movies:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [token, selectedGenre]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${baseApiUrl}/filtre/movies/genres`);
        setGenres(response.data.map(genre => genre.genre));
      } catch (err) {
        console.error('Error fetching genres:', err);
      }
    };

    fetchGenres();
  }, []);

  const handleModalOpen = (movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  const handleInputChange = (field, value) => {
    setSelectedMovie(prevMovie => ({
      ...prevMovie,
      [field]: value
    }));
  };

<<<<<<< HEAD
    const handleFileChange = ({ fileList }) => {
    form.setFieldsValue({ image: fileList });
  };

const handleModalSubmit = async () => {
  const formData = new FormData();
  formData.append('title', selectedMovie.title);
  formData.append('description', selectedMovie.description);
  formData.append('rating', selectedMovie.rating);
  formData.append('director', selectedMovie.director);
  formData.append('trailer', selectedMovie.trailer);
  formData.append('top', selectedMovie.top);
  formData.append('genre', selectedMovie.genre);
  formData.append('date_insert', selectedMovie.date_insert);
  formData.append('duration', selectedMovie.duration);
  formData.append('origin', selectedMovie.origin);
  formData.append('age', selectedMovie.age);

  const image = form.getFieldValue('image');
  if (image && image.length > 0) {
    formData.append('image', image[0].originFileObj);
  }

  try {
    await axios.put(`${baseApiUrl}/api/movies/${selectedMovie.id}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    setMovies(prevMovies => prevMovies.map(movie => 
      movie.id === selectedMovie.id ? { ...selectedMovie, image: image ? image[0].name : selectedMovie.image } : movie
    ));
    setModalVisible(false);
  } catch (error) {
    console.error('Error updating movie:', error);
  }
};


=======
  const handleModalSubmit = async () => {
    try {
      await axios.put(`${baseApiUrl}/api/movies/${selectedMovie.id}`, selectedMovie, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMovies(prevMovies => prevMovies.map(movie => 
        movie.id === selectedMovie.id ? selectedMovie : movie
      ));
      setModalVisible(false);
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
  const handlePopoverOpen = async (movieId) => {
    try {
      const response = await axios.get(`${baseApiUrl}/api/movies/${movieId}`);
      const movie = response.data;
      setPopoverContent(
        <div>
          <p>Title: {movie.title}</p>
          <p>Description: {movie.description}</p>
          <p>Director: {movie.director}</p>
          <p>Rating: {movie.rating}</p>
          <p>Trailer: {movie.trailer}</p>
          <p>Genre: {movie.genre}</p>
          <p>Duration: {movie.duration}</p>
          <p>Origin: {movie.origin}</p>
          <p>Age: {movie.age}</p>
        </div>
      );
      setPopoverVisible(true);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handlePopoverClose = () => {
    setPopoverVisible(false);
  };

  const handleModalClose = () => {
    setSelectedMovie(null);
    setModalVisible(false);
  };

  const handleGenreChange = (value) => {
    setSelectedGenre(value);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredMovies = movies.filter(movie => 
    movie.title && movie.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

<<<<<<< HEAD
 

=======
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
  return (
    <div style={{ width: '75%', margin: 'auto', height: '88vh', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 style={{ color: 'green' }}>List Movies</h2>
        <div style={{ width: '35%', height: '100%', background: 'transparent', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
          <Select style={{ width: 200 }} placeholder="Select Genre" onChange={handleGenreChange}>
            {genres.map((genre, index) => (
              <Option key={index} value={genre}>{genre}</Option>
            ))}
          </Select>
          <Search
            placeholder="Search by title"
            onChange={handleSearchChange}
            style={{ width: 200, marginLeft: '1em' }}
          />
        </div>
<<<<<<< HEAD
        <button style={{ width: '15%', height: '100%', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
=======
 <button style={{ width: '15%', height: '100%', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
          <Link to='/admin/post-movie' style={{ textDecoration: 'none' }}>Post new movie</Link>
        </button>
      </div>
      <div
        style={{ overflowY: 'auto', height: '67vh' }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd' }}>ID</th>
              <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd' }}>Title</th>
              <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd' }}>Director</th>
              <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd' }}>Stars</th>
              <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd' }}>Description</th>
              <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd' }}>Genre</th>
              <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd' }}>Rating</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody style={{ overflowX: 'auto' }}>
<<<<<<< HEAD
            {filteredMovies.map((movie) => (
=======
           {filteredMovies.map((movie) => (
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
              <tr key={movie.id} style={{ borderBottom: '1px solid #ddd', backgroundColor: 'rgb(169 184 196)' }} onDoubleClick={() => handlePopoverOpen(movie.id)}>
                <td style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd' }}>{movie.id}</td>
                <td style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd' }}>{movie.title}</td>
                <td style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd' }}>{movie.director}</td>
                <td style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd' }}>{movie.stars_names}</td>
                <td style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd' }}>{movie.description}</td>
                <td style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd' }}>{movie.genre}</td>
                <td style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd' }}>{movie.rating}</td>
                <td style={{ padding: '12px', textAlign: 'left' }}>
                  <button onClick={() => handleModalOpen(movie)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popover pour afficher les détails du film */}
      <Popover
        title="Movie Details"
        content={popoverContent}
        visible={popoverVisible}
        onVisibleChange={handlePopoverClose}
        trigger="click"
      >
        <div />
      </Popover>

      {/* Modal for editing movie */}
<<<<<<< HEAD
      <Modal
        title="Edit Movie"
        open={modalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="cancel" onClick={handleModalClose}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleModalSubmit}>
            Save Changes
          </Button>,
        ]}
      >
        {/* Form for editing movie */}
        {selectedMovie && (
          <div>
            <p>Title:</p>
            <Input
              value={selectedMovie.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
            <p>Description:</p>
            <Input.TextArea
              value={selectedMovie.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
            <p>Image:</p>
<Upload
  accept="image/*"
  multiple={false}
  beforeUpload={() => false}
  fileList={form.getFieldValue('image') || []}
  onChange={handleFileChange}
>
  <Button>Select Image</Button>
</Upload>

            <p>Rating:</p>
            <Input
              value={selectedMovie.rating}
              onChange={(e) => handleInputChange('rating', e.target.value)}
            />
            <p>Director:</p>
            <Input
              value={selectedMovie.director}
              onChange={(e) => handleInputChange('director', e.target.value)}
            />
            <p>Trailer:</p>
            <Input
              value={selectedMovie.trailer}
              onChange={(e) => handleInputChange('trailer', e.target.value)}
            />
            <p>Top:</p>
            <Input
              value={selectedMovie.top}
              onChange={(e) => handleInputChange('top', e.target.value)}
            />
            <p>Genre:</p>
            <Input
              value={selectedMovie.genre}
              onChange={(e) => handleInputChange('genre', e.target.value)}
            />
            <p>Date Insert:</p>
            <Input
              value={selectedMovie.date_insert}
              onChange={(e) => handleInputChange('date_insert', e.target.value)}
            />
            <p>Duration:</p>
            <Input
              value={selectedMovie.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
            />
            <p>Origin:</p>
            <Input
              value={selectedMovie.origin}
              onChange={(e) => handleInputChange('origin', e.target.value)}
            />
            <p>Age:</p>
            <Input
              value={selectedMovie.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
            />
          </div>
        )}
      </Modal>
=======
     <Modal
  title="Edit Movie"
  open={modalVisible}
  onCancel={handleModalClose}
  footer={[
    <Button key="cancel" onClick={handleModalClose}>
      Cancel
    </Button>,
    <Button key="submit" type="primary" onClick={handleModalSubmit}>
      Save Changes
    </Button>,
  ]}
>
  {/* Form for editing movie */}
  {selectedMovie && (
    <div>
      <p>Title:</p>
      <Input
        value={selectedMovie.title}
        onChange={(e) => handleInputChange('title', e.target.value)}
      />
      <p>Description:</p>
      <Input.TextArea
        value={selectedMovie.description}
        onChange={(e) => handleInputChange('description', e.target.value)}
      />
      <p>Image:</p>
      <Input
        value={selectedMovie.image}
        onChange={(e) => handleInputChange('image', e.target.value)}
      />
      <p>Rating:</p>
      <Input
        value={selectedMovie.rating}
        onChange={(e) => handleInputChange('rating', e.target.value)}
      />
      <p>Director:</p>
      <Input
        value={selectedMovie.director}
        onChange={(e) => handleInputChange('director', e.target.value)}
      />
      <p>Trailer:</p>
      <Input
        value={selectedMovie.trailer}
        onChange={(e) => handleInputChange('trailer', e.target.value)}
      />
      <p>Top:</p>
      <Input
        value={selectedMovie.top}
        onChange={(e) => handleInputChange('top', e.target.value)}
      />
      <p>Genre:</p>
      <Input
        value={selectedMovie.genre}
        onChange={(e) => handleInputChange('genre', e.target.value)}
      />
      <p>Date Insert:</p>
      <Input
        value={selectedMovie.date_insert}
        onChange={(e) => handleInputChange('date_insert', e.target.value)}
      />
      <p>Duration:</p>
      <Input
        value={selectedMovie.duration}
        onChange={(e) => handleInputChange('duration', e.target.value)}
      />
      <p>Origin:</p>
      <Input
        value={selectedMovie.origin}
        onChange={(e) => handleInputChange('origin', e.target.value)}
      />
      <p>Age:</p>
      <Input
        value={selectedMovie.age}
        onChange={(e) => handleInputChange('age', e.target.value)}
      />
    </div>
  )}
</Modal>

>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
    </div>
  );
};

export default ListMoviesAdmin;
<<<<<<< HEAD
=======

>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
