import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const ItemModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    type: 'Lost',
    location: '',
    date: '',
    contactInfo: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : ''
      });
    } else {
      setFormData({
        itemName: '',
        description: '',
        type: 'Lost',
        location: '',
        date: '',
        contactInfo: ''
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="glass-card modal-content">
        <div className="modal-header">
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
            {initialData ? 'Edit Item' : 'Report Item'}
          </h3>
          <button onClick={onClose} className="modal-close">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Item Name</label>
            <input
              type="text"
              name="itemName"
              className="form-control"
              value={formData.itemName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Type</label>
            <select
              name="type"
              className="form-control"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label className="form-label">Location (Where it was lost/found)</label>
            <input
              type="text"
              name="location"
              className="form-control"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Contact Info (Phone/Email)</label>
            <input
              type="text"
              name="contactInfo"
              className="form-control"
              value={formData.contactInfo}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary" style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              {initialData ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemModal;
