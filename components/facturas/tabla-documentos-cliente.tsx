"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp, Download, Eye, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Documento {
  id: string
  fecha: string
  numero: string
  concepto: string
  monto: number
  estado: "Pendiente" | "Emitida" | "Pagada" | "Vencida" | "Anulada"
}

interface TablaDocumentosClienteProps {
  tipo: "facturas" | "notasCredito" | "notasDebito"
  documentos: Documento[]
  onVerDetalle: (documento: Documento) => void
  onDescargarPDF: (documento: Documento) => void
  onAnular?: (documento: Documento) => void
}

export function TablaDocumentosCliente({
  tipo,
  documentos,
  onVerDetalle,
  onDescargarPDF,
  onAnular,
}: TablaDocumentosClienteProps) {
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
  const filteredDocumentos = documentos.filter(
    (doc) =>
      doc.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.concepto.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Ordenar documentos
  const sortedDocumentos = [...filteredDocumentos].sort((a, b) => {
    if (sortField === "fecha") {
      const dateA = new Date(a.fecha.split("/").reverse().join("-"))
      const dateB = new Date(b.fecha.split("/").reverse().join("-"))
      return sortDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
    }

    if (sortField === "monto") {
      return sortDirection === "asc" ? a.monto - b.monto : b.monto - a.monto
    }

    // Para otros campos como número, cliente, etc.
    const valueA = a[sortField as keyof Documento]
    const valueB = b[sortField as keyof Documento]

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
    }

    return 0
  })

  // Paginación
  const totalPages = Math.ceil(sortedDocumentos.length / itemsPerPage)
  const paginatedDocumentos = sortedDocumentos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "Emitida":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Emitida</Badge>
      case "Pagada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Pagada</Badge>
      case "Vencida":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Vencida</Badge>
      case "Anulada":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Anulada</Badge>
      default:
        return null
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    })
      .format(value)
      .replace("ARS", "$")
  }

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="w-72 ml-auto">
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
                <span className="text-gray-600 font-medium">Número</span>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-gray-600 font-medium">Organismo</span>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-gray-600 font-medium">Concepto</span>
              </th>
              <th className="py-3 px-4 text-right">
                <button
                  className="flex items-center text-gray-600 font-medium ml-auto"
                  onClick={() => handleSort("monto")}
                >
                  Monto
                  {sortField === "monto" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  ) : null}
                </button>
              </th>
              <th className="py-3 px-4 text-center">
                <span className="text-gray-600 font-medium">Estado</span>
              </th>
              <th className="py-3 px-4 text-center">
                <span className="text-gray-600 font-medium">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedDocumentos.map((documento) => (
              <tr key={documento.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-4">{documento.fecha}</td>
                <td className="py-4 px-4">{documento.numero}</td>
                <td className="py-4 px-4">Consorcio de Gestión Puerto La Plata</td>
                <td className="py-4 px-4">{documento.concepto}</td>
                <td className="py-4 px-4 text-right">{formatCurrency(documento.monto)}</td>
                <td className="py-4 px-4 text-center">{getEstadoBadge(documento.estado)}</td>
                <td className="py-4 px-4 text-center">
                  <div className="relative" ref={dropdownRef}>
                    <DropdownMenu
                      open={openDropdown === documento.id}
                      onOpenChange={() => toggleDropdown(documento.id)}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => onVerDetalle(documento)} className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDescargarPDF(documento)} className="cursor-pointer">
                          <Download className="mr-2 h-4 w-4" />
                          Descargar PDF
                        </DropdownMenuItem>
                        {onAnular && documento.estado !== "Anulada" && (
                          <DropdownMenuItem onClick={() => onAnular(documento)} className="cursor-pointer text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Anular
                          </DropdownMenuItem>
                        )}
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
          Mostrando {paginatedDocumentos.length} de {filteredDocumentos.length} registros
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
                className={currentPage === pageNumber ? "bg-plp-dark" : ""}
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
