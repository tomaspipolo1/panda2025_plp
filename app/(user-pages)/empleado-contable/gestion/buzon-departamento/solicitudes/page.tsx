"use client"

import { useState } from "react"
import { ArrowLeft, Search, Mail, MailOpen, Paperclip } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DetalleSolicitudBuzonModal } from "@/components/solicitudes/detalle-solicitud-buzon-modal"

// Datos de ejemplo para solicitudes del departamento contable
const solicitudesData = [
  {
    id: 1,
    remitente: "Transportes Marítimos S.A.",
    tipoSolicitante: "Proveedor",
    asunto: "Consulta sobre Estado de Factura N° 0001-00234567",
    tipoSolicitud: "Facturación",
    fecha: "2024-01-15",
    hora: "14:30",
    leido: false,
    estado: "Pendiente",
    adjuntos: ["factura_original.pdf"],
    contenido:
      "Consulto sobre el estado de pago de la factura N° 0001-00234567 por servicios portuarios del mes de diciembre 2023.",
    prioridad: "Media",
    numeroSolicitud: "SOL-22118-2025",
    correo: "facturacion@transportesmaritimos.com",
    departamento: "Facturación",
    asignacion: "Pendiente",
    ultimaActualizacion: "2024-01-15 14:30",
  },
  {
    id: 2,
    remitente: "Industrias Químicas del Sur",
    tipoSolicitante: "Cliente",
    asunto: "Solicitud de Certificado de Retenciones",
    tipoSolicitud: "Certificados",
    fecha: "2024-01-15",
    hora: "11:15",
    leido: true,
    estado: "Pendiente",
    adjuntos: ["detalle_retenciones.xlsx"],
    contenido: "Solicito certificado de retenciones practicadas durante el año 2023 para presentación ante AFIP.",
    prioridad: "Media",
    numeroSolicitud: "SOL-22119-2025",
    correo: "contabilidad@industriasquimicas.com",
    departamento: "Contabilidad",
    asignacion: "Pendiente",
    ultimaActualizacion: "2024-01-15 11:15",
  },
  {
    id: 3,
    remitente: "Logística Integral Ltda.",
    tipoSolicitante: "Proveedor",
    asunto: "Reclamo por Nota de Débito Incorrecta",
    tipoSolicitud: "Reclamo",
    fecha: "2024-01-14",
    hora: "16:45",
    leido: true,
    estado: "Procesada",
    adjuntos: ["nota_debito.pdf", "justificacion_reclamo.docx"],
    contenido:
      "Reclamo por nota de débito incorrecta. Los conceptos facturados no corresponden a servicios efectivamente utilizados.",
    prioridad: "Alta",
    numeroSolicitud: "SOL-22120-2025",
    correo: "administracion@logisticaintegral.com",
    departamento: "Administración",
    asignacion: "Ana Martínez",
    ultimaActualizacion: "2024-01-14 16:45",
  },
  {
    id: 4,
    remitente: "Exportadora de Granos ABC",
    tipoSolicitante: "Cliente",
    asunto: "Solicitud de Plan de Pagos",
    tipoSolicitud: "Planes de Pago",
    fecha: "2024-01-14",
    hora: "09:20",
    leido: false,
    estado: "Pendiente",
    adjuntos: ["propuesta_plan_pagos.pdf"],
    contenido: "Solicito plan de pagos para regularizar deuda pendiente. Adjunto propuesta de cronograma de pagos.",
    prioridad: "Media",
    numeroSolicitud: "SOL-22121-2025",
    correo: "finanzas@exportadoragranos.com",
    departamento: "Finanzas",
    asignacion: "Pendiente",
    ultimaActualizacion: "2024-01-14 09:20",
  },
]

const tiposSolicitud = ["Todas", "Facturación", "Certificados", "Reclamo", "Planes de Pago"]

