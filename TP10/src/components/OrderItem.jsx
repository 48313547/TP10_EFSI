import React from 'react';
import PropTypes from 'prop-types';

function OrderItem({ id, customer, date, status, items }) {
  return (
    <div className="order-item" style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
      <h3>Order ID: {id}</h3>
      <p><strong>Customer:</strong> {customer}</p>
      <p><strong>Date:</strong> {date.toLocaleDateString()}</p>
      <p><strong>Status:</strong> {status}</p>
      <div>
        <strong>Products:</strong>
        <ul>
          {items.map(({ productId, name, quantity, price }) => (
            <li key={productId}>
              {name} - Quantity: {quantity} - Price: ${price.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

OrderItem.propTypes = {
  id: PropTypes.number.isRequired,
  customer: function(props, propName, componentName) {
    if (!props[propName]) {
      return new Error(`Missing required prop '${propName}' in '${componentName}'.`);
    }
    if (typeof props[propName] !== 'string' || props[propName].length < 3) {
      return new Error(`Invalid prop '${propName}' supplied to '${componentName}'. Must be a string with at least 3 characters.`);
    }
  },
  date: PropTypes.instanceOf(Date),
  status: PropTypes.oneOf(['pending', 'shipped', 'delivered']),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: function(props, propName, componentName) {
        if (typeof props[propName] !== 'number' || props[propName] <= 0) {
          return new Error(`Invalid prop '${propName}' supplied to '${componentName}'. Must be a number greater than 0.`);
        }
      },
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

OrderItem.defaultProps = {
  status: 'pending',
  date: new Date(),
};

export default OrderItem;
