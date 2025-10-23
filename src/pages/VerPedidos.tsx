import React, { useState } from 'react';
import ListaPedidos from '../components/ListaPedidos.jsx';
import FiltroPedidos from '../components/FiltroPedidos.jsx';

export default function VerPedidos({ pedidos }) {
  const [filtro, setFiltro] = useState('');

  const pedidosFiltrados = filtro
    ? pedidos.filter(p => p.estado === filtro)
    : pedidos;

  return (
    <div>
      <h2>📦 Lista de Pedidos</h2>
      <FiltroPedidos filtro={filtro} onFiltroChange={setFiltro} />
      <ListaPedidos pedidos={pedidosFiltrados} />
    </div>
  );
}
