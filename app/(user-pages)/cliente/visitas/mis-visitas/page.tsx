"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FiltrosVisitasCliente } from "@/components/visitas/filtros-visitas-cliente"
import { TablaVisitasCliente } from "@/components/visitas/tabla-visitas-cliente"
import { DetalleVisitaModalCliente } from "@/components/visitas/detalle-visita-modal-cliente"
import { CancelarVisitaModalCliente } from "@/components/visitas/cancelar-visita-modal-cliente"
import { Printer, Download, Plus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function MisVisitasClientePage() {
  const [selectedVisitaId, setSelectedVisitaId] = useState<number | null>(null)
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false)
  const [isCancelarModalOpen, setIsCancelarModalOpen] = useState(false)
  const { toast } = useToast()

  const handleVerDetalle = (id: number) => {
    setSelectedVisitaId(id)
    setIsDetalleModalOpen(true)
  }

  const handleCancelarVisita = (id: number) => {
    setSelectedVisitaId(id)
    setIsCancelarModalOpen(true)
  }

  const handleConfirmCancelacion = (motivo: string) => {
    toast({
      title: "Visita cancelada",
      description: "La visita ha sido cancelada exitosamente.",
    })
  }

  const handleFilter = (filters: any) => {
    console.log("Aplicando filtros:", filters)
    // Aquí iría la lógica para filtrar las visitas
  }

  const handleImprimir = () => {
    window.print()
  }

  const handleExportar = () => {
    toast({
      title: "Exportación iniciada",
      description: "El archivo se está generando y se descargará en breve.",
    })
  }

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis Visitas</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleImprimir}>
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button variant="outline" onClick={handleExportar}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button asChild className="bg-black hover:bg-gray-800">
            <Link href="/cliente/visitas/nueva-visita">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Visita
            </Link>
          </Button>
        </div>
      </div>

      <FiltrosVisitasCliente onFilter={handleFilter} />

      <TablaVisitasCliente onVerDetalle={handleVerDetalle} onCancelarVisita={handleCancelarVisita} />

      <DetalleVisitaModalCliente
        isOpen={isDetalleModalOpen}
        onClose={() => setIsDetalleModalOpen(false)}
        visitaId={selectedVisitaId}
      />

      <CancelarVisitaModalCliente
        isOpen={isCancelarModalOpen}
        onClose={() => setIsCancelarModalOpen(false)}
        onConfirm={handleConfirmCancelacion}
        visitaId={selectedVisitaId}
      />
    </div>
  )
}
