"use client"

import { useState } from "react"
import { ArrowLeft, Search, Mail, MailOpen, Paperclip } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DetalleSolicitudBuzonModal } from "@/components/solicitudes/detalle-solicitud-buzon-modal"

// Datos de ejemplo para solicitudes del departamento de prensa
const solicitudesData = [
  {
    id: 1,
    remitente: "Diario La Nación",
    tipoSolicitante: "Proveedor",
    asunto: "Solicitud de Entrevista - Nuevas Inversiones Portuarias",
    tipoSolicitud: "Consulta",
    fecha: "2024-01-15",
    hora: "14:30",
    leido: false,
    estado: "Pendiente",
    adjuntos: ["preguntas_entrevista.docx"],
    contenido:
      "Solicitamos una entrevista con el Director del Puerto para cubrir las nuevas inversiones en infraestructura portuaria anunciadas para 2024.",
    prioridad: "Media",
    numeroSolicitud: "SOL-22112-2025",
    correo: "prensa@lanacion.com.ar",
    departamento: "-",
    asignacion: "Pendiente",
    ultimaActualizacion: "2024-01-15 14:30",
  },
  {
    id: 2,
    remitente: "Canal 7 Televisión",
    tipoSolicitante: "Proveedor",
    asunto: "Cobertura Especial - Llegada de Cruceros",
    tipoSolicitud: "Acceso a obra",
    fecha: "2024-01-15",
    hora: "11:15",
    leido: true,
    estado: "Pendiente",
    adjuntos: ["cronograma_cruceros.pdf"],
    contenido:
      "Solicitamos autorización para realizar cobertura especial de la temporada de cruceros 2024. Necesitamos acceso a muelles y entrevistas.",
    prioridad: "Media",
    numeroSolicitud: "SOL-22113-2025",
    correo: "produccion@canal7.com",
    departamento: "-",
    asignacion: "Pendiente",
    ultimaActualizacion: "2024-01-15 11:15",
  },
  {
    id: 3,
    remitente: "Radio Continental",
    tipoSolicitante: "Cliente",
    asunto: "Información sobre Estadísticas Portuarias",
    tipoSolicitud: "Consulta",
    fecha: "2024-01-14",
    hora: "16:45",
    leido: true,
    estado: "Respondida",
    adjuntos: [],
    contenido:
      "Solicitamos información actualizada sobre estadísticas de movimiento de cargas y pasajeros para programa especial sobre el puerto.",
    prioridad: "Baja",
    numeroSolicitud: "SOL-22114-2025",
    correo: "info@radiocontinental.com",
    departamento: "-",
    asignacion: "María González",
    ultimaActualizacion: "2024-01-14 16:45",
  },
  {
    id: 4,
    remitente: "Agencia Télam",
    tipoSolicitante: "Proveedor",
    asunto: "Consulta sobre Nuevos Protocolos Ambientales",
    tipoSolicitud: "Consulta",
    fecha: "2024-01-14",
    hora: "09:20",
    leido: false,
    estado: "Pendiente",
    adjuntos: [],
    contenido:
      "Consultamos sobre los nuevos protocolos ambientales implementados en el puerto y su impacto en las operaciones.",
    prioridad: "Media",
    numeroSolicitud: "SOL-22115-2025",
    correo: "redaccion@telam.com.ar",
    departamento: "-",
    asignacion: "Pendiente",
    ultimaActualizacion: "2024-01-14 09:20",
  },
  {
    id: 5,
    remitente: "Revista Puerto y Logística",
    tipoSolicitante: "Cliente",
    asunto: "Solicitud de Material Fotográfico",
    tipoSolicitud: "Redeterminación",
    fecha: "2024-01-13",
    hora: "13:10",
    leido: true,
    estado: "Pendiente",
    adjuntos: ["especificaciones_fotos.pdf"],
    contenido:
      "Solicitamos material fotográfico de alta resolución de las nuevas instalaciones portuarias para artículo especial.",
    prioridad: "Baja",
    numeroSolicitud: "SOL-22116-2025",
    correo: "editorial@puertoylogistica.com",
    departamento: "-",
    asignacion: "Pendiente",
    ultimaActualizacion: "2024-01-13 13:10",
  },
  {
    id: 6,
    remitente: "Roberto Martínez",
    tipoSolicitante: "Empleado",
    asunto: "Comunicado de Prensa - Nueva Terminal",
    tipoSolicitud: "Documentación",
    fecha: "2024-01-12",
    hora: "10:30",
    leido: true,
    estado: "Asignada",
    adjuntos: ["especificaciones_terminal.pdf"],
    contenido:
      "Solicito la elaboración y difusión de un comunicado de prensa sobre la inauguración de la nueva terminal de contenedores. Se requiere coordinación con medios locales y nacionales para máxima cobertura.",
    prioridad: "Media",
    numeroSolicitud: "SOL-22117-2025",
    correo: "roberto.martinez@puerto.com",
    departamento: "Gerencia General",
    asignacion: "Carlos López",
    ultimaActualizacion: "2024-01-12 10:30",
  },
]

const tiposSolicitud = [
  "Todas",
  // Para empleados
  "Licencia ordinaria anual",
  "Licencia medica",
  "Dia de tramite",
  "Solicitud de prestamo",
  "Documentación",
  "Otros",
  // Para clientes y proveedores
  "Redeterminación",
  "Cambio de datos",
  "Reclamo",
  "Consulta",
  "Acceso a obra"
]

export default function BuzonSolicitudesPrensaPage() {
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
          href="/empleado-prensa/gestion/buzon-departamento"
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
                placeholder="Buscar por asunto, remitente o número..."
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
