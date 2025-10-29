import React from 'react';

type EstadoPedido = 'pendiente' | 'enviado' | 'entregado';

interface ItemProducto {
  idProducto: number;
  nombre: string;
  cantidad: number;
  precio: number;
}

interface ItemPedidoProps {
  id: number;
  cliente: string;
  fecha?: Date;
  estado?: EstadoPedido;
  items: ItemProducto[];
}

const ItemPedido: React.FC<ItemPedidoProps> = ({
  id,
  cliente,
  fecha = new Date(),
  estado = 'pendiente',
  items,
}) => {
  return (
    <div className="order-item">
      <h3>ID del Pedido: {id}</h3>
      <p>
        <strong>Cliente:</strong> {cliente}
      </p>
      <p>
        <strong>Fecha:</strong> {fecha.toLocaleDateString()}
      </p>
      <p>
        <strong>Estado:</strong> {estado}
      </p>
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
};

export default ItemPedido;

