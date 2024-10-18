import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'products'>('users');

  useEffect(() => {
    if (user?.role !== 'admin') {
      // Redirect to home page or show an error message
      return;
    }

    const fetchData = async () => {
      try {
        const [usersResponse, productsResponse] = await Promise.all([
          axios.get('/api/users'),
          axios.get('/api/products')
        ]);
        setUsers(usersResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user]);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await axios.put(`/api/users/${userId}/role`, { role: newRole });
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleProductUpdate = async (productId: string, updatedProduct: Partial<Product>) => {
    try {
      await axios.put(`/api/products/${productId}`, updatedProduct);
      setProducts(products.map(p => p.id === productId ? { ...p, ...updatedProduct } : p));
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      
      <div className="mb-4">
        <button
          className={`mr-4 px-4 py-2 rounded ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('users')}
        >
          Manage Users
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('products')}
        >
          Manage Products
        </button>
      </div>

      {activeTab === 'users' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">User Management</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Username</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Role</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="customer">Customer</option>
                      <option value="worker">Worker</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'products' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Product Management</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                  <td className="border border-gray-300 px-4 py-2">${product.price.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.description}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => {/* Open edit modal */}}
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {/* Implement delete functionality */}}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;