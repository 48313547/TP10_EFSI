import React, { useState } from 'react';
import PropTypes from 'prop-types';

function FormularioNuevoPedido({ onAddOrder }) {
  const [cliente, setCliente] = useState('');
  const [estadoPedido, setEstadoPedido] = useState('pendiente');
  const [items, setItems] = useState([{ idProducto: '', nombre: '', cantidad: '', precio: '' }]);
  const [errores, setErrores] = useState({});

  const manejarEnvio = (e) => {
    e.preventDefault();
    const nuevosErrores = {};

    if (!cliente || cliente.length < 3) {
      nuevosErrores.cliente = 'El nombre del cliente debe tener al menos 3 caracteres.';
    }

    const itemsValidos = items.filter(
      item =>
        item.idProducto > 0 &&
        item.nombre &&
        item.cantidad > 0 &&
        item.precio > 0
    );

    if (itemsValidos.length === 0) {
      nuevosErrores.items = 'Se requiere al menos un artículo válido.';
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    const nuevoPedido = {
      cliente,
      fecha: new Date(),
      estado: estadoPedido,
      items: itemsValidos.map(item => ({
        idProducto: parseInt(item.idProducto),
        nombre: item.nombre,
        cantidad: parseInt(item.cantidad),
        precio: parseFloat(item.precio),
      })),
    };

    onAddOrder(nuevoPedido);
    setCliente('');
    setEstadoPedido('pendiente');
    setItems([{ idProducto: '', nombre: '', cantidad: '', precio: '' }]);
    setErrores({});
  };

  const agregarItem = () => {
    setItems([...items, { idProducto: '', nombre: '', cantidad: '', precio: '' }]);
  };

  const actualizarItem = (index, campo, valor) => {
    const nuevosItems = [...items];
    if (['idProducto', 'cantidad', 'precio'].includes(campo)) {
      const numero = parseFloat(valor);
      if (isNaN(numero) || numero <= 0) {
        nuevosItems[index][campo] = '';
      } else {
        nuevosItems[index][campo] = valor;
      }
    } else {
      nuevosItems[index][campo] = valor;
    }
    setItems(nuevosItems);
  };

  const removerItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={manejarEnvio} className="new-order-form">
      <h3>Agregar Nuevo Pedido</h3>

      <div>
        <label>Cliente:</label>
        <input
          type="text"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          required
        />
        {errores.cliente && <p className="error">{errores.cliente}</p>}
      </div>

      <div>
        <label>Estado:</label>
        <select
          value={estadoPedido}
          onChange={(e) => setEstadoPedido(e.target.value)}
        >
          <option value="pendiente">Pendiente</option>
          <option value="enviado">Enviado</option>
          <option value="entregado">Entregado</option>
        </select>
      </div>

      <div>
        <h4>Artículos:</h4>
        {items.map((item, index) => (
          <div key={index} className="item-row">
            <input
              type="number"
              placeholder="ID del Producto"
              value={item.idProducto}
              onChange={(e) => actualizarItem(index, 'idProducto', e.target.value)}
              min="1"
              required
            />
            <input
              type="text"
              placeholder="Nombre"
              value={item.nombre}
              onChange={(e) => actualizarItem(index, 'nombre', e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Cantidad"
              value={item.cantidad}
              onChange={(e) => actualizarItem(index, 'cantidad', e.target.value)}
              min="1"
              required
            />
            <input
              type="number"
              placeholder="Precio"
              value={item.precio}
              onChange={(e) => actualizarItem(index, 'precio', e.target.value)}
              min="0.01"
              step="0.01"
              required
            />
            <button type="button" onClick={() => removerItem(index)}>Remover</button>
          </div>
        ))}
        <button type="button" onClick={agregarItem}>Agregar Artículo</button>
        {errores.items && <p className="error">{errores.items}</p>}
      </div>

      <button type="submit">Agregar Pedido</button>
    </form>
  );
}

FormularioNuevoPedido.propTypes = {
  onAddOrder: PropTypes.func.isRequired,
};

export default FormularioNuevoPedido;