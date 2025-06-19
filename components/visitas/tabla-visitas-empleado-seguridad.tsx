"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { CheckIcon, XIcon, EyeIcon } from "lucide-react"
import { DetalleVisitaModal } from "@/components/visitas/detalle-visita-modal"

interface Visita {
  id: string
  numero: string
  visitante: string
  empresa: string
  fechaVisita: string
  horaVisita: string
  estado: string
  motivo: string
  tipo?: string
  sitio?: string
  personas?: number
  vehiculos?: number
}

interface TablaVisitasEmpleadoSeguridadProps {
  visitas: Visita[]
}

export function TablaVisitasEmpleadoSeguridad({ visitas }: TablaVisitasEmpleadoSeguridadProps) {
  const [selectedVisita, setSelectedVisita] = useState<Visita | null>(null)
  const [isDetalleOpen, setIsDetalleOpen] = useState(false)
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [actionVisita, setActionVisita] = useState<Visita | null>(null)
  const [motivoRechazo, setMotivoRechazo] = useState("")

  const handleVerDetalle = (visita: Visita) => {
    setSelectedVisita(visita)
    setIsDetalleOpen(true)
  }

  const handleAprobar = (visita: Visita) => {
    setActionVisita(visita)
    setIsApproveDialogOpen(true)
  }

  const handleRechazar = (visita: Visita) => {
    setActionVisita(visita)
    setIsRejectDialogOpen(true)
  }

  const confirmAprobar = () => {
    // Aquí iría la lógica para aprobar la solicitud
    console.log("Solicitud aprobada:", actionVisita)
    setIsApproveDialogOpen(false)
    setActionVisita(null)
  }

  const confirmRechazar = () => {
    // Aquí iría la lógica para rechazar la solicitud
    console.log("Solicitud rechazada:", actionVisita, "Motivo:", motivoRechazo)
    setIsRejectDialogOpen(false)
    setActionVisita(null)
    setMotivoRechazo("")
  }

  const canApproveReject = (tipo: string | undefined) => {
    if (!tipo) return false
    return ["Acceso a Obra", "Acceso a Muelle", "Materiales"].includes(tipo)
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "aceptada":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Aceptada</Badge>
      case "aprobada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobada</Badge>
      case "rechazada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazada</Badge>
      case "cancelada":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cancelada</Badge>
      case "finalizada":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Finalizada</Badge>
      case "en curso":
        return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">En Curso</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  const getTipoBadge = (tipo: string | undefined) => {
    if (!tipo) return null

    switch (tipo) {
      case "Acceso a Obra":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{tipo}</Badge>
      case "Acceso a Muelle":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{tipo}</Badge>
      case "Laboral":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">{tipo}</Badge>
      case "Guiada":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">{tipo}</Badge>
      case "Evento":
        return <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-100">{tipo}</Badge>
      case "Materiales":
        return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">{tipo}</Badge>
      default:
        return <Badge>{tipo}</Badge>
    }
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Número</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Visitante</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Empresa</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Tipo</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Fecha</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Hora</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Personas</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Vehículos</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Estado</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visitas.map((visita) => (
              <tr key={visita.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-2 px-4 text-sm">{visita.numero}</td>
                <td className="py-2 px-4 text-sm">{visita.visitante}</td>
                <td className="py-2 px-4 text-sm">{visita.empresa}</td>
                <td className="py-2 px-4 text-sm">{getTipoBadge(visita.tipo)}</td>
                <td className="py-2 px-4 text-sm">{visita.fechaVisita}</td>
                <td className="py-2 px-4 text-sm">{visita.horaVisita}</td>
                <td className="py-2 px-4 text-sm">{visita.personas || "-"}</td>
                <td className="py-2 px-4 text-sm">{visita.vehiculos || "-"}</td>
                <td className="py-2 px-4 text-sm">{getEstadoBadge(visita.estado)}</td>
                <td className="py-2 px-4 text-sm">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleVerDetalle(visita)} className="h-8 px-2">
                      <EyeIcon className="h-4 w-4" />
                      <span className="sr-only">Ver detalle</span>
                    </Button>

                    {visita.estado.toLowerCase() === "pendiente" && canApproveReject(visita.tipo) && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAprobar(visita)}
                          className="h-8 px-2 text-green-600 border-green-200 hover:bg-green-50"
                        >
                          <CheckIcon className="h-4 w-4" />
                          <span className="sr-only">Aprobar</span>
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRechazar(visita)}
                          className="h-8 px-2 text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <XIcon className="h-4 w-4" />
                          <span className="sr-only">Rechazar</span>
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Detalle */}
      {selectedVisita && (
        <DetalleVisitaModal
          isOpen={isDetalleOpen}
          onClose={() => setIsDetalleOpen(false)}
          visita={{
            id: selectedVisita.id,
            fecha: selectedVisita.fechaVisita,
            tipo: selectedVisita.tipo || "No especificado",
            sitio: selectedVisita.sitio || "No especificado",
            personas: selectedVisita.personas || 0,
            vehiculos: selectedVisita.vehiculos || 0,
            estado: selectedVisita.estado,
            motivo: selectedVisita.motivo,
            fechaInicio: selectedVisita.fechaVisita,
            fechaFin: selectedVisita.fechaVisita,
            horaInicio: selectedVisita.horaVisita,
            horaFin: "18:00", // Valor por defecto
            personasDetalle: [],
            vehiculosDetalle: [],
            observaciones: "",
          }}
        />
      )}

      {/* Diálogo de Confirmación para Aprobar */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Aprobación</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>¿Está seguro que desea aprobar la solicitud de acceso {actionVisita?.numero}?</p>
            <p className="mt-2 text-sm text-gray-500">
              Esta acción permitirá el acceso del visitante {actionVisita?.visitante} de {actionVisita?.empresa}.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmAprobar} className="bg-green-600 hover:bg-green-700">
              Aprobar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Confirmación para Rechazar */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Rechazo</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>¿Está seguro que desea rechazar la solicitud de acceso {actionVisita?.numero}?</p>
            <div className="mt-4">
              <label htmlFor="motivoRechazo" className="block text-sm font-medium text-gray-700 mb-1">
                Motivo del rechazo (obligatorio)
              </label>
              <textarea
                id="motivoRechazo"
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
                value={motivoRechazo}
                onChange={(e) => setMotivoRechazo(e.target.value)}
                placeholder="Indique el motivo del rechazo..."
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmRechazar} className="bg-red-600 hover:bg-red-700" disabled={!motivoRechazo.trim()}>
              Rechazar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
