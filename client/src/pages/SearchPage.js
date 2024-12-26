import React, { useState } from "react";
import NewsList from "../components/NewsList";
import { searchNews } from "../services/newsService";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const handleSearch = async (e, page = 1) => {
    e && e.preventDefault();
    setLoading(true);
    try {
        const data = await searchNews(query, language, page, 10); // Pass page and pageSize
        setArticles(data.articles);
        setTotalResults(data.totalResults);
        setCurrentPage(page); // Update the current page state
        setLoading(false);
    } catch (error) {
        console.error('Error searching news:', error);
        setLoading(false);
    }
};


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    handleSearch(null, newPage);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Search News</h1>
      <form onSubmit={(e) => handleSearch(e)} className="mb-6">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter search query"
            className="flex-grow p-2 border border-gray-300 rounded-md w-full sm:w-auto"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <NewsList articles={articles} />
          {totalResults > 0 && (
            <div className="flex justify-center items-center mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 border-t border-b">
                Page {currentPage} of {Math.ceil(totalResults / 9)}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === Math.ceil(totalResults / 9)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
