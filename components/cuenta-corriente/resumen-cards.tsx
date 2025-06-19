import { CalendarDays, FileText } from "lucide-react"

interface ResumenCardsProps {
  saldoActual: {
    monto: string
    fechaActualizacion: string
  }
  facturasPendientes: {
    cantidad: number
    total: string
  }
  proximoVencimiento: {
    fecha: string
    factura: string
  }
}

export function ResumenCards({ saldoActual, facturasPendientes, proximoVencimiento }: ResumenCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Saldo Actual */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-gray-600 text-sm mb-2">Saldo Actual</h3>
        <p className="text-green-600 text-3xl font-bold mb-2">{saldoActual.monto}</p>
        <p className="text-gray-500 text-sm">Actualizado: {saldoActual.fechaActualizacion}</p>
      </div>

      {/* Facturas Pendientes */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-gray-600 text-sm mb-2">Facturas Pendientes</h3>
        <div className="flex items-center">
          <FileText className="text-plp-dark mr-2" />
          <p className="text-plp-darkest text-3xl font-bold">{facturasPendientes.cantidad}</p>
        </div>
        <p className="text-gray-500 text-sm mt-2">Total: {facturasPendientes.total}</p>
      </div>

      {/* Próximo Vencimiento */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-gray-600 text-sm mb-2">Próximo Vencimiento</h3>
        <div className="flex items-center">
          <CalendarDays className="text-plp-dark mr-2" />
          <p className="text-plp-darkest text-3xl font-bold">{proximoVencimiento.fecha}</p>
        </div>
        <p className="text-gray-500 text-sm mt-2">Factura {proximoVencimiento.factura}</p>
      </div>
    </div>
  )
}
