import React from 'react';
import PropTypes from 'prop-types';

function OrderFilter({ filter, onFilterChange }) {
  return (
    <div className="order-filter">
      <label htmlFor="status-filter">Filter by Status:</label>
      <select
        id="status-filter"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
      </select>
    </div>
  );
}

OrderFilter.propTypes = {
  filter: PropTypes.oneOf(['', 'pending', 'shipped', 'delivered']),
  onFilterChange: PropTypes.func.isRequired,
};

export default OrderFilter;
