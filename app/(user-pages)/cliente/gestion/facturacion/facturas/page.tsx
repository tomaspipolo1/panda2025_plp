"use client"

import { useState } from "react"
import { TabsDocumentosCliente } from "@/components/facturas/tabs-documentos-cliente"
import { PanelDocumentosCliente } from "@/components/facturas/panel-documentos-cliente"

export default function FacturasClientePage() {
  const [activeTab, setActiveTab] = useState("facturas")

  // Datos de ejemplo para facturas
  const facturas = [
    {
      id: "1",
      fecha: "15/04/2023",
      numero: "FC-2023-0458",
      concepto: "Suministro de materiales",
      monto: 85430,
      estado: "Pendiente",
    },
    {
      id: "2",
      fecha: "10/04/2023",
      numero: "FC-2023-0457",
      concepto: "Servicios de consultoría",
      monto: 45000,
      estado: "Pagada",
    },
    {
      id: "3",
      fecha: "05/04/2023",
      numero: "FC-2023-0456",
      concepto: "Materiales de construcción",
      monto: 120750,
      estado: "Vencida",
    },
    {
      id: "4",
      fecha: "28/03/2023",
      numero: "FC-2023-0455",
      concepto: "Equipos informáticos",
      monto: 230000,
      estado: "Anulada",
    },
  ]

  // Datos de ejemplo para notas de crédito
  const notasCredito = [
    {
      id: "1",
      fecha: "12/04/2023",
      numero: "NC-2023-0089",
      concepto: "Devolución parcial",
      monto: 15430,
      estado: "Emitida",
    },
    {
      id: "2",
      fecha: "08/04/2023",
      numero: "NC-2023-0088",
      concepto: "Descuento por volumen",
      monto: 5000,
      estado: "Pagada",
    },
    {
      id: "3",
      fecha: "01/04/2023",
      numero: "NC-2023-0087",
      concepto: "Ajuste de precios",
      monto: 8750,
      estado: "Anulada",
    },
  ]

  // Datos de ejemplo para notas de débito
  const notasDebito = [
    {
      id: "1",
      fecha: "14/04/2023",
      numero: "ND-2023-0045",
      concepto: "Intereses por mora",
      monto: 5000,
      estado: "Pendiente",
    },
    {
      id: "2",
      fecha: "07/04/2023",
      numero: "ND-2023-0044",
      concepto: "Ajuste por diferencia cambiaria",
      monto: 3200,
      estado: "Pagada",
    },
    {
      id: "3",
      fecha: "02/04/2023",
      numero: "ND-2023-0043",
      concepto: "Cargo por flete adicional",
      monto: 4500,
      estado: "Vencida",
    },
  ]

  return (
    <div className="container mx-auto py-6">
      <TabsDocumentosCliente activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "facturas" && <PanelDocumentosCliente tipo="facturas" documentos={facturas} />}
      {activeTab === "notasCredito" && <PanelDocumentosCliente tipo="notasCredito" documentos={notasCredito} />}
      {activeTab === "notasDebito" && <PanelDocumentosCliente tipo="notasDebito" documentos={notasDebito} />}
    </div>
  )
}
