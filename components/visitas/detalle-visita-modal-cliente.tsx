"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface DetalleVisitaModalClienteProps {
  isOpen: boolean
  onClose: () => void
  visitaId: number | null
}

export function DetalleVisitaModalCliente({ isOpen, onClose, visitaId }: DetalleVisitaModalClienteProps) {
  const [activeTab, setActiveTab] = useState("detalles")

  // Datos de ejemplo para la visita seleccionada
  const visitaDetalle = {
    id: visitaId,
    numero: `VIS-2023-${visitaId?.toString().padStart(4, "0")}`,
    fecha: "06/01/2024",
    tipo: "Laboral",
    sitio: "Sitio 1",
    direccion: "Av. Principal 123, Zona Industrial",
    personas: 2,
    vehiculos: 1,
    estado: "Pendiente",
    motivo: "Inspección de instalaciones",
    horaInicio: "09:00",
    horaFin: "12:00",
    solicitante: "Juan Pérez",
    fechaSolicitud: "02/01/2024",
    observaciones: "Se requiere acceso a la zona de producción y almacenes.",
    historial: [
      { fecha: "02/01/2024 10:15", usuario: "Juan Pérez", accion: "Creación de la solicitud de visita" },
      { fecha: "03/01/2024 14:30", usuario: "María Gómez", accion: "Revisión de la solicitud" },
      { fecha: "04/01/2024 09:45", usuario: "Sistema", accion: "Envío de notificación al solicitante" },
    ],
    visitantes: [
      { nombre: "Carlos Rodríguez", documento: "28456789", empresa: "Consultora ABC" },
      { nombre: "Ana Martínez", documento: "30123456", empresa: "Consultora ABC" },
    ],
    vehiculosDetalle: [{ tipo: "Automóvil", patente: "ABC123", marca: "Toyota", modelo: "Corolla" }],
  }

  if (!isOpen || !visitaId) return null

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "Aprobada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobada</Badge>
      case "Completada":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Completada</Badge>
      case "Cancelada":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cancelada</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Detalle de Visita - {visitaDetalle.numero}</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="detalles">Detalles</TabsTrigger>
            <TabsTrigger value="visitantes">Visitantes</TabsTrigger>
            <TabsTrigger value="historial">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="detalles" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-500">Número</h3>
                <p>{visitaDetalle.numero}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Estado</h3>
                <p>{getEstadoBadge(visitaDetalle.estado)}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Fecha</h3>
                <p>{visitaDetalle.fecha}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Horario</h3>
                <p>
                  {visitaDetalle.horaInicio} - {visitaDetalle.horaFin}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Tipo</h3>
                <p>{visitaDetalle.tipo}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Solicitante</h3>
                <p>{visitaDetalle.solicitante}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Sitio</h3>
                <p>{visitaDetalle.sitio}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Fecha de Solicitud</h3>
                <p>{visitaDetalle.fechaSolicitud}</p>
              </div>
              <div className="col-span-2">
                <h3 className="font-medium text-gray-500">Dirección</h3>
                <p>{visitaDetalle.direccion}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Cantidad de Personas</h3>
                <p>{visitaDetalle.personas}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Cantidad de Vehículos</h3>
                <p>{visitaDetalle.vehiculos}</p>
              </div>
              <div className="col-span-2">
                <h3 className="font-medium text-gray-500">Motivo</h3>
                <p>{visitaDetalle.motivo}</p>
              </div>
              <div className="col-span-2">
                <h3 className="font-medium text-gray-500">Observaciones</h3>
                <p>{visitaDetalle.observaciones}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="visitantes">
            <div className="space-y-4">
              <h3 className="font-medium">Personas</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-4 text-left font-medium text-sm text-gray-600">Nombre</th>
                      <th className="py-2 px-4 text-left font-medium text-sm text-gray-600">Documento</th>
                      <th className="py-2 px-4 text-left font-medium text-sm text-gray-600">Empresa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visitaDetalle.visitantes.map((visitante, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4">{visitante.nombre}</td>
                        <td className="py-2 px-4">{visitante.documento}</td>
                        <td className="py-2 px-4">{visitante.empresa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {visitaDetalle.vehiculosDetalle.length > 0 && (
                <>
                  <h3 className="font-medium mt-6">Vehículos</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left font-medium text-sm text-gray-600">Tipo</th>
                          <th className="py-2 px-4 text-left font-medium text-sm text-gray-600">Patente</th>
                          <th className="py-2 px-4 text-left font-medium text-sm text-gray-600">Marca</th>
                          <th className="py-2 px-4 text-left font-medium text-sm text-gray-600">Modelo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visitaDetalle.vehiculosDetalle.map((vehiculo, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2 px-4">{vehiculo.tipo}</td>
                            <td className="py-2 px-4">{vehiculo.patente}</td>
                            <td className="py-2 px-4">{vehiculo.marca}</td>
                            <td className="py-2 px-4">{vehiculo.modelo}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="historial">
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-4 text-left font-medium text-sm text-gray-600">Fecha y Hora</th>
                      <th className="py-2 px-4 text-left font-medium text-sm text-gray-600">Usuario</th>
                      <th className="py-2 px-4 text-left font-medium text-sm text-gray-600">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visitaDetalle.historial.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4">{item.fecha}</td>
                        <td className="py-2 px-4">{item.usuario}</td>
                        <td className="py-2 px-4">{item.accion}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
