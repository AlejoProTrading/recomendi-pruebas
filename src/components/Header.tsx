import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">E-Commerce</Link>
        <div className="flex items-center space-x-4">
          <form className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="py-2 px-4 pr-10 rounded-full text-gray-800"
            />
            <button type="submit" className="absolute right-3 top-2">
              <Search className="h-5 w-5 text-gray-500" />
            </button>
          </form>
          <Link to="/cart" className="hover:text-gray-200">
            <ShoppingCart className="h-6 w-6" />
          </Link>
          {user ? (
            <div className="relative group">
              <button className="hover:text-gray-200">
                <User className="h-6 w-6" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
                <Link to="/customer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Account</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin Panel</Link>
                )}
                <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="hover:text-gray-200">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;