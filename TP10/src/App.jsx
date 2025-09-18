import { useState } from 'react';
import OrderList from './components/OrderList';
import OrderFilter from './components/OrderFilter';
import OrderStats from './components/OrderStats';
import NewOrderForm from './components/NewOrderForm';
import './App.css';

function App() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: 'John Doe',
      date: new Date('2023-10-01'),
      status: 'pending',
      items: [
        { productId: 101, name: 'Laptop', quantity: 1, price: 999.99 },
        { productId: 102, name: 'Mouse', quantity: 2, price: 25.00 },
      ],
    },
    {
      id: 2,
      customer: 'Jane Smith',
      date: new Date('2023-10-02'),
      status: 'shipped',
      items: [
        { productId: 103, name: 'Keyboard', quantity: 1, price: 75.00 },
      ],
    },
    {
      id: 3,
      customer: 'Bob Johnson',
      date: new Date('2023-10-03'),
      status: 'delivered',
      items: [
        { productId: 104, name: 'Monitor', quantity: 1, price: 299.99 },
      ],
    },
  ]);

  const [filter, setFilter] = useState('');

  const filteredOrders = filter ? orders.filter(order => order.status === filter) : orders;

  const stats = {
    total: orders.length,
    pending: orders.filter(order => order.status === 'pending').length,
    shipped: orders.filter(order => order.status === 'shipped').length,
    delivered: orders.filter(order => order.status === 'delivered').length,
  };

  const handleAddOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  return (
    <div className="app">
      <h1>Order Management System</h1>
      <NewOrderForm onAddOrder={handleAddOrder} />
      <OrderFilter filter={filter} onFilterChange={setFilter} />
      <OrderStats {...stats} />
      <OrderList orders={filteredOrders} />
    </div>
  );
}

export default App;
