import React from 'react';

interface EstadisticasPedidosProps {
  total: number;
  pendientes: number;
  enviados: number;
  entregados: number;
}

const EstadisticasPedidos: React.FC<EstadisticasPedidosProps> = ({
  total,
  pendientes,
  enviados,
  entregados,
}) => {
  return (
    <div className="order-stats">
      <h4>Estadísticas de Pedidos</h4>
      <p>Total de Pedidos: {total}</p>
      <p>Pendientes: {pendientes}</p>
      <p>Enviados: {enviados}</p>
      <p>Entregados: {entregados}</p>
    </div>
  );
};

export default EstadisticasPedidos;
