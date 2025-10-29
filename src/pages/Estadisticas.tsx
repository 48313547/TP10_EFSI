import React from "react";
import "./Estadisticas.css";

export default function Estadisticas({ pedidos }) {
  const stats = {
    total: pedidos.length,
    pendientes: pedidos.filter((p) => p.estado === "pendiente").length,
    enviados: pedidos.filter((p) => p.estado === "enviado").length,
    entregados: pedidos.filter((p) => p.estado === "entregado").length,
  };

  return (
    <div className="estadisticas-page">
      <div className="estadisticas-card">
        <h2 className="titulo-estadisticas">  Estadísticas de Pedidos </h2>

        <div className="estadisticas-lineas">
          <p className="linea">Pendientes: <span>{stats.pendientes}</span></p>
          <p className="linea">Enviados: <span>{stats.enviados}</span></p>
          <p className="linea">Entregados: <span>{stats.entregados}</span></p>
        </div>

        <div className="total-pedidos">
          <h3>Total de Pedidos: <span>{stats.total}</span></h3>
        </div>
      </div>
    </div>
  );
}


