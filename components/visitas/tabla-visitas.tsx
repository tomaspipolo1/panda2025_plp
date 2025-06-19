"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp, Eye, Edit, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Visita {
  id: string
  fecha: string
  tipo: string
  sitio: string
  personas: number
  vehiculos: number
  estado: "Pendiente" | "Aprobada" | "Completada" | "Cancelada"
}

interface TablaVisitasProps {
  visitas: Visita[]
  onVerDetalle: (visita: Visita) => void
  onEditar: (visita: Visita) => void
  onCancelar: (visita: Visita) => void
}

export function TablaVisitas({ visitas, onVerDetalle, onEditar, onCancelar }: TablaVisitasProps) {
  const [sortField, setSortField] = useState<string>("fecha")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const itemsPerPage = 4

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filtrar por término de búsqueda
  const filteredVisitas = visitas.filter(
    (visita) =>
      visita.sitio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visita.tipo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Ordenar visitas
  const sortedVisitas = [...filteredVisitas].sort((a, b) => {
    if (sortField === "fecha") {
      const dateA = new Date(a.fecha.split("/").reverse().join("-"))
      const dateB = new Date(b.fecha.split("/").reverse().join("-"))
      return sortDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
    }

    if (sortField === "personas" || sortField === "vehiculos") {
      const valueA = a[sortField as keyof Visita] as number
      const valueB = b[sortField as keyof Visita] as number
      return sortDirection === "asc" ? valueA - valueB : valueB - valueA
    }

    // Para otros campos como tipo, sitio, etc.
    const valueA = a[sortField as keyof Visita]
    const valueB = b[sortField as keyof Visita]

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
    }

    return 0
  })

  // Paginación
  const totalPages = Math.ceil(sortedVisitas.length / itemsPerPage)
  const paginatedVisitas = sortedVisitas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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
        return null
    }
  }

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-plp-darkest">Visitas</h3>
        <div className="w-72">
          <Input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-left">
                <button className="flex items-center text-gray-600 font-medium" onClick={() => handleSort("fecha")}>
                  Fecha
                  {sortField === "fecha" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  ) : null}
                </button>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-gray-600 font-medium">Tipo</span>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-gray-600 font-medium">Sitio</span>
              </th>
              <th className="py-3 px-4 text-left">
                <button className="flex items-center text-gray-600 font-medium" onClick={() => handleSort("personas")}>
                  Personas
                  {sortField === "personas" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  ) : null}
                </button>
              </th>
              <th className="py-3 px-4 text-left">
                <button className="flex items-center text-gray-600 font-medium" onClick={() => handleSort("vehiculos")}>
                  Vehículos
                  {sortField === "vehiculos" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  ) : null}
                </button>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-gray-600 font-medium">Estado</span>
              </th>
              <th className="py-3 px-4 text-center">
                <span className="text-gray-600 font-medium">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedVisitas.map((visita) => (
              <tr key={visita.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-4">{visita.fecha}</td>
                <td className="py-4 px-4">{visita.tipo}</td>
                <td className="py-4 px-4">{visita.sitio}</td>
                <td className="py-4 px-4">{visita.personas}</td>
                <td className="py-4 px-4">{visita.vehiculos}</td>
                <td className="py-4 px-4">{getEstadoBadge(visita.estado)}</td>
                <td className="py-4 px-4 text-center">
                  <div className="relative" ref={dropdownRef}>
                    <DropdownMenu open={openDropdown === visita.id} onOpenChange={() => toggleDropdown(visita.id)}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => onVerDetalle(visita)} className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onEditar(visita)}
                          className="cursor-pointer"
                          disabled={visita.estado === "Completada" || visita.estado === "Cancelada"}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onCancelar(visita)}
                          className="cursor-pointer text-red-600"
                          disabled={visita.estado === "Completada" || visita.estado === "Cancelada"}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancelar visita
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Mostrando {paginatedVisitas.length} de {filteredVisitas.length} registros
        </div>
        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const pageNumber = i + 1
            return (
              <Button
                key={pageNumber}
                variant={currentPage === pageNumber ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(pageNumber)}
                className={currentPage === pageNumber ? "bg-black" : ""}
              >
                {pageNumber}
              </Button>
            )
          })}
          {totalPages > 5 && <span className="px-2">...</span>}
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
