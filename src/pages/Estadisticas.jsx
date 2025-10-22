import React from 'react';
import EstadisticasPedidos from '../components/EstadisticasPedidos';

export default function Estadisticas({ pedidos }) {
  const stats = {
    total: pedidos.length,
    pendientes: pedidos.filter(p => p.estado === 'pendiente').length,
    enviados: pedidos.filter(p => p.estado === 'enviado').length,
    entregados: pedidos.filter(p => p.estado === 'entregado').length,
  };

  return (
    <div>
      <h2>📊 Estadísticas Generales</h2>
      <EstadisticasPedidos {...stats} />
    </div>
  );
}
