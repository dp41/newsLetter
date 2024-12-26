import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import NewsList from '../components/NewsList';
import { getTopHeadlines } from '../services/newsService';

const CategoriesPage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { category } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 9;

    const fetchNews = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getTopHeadlines('us', category);
            setArticles(data.articles);
            setError(null);
        } catch (error) {
            console.error('Error fetching news:', error);
            setError('Failed to fetch news. Please try again later.');
            setArticles([]);
        }
        setLoading(false);
    }, [category, 'us']);

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Get the current articles for pagination
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const memoizedNewsList = useMemo(() => (
        <NewsList articles={currentArticles} />
    ), [currentArticles]);

    // Calculate total pages
    const totalPages = Math.ceil(articles.length / articlesPerPage);

    if (loading) {
        return <div className="text-center text-2xl mt-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-2xl mt-8 text-red-600">{error}</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 capitalize">{category} News</h1>
            {memoizedNewsList}
            <div className="flex justify-center items-center mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 bg-gray-200 rounded mr-2 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-2 bg-gray-200 rounded ml-2 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CategoriesPage;
