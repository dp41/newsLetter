import axios from 'axios';

const API_URL = 'http://localhost:8000/api/news';

export const getTopHeadlines = async (country = '', category = '') => {
    try {
        const response = await axios.get(`${API_URL}/top-headlines`, {
            params: { country, category },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching top headlines:', error);
        throw error;
    }
};

export const searchNews = async (query, language = 'en', page = 1, pageSize = 10) => {
    try {
        const response = await axios.get(`${API_URL}/search`, {
            params: { q: query, language, page, pageSize }, // Include page and pageSize
        });
        return response.data;
    } catch (error) {
        console.error('Error searching news:', error);
        throw error;
    }
};


export const getNewsByCountry = async (country) => {
    return getTopHeadlines(country);
};

