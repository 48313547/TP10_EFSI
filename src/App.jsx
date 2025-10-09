import { useState } from 'react';
import ListaPedidos from './components/OrderList';
import FiltroPedidos from './components/OrderFilter';
import EstadisticasPedidos from './components/OrderStats';
import FormularioNuevoPedido from './components/NewOrderForm';
import './App.css';

function Aplicacion() {
  const [pedidos, setPedidos] = useState([
    
  ]);

  const [filtro, setFiltro] = useState('');

  const pedidosFiltrados = filtro ? pedidos.filter(pedido => pedido.estado === filtro) : pedidos;

  const estadisticas = {
    total: pedidos.length,
    pendientes: pedidos.filter(pedido => pedido.estado === 'pendiente').length,
    enviados: pedidos.filter(pedido => pedido.estado === 'enviado').length,
    entregados: pedidos.filter(pedido => pedido.estado === 'entregado').length,
  };

  const agregarPedido = (nuevoPedido) => {
    setPedidos([...pedidos, nuevoPedido]);
  };

  return (
    <div className="app">
      <h1>Sistema de Gestión de Pedidos</h1>
      <FormularioNuevoPedido onAddOrder={agregarPedido} />
      <FiltroPedidos filtro={filtro} onFiltroChange={setFiltro} />
      <EstadisticasPedidos {...estadisticas} />
      <ListaPedidos pedidos={pedidosFiltrados} />
    </div>
  );
}

export default Aplicacion;
