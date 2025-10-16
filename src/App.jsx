import { useState } from 'react';
import ListaPedidos from './components/ListaPedidos';
import FiltroPedidos from './components/FiltroPedidos';
import EstadisticasPedidos from './components/EstadisticasPedidos';
import FormularioNuevoPedido from './components/AgregarPedido';
import './App.css';

function Aplicacion() {
  const [pedidos, setPedidos] = useState([

  ]);

  const [filtro, setFiltro] = useState('');
  const [nextId, setNextId] = useState(1);

  const pedidosFiltrados = filtro ? pedidos.filter(pedido => pedido.estado === filtro) : pedidos;

  const estadisticas = {
    total: pedidos.length,
    pendientes: pedidos.filter(pedido => pedido.estado === 'pendiente').length,
    enviados: pedidos.filter(pedido => pedido.estado === 'enviado').length,
    entregados: pedidos.filter(pedido => pedido.estado === 'entregado').length,
  };

  const agregarPedido = (nuevoPedido) => {
    const pedidoConId = { ...nuevoPedido, id: nextId };
    setPedidos([...pedidos, pedidoConId]);
    setNextId(nextId + 1);
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
