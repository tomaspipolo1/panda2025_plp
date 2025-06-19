"use client"

import { useState } from "react"
import { Calendar, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface FiltrosLicitacionesDisponiblesProps {
  onFilter: (filters: any) => void
}

export function FiltrosLicitacionesDisponibles({ onFilter }: FiltrosLicitacionesDisponiblesProps) {
  const [tipoLicitacion, setTipoLicitacion] = useState<string>("todos")
  const [organismo, setOrganismo] = useState<string>("Consorcio de Gestión del Puerto La Plata")
  const [fechaDesde, setFechaDesde] = useState<string>("")
  const [fechaHasta, setFechaHasta] = useState<string>("")
  const [showTipoOptions, setShowTipoOptions] = useState<boolean>(false)

  const handleAplicarFiltros = () => {
    onFilter({
      tipoLicitacion,
      organismo,
      fechaDesde,
      fechaHasta,
    })
  }

  const handleLimpiar = () => {
    setTipoLicitacion("todos")
    setOrganismo("Consorcio de Gestión del Puerto La Plata")
    setFechaDesde("")
    setFechaHasta("")
    onFilter({
      tipoLicitacion: "todos",
      organismo: "Consorcio de Gestión del Puerto La Plata",
      fechaDesde: "",
      fechaHasta: "",
    })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-bold text-plp-darkest mb-4">Filtros</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Tipo de Licitación */}
        <div className="relative">
          <label htmlFor="tipoLicitacion" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Licitación
          </label>
          <div className="relative">
            <Select value={tipoLicitacion} onValueChange={setTipoLicitacion} onOpenChange={setShowTipoOptions}>
              <SelectTrigger id="tipoLicitacion" className="w-full">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="publica">Pública</SelectItem>
                <SelectItem value="invitacion">Por Invitación</SelectItem>
              </SelectContent>
            </Select>
            {showTipoOptions && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-md z-10 mt-1">
                <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <input
                    type="checkbox"
                    checked={tipoLicitacion === "todos"}
                    onChange={() => setTipoLicitacion("todos")}
                    className="mr-2"
                  />
                  <span>Todos</span>
                </div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <input
                    type="checkbox"
                    checked={tipoLicitacion === "publica"}
                    onChange={() => setTipoLicitacion("publica")}
                    className="mr-2"
                  />
                  <span>Pública</span>
                </div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <input
                    type="checkbox"
                    checked={tipoLicitacion === "invitacion"}
                    onChange={() => setTipoLicitacion("invitacion")}
                    className="mr-2"
                  />
                  <span>Por Invitación</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Organismo */}
        <div>
          <label htmlFor="organismo" className="block text-sm font-medium text-gray-700 mb-1">
            Organismo
          </label>
          <Select value={organismo} onValueChange={setOrganismo}>
            <SelectTrigger id="organismo" className="w-full">
              <SelectValue placeholder="Consorcio de Gestión del Puerto La Plata" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Consorcio de Gestión del Puerto La Plata">
                Consorcio de Gestión del Puerto La Plata
              </SelectItem>
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

        {/* Fecha Hasta */}
        <div>
          <label htmlFor="fechaHasta" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha Hasta
          </label>
          <div className="relative">
            <Input
              id="fechaHasta"
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
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
