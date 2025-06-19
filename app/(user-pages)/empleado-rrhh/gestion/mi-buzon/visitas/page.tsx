"use client"

import { useState } from "react"
import { ArrowLeft, Search, Calendar, Users, User, Building } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DetalleVisitaMiBuzonModal } from "@/components/visitas/detalle-visita-mi-buzon-modal"

// Datos de ejemplo para visitas del buzón departamental
const visitasData = [
  {
    id: 1,
    numeroSolicitud: "VIS-2024-001",
    tipoVisita: "Laboral",
    destino: "Departamento de RRHH",
    fechaDesde: "2024-01-16",
    horaDesde: "09:00",
    fechaHasta: "2024-01-16",
    horaHasta: "12:00",
    estado: "Pendiente",
    fechaSolicitud: "2024-01-15",
    horaSolicitud: "14:30",
    observaciones:
      "Entrevista de trabajo para el puesto de Analista de Logística. Candidato preseleccionado por la consultora.",
    // Datos específicos de Laboral
    personas: [
      {
        nombre: "Carlos Alberto Mendez",
        dni: "25.123.456",
        email: "cmendez@gmail.com",
        telefono: "11-9876-5432",
      },
    ],
    vehiculo: {
      patente: "AB123CD",
      tipo: "Automóvil",
      marca: "Toyota",
      modelo: "Corolla",
    },
    conductor: {
      nombre: "Carlos Alberto Mendez",
      dni: "25.123.456",
      licencia: "Clase B1",
      telefono: "11-9876-5432",
    },
  },
  {
    id: 2,
    numeroSolicitud: "VIS-2024-002",
    tipoVisita: "Laboral",
    destino: "Sala de Capacitación",
    fechaDesde: "2024-01-17",
    horaDesde: "10:00",
    fechaHasta: "2024-01-17",
    horaHasta: "16:00",
    estado: "Aprobada",
    fechaSolicitud: "2024-01-14",
    horaSolicitud: "09:15",
    observaciones: "Capacitación sobre nuevos procedimientos de seguridad para personal de muelles.",
    // Datos específicos de Laboral
    personas: [
      {
        nombre: "María Elena González",
        dni: "28.987.654",
        email: "mgonzalez@seguridadportuaria.com",
        telefono: "11-5555-1234",
      },
      {
        nombre: "Roberto Silva Martinez",
        dni: "32.456.789",
        email: "rsilva@seguridadportuaria.com",
        telefono: "11-5555-5678",
      },
      {
        nombre: "Ana Laura Fernández",
        dni: "35.789.123",
        email: "afernandez@seguridadportuaria.com",
        telefono: "11-5555-9012",
      },
    ],
    vehiculo: {
      patente: "XY789ZW",
      tipo: "Automóvil",
      marca: "Toyota",
      modelo: "Corolla",
    },
    conductor: {
      nombre: "María Elena González",
      dni: "28.987.654",
      licencia: "Clase B1",
      telefono: "11-5555-1234",
    },
  },
  {
    id: 3,
    numeroSolicitud: "VIS-2024-003",
    tipoVisita: "Laboral",
    destino: "Departamento de RRHH",
    fechaDesde: "2024-01-18",
    horaDesde: "14:00",
    fechaHasta: "2024-01-18",
    horaHasta: "15:30",
    estado: "Pendiente",
    fechaSolicitud: "2024-01-15",
    horaSolicitud: "16:45",
    observaciones: "Reunión con representante sindical para discutir nuevos beneficios para empleados.",
    // Datos específicos de Laboral
    personas: [
      {
        nombre: "Juan Carlos Pérez",
        dni: "22.345.678",
        email: "jperez@sindicatoportuario.org.ar",
        telefono: "11-8888-4567",
      },
    ],
    vehiculo: {
      patente: "EF456GH",
      tipo: "Automóvil",
      marca: "Volkswagen",
      modelo: "Golf",
    },
    conductor: {
      nombre: "Juan Carlos Pérez",
      dni: "22.345.678",
      licencia: "Clase B1",
      telefono: "11-8888-4567",
    },
  },
  {
    id: 4,
    numeroSolicitud: "VIS-2024-004",
    tipoVisita: "Laboral",
    destino: "Auditorio Principal",
    fechaDesde: "2024-01-19",
    horaDesde: "08:30",
    fechaHasta: "2024-01-19",
    horaHasta: "12:30",
    estado: "Aprobada",
    fechaSolicitud: "2024-01-16",
    horaSolicitud: "11:20",
    observaciones: "Jornada de inducción para nuevos empleados. Presentación de políticas y procedimientos.",
    // Datos específicos de Laboral
    personas: [
      {
        nombre: "Diego Martín Rodriguez",
        dni: "30.111.222",
        email: "drodriguez@consultora.com",
        telefono: "11-6666-3333",
      },
      {
        nombre: "Laura Patricia Vega",
        dni: "33.444.555",
        email: "lvega@consultora.com",
        telefono: "11-6666-7777",
      },
    ],
    vehiculo: {
      patente: "IJ123KL",
      tipo: "Camioneta",
      marca: "Ford",
      modelo: "Ranger",
    },
    conductor: {
      nombre: "Diego Martín Rodriguez",
      dni: "30.111.222",
      licencia: "Clase B1",
      telefono: "11-6666-3333",
    },
  },
  {
    id: 5,
    numeroSolicitud: "VIS-2024-005",
    tipoVisita: "Laboral",
    destino: "Departamento de RRHH",
    fechaDesde: "2024-01-20",
    horaDesde: "10:00",
    fechaHasta: "2024-01-20",
    horaHasta: "11:00",
    estado: "Rechazada",
    fechaSolicitud: "2024-01-17",
    horaSolicitud: "13:10",
    observaciones: "Entrevista cancelada por falta de documentación del candidato.",
    // Datos específicos de Laboral
    personas: [
      {
        nombre: "Alberto José Morales",
        dni: "26.789.012",
        email: "amorales@gmail.com",
        telefono: "11-9999-1111",
      },
    ],
    vehiculo: {
      patente: "MN789OP",
      tipo: "Automóvil",
      marca: "Renault",
      modelo: "Sandero",
    },
    conductor: {
      nombre: "Alberto José Morales",
      dni: "26.789.012",
      licencia: "Clase B1",
      telefono: "11-9999-1111",
    },
  },
]

