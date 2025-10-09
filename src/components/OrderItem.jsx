import React from 'react';
import PropTypes from 'prop-types';

function ItemPedido({ id, cliente, fecha, estado, items }) {
  return (
    <div className="order-item" style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
      <h3>ID del Pedido: {id}</h3>
      <p><strong>Cliente:</strong> {cliente}</p>
      <p><strong>Fecha:</strong> {fecha.toLocaleDateString()}</p>
      <p><strong>Estado:</strong> {estado}</p>
      <div>
        <strong>Productos:</strong>
        <ul>
          {items.map(({ idProducto, nombre, cantidad, precio }) => (
            <li key={idProducto}>
              {nombre} - Cantidad: {cantidad} - Precio: ${precio.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

ItemPedido.propTypes = {
  id: PropTypes.number.isRequired,
  cliente: function(props, propName, componentName) {
    if (!props[propName]) {
      return new Error(`Falta la prop requerida '${propName}' en '${componentName}'.`);
    }
    if (typeof props[propName] !== 'string' || props[propName].length < 3) {
      return new Error(`Prop '${propName}' inválida en '${componentName}'. Debe ser una cadena con al menos 3 caracteres.`);
    }
  },
  fecha: PropTypes.instanceOf(Date),
  estado: PropTypes.oneOf(['pendiente', 'enviado', 'entregado']),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      idProducto: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
      cantidad: function(props, propName, componentName) {
        if (typeof props[propName] !== 'number' || props[propName] <= 0) {
          return new Error(`Prop '${propName}' inválida en '${componentName}'. Debe ser un número mayor que 0.`);
        }
      },
      precio: PropTypes.number.isRequired,
    })
  ).isRequired,
};

ItemPedido.defaultProps = {
  estado: 'pendiente',
  fecha: new Date(),
};

export default ItemPedido;
