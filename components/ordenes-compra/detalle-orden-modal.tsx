"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, Printer } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface DetalleOrdenProps {
  isOpen: boolean
  onClose: () => void
  orden: {
    id: string
    fecha: string
    numero: string
    descripcion: string
    solicitante: string
    monto: number
    estado: string
    detalles?: {
      fechaEntrega?: string
      direccionEntrega?: string
      contacto?: string
      observaciones?: string
      items: Array<{
        codigo: string
        descripcion: string
        cantidad: number
        precioUnitario: number
        subtotal: number
      }>
    }
  } | null
}

export function DetalleOrdenModal({ isOpen, onClose, orden }: DetalleOrdenProps) {
  if (!orden) return null

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    })
      .format(value)
      .replace("ARS", "$")
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "Aprobada":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Aprobada</Badge>
      case "Entregada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Entregada</Badge>
      case "Facturada":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Facturada</Badge>
      case "Anulada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Anulada</Badge>
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <div className="flex items-center">
              <span>Orden de Compra - {orden.numero}</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex items-center">
                <Printer className="mr-2 h-4 w-4" />
                Imprimir
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Descargar PDF
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Fecha</p>
              <p className="font-medium">{orden.fecha}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Estado</p>
              <div>{getEstadoBadge(orden.estado)}</div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Descripción</p>
              <p className="font-medium">{orden.descripcion}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Solicitante</p>
              <p className="font-medium">{orden.solicitante}</p>
            </div>
            {orden.detalles?.fechaEntrega && (
              <div>
                <p className="text-sm text-gray-500">Fecha de Entrega</p>
                <p className="font-medium">{orden.detalles.fechaEntrega}</p>
              </div>
            )}
            {orden.detalles?.direccionEntrega && (
              <div>
                <p className="text-sm text-gray-500">Dirección de Entrega</p>
                <p className="font-medium">{orden.detalles.direccionEntrega}</p>
              </div>
            )}
            {orden.detalles?.contacto && (
              <div>
                <p className="text-sm text-gray-500">Contacto</p>
                <p className="font-medium">{orden.detalles.contacto}</p>
              </div>
            )}
          </div>

          <Separator className="my-4" />

          {orden.detalles?.items && orden.detalles.items.length > 0 && (
            <>
              <h3 className="font-semibold mb-2">Detalle de Items</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Código</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Descripción</th>
                      <th className="py-2 px-4 text-right text-sm font-medium text-gray-600">Cantidad</th>
                      <th className="py-2 px-4 text-right text-sm font-medium text-gray-600">Precio Unitario</th>
                      <th className="py-2 px-4 text-right text-sm font-medium text-gray-600">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orden.detalles.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-2 px-4 text-sm">{item.codigo}</td>
                        <td className="py-2 px-4 text-sm">{item.descripcion}</td>
                        <td className="py-2 px-4 text-sm text-right">{item.cantidad}</td>
                        <td className="py-2 px-4 text-sm text-right">{formatCurrency(item.precioUnitario)}</td>
                        <td className="py-2 px-4 text-sm text-right font-medium">{formatCurrency(item.subtotal)}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="py-2 px-4 text-right font-medium">
                        Total
                      </td>
                      <td className="py-2 px-4 text-right font-bold">{formatCurrency(orden.monto)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Separator className="my-4" />
            </>
          )}

          {orden.detalles?.observaciones && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Observaciones</p>
              <p className="mt-1 p-2 bg-gray-50 rounded-md">{orden.detalles.observaciones}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
