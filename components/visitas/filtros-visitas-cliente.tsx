"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, FilterIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface FiltrosVisitasClienteProps {
  onFilter: (filters: any) => void
}

export function FiltrosVisitasCliente({ onFilter }: FiltrosVisitasClienteProps) {
  const [tipoVisita, setTipoVisita] = useState<string>("")
  const [estado, setEstado] = useState<string>("")
  const [fechaDesde, setFechaDesde] = useState<Date | undefined>(undefined)
  const [fechaHasta, setFechaHasta] = useState<Date | undefined>(undefined)

  const handleLimpiar = () => {
    setTipoVisita("")
    setEstado("")
    setFechaDesde(undefined)
    setFechaHasta(undefined)
    onFilter({})
  }

  const handleAplicarFiltros = () => {
    onFilter({
      tipoVisita,
      estado,
      fechaDesde,
      fechaHasta,
    })
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <h2 className="text-xl font-bold mb-4">Filtros</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label htmlFor="tipoVisita" className="block text-sm font-medium">
            Tipo de Visita
          </label>
          <select
            id="tipoVisita"
            value={tipoVisita}
            onChange={(e) => setTipoVisita(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
          >
            <option value="">Todos</option>
            <option value="Laboral">Laboral</option>
            <option value="Acceso a Muelle">Acceso a Muelle</option>
            <option value="Materiales">Materiales</option>
            <option value="Guiada">Guiada</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="estado" className="block text-sm font-medium">
            Estado
          </label>
          <select
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
          >
            <option value="">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Aprobada">Aprobada</option>
            <option value="Completada">Completada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="fechaDesde" className="block text-sm font-medium">
            Fecha Desde
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {fechaDesde ? format(fechaDesde, "dd/MM/yyyy", { locale: es }) : <span>dd/mm/aaaa</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={fechaDesde} onSelect={setFechaDesde} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label htmlFor="fechaHasta" className="block text-sm font-medium">
            Fecha Hasta
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {fechaHasta ? format(fechaHasta, "dd/MM/yyyy", { locale: es }) : <span>dd/mm/aaaa</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={fechaHasta} onSelect={setFechaHasta} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex justify-end mt-6 gap-2">
        <Button variant="outline" onClick={handleLimpiar}>
          Limpiar
        </Button>
        <Button onClick={handleAplicarFiltros} className="bg-[#0f2b5b] hover:bg-[#0c2249]">
          <FilterIcon className="h-4 w-4 mr-2" />
          Aplicar Filtros
        </Button>
      </div>
    </div>
  )
}
