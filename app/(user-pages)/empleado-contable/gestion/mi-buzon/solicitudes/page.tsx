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
import { Filter, Printer, Download, Eye, X, Check, FileText, Clock, User, Building, Calendar } from "lucide-react"

// Tipos para las solicitudes de compras
type SolicitudCompras = {
  id: number
  fecha: string
  numero: string
  solicitante: string
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
}

export default function SolicitudesComprasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [numeroSolicitud, setNumeroSolicitud] = useState("")
  const [nombreSolicitante, setNombreSolicitante] = useState("")
  const [departamentoFilter, setDepartamentoFilter] = useState("Todos")
  const [tipoFilter, setTipoFilter] = useState("Todos")
  const [activeTab, setActiveTab] = useState("recibidas")

  // Estados para el modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSolicitud, setSelectedSolicitud] = useState<SolicitudCompras | null>(null)

  // Estados para los modales de confirmación
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [observacion, setObservacion] = useState("")

  // Datos de ejemplo para la tabla de solicitudes recibidas en Compras
  const solicitudesRecibidas: SolicitudCompras[] = [
    {
      id: 1,
      numero: "SOL-2024-1001",
      tipo: "Redeterminación",
      asunto: "Solicitud de redeterminación de contrato",
      descripcion:
        "Solicito la redeterminación del contrato de servicios portuarios debido al incremento en los costos de combustible y mano de obra. Adjunto documentación justificativa.",
      fecha: "15/01/2024",
      estado: "Pendiente",
      ultimaActualizacion: "15/01/2024",
      solicitante: "Transportes Marítimos S.A.",
      departamento: "Logística",
      comentarios: [
        "15/01/2024 - Sistema: Solicitud creada",
        "15/01/2024 - Transportes Marítimos S.A.: Adjunta documentación justificativa",
      ],
      firmantes: [
        {
          id: 1,
          nombre: "Juan Pérez",
          cargo: "Jefe de Compras",
          estado: "Pendiente",
          esActual: true,
          observaciones: "Pendiente de revisión de documentación",
        },
        {
          id: 2,
          nombre: "María González",
          cargo: "Gerente de Compras",
          estado: "En espera",
          esActual: false,
        },
      ],
    },
    {
      id: 2,
      numero: "SOL-2024-1002",
      tipo: "Reclamo",
      asunto: "Reclamo por demora en descarga",
      descripcion:
        "Presento formal reclamo por la demora excesiva en la descarga de contenedores del buque 'Mar del Plata' el día 12/01/2024. La demora generó sobrecostos operativos.",
      fecha: "15/01/2024",
      estado: "Pendiente",
      ultimaActualizacion: "15/01/2024",
      solicitante: "Industrias Químicas del Sur",
      departamento: "Operaciones",
      comentarios: [
        "15/01/2024 - Sistema: Solicitud creada",
        "15/01/2024 - Industrias Químicas del Sur: Adjunta registro de tiempos y fotos",
      ],
      firmantes: [
        {
          id: 1,
          nombre: "Juan Pérez",
          cargo: "Jefe de Compras",
          estado: "Pendiente",
          esActual: true,
        },
      ],
    },
    {
      id: 3,
      numero: "SOL-2024-1003",
      tipo: "Cambio de datos",
      asunto: "Actualización de información bancaria",
      descripcion:
        "Solicito el cambio de datos bancarios para el pago de facturas. Adjunto certificación bancaria con los nuevos datos de la cuenta corriente.",
      fecha: "14/01/2024",
      estado: "Procesada",
      ultimaActualizacion: "14/01/2024",
      solicitante: "Logística Integral Ltda.",
      departamento: "Administración",
      comentarios: [
        "14/01/2024 - Sistema: Solicitud creada",
        "14/01/2024 - Logística Integral Ltda.: Adjunta certificación bancaria",
      ],
      firmantes: [],
    },
    {
      id: 4,
      numero: "SOL-2024-1004",
      tipo: "Consulta",
      asunto: "Consulta sobre tarifas de almacenaje",
      descripcion:
        "Consulto sobre las tarifas vigentes para almacenaje de granos en silos. Necesito cotización para almacenamiento de 5000 toneladas de soja por 60 días.",
      fecha: "14/01/2024",
      estado: "Pendiente",
      ultimaActualizacion: "14/01/2024",
      solicitante: "Exportadora de Granos ABC",
      departamento: "Comercial",
      comentarios: [
        "14/01/2024 - Sistema: Solicitud creada",
      ],
      firmantes: [],
    },
    {
      id: 5,
      numero: "SOL-2024-1005",
      tipo: "Reclamo",
      asunto: "Reclamo por facturación incorrecta",
      descripcion:
        "Reclamo por facturación incorrecta en la factura N° 0001-00234567. Los servicios facturados no corresponden a los efectivamente prestados.",
      fecha: "13/01/2024",
      estado: "Pendiente",
      ultimaActualizacion: "13/01/2024",
      solicitante: "Servicios Portuarios del Atlántico",
      departamento: "Facturación",
      comentarios: [
        "13/01/2024 - Sistema: Solicitud creada",
      ],
      firmantes: [],
    },
    {
      id: 6,
      numero: "SOL-2024-1006",
      tipo: "Consulta",
      asunto: "Consulta sobre procedimientos de atraque",
      descripcion:
        "Consulto sobre los nuevos procedimientos de atraque para buques de gran porte. Necesito información sobre documentación requerida y tiempos de gestión.",
      fecha: "12/01/2024",
      estado: "Respondida",
      ultimaActualizacion: "12/01/2024",
      solicitante: "Naviera del Río de la Plata",
      departamento: "Operaciones",
      comentarios: [
        "12/01/2024 - Sistema: Solicitud creada",
      ],
      firmantes: [],
    },
  ]

  // Filtrar solicitudes pendientes
  const solicitudesPendientes = solicitudesRecibidas.filter((solicitud) => solicitud.estado === "Pendiente")

  // Función para filtrar las solicitudes
  const filterSolicitudes = (solicitudes: SolicitudCompras[]) => {
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

  const handleOpenModal = (solicitud: SolicitudCompras) => {
    setSelectedSolicitud(solicitud)
    setIsModalOpen(true)
  }

  const handleOpenApproveModal = (solicitud?: SolicitudCompras) => {
    if (solicitud) {
      setSelectedSolicitud(solicitud)
    }
    setIsApproveModalOpen(true)
    setIsModalOpen(false)
  }

  const handleOpenRejectModal = (solicitud?: SolicitudCompras) => {
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
            <h1 className="text-2xl font-bold">Solicitudes Recibidas - Contable</h1>
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
                  placeholder="Ej: SOL-2024-1001"
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
                    <SelectItem value="Logística">Logística</SelectItem>
                    <SelectItem value="Operaciones">Operaciones</SelectItem>
                    <SelectItem value="Administración">Administración</SelectItem>
                    <SelectItem value="Comercial">Comercial</SelectItem>
                    <SelectItem value="Facturación">Facturación</SelectItem>
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
                    <SelectItem value="Redeterminación">Redeterminación</SelectItem>
                    <SelectItem value="Reclamo">Reclamo</SelectItem>
                    <SelectItem value="Cambio de datos">Cambio de datos</SelectItem>
                    <SelectItem value="Consulta">Consulta</SelectItem>
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
                      <td colSpan={8} className="px-4 py-4 text-sm text-center text-gray-500 italic">
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
            <h1 className="text-2xl font-bold">Aprobaciones Pendientes - Compras</h1>
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
                  placeholder="Ej: SOL-2024-1001"
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
                    <SelectItem value="Logística">Logística</SelectItem>
                    <SelectItem value="Operaciones">Operaciones</SelectItem>
                    <SelectItem value="Administración">Administración</SelectItem>
                    <SelectItem value="Comercial">Comercial</SelectItem>
                    <SelectItem value="Facturación">Facturación</SelectItem>
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
                    <SelectItem value="Redeterminación">Redeterminación</SelectItem>
                    <SelectItem value="Reclamo">Reclamo</SelectItem>
                    <SelectItem value="Cambio de datos">Cambio de datos</SelectItem>
                    <SelectItem value="Consulta">Consulta</SelectItem>
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
                      <td colSpan={7} className="px-4 py-4 text-sm text-center text-gray-500 italic">
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
                    <span className="text-sm font-medium text-gray-500">Tipo:</span>
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
                    <Building className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Departamento:</span>
                  </div>
                  <p className="text-sm">{selectedSolicitud.departamento}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Estado:</span>
                  </div>
                  <div>{renderEstadoBadge(selectedSolicitud.estado)}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Última Actualización:</span>
                  </div>
                  <p className="text-sm">{selectedSolicitud.ultimaActualizacion}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-md font-medium">Descripción</h3>
                <p className="text-sm bg-gray-50 p-3 rounded-md">{selectedSolicitud.descripcion}</p>
              </div>

              <Separator />

              {/* Sección de Firmantes */}
              {selectedSolicitud.firmantes && selectedSolicitud.firmantes.length > 0 && (
                <>
                  <div className="space-y-2">
                    <h3 className="text-md font-medium">Firmantes</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="py-2 px-3 text-left text-sm font-medium text-gray-600">Firmante</th>
                            <th className="py-2 px-3 text-left text-sm font-medium text-gray-600">Cargo</th>
                            <th className="py-2 px-3 text-left text-sm font-medium text-gray-600">Estado</th>
                            <th className="py-2 px-3 text-left text-sm font-medium text-gray-600">Fecha</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedSolicitud.firmantes.map((firmante) => (
                            <tr
                              key={firmante.id}
                              className={`border-b border-gray-200 ${firmante.esActual ? "bg-blue-50" : ""}`}
                            >
                              <td className="py-2 px-3 text-sm">
                                {firmante.nombre}
                                {firmante.esActual && (
                                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                    Actual
                                  </span>
                                )}
                              </td>
                              <td className="py-2 px-3 text-sm">{firmante.cargo}</td>
                              <td className="py-2 px-3 text-sm">
                                {firmante.estado === "Pendiente" && (
                                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
                                )}
                                {firmante.estado === "Firmado" && (
                                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Firmado</Badge>
                                )}
                                {firmante.estado === "Rechazado" && (
                                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazado</Badge>
                                )}
                                {firmante.estado === "En espera" && (
                                  <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">En espera</Badge>
                                )}
                              </td>
                              <td className="py-2 px-3 text-sm">{firmante.fechaFirma || "-"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Etapa actual */}
                    <div className="mt-3 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm font-medium">Etapa actual:</p>
                      <p className="text-sm">
                        {selectedSolicitud.firmantes.find((f) => f.esActual)?.cargo || "Proceso completado"}
                      </p>
                      {selectedSolicitud.firmantes.find((f) => f.esActual && f.observaciones) && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">Observaciones:</p>
                          <p className="text-sm">
                            {selectedSolicitud.firmantes.find((f) => f.esActual)?.observaciones}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <Separator />
                </>
              )}

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
