import React from 'react';
import PropTypes from 'prop-types';

function OrderStats({ total, pending, shipped, delivered }) {
  return (
    <div className="order-stats" style={{ marginTop: '1rem' }}>
      <h4>Order Statistics</h4>
      <p>Total Orders: {total}</p>
      <p>Pending: {pending}</p>
      <p>Shipped: {shipped}</p>
      <p>Delivered: {delivered}</p>
    </div>
  );
}

OrderStats.propTypes = {
  total: PropTypes.number.isRequired,
  pending: PropTypes.number.isRequired,
  shipped: PropTypes.number.isRequired,
  delivered: PropTypes.number.isRequired,
};

export default OrderStats;
