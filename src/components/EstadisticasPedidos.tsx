import React from 'react';
import PropTypes from 'prop-types';

function EstadisticasPedidos({ total, pendientes, enviados, entregados }) {
  return (
    <div className="order-stats">
      <h4>Estadísticas de Pedidos</h4>
      <p>Total de Pedidos: {total}</p>
      <p>Pendientes: {pendientes}</p>
      <p>Enviados: {enviados}</p>
      <p>Entregados: {entregados}</p>
    </div>
  );
}

EstadisticasPedidos.propTypes = {
  total: PropTypes.number.isRequired,
  pendientes: PropTypes.number.isRequired,
  enviados: PropTypes.number.isRequired,
  entregados: PropTypes.number.isRequired,
};

export default EstadisticasPedidos;
