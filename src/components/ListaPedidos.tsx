import React from 'react';
import ItemPedido from './ItemPedido';

type EstadoPedido = 'pendiente' | 'enviado' | 'entregado';

interface ItemProducto {
  idProducto: number;
  nombre: string;
  cantidad: number;
  precio: number;
}

interface Pedido {
  id: number;
  cliente: string;
  fecha?: Date;
  estado?: EstadoPedido;
  items: ItemProducto[];
}

interface ListaPedidosProps {
  pedidos: Pedido[];
}

const ListaPedidos: React.FC<ListaPedidosProps> = ({ pedidos }) => {
  return (
    <div className="order-list">
      {pedidos.map((pedido) => (
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
};

export default ListaPedidos;

