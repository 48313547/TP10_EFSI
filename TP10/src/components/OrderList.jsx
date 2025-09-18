import React from 'react';
import PropTypes from 'prop-types';
import OrderItem from './OrderItem';

function OrderList({ orders }) {
  return (
    <div className="order-list">
      {orders.map(order => (
        <OrderItem
          key={order.id}
          id={order.id}
          customer={order.customer}
          date={order.date}
          status={order.status}
          items={order.items}
        />
      ))}
    </div>
  );
}

OrderList.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      customer: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date),
      status: PropTypes.oneOf(['pending', 'shipped', 'delivered']),
      items: PropTypes.arrayOf(
        PropTypes.shape({
          productId: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          quantity: PropTypes.number.isRequired,
          price: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default OrderList;