export default function BuzonSolicitudesContablePage() {
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<any>(null)
  const [filtroTipo, setFiltroTipo] = useState("Todas")
  const [busqueda, setBusqueda] = useState("")
  const [tabActiva, setTabActiva] = useState("todas")
  const [modalAbierto, setModalAbierto] = useState(false)

  // Filtrar solicitudes
  const solicitudesFiltradas = solicitudesData.filter((solicitud) => {
    const coincideBusqueda =
      solicitud.asunto.toLowerCase().includes(busqueda.toLowerCase()) ||
      solicitud.remitente.toLowerCase().includes(busqueda.toLowerCase()) ||
      solicitud.numeroSolicitud.toLowerCase().includes(busqueda.toLowerCase())

    const coincideTipo = filtroTipo === "Todas" || solicitud.tipoSolicitud === filtroTipo
    const coincideTab = tabActiva === "todas" || (tabActiva === "pendientes" && solicitud.estado === "Pendiente")

    return coincideBusqueda && coincideTipo && coincideTab
  })

  const handleSolicitudClick = (solicitud: any) => {
    setSolicitudSeleccionada(solicitud)
    setModalAbierto(true)
  }

  const handleCloseModal = () => {
    setModalAbierto(false)
    setSolicitudSeleccionada(null)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <Link
          href="/empleado-contable/gestion/buzon-departamento"
          className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Volver</span>
        </Link>
        <h1 className="text-2xl font-bold">Buzón Departamento - Solicitudes</h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        {/* Barra de herramientas */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por asunto, remitente o número de solicitud..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filtroTipo} onValueChange={setFiltroTipo}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                {tiposSolicitud.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={tabActiva} onValueChange={setTabActiva} className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
            <TabsTrigger value="todas">Todas las solicitudes ({solicitudesData.length})</TabsTrigger>
            <TabsTrigger value="pendientes">
              Pendientes ({solicitudesData.filter((s) => s.estado === "Pendiente").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="todas" className="mt-0">
            <div className="max-h-[600px] overflow-y-auto">
              {solicitudesFiltradas.map((solicitud) => (
                <div
                  key={solicitud.id}
                  onClick={() => handleSolicitudClick(solicitud)}
                  className="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {solicitud.leido ? (
                        <MailOpen className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Mail className="h-4 w-4 text-blue-600" />
                      )}
                      <span className="font-medium text-sm">{solicitud.remitente}</span>
                    </div>
                    <span className="text-xs text-gray-500">{solicitud.hora}</span>
                  </div>

                  <div className="mb-2">
                    <p className={`text-sm ${!solicitud.leido ? "font-semibold" : ""}`}>{solicitud.asunto}</p>
                    <p className="text-xs text-gray-600">
                      {solicitud.tipoSolicitante} - {solicitud.numeroSolicitud}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {solicitud.tipoSolicitud}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      {solicitud.adjuntos.length > 0 && (
                        <div className="flex items-center text-gray-400">
                          <Paperclip className="h-3 w-3 mr-1" />
                          <span className="text-xs">{solicitud.adjuntos.length}</span>
                        </div>
                      )}
                      <span className="text-xs text-gray-500">{solicitud.fecha}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pendientes" className="mt-0">
            <div className="max-h-[600px] overflow-y-auto">
              {solicitudesFiltradas.map((solicitud) => (
                <div
                  key={solicitud.id}
                  onClick={() => handleSolicitudClick(solicitud)}
                  className="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {solicitud.leido ? (
                        <MailOpen className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Mail className="h-4 w-4 text-blue-600" />
                      )}
                      <span className="font-medium text-sm">{solicitud.remitente}</span>
                    </div>
                    <span className="text-xs text-gray-500">{solicitud.hora}</span>
                  </div>

                  <div className="mb-2">
                    <p className={`text-sm ${!solicitud.leido ? "font-semibold" : ""}`}>{solicitud.asunto}</p>
                    <p className="text-xs text-gray-600">
                      {solicitud.tipoSolicitante} - {solicitud.numeroSolicitud}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {solicitud.tipoSolicitud}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      {solicitud.adjuntos.length > 0 && (
                        <div className="flex items-center text-gray-400">
                          <Paperclip className="h-3 w-3 mr-1" />
                          <span className="text-xs">{solicitud.adjuntos.length}</span>
                        </div>
                      )}
                      <span className="text-xs text-gray-500">{solicitud.fecha}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal de detalle */}
      <DetalleSolicitudBuzonModal isOpen={modalAbierto} onClose={handleCloseModal} solicitud={solicitudSeleccionada} />
    </div>
  )
}
