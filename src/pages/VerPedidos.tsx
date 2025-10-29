import React, { useState } from 'react';
import ListaPedidos from '../components/ListaPedidos';
import FiltroPedidos from '../components/FiltroPedidos';
import { Pedido, EstadoPedido } from '../App';
import "./VerPedidos.css";

interface VerPedidosProps {
  pedidos: Pedido[];
}

const VerPedidos: React.FC<VerPedidosProps> = ({ pedidos }) => {
  const [filtro, setFiltro] = useState<EstadoPedido | ''>('');

  const pedidosFiltrados = filtro
    ? pedidos.filter((p) => p.estado === filtro)
    : pedidos;

  return (
    <div className="verpedidos-page">
      <div className="verpedidos-card">
        <h2 className="titulo-pedidos">Lista de Pedidos</h2>

        <FiltroPedidos filtro={filtro} onFiltroChange={setFiltro} />

        {pedidosFiltrados.length === 0 ? (
          <p className="sin-pedidos">No hay pedidos para mostrar.</p>
        ) : (
          <ListaPedidos pedidos={pedidosFiltrados} />
        )}
      </div>
    </div>
  );
};

export default VerPedidos;

