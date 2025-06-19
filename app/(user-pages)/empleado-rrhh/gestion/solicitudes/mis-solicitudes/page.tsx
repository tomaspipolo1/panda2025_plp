"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  ChevronDown,
  ChevronUp,
  Filter,
  Printer,
  Download,
  Plus,
  Eye,
  X,
  FileText,
  Clock,
  Calendar,
} from "lucide-react"

// Tipos para las solicitudes
type SolicitudPropia = {
  id: number
  fecha: string
  numero: string
  tipo: string
  asunto: string
  estado: string
  ultimaActualizacion: string
  descripcion?: string
  comentarios?: string[]
}

export default function MisSolicitudesRRHHPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<string | null>("fecha")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [tipoFilter, setTipoFilter] = useState("todos")
  const [estadoFilter, setEstadoFilter] = useState("todos")
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState("")

  // Estados para el modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSolicitud, setSelectedSolicitud] = useState<SolicitudPropia | null>(null)

  // Datos de ejemplo para la tabla de mis solicitudes de RRHH
  const solicitudes: SolicitudPropia[] = [
    {
      id: 1,
      fecha: "20/04/2023",
      numero: "SOL-RRHH-2023-0045",
      tipo: "Autorización de Capacitación",
      asunto: "Curso de Gestión del Talento",
      estado: "Pendiente",
      ultimaActualizacion: "20/04/2023",
      descripcion:
        "Solicito autorización para asistir al curso 'Gestión Estratégica del Talento Humano' que se realizará del 15 al 17 de mayo de 2023 en Buenos Aires. El curso incluye certificación internacional y tiene un costo de $25,000.",
      comentarios: [
        "20/04/2023 - Sistema: Solicitud creada",
        "20/04/2023 - María González: Se ha enviado la solicitud a Gerencia para aprobación presupuestaria.",
      ],
    },
    {
      id: 2,
      fecha: "18/04/2023",
      numero: "SOL-RRHH-2023-0044",
      tipo: "Solicitud de Personal",
      asunto: "Contratación Analista de RRHH",
      estado: "Aprobada",
      ultimaActualizacion: "19/04/2023",
      descripcion:
        "Solicito autorización para iniciar el proceso de búsqueda y selección de un Analista de Recursos Humanos para cubrir las necesidades del departamento debido al incremento de la dotación de personal.",
      comentarios: [
        "18/04/2023 - Sistema: Solicitud creada",
        "18/04/2023 - María González: Se adjuntó descripción del puesto y justificación.",
        "19/04/2023 - Roberto Álvarez: Solicitud aprobada. Proceder con la búsqueda.",
      ],
    },
    {
      id: 3,
      fecha: "15/04/2023",
      numero: "SOL-RRHH-2023-0043",
      tipo: "Modificación de Política",
      asunto: "Actualización Política de Teletrabajo",
      estado: "En Revisión",
      ultimaActualizacion: "17/04/2023",
      descripcion:
        "Propongo modificaciones a la política de teletrabajo actual para incluir modalidades híbridas y nuevos criterios de elegibilidad basados en las mejores prácticas del mercado.",
      comentarios: [
        "15/04/2023 - Sistema: Solicitud creada",
        "16/04/2023 - María González: Se adjuntó propuesta detallada y benchmarking.",
        "17/04/2023 - Comité Directivo: En proceso de revisión por el equipo legal.",
      ],
    },
    {
      id: 4,
      fecha: "12/04/2023",
      numero: "SOL-RRHH-2023-0042",
      tipo: "Presupuesto para Evento",
      asunto: "Jornada de Bienestar Laboral",
      estado: "Rechazada",
      ultimaActualizacion: "14/04/2023",
      descripcion:
        "Solicito presupuesto de $80,000 para organizar una jornada de bienestar laboral que incluya actividades recreativas, charlas motivacionales y servicios de salud preventiva para todos los empleados.",
      comentarios: [
        "12/04/2023 - Sistema: Solicitud creada",
        "13/04/2023 - María González: Se adjuntó cotizaciones y programa de actividades.",
        "14/04/2023 - Finanzas: Solicitud rechazada. Presupuesto excede lo disponible para el trimestre.",
      ],
    },
    {
      id: 5,
      fecha: "10/04/2023",
      numero: "SOL-RRHH-2023-0041",
      tipo: "Implementación de Sistema",
      asunto: "Software de Gesti��n de Desempeño",
      estado: "Aprobada",
      ultimaActualizacion: "11/04/2023",
      descripcion:
        "Solicito la implementación de un software especializado para la gestión de evaluaciones de desempeño que permita automatizar el proceso y generar reportes analíticos.",
      comentarios: [
        "10/04/2023 - Sistema: Solicitud creada",
        "10/04/2023 - María González: Se adjuntó comparativo de proveedores y ROI estimado.",
        "11/04/2023 - IT y Gerencia: Solicitud aprobada. Iniciar proceso de implementación.",
      ],
    },
    {
      id: 6,
      fecha: "08/04/2023",
      numero: "SOL-RRHH-2023-0040",
      tipo: "Consultoría Externa",
      asunto: "Estudio de Clima Laboral",
      estado: "Pendiente",
      ultimaActualizacion: "08/04/2023",
      descripcion:
        "Solicito contratación de consultoría externa especializada para realizar un estudio integral de clima laboral y proponer plan de mejoras organizacionales.",
      comentarios: [
        "08/04/2023 - Sistema: Solicitud creada",
        "08/04/2023 - María González: Pendiente de evaluación por Gerencia General.",
      ],
    },
  ]

  // Función para ordenar las solicitudes
  const sortedSolicitudes = [...solicitudes].sort((a, b) => {
    if (!sortColumn) return 0

    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  // Función para filtrar las solicitudes
  const filteredSolicitudes = sortedSolicitudes.filter((solicitud) => {
    // Filtro por búsqueda
    const matchesSearch =
      searchTerm === "" ||
      Object.values(solicitud).some(
        (value) => typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase()),
      )

    // Filtro por tipo
    const matchesTipo = tipoFilter === "todos" || solicitud.tipo.includes(tipoFilter)

    // Filtro por estado
    const matchesEstado = estadoFilter === "todos" || solicitud.estado === estadoFilter

    // Filtro por fecha
    const matchesFecha =
      fechaDesdeFilter === "" || new Date(solicitud.fecha.split("/").reverse().join("-")) >= new Date(fechaDesdeFilter)

    return matchesSearch && matchesTipo && matchesEstado && matchesFecha
  })

  // Función para manejar el cambio de columna de ordenación
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Función para limpiar los filtros
  const handleClearFilters = () => {
    setTipoFilter("todos")
    setEstadoFilter("todos")
    setFechaDesdeFilter("")
  }

  // Función para abrir el modal con los detalles de la solicitud
  const handleOpenModal = (solicitud: SolicitudPropia) => {
    setSelectedSolicitud(solicitud)
    setIsModalOpen(true)
  }

  // Función para renderizar el badge de estado
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
      default:
        return <Badge>{estado}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mis Solicitudes - RRHH</h1>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Button variant="outline" className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/empleado-rrhh/gestion/solicitudes/nueva-solicitud" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Solicitud
            </Link>
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
            <Input id="numeroSolicitud" placeholder="Ej: SOL-RRHH-2023-0045" className="w-full" />
          </div>
          <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo
            </label>
            <Select value={tipoFilter} onValueChange={setTipoFilter}>
              <SelectTrigger id="tipo">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="Autorización de Capacitación">Autorización de Capacitación</SelectItem>
                <SelectItem value="Solicitud de Personal">Solicitud de Personal</SelectItem>
                <SelectItem value="Modificación de Política">Modificación de Política</SelectItem>
                <SelectItem value="Presupuesto para Evento">Presupuesto para Evento</SelectItem>
                <SelectItem value="Implementación de Sistema">Implementación de Sistema</SelectItem>
                <SelectItem value="Consultoría Externa">Consultoría Externa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <Select value={estadoFilter} onValueChange={setEstadoFilter}>
              <SelectTrigger id="estado">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="En Revisión">En Revisión</SelectItem>
                <SelectItem value="Aprobada">Aprobada</SelectItem>
                <SelectItem value="Rechazada">Rechazada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="fechaDesde" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Desde
            </label>
            <Input
              id="fechaDesde"
              type="date"
              value={fechaDesdeFilter}
              onChange={(e) => setFechaDesdeFilter(e.target.value)}
              className="w-full"
              placeholder="dd/mm/aaaa"
            />
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

      {/* Tabla de Solicitudes */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Solicitudes</h2>
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
                <th
                  className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => handleSort("fecha")}
                >
                  <div className="flex items-center">
                    Fecha
                    {sortColumn === "fecha" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Número</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Tipo</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Asunto</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Estado</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Última Actualización</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredSolicitudes.length > 0 ? (
                filteredSolicitudes.map((solicitud) => (
                  <tr key={solicitud.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-900">{solicitud.fecha}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{solicitud.numero}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{solicitud.tipo}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{solicitud.asunto}</td>
                    <td className="px-4 py-4 text-sm">{renderEstadoBadge(solicitud.estado)}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{solicitud.ultimaActualizacion}</td>
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
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-4 text-sm text-center text-gray-500 italic">
                    No se encontraron solicitudes
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 flex justify-between items-center text-sm text-gray-500">
          <div>
            Mostrando {filteredSolicitudes.length} de {solicitudes.length} registros
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

      {/* Modal de Detalles de Solicitud */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Detalle de Solicitud</DialogTitle>
            <DialogDescription>
              {selectedSolicitud?.numero} - {selectedSolicitud?.asunto}
            </DialogDescription>
          </DialogHeader>

          {selectedSolicitud && (
            <div className="space-y-6">
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

              <DialogFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cerrar
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
