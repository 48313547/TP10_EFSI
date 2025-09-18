import React, { useState } from 'react';
import PropTypes from 'prop-types';

function NewOrderForm({ onAddOrder }) {
  const [customer, setCustomer] = useState('');
  const [items, setItems] = useState([{ productId: '', name: '', quantity: '', price: '' }]);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!customer || customer.length < 3) {
      newErrors.customer = 'Customer name must be at least 3 characters.';
    }

    const validItems = items.filter(item => item.productId && item.name && item.quantity > 0 && item.price);
    if (validItems.length === 0) {
      newErrors.items = 'At least one valid item is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newOrder = {
      id: Date.now(), // Simple ID generation
      customer,
      date: new Date(),
      status: 'pending',
      items: validItems.map(item => ({
        productId: parseInt(item.productId),
        name: item.name,
        quantity: parseInt(item.quantity),
        price: parseFloat(item.price),
      })),
    };

    onAddOrder(newOrder);
    setCustomer('');
    setItems([{ productId: '', name: '', quantity: '', price: '' }]);
    setErrors({});
  };

  const addItem = () => {
    setItems([...items, { productId: '', name: '', quantity: '', price: '' }]);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h3>Add New Order</h3>
      <div>
        <label>Customer:</label>
        <input
          type="text"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          required
        />
        {errors.customer && <p style={{ color: 'red' }}>{errors.customer}</p>}
      </div>
      <div>
        <h4>Items:</h4>
        {items.map((item, index) => (
          <div key={index} style={{ marginBottom: '0.5rem' }}>
            <input
              type="number"
              placeholder="Product ID"
              value={item.productId}
              onChange={(e) => updateItem(index, 'productId', e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Name"
              value={item.name}
              onChange={(e) => updateItem(index, 'name', e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => updateItem(index, 'quantity', e.target.value)}
              min="1"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => updateItem(index, 'price', e.target.value)}
              step="0.01"
              required
            />
            <button type="button" onClick={() => removeItem(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addItem}>Add Item</button>
        {errors.items && <p style={{ color: 'red' }}>{errors.items}</p>}
      </div>
      <button type="submit">Add Order</button>
    </form>
  );
}

NewOrderForm.propTypes = {
  onAddOrder: PropTypes.func.isRequired,
};

export default NewOrderForm;
