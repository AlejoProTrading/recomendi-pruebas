import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">We are an e-commerce platform dedicated to providing quality products and excellent customer service.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-gray-300">Home</Link></li>
              <li><Link to="/products" className="text-sm hover:text-gray-300">Products</Link></li>
              <li><Link to="/about" className="text-sm hover:text-gray-300">About</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-gray-300">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">Email: support@ecommerce.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2024 E-Commerce Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;