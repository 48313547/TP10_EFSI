import React from 'react';

interface FiltroPedidosProps {
  filtro: '' | 'pendiente' | 'enviado' | 'entregado';
  onFiltroChange: (nuevoFiltro: '' | 'pendiente' | 'enviado' | 'entregado') => void;
}

const FiltroPedidos: React.FC<FiltroPedidosProps> = ({ filtro, onFiltroChange }) => {
  return (
    <div className="order-filter">
      <label htmlFor="filtro-estado">Filtrar por Estado:</label>
      <select
        id="filtro-estado"
        value={filtro}
        onChange={(e) =>
          onFiltroChange(e.target.value as '' | 'pendiente' | 'enviado' | 'entregado')
        }
      >
        <option value="">Todos</option>
        <option value="pendiente">Pendiente</option>
        <option value="enviado">Enviado</option>
        <option value="entregado">Entregado</option>
      </select>
    </div>
  );
};

export default FiltroPedidos;

