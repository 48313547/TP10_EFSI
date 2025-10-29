import React, { useState } from 'react'

interface Item {
  idProducto: number | ''
  nombre: string
  cantidad: number | ''
  precio: number | ''
}

interface Pedido {
  cliente: string
  fecha: Date
  estado: string
  items: {
    idProducto: number
    nombre: string
    cantidad: number
    precio: number
  }[]
}

interface Errores {
  cliente?: string
  items?: string
}

interface FormularioNuevoPedidoProps {
  onAddOrder: (pedido: Pedido) => void
}

export default function FormularioNuevoPedido({ onAddOrder }: FormularioNuevoPedidoProps) {
  const [cliente, setCliente] = useState<string>('')
  const [estadoPedido, setEstadoPedido] = useState<string>('pendiente')
  const [items, setItems] = useState<Item[]>([
    { idProducto: '', nombre: '', cantidad: '', precio: '' },
  ])
  const [errores, setErrores] = useState<Errores>({})

  const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const nuevosErrores: Errores = {}

    if (!cliente || cliente.length < 3) {
      nuevosErrores.cliente = 'El nombre del cliente debe tener al menos 3 caracteres.'
    }

    const itemsValidos = items.filter(
      (item) =>
        typeof item.idProducto === 'number' &&
        item.idProducto > 0 &&
        item.nombre &&
        typeof item.cantidad === 'number' &&
        item.cantidad > 0 &&
        typeof item.precio === 'number' &&
        item.precio > 0
    )

    if (itemsValidos.length === 0) {
      nuevosErrores.items = 'Se requiere al menos un artículo válido.'
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }

    const nuevoPedido: Pedido = {
      cliente,
      fecha: new Date(),
      estado: estadoPedido,
      items: itemsValidos.map((item) => ({
        idProducto: Number(item.idProducto),
        nombre: item.nombre,
        cantidad: Number(item.cantidad),
        precio: Number(item.precio),
      })),
    }

    onAddOrder(nuevoPedido)
    setCliente('')
    setEstadoPedido('pendiente')
    setItems([{ idProducto: '', nombre: '', cantidad: '', precio: '' }])
    setErrores({})
  }

  const agregarItem = () => {
    setItems([...items, { idProducto: '', nombre: '', cantidad: '', precio: '' }])
  }

  const actualizarItem = (index: number, campo: keyof Item, valor: string) => {
    const nuevosItems = [...items]
    if (['idProducto', 'cantidad', 'precio'].includes(campo)) {
      const numero = parseFloat(valor)
      if (isNaN(numero) || numero <= 0) {
        nuevosItems[index][campo] = ''
      } else {
        nuevosItems[index][campo] = numero
      }
    } else {
      nuevosItems[index][campo] = valor
    }
    setItems(nuevosItems)
  }

  const removerItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  return (
    <form onSubmit={manejarEnvio} className="new-order-form">
  <h3>Agregar Nuevo Pedido</h3>

  <div className="cliente-estado">
    <input
      type="text"
      placeholder="Cliente"
      value={cliente}
      onChange={(e) => setCliente(e.target.value)}
      required
    />
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
        {items.length > 1 && (
          <button type="button" onClick={() => removerItem(index)}>
            Remover
          </button>
        )}
      </div>
    ))}
    <button type="button" onClick={agregarItem} className="add-item-btn">
      Agregar Artículo
    </button>
  </div>

  <button type="submit" className="submit-btn">
    Agregar Pedido
  </button>
</form>
  )
}