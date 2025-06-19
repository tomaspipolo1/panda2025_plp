"use client"

import { useState } from "react"
import { Printer, Download, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { FiltrosVisitas } from "@/components/visitas/filtros-visitas"
import { TablaVisitas } from "@/components/visitas/tabla-visitas"
import { DetalleVisitaModal } from "@/components/visitas/detalle-visita-modal"
import { CancelarVisitaModal } from "@/components/visitas/cancelar-visita-modal"

// Datos de ejemplo para visitas
const visitasData = [
  {
    id: "1",
    fecha: "06/01/2024",
    tipo: "Laboral",
    sitio: "Sitio 1",
    personas: 2,
    vehiculos: 1,
    estado: "Pendiente",
    motivo: "Mantenimiento de equipos informáticos",
    fechaInicio: "06/01/2024",
    fechaFin: "06/01/2024",
    horaInicio: "09:00",
    horaFin: "17:00",
    personasDetalle: [
      {
        id: "p1",
        nombre: "Juan Pérez",
        documento: "25.456.789",
        empresa: "Suministros Industriales S.A.",
      },
      {
        id: "p2",
        nombre: "María López",
        documento: "30.123.456",
        empresa: "Suministros Industriales S.A.",
      },
    ],
    vehiculosDetalle: [
      {
        id: "v1",
        tipo: "Camioneta",
        patente: "AB123CD",
        marca: "Toyota",
        modelo: "Hilux",
      },
    ],
    observaciones: "Se requiere acceso a la sala de servidores.",
  },
  {
    id: "2",
    fecha: "15/12/2023",
    tipo: "Acceso a Muelle",
    sitio: "Sitio 3",
    personas: 4,
    vehiculos: 2,
    estado: "Aprobada",
    motivo: "Descarga de materiales",
    fechaInicio: "15/12/2023",
    fechaFin: "15/12/2023",
    horaInicio: "08:00",
    horaFin: "16:00",
    personasDetalle: [
      {
        id: "p1",
        nombre: "Roberto Gómez",
        documento: "20.789.456",
        empresa: "Suministros Industriales S.A.",
      },
      {
        id: "p2",
        nombre: "Carlos Sánchez",
        documento: "22.456.123",
        empresa: "Suministros Industriales S.A.",
      },
      {
        id: "p3",
        nombre: "Ana Martínez",
        documento: "28.123.789",
        empresa: "Suministros Industriales S.A.",
      },
      {
        id: "p4",
        nombre: "Luis Rodríguez",
        documento: "31.456.789",
        empresa: "Suministros Industriales S.A.",
      },
    ],
    vehiculosDetalle: [
      {
        id: "v1",
        tipo: "Camión",
        patente: "XY789ZW",
        marca: "Mercedes-Benz",
        modelo: "Actros",
      },
      {
        id: "v2",
        tipo: "Camioneta",
        patente: "CD456EF",
        marca: "Ford",
        modelo: "Ranger",
      },
    ],
    observaciones: "Se requiere grúa para descarga de materiales pesados.",
  },
  {
    id: "3",
    fecha: "10/11/2023",
    tipo: "Materiales",
    sitio: "Sitio 2",
    personas: 1,
    vehiculos: 1,
    estado: "Completada",
    motivo: "Entrega de suministros de oficina",
    fechaInicio: "10/11/2023",
    fechaFin: "10/11/2023",
    horaInicio: "10:00",
    horaFin: "12:00",
    personasDetalle: [
      {
        id: "p1",
        nombre: "Pedro Fernández",
        documento: "27.123.456",
        empresa: "Suministros Industriales S.A.",
      },
    ],
    vehiculosDetalle: [
      {
        id: "v1",
        tipo: "Utilitario",
        patente: "GH789IJ",
        marca: "Renault",
        modelo: "Kangoo",
      },
    ],
    observaciones: "Entrega realizada en tiempo y forma.",
  },
  {
    id: "4",
    fecha: "05/10/2023",
    tipo: "Guiada",
    sitio: "Sitio 4",
    personas: 8,
    vehiculos: 0,
    estado: "Cancelada",
    motivo: "Visita educativa",
    fechaInicio: "05/10/2023",
    fechaFin: "05/10/2023",
    horaInicio: "14:00",
    horaFin: "16:00",
    personasDetalle: [
      {
        id: "p1",
        nombre: "Laura Giménez",
        documento: "24.789.123",
        empresa: "Universidad Nacional",
      },
      {
        id: "p2",
        nombre: "Martín Torres",
        documento: "25.123.789",
        empresa: "Universidad Nacional",
      },
      {
        id: "p3",
        nombre: "Sofía Ramírez",
        documento: "26.456.123",
        empresa: "Universidad Nacional",
      },
      {
        id: "p4",
        nombre: "Javier López",
        documento: "27.789.456",
        empresa: "Universidad Nacional",
      },
      {
        id: "p5",
        nombre: "Valentina Pérez",
        documento: "28.123.456",
        empresa: "Universidad Nacional",
      },
      {
        id: "p6",
        nombre: "Matías González",
        documento: "29.456.789",
        empresa: "Universidad Nacional",
      },
      {
        id: "p7",
        nombre: "Lucía Fernández",
        documento: "30.789.123",
        empresa: "Universidad Nacional",
      },
      {
        id: "p8",
        nombre: "Nicolás Martínez",
        documento: "31.123.456",
        empresa: "Universidad Nacional",
      },
    ],
    vehiculosDetalle: [],
    observaciones: "Cancelada por mal tiempo.",
  },
]

export default function MisVisitasPage() {
  const router = useRouter()
  const [filteredVisitas, setFilteredVisitas] = useState(visitasData)
  const [selectedVisita, setSelectedVisita] = useState<any>(null)
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false)
  const [isCancelarModalOpen, setIsCancelarModalOpen] = useState(false)

  const handleFilter = (filters: any) => {
    console.log("Aplicando filtros:", filters)
    // Aquí iría la lógica real de filtrado
    // Por ahora solo simulamos que se aplican los filtros
    setFilteredVisitas(visitasData)
  }

  const handleVerDetalle = (visita: any) => {
    setSelectedVisita(visita)
    setIsDetalleModalOpen(true)
  }

  const handleEditar = (visita: any) => {
    console.log("Editando visita:", visita)
    // Aquí iría la lógica para editar la visita
    // Por ejemplo, redirigir a la página de edición
    router.push(`/proveedor/visitas/editar-visita?id=${visita.id}`)
  }

  const handleCancelar = (visita: any) => {
    setSelectedVisita(visita)
    setIsCancelarModalOpen(true)
  }

  const handleConfirmCancelar = (motivo: string) => {
    console.log(`Visita ${selectedVisita?.id} cancelada. Motivo:`, motivo)
    // Aquí iría la lógica real para cancelar la visita
    alert(`Visita cancelada correctamente`)
  }

  const handleNuevaVisita = () => {
    router.push("/proveedor/visitas/nueva-visita")
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-plp-darkest">Mis Visitas</h1>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Button variant="outline" className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button onClick={handleNuevaVisita} className="bg-black hover:bg-gray-800 text-white flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Visita
          </Button>
        </div>
      </div>

      <FiltrosVisitas onFilter={handleFilter} />

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <TablaVisitas
          visitas={filteredVisitas}
          onVerDetalle={handleVerDetalle}
          onEditar={handleEditar}
          onCancelar={handleCancelar}
        />
      </div>

      <DetalleVisitaModal
        isOpen={isDetalleModalOpen}
        onClose={() => setIsDetalleModalOpen(false)}
        visita={selectedVisita}
      />

      <CancelarVisitaModal
        isOpen={isCancelarModalOpen}
        onClose={() => setIsCancelarModalOpen(false)}
        onConfirm={handleConfirmCancelar}
        visita={selectedVisita}
      />
    </div>
  )
}
