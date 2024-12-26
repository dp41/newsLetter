import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import SearchPage from './pages/SearchPage';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <Header />
                <main className="container mx-auto px-4 py-8">
                    <Routes>
                        <Route exact path="/" element={<HomePage />} />
                        <Route path="/categories/:category" element={<CategoriesPage />} />
                        <Route path="/search" element={<SearchPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;

