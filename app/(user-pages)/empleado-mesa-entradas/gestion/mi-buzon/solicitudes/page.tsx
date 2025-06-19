"use client"

import { useState } from "react"
import { ArrowLeft, Search, Mail, MailOpen, Paperclip } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DetalleSolicitudMiBuzonModal } from "@/components/solicitudes/detalle-solicitud-mi-buzon-modal"

// Datos de ejemplo para solicitudes
const solicitudesData = [
  {
    id: 1,
    remitente: "Transportes Marítimos S.A.",
    tipoEntidad: "Proveedor",
    asunto: "Solicitud de Redeterminación - Contrato de Servicios Portuarios",
    categoria: "Redeterminación",
    fecha: "2024-01-15",
    hora: "14:30",
    leido: false,
    estado: "Pendiente",
    adjuntos: ["contrato_original.pdf", "justificacion_redeterminacion.docx"],
    contenido:
      "Solicito la redeterminación del contrato de servicios portuarios debido al incremento en los costos de combustible y mano de obra. Adjunto documentación justificativa.",
    prioridad: "Media",
    numeroSolicitud: "RED-2024-001",
  },
  {
    id: 2,
    remitente: "Industrias Químicas del Sur",
    tipoEntidad: "Cliente",
    asunto: "Reclamo por Demora en Descarga de Contenedores",
    categoria: "Reclamos",
    fecha: "2024-01-15",
    hora: "11:15",
    leido: true,
    estado: "Pendiente",
    adjuntos: ["registro_tiempos.xlsx", "fotos_contenedores.zip"],
    contenido:
      "Presento formal reclamo por la demora excesiva en la descarga de contenedores del buque 'Mar del Plata' el día 12/01/2024. La demora generó sobrecostos operativos.",
    prioridad: "Media",
    numeroSolicitud: "REC-2024-003",
  },
  {
    id: 3,
    remitente: "Logística Integral Ltda.",
    tipoEntidad: "Proveedor",
    asunto: "Cambio de Datos - Actualización Información Bancaria",
    categoria: "Cambio de datos",
    fecha: "2024-01-14",
    hora: "16:45",
    leido: true,
    estado: "Procesada",
    adjuntos: ["certificacion_bancaria.pdf"],
    contenido:
      "Solicito el cambio de datos bancarios para el pago de facturas. Adjunto certificación bancaria con los nuevos datos de la cuenta corriente.",
    prioridad: "Baja",
    numeroSolicitud: "CAM-2024-012",
  },
  {
    id: 4,
    remitente: "Exportadora de Granos ABC",
    tipoEntidad: "Cliente",
    asunto: "Consulta sobre Tarifas de Almacenaje",
    categoria: "Consultas",
    fecha: "2024-01-14",
    hora: "09:20",
    leido: false,
    estado: "Pendiente",
    adjuntos: [],
    contenido:
      "Consulto sobre las tarifas vigentes para almacenaje de granos en silos. Necesito cotización para almacenamiento de 5000 toneladas de soja por 60 días.",
    prioridad: "Media",
    numeroSolicitud: "CON-2024-028",
  },
  {
    id: 5,
    remitente: "Servicios Portuarios del Atlántico",
    tipoEntidad: "Proveedor",
    asunto: "Reclamo por Facturación Incorrecta",
    categoria: "Reclamos",
    fecha: "2024-01-13",
    hora: "13:10",
    leido: true,
    estado: "Pendiente",
    adjuntos: ["factura_observada.pdf", "detalle_servicios.xlsx"],
    contenido:
      "Reclamo por facturación incorrecta en la factura N° 0001-00234567. Los servicios facturados no corresponden a los efectivamente prestados.",
    prioridad: "Media",
    numeroSolicitud: "REC-2024-004",
  },
  {
    id: 6,
    remitente: "Naviera del Río de la Plata",
    tipoEntidad: "Cliente",
    asunto: "Consulta sobre Procedimientos de Atraque",
    categoria: "Consultas",
    fecha: "2024-01-12",
    hora: "15:30",
    leido: true,
    estado: "Respondida",
    adjuntos: [],
    contenido:
      "Consulto sobre los nuevos procedimientos de atraque para buques de gran porte. Necesito información sobre documentación requerida y tiempos de gestión.",
    prioridad: "Baja",
    numeroSolicitud: "CON-2024-025",
  },
]

const tiposSolicitud = ["Todas", "Redeterminación", "Reclamos", "Cambio de datos", "Consultas"]

export default function MiBuzonSolicitudesPage() {
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

    const coincideTipo = filtroTipo === "Todas" || solicitud.categoria === filtroTipo
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
          href="/empleado-mesa-entradas/gestion/mi-buzon"
          className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Volver</span>
        </Link>
        <h1 className="text-2xl font-bold">Mi Buzón - Solicitudes</h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        {/* Barra de herramientas */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por asunto, remitente o departamento..."
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
                      {solicitud.tipoEntidad} - {solicitud.numeroSolicitud}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {solicitud.categoria}
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
                      {solicitud.tipoEntidad} - {solicitud.numeroSolicitud}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {solicitud.categoria}
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
      <DetalleSolicitudMiBuzonModal
        isOpen={modalAbierto}
        onClose={handleCloseModal}
        solicitud={solicitudSeleccionada}
      />
    </div>
  )
}
