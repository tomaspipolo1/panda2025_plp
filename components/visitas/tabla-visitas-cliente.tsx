"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Search } from "lucide-react"

// Datos de ejemplo
const visitasData = [
  {
    id: 1,
    fecha: "06/01/2024",
    tipo: "Laboral",
    sitio: "Sitio 1",
    personas: 2,
    vehiculos: 1,
    estado: "Pendiente",
  },
  {
    id: 2,
    fecha: "15/12/2023",
    tipo: "Acceso a Muelle",
    sitio: "Sitio 3",
    personas: 4,
    vehiculos: 2,
    estado: "Aprobada",
  },
  {
    id: 3,
    fecha: "10/11/2023",
    tipo: "Materiales",
    sitio: "Sitio 2",
    personas: 1,
    vehiculos: 1,
    estado: "Completada",
  },
  {
    id: 4,
    fecha: "05/10/2023",
    tipo: "Guiada",
    sitio: "Sitio 4",
    personas: 8,
    vehiculos: 0,
    estado: "Cancelada",
  },
]

interface TablaVisitasClienteProps {
  onVerDetalle: (id: number) => void
  onCancelarVisita: (id: number) => void
}

export function TablaVisitasCliente({ onVerDetalle, onCancelarVisita }: TablaVisitasClienteProps) {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Ordenar por fecha
  const sortedVisitas = [...visitasData].sort((a, b) => {
    const dateA = new Date(a.fecha.split("/").reverse().join("-"))
    const dateB = new Date(b.fecha.split("/").reverse().join("-"))
    return sortDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
  })

  // Filtrar por término de búsqueda
  const filteredVisitas = sortedVisitas.filter(
    (visita) =>
      visita.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visita.sitio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visita.estado.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Paginación
  const totalPages = Math.ceil(filteredVisitas.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedVisitas = filteredVisitas.slice(startIndex, startIndex + itemsPerPage)

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "Aprobada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobada</Badge>
      case "Completada":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Completada</Badge>
      case "Cancelada":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cancelada</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Visitas</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar..."
            className="pl-10 pr-4 py-2 border rounded-md w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-4 text-left">
                <button className="flex items-center font-medium text-sm text-gray-600" onClick={toggleSortDirection}>
                  Fecha
                  {sortDirection === "asc" ? (
                    <ChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </button>
              </th>
              <th className="py-3 px-4 text-left font-medium text-sm text-gray-600">Tipo</th>
              <th className="py-3 px-4 text-left font-medium text-sm text-gray-600">Sitio</th>
              <th className="py-3 px-4 text-left font-medium text-sm text-gray-600">Personas</th>
              <th className="py-3 px-4 text-left font-medium text-sm text-gray-600">Vehículos</th>
              <th className="py-3 px-4 text-left font-medium text-sm text-gray-600">Estado</th>
              <th className="py-3 px-4 text-left font-medium text-sm text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedVisitas.length > 0 ? (
              paginatedVisitas.map((visita) => (
                <tr key={visita.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{visita.fecha}</td>
                  <td className="py-3 px-4">{visita.tipo}</td>
                  <td className="py-3 px-4">{visita.sitio}</td>
                  <td className="py-3 px-4">{visita.personas}</td>
                  <td className="py-3 px-4">{visita.vehiculos}</td>
                  <td className="py-3 px-4">{getEstadoBadge(visita.estado)}</td>
                  <td className="py-3 px-4">
                    <div className="relative group">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-10">
                        <div className="py-1">
                          <button
                            onClick={() => onVerDetalle(visita.id)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            Ver detalle
                          </button>
                          {visita.estado === "Pendiente" && (
                            <button
                              onClick={() => onCancelarVisita(visita.id)}
                              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                            >
                              Cancelar visita
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 text-center text-gray-500">
                  No se encontraron visitas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <div>
          Mostrando {filteredVisitas.length} de {filteredVisitas.length} registros
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className={currentPage === page ? "bg-[#0f2b5b]" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
