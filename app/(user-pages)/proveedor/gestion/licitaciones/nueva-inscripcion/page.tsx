"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FiltrosLicitacionesDisponibles } from "@/components/licitaciones/filtros-licitaciones-disponibles"
import { TablaLicitacionesDisponibles } from "@/components/licitaciones/tabla-licitaciones-disponibles"

// Datos de ejemplo para licitaciones disponibles
const licitacionesDisponiblesData = [
  {
    id: "1",
    numero: "LIC-2023-0130",
    titulo: "Adquisición de mobiliario escolar",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    tipo: "Pública",
    publicacion: "20/04/2023",
    cierre: "10/05/2023",
    montoEstimado: 2500000.0,
  },
  {
    id: "2",
    numero: "LIC-2023-0129",
    titulo: "Servicio de seguridad para edificios públicos",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    tipo: "Invitaci��n",
    publicacion: "18/04/2023",
    cierre: "05/05/2023",
    montoEstimado: 4800000.0,
  },
  {
    id: "3",
    numero: "LIC-2023-0128",
    titulo: "Provisión de equipos médicos",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    tipo: "Pública",
    publicacion: "15/04/2023",
    cierre: "30/04/2023",
    montoEstimado: 3200000.0,
  },
  {
    id: "4",
    numero: "LIC-2023-0127",
    titulo: "Mantenimiento de sistemas informáticos",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    tipo: "Invitación",
    publicacion: "12/04/2023",
    cierre: "28/04/2023",
    montoEstimado: 1800000.0,
  },
  {
    id: "5",
    numero: "LIC-2023-0126",
    titulo: "Construcción de centro deportivo",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    tipo: "Pública",
    publicacion: "10/04/2023",
    cierre: "25/04/2023",
    montoEstimado: 12500000.0,
  },
]

export default function NuevaInscripcionPage() {
  const [filteredLicitaciones, setFilteredLicitaciones] = useState(licitacionesDisponiblesData)

  const handleFilter = (filters: any) => {
    console.log("Aplicando filtros:", filters)
    // Aquí iría la lógica real de filtrado
    // Por ahora solo simulamos que se aplican los filtros
    setFilteredLicitaciones(licitacionesDisponiblesData)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-plp-darkest">Nueva Inscripción a Licitaciones</h1>
        <Button variant="outline" className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>

      <FiltrosLicitacionesDisponibles onFilter={handleFilter} />

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <TablaLicitacionesDisponibles licitaciones={filteredLicitaciones} />
      </div>
    </div>
  )
}
