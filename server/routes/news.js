import express from 'express';
import axios from 'axios';

const router = express.Router();

const API_KEY = "";
const BASE_URL = 'https://newsapi.org/v2';

// Function to filter articles with all required information
const filterCompleteArticles = (articles) => {
    return articles.filter(article =>
        article.title &&
        article.description &&
        article.content &&
        article.url &&
        article.urlToImage
    );
};

router.get('/top-headlines', async (req, res) => {
    try {
        const { country = 'us', category } = req.query;
        const response = await axios.get(`${BASE_URL}/top-headlines`, {
            params: {
                country,
                category,
                apiKey: API_KEY,
                pageSize: 100,
            },
        });

        const filteredArticles = filterCompleteArticles(response.data.articles);
        res.json({ ...response.data, articles: filteredArticles });
    } catch (error) {
        console.error('Error fetching news:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error fetching news', error: error.message });
    }
});

router.get('/search', async (req, res) => {
    try {
        const { q, language = 'en', page = 1 } = req.query; // Default page is 1
        const response = await axios.get(`${BASE_URL}/everything`, {
            params: {
                q,
                language,
                apiKey: API_KEY,
                pageSize: 10, // Set page size
                page, // Include page parameter
            },
        });

        const filteredArticles = filterCompleteArticles(response.data.articles);
        res.json({ ...response.data, articles: filteredArticles });
    } catch (error) {
        console.error('Error searching news:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error searching news', error: error.message });
    }
});

export default router;
