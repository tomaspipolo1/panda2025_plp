"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

interface LicitacionDisponible {
  id: string
  numero: string
  titulo: string
  organismo: string
  tipo: "Pública" | "Invitación"
  publicacion: string
  cierre: string
  montoEstimado: number
}

interface TablaLicitacionesDisponiblesProps {
  licitaciones: LicitacionDisponible[]
}

export function TablaLicitacionesDisponibles({ licitaciones }: TablaLicitacionesDisponiblesProps) {
  const router = useRouter()
  const [sortField, setSortField] = useState<string>("numero")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const itemsPerPage = 5

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filtrar por término de búsqueda
  const filteredLicitaciones = licitaciones.filter(
    (licitacion) =>
      licitacion.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      licitacion.titulo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Ordenar licitaciones
  const sortedLicitaciones = [...filteredLicitaciones].sort((a, b) => {
    if (sortField === "publicacion" || sortField === "cierre") {
      const dateA = new Date(a[sortField as keyof LicitacionDisponible] as string)
      const dateB = new Date(b[sortField as keyof LicitacionDisponible] as string)
      return sortDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
    }

    if (sortField === "montoEstimado") {
      const valueA = a[sortField] as number
      const valueB = b[sortField] as number
      return sortDirection === "asc" ? valueA - valueB : valueB - valueA
    }

    // Para otros campos como número, título, etc.
    const valueA = a[sortField as keyof LicitacionDisponible]
    const valueB = b[sortField as keyof LicitacionDisponible]

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
    }

    return 0
  })

  // Paginación
  const totalPages = Math.ceil(sortedLicitaciones.length / itemsPerPage)
  const paginatedLicitaciones = sortedLicitaciones.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    })
      .format(value)
      .replace("ARS", "$")
  }

  const handleInscribirse = (licitacionId: string) => {
    router.push(`/proveedor/gestion/licitaciones/nueva-inscripcion/formulario?id=${licitacionId}`)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-plp-darkest">Licitaciones Disponibles</h3>
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
                <button className="flex items-center text-gray-600 font-medium" onClick={() => handleSort("numero")}>
                  Número
                  {sortField === "numero" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  ) : null}
                </button>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-gray-600 font-medium">Título</span>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-gray-600 font-medium">Organismo</span>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-gray-600 font-medium">Tipo</span>
              </th>
              <th className="py-3 px-4 text-left">
                <button
                  className="flex items-center text-gray-600 font-medium"
                  onClick={() => handleSort("publicacion")}
                >
                  Publicación
                  {sortField === "publicacion" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  ) : null}
                </button>
              </th>
              <th className="py-3 px-4 text-left">
                <button className="flex items-center text-gray-600 font-medium" onClick={() => handleSort("cierre")}>
                  Cierre
                  {sortField === "cierre" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  ) : null}
                </button>
              </th>
              <th className="py-3 px-4 text-right">
                <button
                  className="flex items-center text-gray-600 font-medium ml-auto"
                  onClick={() => handleSort("montoEstimado")}
                >
                  Monto Estimado
                  {sortField === "montoEstimado" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  ) : null}
                </button>
              </th>
              <th className="py-3 px-4 text-center">
                <span className="text-gray-600 font-medium">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedLicitaciones.map((licitacion) => (
              <tr key={licitacion.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-4">{licitacion.numero}</td>
                <td className="py-4 px-4">{licitacion.titulo}</td>
                <td className="py-4 px-4">{licitacion.organismo}</td>
                <td className="py-4 px-4">{licitacion.tipo}</td>
                <td className="py-4 px-4">{licitacion.publicacion}</td>
                <td className="py-4 px-4">{licitacion.cierre}</td>
                <td className="py-4 px-4 text-right">{formatCurrency(licitacion.montoEstimado)}</td>
                <td className="py-4 px-4 text-center">
                  <Button
                    onClick={() => handleInscribirse(licitacion.id)}
                    className="bg-black hover:bg-gray-800 text-white"
                  >
                    Inscribirse
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Mostrando {paginatedLicitaciones.length} de {filteredLicitaciones.length} registros
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
