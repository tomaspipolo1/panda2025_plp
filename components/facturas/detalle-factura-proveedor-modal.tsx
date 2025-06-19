"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Download, FileText, Printer } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface DetalleFacturaProveedorModalProps {
  isOpen: boolean
  onClose: () => void
  facturaId: string
}

export function DetalleFacturaProveedorModal({ isOpen, onClose, facturaId }: DetalleFacturaProveedorModalProps) {
  const [activeTab, setActiveTab] = useState("detalles")

  // Datos de ejemplo para la factura
  const factura = {
    id: "F-2023-001",
    proveedor: "TecnoSoft S.A.",
    cuit: "30-71234567-9",
    numeroNota: "NO-2023-00006149-PLP-CME#GAYF",
    numeroOC: "OC-2023-00123",
    estado: "Pagada",
    fechaEmision: "05/04/2023",
    fechaVencimiento: "05/05/2023",
    tipoComprobante: "Factura A",
    numeroFactura: "0001-00012345",
    montoNeto: "$13,016.53",
    montoTotal: "$15,750.00",
    archivo: "factura_tecnosoft_abril_2023.pdf",
    historial: [
      {
        usuario: "Marcelo Proveedor",
        accion: "Carga factura",
        fecha: "05/04/2023 11:45",
      },
      {
        usuario: "Sistema SAP",
        accion: "Ingreso a ME",
        fecha: "06/04/2023 10:30",
      },
      {
        usuario: "Sistema SAP",
        accion: "Contabilidad en SAP",
        fecha: "08/04/2023 16:20",
      },
      {
        usuario: "Sistema SAP",
        accion: "Pago realizado",
        fecha: "12/04/2023 14:15",
      },
    ],
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Pagada":
        return "bg-green-100 text-green-800"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "Rechazada":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="pb-4 border-b">
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="text-xl font-bold">Factura {factura.numeroFactura}</DialogTitle>
              <p className="text-sm text-gray-500 mt-1">
                {factura.tipoComprobante} - {factura.proveedor}
              </p>
            </div>
            <Badge className={`${getEstadoColor(factura.estado)} px-3 py-1 text-sm`}>{factura.estado}</Badge>
          </div>
        </DialogHeader>

        <div className="py-4">
          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Proveedor</h3>
              <p className="font-semibold">{factura.proveedor}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">CUIT</h3>
              <p className="font-semibold">{factura.cuit}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">N° Nota</h3>
              <p className="font-semibold">{factura.numeroNota}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">N° OC</h3>
              <p className="font-semibold">{factura.numeroOC}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Fecha Emisión</h3>
              <p className="font-semibold">{factura.fechaEmision}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Fecha Vencimiento</h3>
              <p className="font-semibold">{factura.fechaVencimiento}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Monto Neto</h3>
              <p className="font-semibold">{factura.montoNeto}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Monto Total</h3>
              <p className="font-semibold text-blue-700">{factura.montoTotal}</p>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="mb-6">
          <h3 className="text-md font-semibold mb-3">Archivo Adjunto</h3>
          <div className="border rounded-md p-3 flex items-center justify-between bg-gray-50">
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              <span>{factura.archivo}</span>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Descargar
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-3">Historial de Acciones</h3>
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 text-sm">
                <tr>
                  <th className="py-2 px-4 text-left font-medium text-gray-500">Usuario</th>
                  <th className="py-2 px-4 text-left font-medium text-gray-500">Acción</th>
                  <th className="py-2 px-4 text-left font-medium text-gray-500">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {factura.historial.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-2 px-4 border-t">{item.usuario}</td>
                    <td className="py-2 px-4 border-t">{item.accion}</td>
                    <td className="py-2 px-4 border-t">{item.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
