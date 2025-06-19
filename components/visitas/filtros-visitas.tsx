"use client"

import { useState } from "react"
import { Calendar, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface FiltrosVisitasProps {
  onFilter: (filters: any) => void
}

export function FiltrosVisitas({ onFilter }: FiltrosVisitasProps) {
  const [tipoVisita, setTipoVisita] = useState<string>("todos")
  const [estado, setEstado] = useState<string>("todos")
  const [fechaDesde, setFechaDesde] = useState<string>("")
  const [fechaHasta, setFechaHasta] = useState<string>("")
  const [showTipoOptions, setShowTipoOptions] = useState<boolean>(false)

  const handleAplicarFiltros = () => {
    onFilter({
      tipoVisita,
      estado,
      fechaDesde,
      fechaHasta,
    })
  }

  const handleLimpiar = () => {
    setTipoVisita("todos")
    setEstado("todos")
    setFechaDesde("")
    setFechaHasta("")
    onFilter({
      tipoVisita: "todos",
      estado: "todos",
      fechaDesde: "",
      fechaHasta: "",
    })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-bold text-plp-darkest mb-4">Filtros</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Tipo de Visita */}
        <div className="relative">
          <label htmlFor="tipoVisita" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Visita
          </label>
          <div className="relative">
            <Select value={tipoVisita} onValueChange={setTipoVisita} onOpenChange={setShowTipoOptions}>
              <SelectTrigger id="tipoVisita" className="w-full">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="laboral">Laboral</SelectItem>
                <SelectItem value="guiada">Guiada</SelectItem>
                <SelectItem value="evento">Evento</SelectItem>
                <SelectItem value="materiales">Materiales</SelectItem>
                <SelectItem value="acceso_obra">Acceso a Obra</SelectItem>
                <SelectItem value="acceso_muelle">Acceso a Muelle</SelectItem>
              </SelectContent>
            </Select>
            {showTipoOptions && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-md z-10 mt-1">
                <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <input
                    type="checkbox"
                    checked={tipoVisita === "todos"}
                    onChange={() => setTipoVisita("todos")}
                    className="mr-2"
                  />
                  <span>Todos</span>
                </div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <input
                    type="checkbox"
                    checked={tipoVisita === "laboral"}
                    onChange={() => setTipoVisita("laboral")}
                    className="mr-2"
                  />
                  <span>Laboral</span>
                </div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <input
                    type="checkbox"
                    checked={tipoVisita === "guiada"}
                    onChange={() => setTipoVisita("guiada")}
                    className="mr-2"
                  />
                  <span>Guiada</span>
                </div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <input
                    type="checkbox"
                    checked={tipoVisita === "evento"}
                    onChange={() => setTipoVisita("evento")}
                    className="mr-2"
                  />
                  <span>Evento</span>
                </div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <input
                    type="checkbox"
                    checked={tipoVisita === "materiales"}
                    onChange={() => setTipoVisita("materiales")}
                    className="mr-2"
                  />
                  <span>Materiales</span>
                </div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <input
                    type="checkbox"
                    checked={tipoVisita === "acceso_obra"}
                    onChange={() => setTipoVisita("acceso_obra")}
                    className="mr-2"
                  />
                  <span>Acceso a Obra</span>
                </div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <input
                    type="checkbox"
                    checked={tipoVisita === "acceso_muelle"}
                    onChange={() => setTipoVisita("acceso_muelle")}
                    className="mr-2"
                  />
                  <span>Acceso a Muelle</span>
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
              <SelectItem value="aprobada">Aprobada</SelectItem>
              <SelectItem value="completada">Completada</SelectItem>
              <SelectItem value="cancelada">Cancelada</SelectItem>
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
