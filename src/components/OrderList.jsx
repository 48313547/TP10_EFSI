import React from 'react';
import PropTypes from 'prop-types';
import ItemPedido from './OrderItem';

function ListaPedidos({ pedidos }) {
  return (
    <div className="order-list">
      {pedidos.map(pedido => (
        <ItemPedido
          key={pedido.id}
          id={pedido.id}
          cliente={pedido.cliente}
          fecha={pedido.fecha}
          estado={pedido.estado}
          items={pedido.items}
        />
      ))}
    </div>
  );
}

ListaPedidos.propTypes = {
  pedidos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      cliente: PropTypes.string.isRequired,
      fecha: PropTypes.instanceOf(Date),
      estado: PropTypes.oneOf(['pendiente', 'enviado', 'entregado']),
      items: PropTypes.arrayOf(
        PropTypes.shape({
          idProducto: PropTypes.number.isRequired,
          nombre: PropTypes.string.isRequired,
          cantidad: PropTypes.number.isRequired,
          precio: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default ListaPedidos;
