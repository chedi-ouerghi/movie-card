import axios from 'axios';

const API_URL = 'http://localhost:5320/api/movie-stars';

const movieStarService = {
    getAllMovieStars: async () => {
        const response = await axios.get('http://localhost:5320/api/movie-stars/fetchTitleAndName');
        return response.data;
    },

    
      getTopMovieStars: async () => {
        const response = await axios.get('http://localhost:5320/filtre/stars/top');
        return response.data;
    },


    createMovieStar: async (movieStarData, headers) => {
        const response = await axios.post(API_URL, movieStarData, { headers });
        return response.data;
    },

    deleteMovieStarByMovieId: async (movieId, headers) => {
        const response = await axios.delete(`${API_URL}/movie/${movieId}`, { headers });
        return response.data;
    },

    deleteMovieStarByStarId: async (starId, headers) => {
        const response = await axios.delete(`${API_URL}/star/${starId}`, { headers });
        return response.data;
    },

    deleteMovieStar: async (movieId, starId, headers) => {
        const response = await axios.delete(`${API_URL}/${movieId}/star/${starId}`, { headers });
        return response.data;
    }
};

export default movieStarService;
