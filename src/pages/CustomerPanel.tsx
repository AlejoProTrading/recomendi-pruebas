import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const CustomerPanel: React.FC = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const [favoritesResponse, ordersResponse] = await Promise.all([
          axios.get('/api/favorites'),
          axios.get('/api/orders')
        ]);
        setFavorites(favoritesResponse.data);
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    if (user) {
      fetchCustomerData();
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Customer Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Favorite Products</h2>
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favorites.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                    <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                      Remove from Favorites
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>You haven't added any products to your favorites yet.</p>
          )}
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Order History</h2>
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-md p-4">
                  <p className="font-semibold">Order #{order.id}</p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                  <p>Total: ${order.total.toFixed(2)}</p>
                  <p>Status: {order.status}</p>
                  <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>You haven't placed any orders yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerPanel;