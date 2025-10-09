import React from 'react';
import PropTypes from 'prop-types';

function FiltroPedidos({ filtro, onFiltroChange }) {
  return (
    <div className="order-filter">
      <label htmlFor="filtro-estado">Filtrar por Estado:</label>
      <select
        id="filtro-estado"
        value={filtro}
        onChange={(e) => onFiltroChange(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="pendiente">Pendiente</option>
        <option value="enviado">Enviado</option>
        <option value="entregado">Entregado</option>
      </select>
    </div>
  );
}

FiltroPedidos.propTypes = {
  filtro: PropTypes.oneOf(['', 'pendiente', 'enviado', 'entregado']),
  onFiltroChange: PropTypes.func.isRequired,
};

export default FiltroPedidos;
