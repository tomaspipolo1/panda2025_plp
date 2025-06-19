"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Clock,
  MapPin,
  Truck,
  User,
  Users,
  Building,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DetalleVisitaMiBuzonModalProps {
  isOpen: boolean
  onClose: () => void
  visita: any
}

export function DetalleVisitaMiBuzonModal({ isOpen, onClose, visita }: DetalleVisitaMiBuzonModalProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [accion, setAccion] = useState<"aceptar" | "rechazar" | null>(null)
  const [procesando, setProcesando] = useState(false)

  if (!visita) return null

  const handleAccion = (tipo: "aceptar" | "rechazar") => {
    // Primero cerramos el modal principal
    onClose()

    // Luego, con un pequeño retraso, abrimos el modal de confirmación
    setTimeout(() => {
      setAccion(tipo)
      setShowConfirmDialog(true)
    }, 100)
  }

  const confirmarAccion = () => {
    setProcesando(true)

    // Simulación de procesamiento
    setTimeout(() => {
      setProcesando(false)
      setShowConfirmDialog(false)
      // Cerramos el modal principal después de procesar la acción
      onClose()
    }, 1000)
  }

  const handleCancelarConfirmacion = () => {
    setShowConfirmDialog(false)
  }

  // También modificar la función handleCloseMainModal para asegurarnos que no queden modales abiertos
  const handleCloseMainModal = () => {
    // Asegurarse de que el diálogo de confirmación también se cierre
    setShowConfirmDialog(false)
    // Resetear otros estados
    setAccion(null)
    setProcesando(false)
    // Llamar a la función onClose proporcionada por el padre
    onClose()
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "Aprobada":
        return "bg-green-100 text-green-800"
      case "Rechazada":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleCloseMainModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Detalle de Visita</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Encabezado */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold">Solicitud de Visita - {visita.tipoVisita}</h3>
                <p className="text-sm text-gray-500">{visita.numeroSolicitud}</p>
              </div>
              <Badge className={getEstadoColor(visita.estado)}>{visita.estado}</Badge>
            </div>

            <Separator />

            {/* Información principal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Fecha</h4>
                  <p className="text-sm">
                    {visita.fechaDesde === visita.fechaHasta
                      ? visita.fechaDesde
                      : `${visita.fechaDesde} al ${visita.fechaHasta}`}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Horario</h4>
                  <p className="text-sm">
                    {visita.horaDesde} a {visita.horaHasta}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Destino</h4>
                  <p className="text-sm">{visita.destino}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Building className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Solicitante</h4>
                  <p className="text-sm">
                    {visita.tipoVisita === "Transporte Cargas"
                      ? visita.proveedor?.razonSocial
                      : visita.personas?.[0]?.nombre}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Información específica según tipo de visita */}
            {visita.tipoVisita === "Transporte Cargas" ? (
              <div className="space-y-4">
                <h4 className="font-medium">Información de Transporte</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 mb-1">Operación</h5>
                    <p className="text-sm">{visita.operacion}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 mb-1">Tipo de Carga</h5>
                    <p className="text-sm">{visita.tipoCarga}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md space-y-4">
                  <div>
                    <h5 className="text-sm font-medium mb-2 flex items-center">
                      <Truck className="h-4 w-4 mr-2" />
                      Información del Vehículo
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Patente:</span> {visita.vehiculo?.patente}
                      </div>
                      <div>
                        <span className="text-gray-500">Tipo:</span> {visita.vehiculo?.tipo}
                      </div>
                      <div>
                        <span className="text-gray-500">Marca:</span> {visita.vehiculo?.marca}
                      </div>
                      <div>
                        <span className="text-gray-500">Modelo:</span> {visita.vehiculo?.modelo}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium mb-2 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Información del Conductor
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Nombre:</span> {visita.conductor?.nombre}
                      </div>
                      <div>
                        <span className="text-gray-500">DNI:</span> {visita.conductor?.dni}
                      </div>
                      <div>
                        <span className="text-gray-500">Licencia:</span> {visita.conductor?.licencia}
                      </div>
                      <div>
                        <span className="text-gray-500">Teléfono:</span> {visita.conductor?.telefono}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h4 className="font-medium">Información de Visita Laboral</h4>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h5 className="text-sm font-medium mb-3 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Personas que ingresarán ({visita.personas?.length || 0})
                  </h5>
                  <div className="space-y-3">
                    {visita.personas?.map((persona: any, index: number) => (
                      <div key={index} className="p-2 bg-white rounded-md border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-500">Nombre:</span> {persona.nombre}
                          </div>
                          <div>
                            <span className="text-gray-500">DNI:</span> {persona.dni}
                          </div>
                          <div>
                            <span className="text-gray-500">Email:</span> {persona.email}
                          </div>
                          <div>
                            <span className="text-gray-500">Teléfono:</span> {persona.telefono}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {visita.vehiculo && (
                    <div className="mt-4">
                      <h5 className="text-sm font-medium mb-2 flex items-center">
                        <Truck className="h-4 w-4 mr-2" />
                        Información del Vehículo
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Patente:</span> {visita.vehiculo?.patente}
                        </div>
                        <div>
                          <span className="text-gray-500">Tipo:</span> {visita.vehiculo?.tipo}
                        </div>
                        <div>
                          <span className="text-gray-500">Marca:</span> {visita.vehiculo?.marca}
                        </div>
                        <div>
                          <span className="text-gray-500">Modelo:</span> {visita.vehiculo?.modelo}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Observaciones */}
            {visita.observaciones && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Observaciones</h4>
                <div className="bg-gray-50 p-4 rounded-md text-sm">{visita.observaciones}</div>
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
              <Button variant="outline" onClick={handleCloseMainModal}>
                Cerrar
              </Button>
              {visita.estado === "Pendiente" && (
                <>
                  <Button variant="destructive" onClick={() => handleAccion("rechazar")}>
                    <XCircle className="h-4 w-4 mr-2" />
                    Rechazar
                  </Button>
                  <Button variant="default" onClick={() => handleAccion("aceptar")}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Aceptar
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación - separado del Dialog principal */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              {accion === "aceptar" ? (
                <>
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  Confirmar aprobación
                </>
              ) : (
                <>
                  <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                  Confirmar rechazo
                </>
              )}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {accion === "aceptar"
                ? "¿Está seguro que desea aprobar esta visita? Esta acción no se puede deshacer."
                : "¿Está seguro que desea rechazar esta visita? Esta acción no se puede deshacer."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={procesando} onClick={handleCancelarConfirmacion}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                confirmarAccion()
              }}
              disabled={procesando}
              className={accion === "aceptar" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              {procesando ? "Procesando..." : accion === "aceptar" ? "Aprobar" : "Rechazar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
