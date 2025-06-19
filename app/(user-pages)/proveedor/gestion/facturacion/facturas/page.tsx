"use client"

import { useState } from "react"
import { TabsDocumentos } from "@/components/facturas/tabs-documentos"
import { PanelDocumentos } from "@/components/facturas/panel-documentos"

// Datos de ejemplo para facturas
const facturasData = [
  {
    id: "1",
    fecha: "15/04/2023",
    numero: "FC-2023-0458",
    cliente: "Empresa ABC S.A.",
    concepto: "Suministro de materiales",
    monto: 85430.0,
    estado: "Ingresada",
    historial: [
      {
        usuario: "Marcelo Proveedor",
        accion: "Carga factura",
        fecha: "15/04/2023 10:30",
      },
    ],
    detalles: {
      fechaVencimiento: "15/05/2023",
      ordenCompra: "OC-2023-0123",
      formaPago: "Transferencia bancaria",
      observaciones: "Entrega realizada en depósito central",
      items: [
        {
          codigo: "MAT-001",
          descripcion: "Cemento Portland x 50kg",
          cantidad: 50,
          precioUnitario: 1200.0,
          subtotal: 60000.0,
        },
        {
          codigo: "MAT-002",
          descripcion: "Arena fina x m³",
          cantidad: 10,
          precioUnitario: 2500.0,
          subtotal: 25000.0,
        },
      ],
    },
  },
  {
    id: "2",
    fecha: "10/04/2023",
    numero: "FC-2023-0457",
    cliente: "Distribuidora XYZ",
    concepto: "Servicios de consultoría",
    monto: 45000.0,
    estado: "En Proceso",
    historial: [
      {
        usuario: "Marcelo Proveedor",
        accion: "Carga factura",
        fecha: "10/04/2023 09:15",
      },
      {
        usuario: "Sistema SAP",
        accion: "Ingreso a ME",
        fecha: "11/04/2023 14:20",
      },
    ],
    detalles: {
      fechaVencimiento: "10/05/2023",
      ordenCompra: "OC-2023-0120",
      formaPago: "Cheque a 30 días",
      observaciones: "Servicios prestados según contrato marco",
      items: [
        {
          codigo: "SERV-001",
          descripcion: "Consultoría técnica",
          cantidad: 20,
          precioUnitario: 2000.0,
          subtotal: 40000.0,
        },
        {
          codigo: "SERV-002",
          descripcion: "Elaboración de informes",
          cantidad: 1,
          precioUnitario: 5000.0,
          subtotal: 5000.0,
        },
      ],
    },
  },
  {
    id: "3",
    fecha: "05/04/2023",
    numero: "FC-2023-0456",
    cliente: "Constructora Norte",
    concepto: "Materiales de construcción",
    monto: 120750.0,
    estado: "Paga",
    historial: [
      {
        usuario: "Marcelo Proveedor",
        accion: "Carga factura",
        fecha: "05/04/2023 11:45",
      },
      {
        usuario: "Sistema SAP",
        accion: "Ingreso a ME",
        fecha: "06/04/2023 10:30",
      },
      {
        usuario: "Sistema SAP",
        accion: "Contabilidad en SAP",
        fecha: "08/04/2023 16:20",
      },
      {
        usuario: "Sistema SAP",
        accion: "Pago realizado",
        fecha: "12/04/2023 14:15",
      },
    ],
    detalles: {
      fechaVencimiento: "05/05/2023",
      ordenCompra: "OC-2023-0115",
      formaPago: "Transferencia bancaria",
      observaciones: "Entrega en obra según cronograma",
      items: [
        {
          codigo: "MAT-003",
          descripcion: "Hierro nervado 8mm x 12m",
          cantidad: 100,
          precioUnitario: 800.0,
          subtotal: 80000.0,
        },
        {
          codigo: "MAT-004",
          descripcion: "Ladrillos huecos 18x18x33",
          cantidad: 1500,
          precioUnitario: 25.0,
          subtotal: 37500.0,
        },
        {
          codigo: "MAT-005",
          descripcion: "Cal hidratada x 25kg",
          cantidad: 13,
          precioUnitario: 250.0,
          subtotal: 3250.0,
        },
      ],
    },
  },
  {
    id: "4",
    fecha: "28/03/2023",
    numero: "FC-2023-0455",
    cliente: "Tecnología Avanzada S.A.",
    concepto: "Equipos informáticos",
    monto: 230000.0,
    estado: "En Proceso",
    historial: [
      {
        usuario: "Marcelo Proveedor",
        accion: "Carga factura",
        fecha: "28/03/2023 15:30",
      },
      {
        usuario: "Sistema SAP",
        accion: "Ingreso a ME",
        fecha: "29/03/2023 09:45",
      },
      {
        usuario: "Sistema SAP",
        accion: "Contabilidad en SAP",
        fecha: "02/04/2023 11:20",
      },
    ],
    detalles: {
      fechaVencimiento: "28/04/2023",
      ordenCompra: "OC-2023-0110",
      formaPago: "Transferencia bancaria",
      observaciones: "Incluye instalación y configuración",
      items: [
        {
          codigo: "EQ-001",
          descripcion: "Notebook HP ProBook",
          cantidad: 5,
          precioUnitario: 35000.0,
          subtotal: 175000.0,
        },
        {
          codigo: "EQ-002",
          descripcion: 'Monitor 24" Samsung',
          cantidad: 10,
          precioUnitario: 5500.0,
          subtotal: 55000.0,
        },
      ],
    },
  },
]

