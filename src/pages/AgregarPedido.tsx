import React from 'react';
import FormularioNuevoPedido from '../components/AgregarPedido.jsx';

export default function AgregarPedido({ onAddOrder }) {
  return (
    <div>
      <h2>➕ Agregar Nuevo Pedido</h2>
      <FormularioNuevoPedido onAddOrder={onAddOrder} />
    </div>
  );
}
