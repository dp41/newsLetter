import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo Section */}
                <Link
                    to="/"
                    className="text-2xl md:text-3xl font-bold text-blue-700 hover:text-blue-900 transition-colors"
                >
                    News<span className="text-gray-600">Hub</span>
                </Link>

                {/* Navigation Menu */}
                <nav className="hidden md:flex space-x-6">
                    <Link
                        to="/"
                        className="text-gray-700 hover:text-blue-700 px-3 py-2 transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        to="/categories/business"
                        className="text-gray-700 hover:text-blue-700 px-3 py-2 transition-colors"
                    >
                        Business
                    </Link>
                    <Link
                        to="/categories/technology"
                        className="text-gray-700 hover:text-blue-700 px-3 py-2 transition-colors"
                    >
                        Technology
                    </Link>
                    <Link
                        to="/categories/entertainment"
                        className="text-gray-700 hover:text-blue-700 px-3 py-2 transition-colors"
                    >
                        Entertainment
                    </Link>
                    <Link
                        to="/categories/sports"
                        className="text-gray-700 hover:text-blue-700 px-3 py-2 transition-colors"
                    >
                        Sports
                    </Link>
                    <Link
                        to="/categories/science"
                        className="text-gray-700 hover:text-blue-700 px-3 py-2 transition-colors"
                    >
                        Science
                    </Link>
                    <Link
                        to="/categories/health"
                        className="text-gray-700 hover:text-blue-700 px-3 py-2 transition-colors"
                    >
                        Health
                    </Link>
                </nav>

                {/* Search and Menu Button */}
                <div className="flex items-center space-x-4">
                    <Link
                        to="/search"
                        className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-full transition-colors"
                    >
                        <Search size={20} />
                        <span>Search</span>
                    </Link>
                    <button className="md:hidden bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-full transition-colors">
                        <span className="text-sm font-semibold">Menu</span>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="md:hidden bg-gray-50 shadow-inner p-4">
                <ul className="space-y-4">
                    <li><Link to="/" className="block text-gray-700 hover:text-blue-700 transition-colors">Home</Link></li>
                    <li><Link to="/categories/business" className="block text-gray-700 hover:text-blue-700 transition-colors">Business</Link></li>
                    <li><Link to="/categories/technology" className="block text-gray-700 hover:text-blue-700 transition-colors">Technology</Link></li>
                    <li><Link to="/categories/entertainment" className="block text-gray-700 hover:text-blue-700 transition-colors">Entertainment</Link></li>
                    <li><Link to="/categories/sports" className="block text-gray-700 hover:text-blue-700 transition-colors">Sports</Link></li>
                    <li><Link to="/categories/science" className="block text-gray-700 hover:text-blue-700 transition-colors">Science</Link></li>
                    <li><Link to="/categories/health" className="block text-gray-700 hover:text-blue-700 transition-colors">Health</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
