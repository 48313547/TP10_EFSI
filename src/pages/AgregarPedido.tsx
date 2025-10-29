import React from 'react';
import FormularioNuevoPedido from '../components/AgregarPedido';
import "./AgregarPedido.css";


import { Pedido } from '../App';

interface AgregarPedidoProps {
  onAddOrder: (nuevoPedido: Omit<Pedido, 'id'>) => void;
}

const AgregarPedido: React.FC<AgregarPedidoProps> = ({ onAddOrder }) => {
  return (
    <div>
      
      <FormularioNuevoPedido onAddOrder={onAddOrder} />
    </div>
  );
};

export default AgregarPedido;
