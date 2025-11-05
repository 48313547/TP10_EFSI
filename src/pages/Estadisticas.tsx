import React, { useMemo } from "react";
import "./Estadisticas.css";

export default function Estadisticas({ pedidos }) {
  const stats = useMemo(() => ({
    total: pedidos.length,
    pendientes: pedidos.filter((p) => p.estado === "pendiente").length,
    enviados: pedidos.filter((p) => p.estado === "enviado").length,
    entregados: pedidos.filter((p) => p.estado === "entregado").length,
  }), [pedidos]);

  const chartHTML = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://code.highcharts.com/highcharts.js"></script>
      </head>
      <body style="margin:0">
        <div id="container" style="height:100%;width:100%;"></div>
        <script>
          document.addEventListener("DOMContentLoaded", function() {
            Highcharts.chart('container', {
              chart: { type: 'column', backgroundColor: '#f9f9f9' },
              title: { text: 'Estado de los pedidos' },
              xAxis: {
                categories: ['Pendientes', 'Enviados', 'Entregados'],
                title: { text: 'Estados' }
              },
              yAxis: {
                title: { text: 'Cantidad de pedidos' },
                allowDecimals: false
              },
              series: [{
                name: 'Pedidos',
                data: [${stats.pendientes}, ${stats.enviados}, ${stats.entregados}],
                colorByPoint: true
              }],
              credits: { enabled: false }
            });
          });
        </script>
      </body>
    </html>
  `;

  return (
    <div className="estadisticas-page">
      <div className="estadisticas-card">
        <h2 className="titulo-estadisticas">Estadísticas de Pedidos</h2>

        <div className="estadisticas-lineas">
          <p className="linea">Pendientes: <span>{stats.pendientes}</span></p>
          <p className="linea">Enviados: <span>{stats.enviados}</span></p>
          <p className="linea">Entregados: <span>{stats.entregados}</span></p>
        </div>

        <div className="total-pedidos">
          <h3>Total de Pedidos: <span>{stats.total}</span></h3>
        </div>

        <div className="grafico-container" style={{ height: "300px", marginTop: "20px" }}>
          <iframe
            title="highcharts"
            srcDoc={chartHTML}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          />
        </div>
      </div>
    </div>
  );
}



