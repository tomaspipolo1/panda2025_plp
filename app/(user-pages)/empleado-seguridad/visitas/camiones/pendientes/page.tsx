"use client"

import { useState } from "react"
import { Eye, Check, X, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DetalleSolicitudModal } from "@/components/camiones/detalle-solicitud-modal"

export default function CamionesPendientesPage() {
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null)
  const [selectedSolicitud, setSelectedSolicitud] = useState<any>(null)
  const [estado, setEstado] = useState<string>("todos")
  const [fechaDesde, setFechaDesde] = useState<string>("")
  const [fechaHasta, setFechaHasta] = useState<string>("")

  const solicitudes = [
    {
      id: "SOL-2023-001",
      persona: "Carlos Rodríguez",
      dni: "28456789",
      patente: "AB123CD",
      fecha: "2023-05-15",
      hora: "09:30",
      estado: "pendiente",
      tipoCarga: "Materiales",
    },
    {
      id: "SOL-2023-002",
      persona: "María González",
      dni: "30987654",
      patente: "XY456ZW",
      fecha: "2023-05-16",
      hora: "14:45",
      estado: "pendiente",
      tipoCarga: "Maquinaria",
    },
    {
      id: "SOL-2023-003",
      persona: "Juan Pérez",
      dni: "25678901",
      patente: "CD789EF",
      fecha: "2023-05-17",
      hora: "11:15",
      estado: "pendiente",
      tipoCarga: "Líquidos",
    },
    {
      id: "SOL-2023-004",
      persona: "Laura Martínez",
      dni: "32456123",
      patente: "GH012IJ",
      fecha: "2023-05-18",
      hora: "08:00",
      estado: "pendiente",
      tipoCarga: "Contenedores",
    },
    {
      id: "SOL-2023-005",
      persona: "Roberto Sánchez",
      dni: "27890345",
      patente: "KL345MN",
      fecha: "2023-05-19",
      hora: "16:30",
      estado: "pendiente",
      tipoCarga: "Granos",
    },
  ]

  const handleViewDetail = (solicitud: any) => {
    setSelectedSolicitud(solicitud)
    setIsDetailOpen(true)
  }

  const handleAction = (solicitud: any, action: "approve" | "reject") => {
    setSelectedSolicitud(solicitud)
    setActionType(action)
    setIsConfirmOpen(true)
  }

  const handleConfirmAction = () => {
    // Aquí iría la lógica para aprobar o rechazar la solicitud
    setIsConfirmOpen(false)
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return <Badge className="bg-yellow-500">Pendiente</Badge>
      case "aprobado":
        return <Badge className="bg-green-500">Aprobado</Badge>
      case "rechazado":
        return <Badge className="bg-red-500">Rechazado</Badge>
      default:
        return <Badge className="bg-gray-500">Desconocido</Badge>
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Transporte Cargas - Pendientes de Aprobación</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Solicitudes de Acceso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h3 className="text-lg font-medium mb-4">Filtros</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="estado">Estado</Label>
                <Select value={estado} onValueChange={setEstado}>
                  <SelectTrigger id="estado">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="aprobado">Aprobado</SelectItem>
                    <SelectItem value="rechazado">Rechazado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="fecha-desde">Fecha Desde</Label>
                <Input
                  id="fecha-desde"
                  type="date"
                  value={fechaDesde}
                  onChange={(e) => setFechaDesde(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="fecha-hasta">Fecha Hasta</Label>
                <Input
                  id="fecha-hasta"
                  type="date"
                  value={fechaHasta}
                  onChange={(e) => setFechaHasta(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" className="mr-2">
                Limpiar
              </Button>
              <Button>
                <Filter className="h-4 w-4 mr-2" />
                Aplicar Filtros
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">N° Solicitud</th>
                  <th className="px-4 py-2 text-left">Persona que solicita</th>
                  <th className="px-4 py-2 text-left">DNI</th>
                  <th className="px-4 py-2 text-left">Patente</th>
                  <th className="px-4 py-2 text-left">Tipo de Carga</th>
                  <th className="px-4 py-2 text-left">Fecha</th>
                  <th className="px-4 py-2 text-left">Hora</th>
                  <th className="px-4 py-2 text-left">Estado</th>
                  <th className="px-4 py-2 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((solicitud) => (
                  <tr key={solicitud.id} className="border-b">
                    <td className="px-4 py-2">{solicitud.id}</td>
                    <td className="px-4 py-2">{solicitud.persona}</td>
                    <td className="px-4 py-2">{solicitud.dni}</td>
                    <td className="px-4 py-2">{solicitud.patente}</td>
                    <td className="px-4 py-2">{solicitud.tipoCarga}</td>
                    <td className="px-4 py-2">{solicitud.fecha}</td>
                    <td className="px-4 py-2">{solicitud.hora}</td>
                    <td className="px-4 py-2">{getEstadoBadge(solicitud.estado)}</td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex justify-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewDetail(solicitud)}
                          title="Ver detalle"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-green-600 hover:text-green-800 hover:bg-green-100"
                          onClick={() => handleAction(solicitud, "approve")}
                          title="Aprobar"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-800 hover:bg-red-100"
                          onClick={() => handleAction(solicitud, "reject")}
                          title="Rechazar"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Detalle */}
      {selectedSolicitud && (
        <DetalleSolicitudModal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          solicitud={{
            id: selectedSolicitud.id,
            numero: selectedSolicitud.id,
            solicitante: selectedSolicitud.persona,
            dni: selectedSolicitud.dni,
            patente: selectedSolicitud.patente,
            fecha: selectedSolicitud.fecha,
            hora: selectedSolicitud.hora,
            estado: selectedSolicitud.estado as "pendiente" | "aprobado" | "rechazado",
            empresa: "Transportes La Plata S.A.",
            tipoVehiculo: "Camión",
            motivo: "Transporte de mercadería",
            destino: "Muelle Norte",
            observaciones: "Carga de contenedores",
            documentos: [
              { nombre: "licencia_conductor.pdf", tipo: "PDF" },
              { nombre: "cedula_verde.pdf", tipo: "PDF" },
              { nombre: "seguro_vehiculo.pdf", tipo: "PDF" },
            ],
          }}
        />
      )}

      {/* Modal de Confirmación */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{actionType === "approve" ? "Aprobar Solicitud" : "Rechazar Solicitud"}</DialogTitle>
          </DialogHeader>
          <div>
            <p>
              ¿Está seguro que desea {actionType === "approve" ? "aprobar" : "rechazar"} la solicitud{" "}
              {selectedSolicitud?.id}?
            </p>
            {actionType === "reject" && (
              <div className="mt-4">
                <Label htmlFor="motivo">Motivo de rechazo</Label>
                <Input id="motivo" className="mt-1" />
              </div>
            )}
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
                Cancelar
              </Button>
              <Button
                variant="default"
                className={actionType === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
                onClick={handleConfirmAction}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
