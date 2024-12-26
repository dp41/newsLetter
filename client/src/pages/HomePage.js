import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useState, useEffect, useCallback } from "react";
import Slider from "react-slick";
import NewsList from "../components/NewsList";
import { getTopHeadlines } from "../services/newsService";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(9);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTopHeadlines("us");
      setArticles(data.articles);
      setError(null);
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Failed to fetch news. Please try again later.");
      setArticles([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Settings for the auto-carousel
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  if (loading) {
    return <div className="text-center text-2xl mt-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-2xl mt-8 text-red-600">{error}</div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Top Headlines</h1>

      {/* Carousel Section */}
      {/* Full-Width Carousel Section with Reduced Height */}
      <div className="mb-28">
        <div className="relative w-full overflow-hidden">
          <Slider {...carouselSettings}>
            {articles.slice(0, 5).map((article, index) => (
              <div key={index} className="relative w-screen">
                <img
                  src={
                    article.urlToImage ||
                    "https://via.placeholder.com/1920x600?text=No+Image"
                  }
                  alt={article.title}
                  className="w-full h-[60vh] object-cover" // Adjusted height to 60% of the viewport
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-8">
                  <div className="text-white max-w-3xl mx-auto text-center">
                    <h3 className="text-3xl font-bold mb-4">{article.title}</h3>
                    <p className="text-base line-clamp-3">
                      {article.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* News List and Pagination */}
      <NewsList articles={currentArticles} />
      <div className="flex justify-center items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
          className="px-4 py-2 bg-gray-200 rounded mr-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
          className="px-4 py-2 bg-gray-200 rounded ml-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
