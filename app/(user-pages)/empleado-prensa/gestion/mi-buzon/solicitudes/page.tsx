"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Filter, Printer, Download, Eye, X, Check, FileText, Clock, User, Building, Calendar, Mail } from "lucide-react"

// Tipos para las solicitudes de prensa
// Adaptado de compras, pero con datos de ejemplo de prensa

type SolicitudPrensa = {
  id: number
  fecha: string
  numero: string
  solicitante: string
  tipoSolicitante: string
  departamento: string
  tipo: string
  asunto: string
  estado: string
  ultimaActualizacion: string
  descripcion?: string
  comentarios?: string[]
  firmantes?: Array<{
    id: number
    nombre: string
    cargo: string
    estado: "Pendiente" | "Firmado" | "Rechazado" | "En espera"
    fechaFirma?: string
    observaciones?: string
    esActual: boolean
  }>
  correo?: string
  asignacion?: string
  adjuntos?: string[]
}

export default function SolicitudesPrensaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [numeroSolicitud, setNumeroSolicitud] = useState("")
  const [nombreSolicitante, setNombreSolicitante] = useState("")
  const [departamentoFilter, setDepartamentoFilter] = useState("Todos")
  const [tipoFilter, setTipoFilter] = useState("Todos")
  const [activeTab, setActiveTab] = useState("recibidas")

  // Estados para el modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSolicitud, setSelectedSolicitud] = useState<SolicitudPrensa | null>(null)

  // Estados para los modales de confirmación
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [observacion, setObservacion] = useState("")

  // Datos de ejemplo para la tabla de solicitudes recibidas en Prensa
  const solicitudesRecibidas: SolicitudPrensa[] = [
    {
      id: 1,
      numero: "SOL-2024-2001",
      tipo: "Documentación",
      tipoSolicitante: "Empleado",
      asunto: "Comunicado de Prensa - Nueva Terminal",
      descripcion:
        "Solicito la elaboración y difusión de un comunicado de prensa sobre la inauguración de la nueva terminal de contenedores. Se requiere coordinación con medios locales y nacionales para máxima cobertura.",
      fecha: "15/01/2024",
      estado: "Pendiente",
      ultimaActualizacion: "15/01/2024",
      solicitante: "Roberto Martínez",
      departamento: "Gerencia General",
      correo: "roberto.martinez@puerto.com",
      asignacion: "Ana Maria Vazques",
      comentarios: [
        "15/01/2024 - Sistema: Solicitud creada",
        "15/01/2024 - Roberto Martínez: Adjunta especificaciones",
      ],
      firmantes: [
        {
          id: 1,
          nombre: "Ana García",
          cargo: "Jefa de Prensa",
          estado: "Pendiente",
          esActual: true,
          observaciones: "Pendiente de revisión de contenido",
        },
        {
          id: 2,
          nombre: "Carlos López",
          cargo: "Gerente de Comunicación",
          estado: "En espera",
          esActual: false,
        },
      ],
    },
    {
      id: 2,
      numero: "SOL-2024-2002",
      tipo: "Consulta",
      tipoSolicitante: "Proveedor",
      asunto: "Solicitud de Entrevista - Nuevas Inversiones Portuarias",
      descripcion:
        "Solicitamos una entrevista con el Director del Puerto para cubrir las nuevas inversiones en infraestructura portuaria anunciadas para 2024.",
      fecha: "15/01/2024",
      estado: "Pendiente",
      ultimaActualizacion: "15/01/2024",
      solicitante: "Diario La Nación",
      departamento: "-",
      correo: "prensa@lanacion.com.ar",
      asignacion: "Ana Maria Vazques",
      comentarios: [
        "15/01/2024 - Sistema: Solicitud creada",
        "15/01/2024 - Diario La Nación: Adjunta preguntas de la entrevista",
      ],
      firmantes: [
        {
          id: 1,
          nombre: "Ana García",
          cargo: "Jefa de Prensa",
          estado: "Pendiente",
          esActual: true,
        },
      ],
    },
    {
      id: 3,
      numero: "SOL-2024-2003",
      tipo: "Acceso a obra",
      tipoSolicitante: "Proveedor",
      asunto: "Cobertura Especial - Llegada de Cruceros",
      descripcion:
        "Solicitamos autorización para realizar cobertura especial de la temporada de cruceros 2024. Necesitamos acceso a muelles y entrevistas.",
      fecha: "14/01/2024",
      estado: "Aprobada",
      ultimaActualizacion: "14/01/2024",
      solicitante: "Canal 7 Televisión",
      departamento: "-",
      correo: "produccion@canal7.com",
      asignacion: "Ana Maria Vazques",
      comentarios: [
        "14/01/2024 - Sistema: Solicitud creada",
      ],
      firmantes: [],
    },
    {
      id: 4,
      numero: "SOL-2024-2004",
      tipo: "Consulta",
      tipoSolicitante: "Cliente",
      asunto: "Información sobre Estadísticas Portuarias",
      descripcion:
        "Solicitamos información actualizada sobre estadísticas de movimiento de cargas y pasajeros para programa especial sobre el puerto.",
      fecha: "14/01/2024",
      estado: "Pendiente",
      ultimaActualizacion: "14/01/2024",
      solicitante: "Radio Continental",
      departamento: "-",
      correo: "info@radiocontinental.com",
      asignacion: "Ana Maria Vazques",
      comentarios: [
        "14/01/2024 - Sistema: Solicitud creada",
      ],
      firmantes: [],
    },
    {
      id: 5,
      numero: "SOL-2024-2005",
      tipo: "Documentación",
      tipoSolicitante: "Empleado",
      asunto: "Cobertura mediática para llegada de crucero",
      descripcion:
        "Solicito cobertura mediática para la llegada del crucero 'Majestic Princess' el próximo viernes. Se requiere presencia de fotógrafo y coordinación con medios para entrevistas con pasajeros y autoridades portuarias.",
      fecha: "13/01/2024",
      estado: "Rechazada",
      ultimaActualizacion: "13/01/2024",
      solicitante: "María Fernández",
      departamento: "Operaciones Portuarias",
      correo: "maria.fernandez@puerto.com",
      asignacion: "Ana Maria Vazques",
      comentarios: [
        "13/01/2024 - Sistema: Solicitud creada",
      ],
      firmantes: [],
    },
    {
      id: 6,
      numero: "SOL-2024-2006",
      tipo: "Consulta",
      tipoSolicitante: "Proveedor",
      asunto: "Consulta sobre Nuevos Protocolos Ambientales",
      descripcion:
        "Consultamos sobre los nuevos protocolos ambientales implementados en el puerto y su impacto en las operaciones.",
      fecha: "13/01/2024",
      estado: "Aprobada",
      ultimaActualizacion: "13/01/2024",
      solicitante: "Agencia Télam",
      departamento: "-",
      correo: "redaccion@telam.com.ar",
      asignacion: "Ana Maria Vazques",
      comentarios: [
        "13/01/2024 - Sistema: Solicitud creada",
      ],
      firmantes: [],
    },
    {
      id: 7,
      numero: "SOL-2024-2007",
      tipo: "Redeterminación",
      tipoSolicitante: "Cliente",
      asunto: "Solicitud de Material Fotográfico",
      descripcion:
        "Solicitamos material fotográfico de alta resolución de las nuevas instalaciones portuarias para artículo especial.",
      fecha: "12/01/2024",
      estado: "Pendiente",
      ultimaActualizacion: "12/01/2024",
      solicitante: "Revista Puerto y Logística",
      departamento: "-",
      correo: "editorial@puertoylogistica.com",
      asignacion: "Ana Maria Vazques",
      comentarios: [
        "12/01/2024 - Sistema: Solicitud creada",
      ],
      firmantes: [],
    },
    {
      id: 8,
      numero: "SOL-2024-2008",
      tipo: "Documentación",
      tipoSolicitante: "Empleado",
      asunto: "Entrevista con presidente del puerto para revista especializada",
      descripcion:
        "La revista 'Puertos y Logística' solicita entrevista exclusiva con el presidente del puerto para su edición especial sobre infraestructura portuaria argentina. Fecha propuesta: 28 de abril.",
      fecha: "12/01/2024",
      estado: "Aprobada",
      ultimaActualizacion: "12/01/2024",
      solicitante: "Diego Torres",
      departamento: "Administración",
      correo: "diego.torres@puerto.com",
      asignacion: "Ana Maria Vazques",
      comentarios: [
        "12/01/2024 - Sistema: Solicitud creada",
      ],
      firmantes: [],
    },
  ]

  // Filtrar solicitudes pendientes
  const solicitudesPendientes = solicitudesRecibidas.filter((solicitud) => solicitud.estado === "Pendiente")

  // Función para filtrar las solicitudes
  const filterSolicitudes = (solicitudes: SolicitudPrensa[]) => {
    return solicitudes.filter((solicitud) => {
      const matchesNumero = numeroSolicitud === "" || solicitud.numero.includes(numeroSolicitud)
      const matchesSolicitante = nombreSolicitante === "" || solicitud.solicitante.toLowerCase().includes(nombreSolicitante.toLowerCase())
      const matchesDepartamento = departamentoFilter === "Todos" || solicitud.departamento === departamentoFilter
      const matchesTipo = tipoFilter === "Todos" || solicitud.tipo === tipoFilter
      const matchesSearch = searchTerm === "" || Object.values(solicitud).some((value) => typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesNumero && matchesSolicitante && matchesDepartamento && matchesTipo && matchesSearch
    })
  }

  const filteredTodasSolicitudes = filterSolicitudes(solicitudesRecibidas)
  const filteredSolicitudesPendientes = filterSolicitudes(solicitudesPendientes)

  const handleClearFilters = () => {
    setNumeroSolicitud("")
    setNombreSolicitante("")
    setDepartamentoFilter("Todos")
    setTipoFilter("Todos")
  }

  const handleOpenModal = (solicitud: SolicitudPrensa) => {
    setSelectedSolicitud(solicitud)
    setIsModalOpen(true)
  }

  const handleOpenApproveModal = (solicitud?: SolicitudPrensa) => {
    if (solicitud) {
      setSelectedSolicitud(solicitud)
    }
    setIsApproveModalOpen(true)
    setIsModalOpen(false)
  }

  const handleOpenRejectModal = (solicitud?: SolicitudPrensa) => {
    if (solicitud) {
      setSelectedSolicitud(solicitud)
    }
    setIsRejectModalOpen(true)
    setIsModalOpen(false)
  }

  const handleConfirmApprove = () => {
    setIsApproveModalOpen(false)
    setObservacion("")
  }

  const handleConfirmReject = () => {
    setIsRejectModalOpen(false)
    setObservacion("")
  }

  const renderEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "En Revisión":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En Revisión</Badge>
      case "Aprobada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobada</Badge>
      case "Rechazada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazada</Badge>
      case "Respondida":
        return <Badge className="bg-green-50 text-green-700 hover:bg-green-100">Respondida</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recibidas">Solicitudes Recibidas</TabsTrigger>
          <TabsTrigger value="pendientes" className="relative">
            Pendientes de Aprobación
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white hover:bg-red-600">
              {solicitudesPendientes.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Tab de Recibidas */}
        <TabsContent value="recibidas" className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Solicitudes Recibidas - Prensa</h1>
            <div className="flex space-x-2">
              <Button variant="outline" className="flex items-center">
                <Printer className="mr-2 h-4 w-4" />
                Imprimir
              </Button>
              <Button variant="outline" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>

          {/* Filtros */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Filtros</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="numeroSolicitudRecibidas" className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Solicitud
                </label>
                <Input
                  id="numeroSolicitudRecibidas"
                  placeholder="Ej: SOL-2024-2001"
                  className="w-full"
                  value={numeroSolicitud}
                  onChange={(e) => setNumeroSolicitud(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="solicitanteRecibidas" className="block text-sm font-medium text-gray-700 mb-1">
                  Solicitante
                </label>
                <Input
                  id="solicitanteRecibidas"
                  placeholder="Nombre del solicitante"
                  className="w-full"
                  value={nombreSolicitante}
                  onChange={(e) => setNombreSolicitante(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="departamentoRecibidas" className="block text-sm font-medium text-gray-700 mb-1">
                  Departamento
                </label>
                <Select value={departamentoFilter} onValueChange={setDepartamentoFilter}>
                  <SelectTrigger id="departamentoRecibidas">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="Gerencia General">Gerencia General</SelectItem>
                    <SelectItem value="Operaciones Portuarias">Operaciones Portuarias</SelectItem>
                    <SelectItem value="Administración">Administración</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="tipoSolicitudRecibidas" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Solicitud
                </label>
                <Select value={tipoFilter} onValueChange={setTipoFilter}>
                  <SelectTrigger id="tipoSolicitudRecibidas">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="Documentación">Documentación</SelectItem>
                    <SelectItem value="Consulta">Consulta</SelectItem>
                    <SelectItem value="Acceso a obra">Acceso a obra</SelectItem>
                    <SelectItem value="Redeterminación">Redeterminación</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <Button variant="outline" onClick={handleClearFilters}>
                Limpiar
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Aplicar Filtros
              </Button>
            </div>
          </div>

          {/* Tabla de Todas las Solicitudes */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Todas las Solicitudes</h2>
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Fecha</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Número</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Solicitante</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Tipo de Solicitante</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Departamento</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Tipo</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Asunto</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Estado</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTodasSolicitudes.length > 0 ? (
                    filteredTodasSolicitudes.map((solicitud) => (
                      <tr key={solicitud.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.fecha}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.numero}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.solicitante}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.tipoSolicitante}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.departamento}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.tipo}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.asunto}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{renderEstadoBadge(solicitud.estado)}</td>
                        <td className="px-4 py-4 text-sm text-center">
                          <div className="flex justify-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:text-blue-800"
                              onClick={() => handleOpenModal(solicitud)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {solicitud.estado === "Pendiente" && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-green-600 hover:text-green-800"
                                  onClick={() => handleOpenApproveModal(solicitud)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 hover:text-red-800"
                                  onClick={() => handleOpenRejectModal(solicitud)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="px-4 py-4 text-sm text-center text-gray-500 italic">
                        No hay solicitudes que coincidan con los filtros
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-4 flex justify-between items-center text-sm text-gray-500">
              <div>
                Mostrando {filteredTodasSolicitudes.length} de {solicitudesRecibidas.length} registros
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                  1
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Siguiente
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab de Aprobaciones Pendientes */}
        <TabsContent value="pendientes" className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Aprobaciones Pendientes - Prensa</h1>
            <div className="flex space-x-2">
              <Button variant="outline" className="flex items-center">
                <Printer className="mr-2 h-4 w-4" />
                Imprimir
              </Button>
              <Button variant="outline" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>

          {/* Filtros */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Filtros</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="numeroSolicitud" className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Solicitud
                </label>
                <Input
                  id="numeroSolicitud"
                  placeholder="Ej: SOL-2024-2001"
                  className="w-full"
                  value={numeroSolicitud}
                  onChange={(e) => setNumeroSolicitud(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="solicitante" className="block text-sm font-medium text-gray-700 mb-1">
                  Solicitante
                </label>
                <Input
                  id="solicitante"
                  placeholder="Nombre del solicitante"
                  className="w-full"
                  value={nombreSolicitante}
                  onChange={(e) => setNombreSolicitante(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="departamento" className="block text-sm font-medium text-gray-700 mb-1">
                  Departamento
                </label>
                <Select value={departamentoFilter} onValueChange={setDepartamentoFilter}>
                  <SelectTrigger id="departamento">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="Gerencia General">Gerencia General</SelectItem>
                    <SelectItem value="Operaciones Portuarias">Operaciones Portuarias</SelectItem>
                    <SelectItem value="Administración">Administración</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="tipoSolicitud" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Solicitud
                </label>
                <Select value={tipoFilter} onValueChange={setTipoFilter}>
                  <SelectTrigger id="tipoSolicitud">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="Documentación">Documentación</SelectItem>
                    <SelectItem value="Consulta">Consulta</SelectItem>
                    <SelectItem value="Acceso a obra">Acceso a obra</SelectItem>
                    <SelectItem value="Redeterminación">Redeterminación</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <Button variant="outline" onClick={handleClearFilters}>
                Limpiar
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Aplicar Filtros
              </Button>
            </div>
          </div>

          {/* Tabla de Solicitudes Pendientes */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Solicitudes Pendientes de Aprobación</h2>
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Fecha</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Número</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Solicitante</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Tipo de Solicitante</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Departamento</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Tipo</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Asunto</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSolicitudesPendientes.length > 0 ? (
                    filteredSolicitudesPendientes.map((solicitud) => (
                      <tr key={solicitud.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.fecha}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.numero}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.solicitante}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.tipoSolicitante}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.departamento}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.tipo}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.asunto}</td>
                        <td className="px-4 py-4 text-sm text-center">
                          <div className="flex justify-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:text-blue-800"
                              onClick={() => handleOpenModal(solicitud)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-600 hover:text-green-800"
                              onClick={() => handleOpenApproveModal(solicitud)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-800"
                              onClick={() => handleOpenRejectModal(solicitud)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-4 py-4 text-sm text-center text-gray-500 italic">
                        No hay solicitudes pendientes de aprobación
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-4 flex justify-between items-center text-sm text-gray-500">
              <div>
                Mostrando {filteredSolicitudesPendientes.length} de {solicitudesPendientes.length} registros
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                  1
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Siguiente
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de Detalles de Solicitud */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl">Detalle de Solicitud</DialogTitle>
            <DialogDescription>
              {selectedSolicitud?.numero} - {selectedSolicitud?.asunto}
            </DialogDescription>
          </DialogHeader>
          {selectedSolicitud && (
            <div className="space-y-6 overflow-y-auto pr-2 flex-grow">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Tipo de solicitud:</span>
                  </div>
                  <p className="text-sm">{selectedSolicitud.tipo}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Fecha:</span>
                  </div>
                  <p className="text-sm">{selectedSolicitud.fecha}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Solicitante:</span>
                  </div>
                  <p className="text-sm">{selectedSolicitud.solicitante}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Correo:</span>
                  </div>
                  <p className="text-sm">{selectedSolicitud.correo}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Departamento:</span>
                  </div>
                  <p className="text-sm">{selectedSolicitud.departamento || '-'}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Asignación:</span>
                  </div>
                  <p className="text-sm">
                    {selectedSolicitud.asignacion
                      ? selectedSolicitud.asignacion
                      : <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Última Actualización:</span>
                  </div>
                  <p className="text-sm">{selectedSolicitud.ultimaActualizacion}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Estado:</span>
                  </div>
                  <div>{renderEstadoBadge(selectedSolicitud.estado)}</div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-md font-medium">Descripción</h3>
                <p className="text-sm bg-gray-50 p-3 rounded-md">{selectedSolicitud.descripcion}</p>
              </div>
              {selectedSolicitud.adjuntos && selectedSolicitud.adjuntos.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="text-md font-medium">Adjuntos</h3>
                    <ul className="list-disc pl-5">
                      {selectedSolicitud.adjuntos.map((adj, idx) => (
                        <li key={idx} className="text-sm text-blue-700 underline cursor-pointer">{adj}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
              <Separator />
              <div className="space-y-2">
                <h3 className="text-md font-medium">Historial de Comentarios</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedSolicitud.comentarios?.map((comentario, index) => (
                    <div key={index} className="text-sm bg-gray-50 p-2 rounded-md">
                      {comentario}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-end space-x-2 mt-4 pt-2 border-t">
            {selectedSolicitud && selectedSolicitud.estado === "Pendiente" && (
              <>
                <Button
                  variant="outline"
                  className="bg-green-600 text-white hover:bg-green-700"
                  onClick={() => handleOpenApproveModal()}
                >
                  <Check className="mr-2 h-4 w-4" /> Aprobar
                </Button>
                <Button
                  variant="outline"
                  className="bg-red-600 text-white hover:bg-red-700"
                  onClick={() => handleOpenRejectModal()}
                >
                  <X className="mr-2 h-4 w-4" /> Rechazar
                </Button>
              </>
            )}
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmación de Aprobación */}
      <Dialog open={isApproveModalOpen} onOpenChange={setIsApproveModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Confirmar Aprobación</DialogTitle>
            <DialogDescription>¿Está seguro que desea aprobar esta solicitud?</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Se enviará una notificación por correo electrónico al solicitante informando la aprobación.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="observacion-aprobacion" className="block text-sm font-medium text-gray-700">
                Observaciones (opcional)
              </label>
              <textarea
                id="observacion-aprobacion"
                rows={3}
                className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                placeholder="Agregue observaciones o comentarios adicionales..."
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setIsApproveModalOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleConfirmApprove}>
              Confirmar Aprobación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmación de Rechazo */}
      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Confirmar Rechazo</DialogTitle>
            <DialogDescription>¿Está seguro que desea rechazar esta solicitud?</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Se enviará una notificación por correo electrónico al solicitante informando el rechazo.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="motivo-rechazo" className="block text-sm font-medium text-gray-700">
                Motivo del rechazo <span className="text-red-500">*</span>
              </label>
              <textarea
                id="motivo-rechazo"
                rows={3}
                className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                placeholder="Explique el motivo del rechazo..."
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500">Este campo es obligatorio para el rechazo de solicitudes.</p>
            </div>
          </div>
          <DialogFooter className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setIsRejectModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={handleConfirmReject}
              disabled={!observacion.trim()}
            >
              Confirmar Rechazo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
