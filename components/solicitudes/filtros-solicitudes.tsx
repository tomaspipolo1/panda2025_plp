"use client"

import { useState } from "react"
import { Calendar, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface FiltrosSolicitudesProps {
  onFilter: (filters: any) => void
}

export function FiltrosSolicitudes({ onFilter }: FiltrosSolicitudesProps) {
  const [numeroSolicitud, setNumeroSolicitud] = useState<string>("")
  const [tipo, setTipo] = useState<string>("todos")
  const [estado, setEstado] = useState<string>("todos")
  const [fechaDesde, setFechaDesde] = useState<string>("")
  const [showTipoOptions, setShowTipoOptions] = useState<boolean>(false)

  const handleAplicarFiltros = () => {
    onFilter({
      numeroSolicitud,
      tipo,
      estado,
      fechaDesde,
    })
  }

  const handleLimpiar = () => {
    setNumeroSolicitud("")
    setTipo("todos")
    setEstado("todos")
    setFechaDesde("")
    onFilter({
      numeroSolicitud: "",
      tipo: "todos",
      estado: "todos",
      fechaDesde: "",
    })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-bold text-plp-darkest mb-4">Filtros</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Número de Solicitud */}
        <div>
          <label htmlFor="numeroSolicitud" className="block text-sm font-medium text-gray-700 mb-1">
            Número de Solicitud
          </label>
          <Input
            id="numeroSolicitud"
            placeholder="Ej: SOL-2023-0125"
            value={numeroSolicitud}
            onChange={(e) => setNumeroSolicitud(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Tipo */}
        <div className="relative">
          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo
          </label>
          <div className="relative">
            <Select value={tipo} onValueChange={setTipo} onOpenChange={setShowTipoOptions}>
              <SelectTrigger id="tipo" className="w-full">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="cambio_datos">Cambio de datos</SelectItem>
                <SelectItem value="solicitud_acceso">Solicitud de acceso</SelectItem>
                <SelectItem value="reclamo">Reclamo</SelectItem>
                <SelectItem value="consulta">Consulta</SelectItem>
              </SelectContent>
            </Select>
            {showTipoOptions && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-md z-10 mt-1">
                <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <input
                    type="checkbox"
                    checked={tipo === "todos"}
                    onChange={() => setTipo("todos")}
                    className="mr-2"
                  />
                  <span>Todos</span>
                </div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <input
                    type="checkbox"
                    checked={tipo === "cambio_datos"}
                    onChange={() => setTipo("cambio_datos")}
                    className="mr-2"
                  />
                  <span>Cambio de datos</span>
                </div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <input
                    type="checkbox"
                    checked={tipo === "solicitud_acceso"}
                    onChange={() => setTipo("solicitud_acceso")}
                    className="mr-2"
                  />
                  <span>Solicitud de acceso</span>
                </div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <input
                    type="checkbox"
                    checked={tipo === "reclamo"}
                    onChange={() => setTipo("reclamo")}
                    className="mr-2"
                  />
                  <span>Reclamo</span>
                </div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <input
                    type="checkbox"
                    checked={tipo === "consulta"}
                    onChange={() => setTipo("consulta")}
                    className="mr-2"
                  />
                  <span>Consulta</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Estado */}
        <div>
          <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <Select value={estado} onValueChange={setEstado}>
            <SelectTrigger id="estado" className="w-full">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="en_proceso">En Proceso</SelectItem>
              <SelectItem value="resuelta">Resuelta</SelectItem>
              <SelectItem value="rechazada">Rechazada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Fecha Desde */}
        <div>
          <label htmlFor="fechaDesde" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha Desde
          </label>
          <div className="relative">
            <Input
              id="fechaDesde"
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              className="w-full pl-10"
              placeholder="dd/mm/aaaa"
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6 space-x-2">
        <Button variant="outline" onClick={handleLimpiar}>
          Limpiar
        </Button>
        <Button onClick={handleAplicarFiltros} className="bg-plp-dark hover:bg-plp-medium">
          <Filter className="h-4 w-4 mr-2" />
          Aplicar Filtros
        </Button>
      </div>
    </div>
  )
}
