import axios from 'axios';

const API_URL = 'http://localhost:5320/api/stars';

const starService = {
    getAllStars: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    getStarById: async (id) => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    createStar: async (starData, token) => {
        const response = await axios.post(API_URL, starData, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    },

    updateStar: async (id, starData, token) => {
        const response = await axios.put(`${API_URL}/${id}`, starData, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    },

    deleteStar: async (id, token) => {
        const response = await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    }
};

export default starService;
