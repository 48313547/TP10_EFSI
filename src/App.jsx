import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VerPedidos from './pages/VerPedidos';
import Estadisticas from './pages/Estadisticas';
import AgregarPedido from './pages/AgregarPedido';
import fondo from './assets/a.jpg';
import "./App.css";

export default function App() {
  const [pedidos, setPedidos] = useState([]);

  const agregarPedido = (nuevo) => {
    setPedidos([...pedidos, { id: pedidos.length + 1, ...nuevo }]);
  };

  return (
    <Router>
      <div
        style={{
          backgroundImage: `url(${fondo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          padding: '20px',
          color: 'white',
        }}
      >
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ margin: '0 10px' }}>Ver Pedidos</Link>
          <Link to="/estadisticas" style={{ margin: '0 10px' }}>Estadísticas</Link>
          <Link to="/nuevo" style={{ margin: '0 10px' }}>Nuevo Pedido</Link>
        </nav>

        <Routes>
          <Route path="/" element={<VerPedidos pedidos={pedidos} />} />
          <Route path="/estadisticas" element={<Estadisticas pedidos={pedidos} />} />
          <Route path="/nuevo" element={<AgregarPedido onAddOrder={agregarPedido} />} />
        </Routes>
      </div>
    </Router>
  );
}
