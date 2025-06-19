"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useState } from "react"
import QRCode from "react-qr-code"

interface Persona {
  id: string
  nombre: string
  documento: string
  empresa: string
}

interface Vehiculo {
  id: string
  tipo: string
  patente: string
  marca: string
  modelo: string
}

interface DetalleVisitaModalUsuarioBasicoProps {
  isOpen: boolean
  onClose: () => void
  visita: {
    id: string
    fecha: string
    tipo: string
    sitio: string
    personas: number
    vehiculos: number
    estado: string
    motivo: string
    fechaInicio: string
    fechaFin: string
    horaInicio: string
    horaFin: string
    personasDetalle: Persona[]
    vehiculosDetalle: Vehiculo[]
    observaciones: string
  } | null
  onAceptar?: () => void
  onRechazar?: () => void
}

export function DetalleVisitaModalUsuarioBasico({
  isOpen,
  onClose,
  visita,
  onAceptar,
  onRechazar,
}: DetalleVisitaModalUsuarioBasicoProps) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

  if (!visita) return null

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "Aceptada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aceptada</Badge>
      case "Finalizada":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Finalizada</Badge>
      case "Rechazada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazada</Badge>
      case "En curso":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En curso</Badge>
      case "Cancelada":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cancelada</Badge>
      default:
        return null
    }
  }

  const isVisitaAprobada =
    visita.estado === "Aceptada" || visita.estado === "En curso" || visita.estado === "Finalizada"

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true)

    // Simulación de generación de PDF
    setTimeout(() => {
      setIsGeneratingPdf(false)
      // En una implementación real, aquí generaríamos y descargaríamos el PDF
      alert("PDF generado y descargado")
    }, 1500)
  }

  // Información para el QR
  const qrValue = JSON.stringify({
    id: visita.id,
    tipo: visita.tipo,
    fecha: visita.fecha,
    sitio: visita.sitio,
    personas: visita.personas,
    vehiculos: visita.vehiculos,
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Detalle de Visita - {visita.tipo} ({visita.fecha})
          </DialogTitle>
          <DialogDescription>Información completa de la visita programada</DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Sitio</p>
              <p className="font-medium">{visita.sitio}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Estado</p>
              <div>{getEstadoBadge(visita.estado)}</div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Fecha de Inicio</p>
              <p className="font-medium">{visita.fechaInicio}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Fecha de Fin</p>
              <p className="font-medium">{visita.fechaFin}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Hora de Inicio</p>
              <p className="font-medium">{visita.horaInicio}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Hora de Fin</p>
              <p className="font-medium">{visita.horaFin}</p>
            </div>
          </div>

          {isVisitaAprobada && (
            <div className="flex flex-col items-center justify-center my-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Código QR de acceso</h3>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <QRCode value={qrValue} size={180} />
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Presente este código QR en el ingreso para agilizar su acceso
              </p>
              <Button
                onClick={handleDownloadPdf}
                className="mt-4 bg-blue-900 hover:bg-blue-950"
                disabled={isGeneratingPdf}
              >
                <Download className="mr-2 h-4 w-4" />
                {isGeneratingPdf ? "Generando PDF..." : "Descargar en PDF"}
              </Button>
            </div>
          )}

          <Separator className="my-4" />

          <Tabs defaultValue="personas">
            <TabsList className="mb-4">
              <TabsTrigger value="personas">Personas ({visita.personas})</TabsTrigger>
              <TabsTrigger value="vehiculos">Vehículos ({visita.vehiculos})</TabsTrigger>
              <TabsTrigger value="detalles">Detalles</TabsTrigger>
            </TabsList>

            <TabsContent value="personas">
              <div className="space-y-4">
                <h3 className="font-semibold mb-2">Personas</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Nombre</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Documento</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Empresa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visita.personasDetalle.map((persona) => (
                        <tr key={persona.id} className="border-b border-gray-200">
                          <td className="py-2 px-4 text-sm">{persona.nombre}</td>
                          <td className="py-2 px-4 text-sm">{persona.documento}</td>
                          <td className="py-2 px-4 text-sm">{persona.empresa}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="vehiculos">
              <div className="space-y-4">
                <h3 className="font-semibold mb-2">Vehículos</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Tipo</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Patente</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Marca</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Modelo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visita.vehiculosDetalle.map((vehiculo) => (
                        <tr key={vehiculo.id} className="border-b border-gray-200">
                          <td className="py-2 px-4 text-sm">{vehiculo.tipo}</td>
                          <td className="py-2 px-4 text-sm">{vehiculo.patente}</td>
                          <td className="py-2 px-4 text-sm">{vehiculo.marca}</td>
                          <td className="py-2 px-4 text-sm">{vehiculo.modelo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="detalles">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Motivo de la Visita</h3>
                  <p className="text-gray-700">{visita.motivo}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Observaciones</h3>
                  <p className="text-gray-700">{visita.observaciones || "No hay observaciones registradas."}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {visita.estado === "Pendiente" && onAceptar && onRechazar && (
            <div className="flex justify-center gap-4 mt-6 pt-4 border-t">
              <Button onClick={onRechazar} variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
                Rechazar Visita
              </Button>
              <Button onClick={onAceptar} className="bg-green-600 hover:bg-green-700">
                Aceptar Visita
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