// Datos de ejemplo para notas de crédito
const notasCreditoData = [
  {
    id: "1",
    fecha: "12/04/2023",
    numero: "NC-2023-0089",
    cliente: "Empresa ABC S.A.",
    concepto: "Devolución parcial",
    monto: 15430.0,
    estado: "Ingresada",
    historial: [
      {
        usuario: "Marcelo Proveedor",
        accion: "Carga nota de crédito",
        fecha: "12/04/2023 10:30",
      },
    ],
    detalles: {
      fechaVencimiento: "12/05/2023",
      ordenCompra: "OC-2023-0123",
      formaPago: "Transferencia bancaria",
      observaciones: "Devolución por productos dañados",
      items: [
        {
          codigo: "MAT-001",
          descripcion: "Cemento Portland x 50kg",
          cantidad: 10,
          precioUnitario: 1200.0,
          subtotal: 12000.0,
        },
        {
          codigo: "MAT-002",
          descripcion: "Arena fina x m³",
          cantidad: 1.5,
          precioUnitario: 2500.0,
          subtotal: 3750.0,
        },
      ],
    },
  },
  {
    id: "2",
    fecha: "08/04/2023",
    numero: "NC-2023-0088",
    cliente: "Distribuidora XYZ",
    concepto: "Descuento por volumen",
    monto: 5000.0,
    estado: "Paga",
    historial: [
      {
        usuario: "Marcelo Proveedor",
        accion: "Carga nota de crédito",
        fecha: "08/04/2023 09:15",
      },
      {
        usuario: "Sistema SAP",
        accion: "Ingreso a ME",
        fecha: "09/04/2023 14:20",
      },
      {
        usuario: "Sistema SAP",
        accion: "Contabilidad en SAP",
        fecha: "10/04/2023 16:20",
      },
      {
        usuario: "Sistema SAP",
        accion: "Procesamiento completado",
        fecha: "12/04/2023 14:15",
      },
    ],
    detalles: {
      fechaVencimiento: "08/05/2023",
      ordenCompra: "OC-2023-0120",
      formaPago: "Cheque a 30 días",
      observaciones: "Descuento por volumen según acuerdo comercial",
      items: [
        {
          codigo: "DESC-001",
          descripcion: "Descuento por volumen",
          cantidad: 1,
          precioUnitario: 5000.0,
          subtotal: 5000.0,
        },
      ],
    },
  },
  {
    id: "3",
    fecha: "01/04/2023",
    numero: "NC-2023-0087",
    cliente: "Constructora Norte",
    concepto: "Ajuste de precios",
    monto: 8750.0,
    estado: "En Proceso",
    historial: [
      {
        usuario: "Marcelo Proveedor",
        accion: "Carga nota de crédito",
        fecha: "01/04/2023 11:45",
      },
      {
        usuario: "Sistema SAP",
        accion: "Ingreso a ME",
        fecha: "02/04/2023 10:30",
      },
    ],
    detalles: {
      fechaVencimiento: "01/05/2023",
      ordenCompra: "OC-2023-0115",
      formaPago: "Transferencia bancaria",
      observaciones: "Ajuste de precios según contrato",
      items: [
        {
          codigo: "MAT-004",
          descripcion: "Ladrillos huecos 18x18x33",
          cantidad: 350,
          precioUnitario: 25.0,
          subtotal: 8750.0,
        },
      ],
    },
  },
]