const tiposVisita = ["Todos", "Laboral", "Entrevista", "Capacitación", "Reunión"]
const estados = ["Todos", "Pendiente", "Aprobada", "Rechazada"]

export default function MiBuzonVisitasPage() {
  const [visitaSeleccionada, setVisitaSeleccionada] = useState<any>(null)
  const [showDetalleModal, setShowDetalleModal] = useState(false)
  const [filtroTipoVisita, setFiltroTipoVisita] = useState("Todos")
  const [filtroEstado, setFiltroEstado] = useState("Todos")
  const [busqueda, setBusqueda] = useState("")
  const [tabActiva, setTabActiva] = useState("todas")

  // Filtrar visitas según la pestaña activa
  const visitasPorTab = visitasData.filter((visita) => {
    if (tabActiva === "pendientes") return visita.estado === "Pendiente"
    return true // "todas"
  })

  // Aplicar filtros adicionales
  const visitasFiltradas = visitasPorTab.filter((visita) => {
    const coincideBusqueda =
      visita.numeroSolicitud.toLowerCase().includes(busqueda.toLowerCase()) ||
      visita.destino.toLowerCase().includes(busqueda.toLowerCase()) ||
      visita.personas?.some((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase())) ||
      visita.observaciones.toLowerCase().includes(busqueda.toLowerCase()) ||
      false

    const coincideTipoVisita = filtroTipoVisita === "Todos" || visita.tipoVisita === filtroTipoVisita
    const coincideEstado = filtroEstado === "Todos" || visita.estado === filtroEstado

    return coincideBusqueda && coincideTipoVisita && coincideEstado
  })

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "Aprobada":
        return "bg-green-100 text-green-800"
      case "Rechazada":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTipoVisitaIcon = (tipo: string) => {
    switch (tipo) {
      case "Laboral":
        return <Building className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const handleVerDetalle = (visita: any) => {
    setVisitaSeleccionada(visita)
    setShowDetalleModal(true)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <Link
          href="/empleado-rrhh/gestion/mi-buzon"
          className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Volver</span>
        </Link>
        <h1 className="text-2xl font-bold">Mi Buzón - Visitas</h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        {/* Barra de herramientas */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por personas, destino o número..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filtroTipoVisita} onValueChange={setFiltroTipoVisita}>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Tipo de Visita" />
              </SelectTrigger>
              <SelectContent>
                {tiposVisita.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filtroEstado} onValueChange={setFiltroEstado}>
              <SelectTrigger className="w-full lg:w-32">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                {estados.map((estado) => (
                  <SelectItem key={estado} value={estado}>
                    {estado}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={tabActiva} onValueChange={setTabActiva} className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
            <TabsTrigger value="todas">Todas las visitas ({visitasData.length})</TabsTrigger>
            <TabsTrigger value="pendientes">
              Pendientes ({visitasData.filter((v) => v.estado === "Pendiente").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={tabActiva} className="mt-0">
            <div className="divide-y divide-gray-100">
              {visitasFiltradas.map((visita) => (
                <div
                  key={visita.id}
                  onClick={() => handleVerDetalle(visita)}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getTipoVisitaIcon(visita.tipoVisita)}
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {`${visita.personas?.[0]?.nombre} ${visita.personas?.length > 1 ? `y ${visita.personas.length - 1} más` : ""}`}
                        </h3>
                        <p className="text-sm text-gray-600">{visita.destino}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">{visita.horaSolicitud}</div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-900 mb-1">Solicitud de {visita.tipoVisita}</p>
                    <p className="text-xs text-gray-600">{visita.numeroSolicitud}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Badge className={`text-xs ${getEstadoColor(visita.estado)}`}>{visita.estado}</Badge>
                      <Badge variant="outline" className="text-xs">
                        {visita.tipoVisita}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{visita.personas?.length || 1}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{visita.fechaDesde}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {visitasFiltradas.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No se encontraron visitas que coincidan con los filtros</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal de Detalle */}
      <DetalleVisitaMiBuzonModal
        isOpen={showDetalleModal}
        onClose={() => setShowDetalleModal(false)}
        visita={visitaSeleccionada}
      />
    </div>
  )
}
