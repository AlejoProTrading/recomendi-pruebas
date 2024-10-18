import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const HomePage: React.FC = () => {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await axios.get('/api/products/trending');
        setTrendingProducts(response.data);
      } catch (error) {
        console.error('Error fetching trending products:', error);
      }
    };

    fetchTrendingProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to Our E-Commerce Platform</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Trending Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
            <p>We offer a wide range of high-quality products from trusted brands.</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
            <p>Enjoy quick and reliable shipping on all your orders.</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p>Our customer support team is always ready to assist you.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Join Our Newsletter</h2>
        <form className="max-w-md">
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Subscribe
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default HomePage;