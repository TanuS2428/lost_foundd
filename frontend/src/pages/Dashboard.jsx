import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Plus, Search as SearchIcon, MapPin, Calendar, Phone, Edit2, Trash2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import ItemModal from '../components/ItemModal';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await axios.get('/items');
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching items', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSearch = async () => {
    try {
      let query = `/items/search?name=${searchTerm}`;
      if (filterType) query += `&category=${filterType}`;
      const res = await axios.get(query);
      setItems(res.data);
    } catch (err) {
      console.error('Error searching items', err);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, filterType]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`/items/${id}`);
        setItems(items.filter(item => item._id !== id));
      } catch (err) {
        console.error('Error deleting item', err);
        alert(err.response?.data?.message || 'Error deleting item');
      }
    }
  };

  const handleModalSubmit = async (formData) => {
    try {
      if (editingItem) {
        await axios.put(`/items/${editingItem._id}`, formData);
      } else {
        await axios.post('/items', formData);
      }
      fetchItems();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      console.error('Error saving item', err);
      alert(err.response?.data?.message || 'Error saving item');
    }
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <button onClick={openAddModal} className="btn btn-primary">
          <Plus size={20} style={{ marginRight: '0.5rem' }} />
          Report Item
        </button>
      </div>

      <div className="controls">
        <div className="search-bar">
          <SearchIcon size={20} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search items by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>
      </div>

      <div className="items-grid">
        {items.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No items found.</p>
        ) : (
          items.map((item) => (
            <div key={item._id} className="item-card">
              <span className={`item-badge ${item.type === 'Lost' ? 'badge-lost' : 'badge-found'}`}>
                {item.type}
              </span>
              <h3 className="item-title">{item.itemName}</h3>
              
              <div className="item-meta">
                <div className="meta-row">
                  <MapPin size={16} /> {item.location}
                </div>
                <div className="meta-row">
                  <Calendar size={16} /> {new Date(item.date).toLocaleDateString()}
                </div>
                <div className="meta-row">
                  <Phone size={16} /> {item.contactInfo}
                </div>
                <div className="meta-row" style={{ marginTop: '0.5rem', color: 'var(--primary-color)' }}>
                  Reported by: {item.owner?.name || 'Unknown'}
                </div>
              </div>
              
              <p className="item-desc">{item.description}</p>
              
              {user && item.owner?._id === user.id && (
                <div className="item-actions">
                  <button 
                    onClick={() => openEditModal(item)} 
                    className="btn btn-secondary" 
                    style={{ flex: 1, padding: '0.25rem' }}
                  >
                    <Edit2 size={16} style={{ marginRight: '0.25rem' }} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(item._id)} 
                    className="btn btn-danger" 
                    style={{ flex: 1, padding: '0.25rem' }}
                  >
                    <Trash2 size={16} style={{ marginRight: '0.25rem' }} /> Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <ItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingItem}
      />
    </div>
  );
};

export default Dashboard;
