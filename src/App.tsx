import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VerPedidos from './pages/VerPedidos';
import Estadisticas from './pages/Estadisticas';
import AgregarPedido from './pages/AgregarPedido';
import fondo from './assets/a.jpg';
import "./App.css";

export type EstadoPedido = 'pendiente' | 'enviado' | 'entregado';

export interface ItemProducto {
  idProducto: number;
  nombre: string;
  cantidad: number;
  precio: number;
}

export interface Pedido {
  id: number;
  cliente: string;
  fecha: Date;
  estado: EstadoPedido;
  items: ItemProducto[];
}

const App: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const agregarPedido = (nuevo: Omit<Pedido, 'id'>) => {
    const nuevoPedido: Pedido = {
      id: pedidos.length + 1,
      ...nuevo,
    };
    setPedidos([...pedidos, nuevoPedido]);
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
};

export default App;