// Datos de ejemplo para notas de débito
const notasDebitoData = [
  {
    id: "1",
    fecha: "14/04/2023",
    numero: "ND-2023-0045",
    cliente: "Empresa ABC S.A.",
    concepto: "Intereses por mora",
    monto: 5000.0,
    estado: "Ingresada",
    historial: [
      {
        usuario: "Marcelo Proveedor",
        accion: "Carga nota de débito",
        fecha: "14/04/2023 10:30",
      },
    ],
    detalles: {
      fechaVencimiento: "14/05/2023",
      ordenCompra: "OC-2023-0123",
      formaPago: "Transferencia bancaria",
      observaciones: "Intereses por pago fuera de término",
      items: [
        {
          codigo: "INT-001",
          descripcion: "Intereses por mora",
          cantidad: 1,
          precioUnitario: 5000.0,
          subtotal: 5000.0,
        },
      ],
    },
  },
  {
    id: "2",
    fecha: "07/04/2023",
    numero: "ND-2023-0044",
    cliente: "Distribuidora XYZ",
    concepto: "Ajuste por diferencia cambiaria",
    monto: 3200.0,
    estado: "Paga",
    historial: [
      {
        usuario: "Marcelo Proveedor",
        accion: "Carga nota de débito",
        fecha: "07/04/2023 09:15",
      },
      {
        usuario: "Sistema SAP",
        accion: "Ingreso a ME",
        fecha: "08/04/2023 14:20",
      },
      {
        usuario: "Sistema SAP",
        accion: "Contabilidad en SAP",
        fecha: "09/04/2023 16:20",
      },
      {
        usuario: "Sistema SAP",
        accion: "Procesamiento completado",
        fecha: "11/04/2023 14:15",
      },
    ],
    detalles: {
      fechaVencimiento: "07/05/2023",
      ordenCompra: "OC-2023-0120",
      formaPago: "Cheque a 30 días",
      observaciones: "Ajuste por diferencia cambiaria según contrato",
      items: [
        {
          codigo: "AJUSTE-001",
          descripcion: "Diferencia cambiaria",
          cantidad: 1,
          precioUnitario: 3200.0,
          subtotal: 3200.0,
        },
      ],
    },
  },
  {
    id: "3",
    fecha: "02/04/2023",
    numero: "ND-2023-0043",
    cliente: "Constructora Norte",
    concepto: "Cargo por flete adicional",
    monto: 4500.0,
    estado: "En Proceso",
    historial: [
      {
        usuario: "Marcelo Proveedor",
        accion: "Carga nota de débito",
        fecha: "02/04/2023 11:45",
      },
      {
        usuario: "Sistema SAP",
        accion: "Ingreso a ME",
        fecha: "03/04/2023 10:30",
      },
      {
        usuario: "Sistema SAP",
        accion: "Contabilidad en SAP",
        fecha: "05/04/2023 16:20",
      },
    ],
    detalles: {
      fechaVencimiento: "02/05/2023",
      ordenCompra: "OC-2023-0115",
      formaPago: "Transferencia bancaria",
      observaciones: "Cargo por flete adicional no contemplado",
      items: [
        {
          codigo: "FLETE-001",
          descripcion: "Flete adicional",
          cantidad: 1,
          precioUnitario: 4500.0,
          subtotal: 4500.0,
        },
      ],
    },
  },
]

export default function FacturasPage() {
  const [activeTab, setActiveTab] = useState("facturas")

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div className="p-6">
      <TabsDocumentos activeTab={activeTab} onTabChange={handleTabChange} />

      {activeTab === "facturas" && <PanelDocumentos tipo="facturas" documentos={facturasData} />}
      {activeTab === "notasCredito" && <PanelDocumentos tipo="notasCredito" documentos={notasCreditoData} />}
      {activeTab === "notasDebito" && <PanelDocumentos tipo="notasDebito" documentos={notasDebitoData} />}
    </div>
  )
}
