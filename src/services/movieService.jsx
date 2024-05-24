import axios from 'axios';

const API_URL = 'http://localhost:5320/api/movies';

const movieService = {
    getAllMovies: async () => {
<<<<<<< HEAD
        const response = await axios.get(`${API_URL}?limit=10`);
=======
        const response = await axios.get(API_URL);
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
        return response.data;
    },

    getMovieById: async (id) => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

<<<<<<< HEAD
    createMovie: async (movieData) => {
        const response = await axios.post(`${API_URL}/post`, movieData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        });
=======
    createMovie: async (movieData, headers) => {
        const response = await axios.post(API_URL, movieData, {   headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          } });
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
        return response.data;
    },

    updateMovie: async (id, movieData, headers) => {
        const response = await axios.put(`${API_URL}/${id}`, movieData, {   headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          } });
        return response.data;
    },

    deleteMovie: async (id, headers) => {
        const response = await axios.delete(`${API_URL}/${id}`, {   headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          } });
        return response.data;
    },


};

export default movieService;
