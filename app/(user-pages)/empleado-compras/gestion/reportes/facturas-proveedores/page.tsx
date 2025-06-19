"use client"

import { useState } from "react"
import { Calendar, Download, FileText, Printer, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { DetalleFacturaProveedorModal } from "@/components/facturas/detalle-factura-proveedor-modal"

export default function FacturasProveedoresPage() {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [proveedor, setProveedor] = useState<string>("")
  const [estado, setEstado] = useState<string>("")
  const [selectedFacturaId, setSelectedFacturaId] = useState<string | null>(null)
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false)

  // Datos de ejemplo para la tabla
  const facturas = [
    {
      id: "F-2023-001",
      numeroNota: "NO-2023-00006149-PLP-CME#GAYF",
      proveedor: "TecnoSoft S.A.",
      fecha: "15/04/2023",
      monto: "$15,750.00",
      estado: "Pagada",
    },
    {
      id: "F-2023-002",
      numeroNota: "NO-2023-00007523-PLP-CME#GAYF",
      proveedor: "Distribuidora Norte",
      fecha: "22/04/2023",
      monto: "$8,320.50",
      estado: "Pendiente",
    },
    {
      id: "F-2023-003",
      numeroNota: "NO-2023-00008975-PLP-CME#GAYF",
      proveedor: "Servicios Integrales",
      fecha: "30/04/2023",
      monto: "$22,150.75",
      estado: "Rechazada",
    },
    {
      id: "F-2023-004",
      numeroNota: "NO-2023-00009124-PLP-CME#GAYF",
      proveedor: "Insumos Industriales",
      fecha: "05/05/2023",
      monto: "$12,430.00",
      estado: "Pagada",
    },
    {
      id: "F-2023-005",
      numeroNota: "NO-2023-00010587-PLP-CME#GAYF",
      proveedor: "TecnoSoft S.A.",
      fecha: "12/05/2023",
      monto: "$9,875.25",
      estado: "Pendiente",
    },
  ]

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Pagada":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Rechazada":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const handleVerFactura = (facturaId: string) => {
    setSelectedFacturaId(facturaId)
    setIsDetalleModalOpen(true)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reporte de Facturas de Proveedores</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Filtra las facturas por diferentes criterios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fecha">Rango de fechas</Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground",
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "dd/MM/yyyy") : "Fecha inicial"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "dd/MM/yyyy") : "Fecha final"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="proveedor">Proveedor</Label>
              <Select value={proveedor} onValueChange={setProveedor}>
                <SelectTrigger id="proveedor">
                  <SelectValue placeholder="Seleccionar proveedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="tecnosoft">TecnoSoft S.A.</SelectItem>
                  <SelectItem value="distribuidora">Distribuidora Norte</SelectItem>
                  <SelectItem value="servicios">Servicios Integrales</SelectItem>
                  <SelectItem value="insumos">Insumos Industriales</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="estado">Estado</Label>
              <Select value={estado} onValueChange={setEstado}>
                <SelectTrigger id="estado">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="pagada">Pagada</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="rechazada">Rechazada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resultados</CardTitle>
          <CardDescription>Se encontraron {facturas.length} facturas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">N° Nota</th>
                  <th className="py-3 px-4 text-left">N° Factura</th>
                  <th className="py-3 px-4 text-left">Proveedor</th>
                  <th className="py-3 px-4 text-left">Fecha</th>
                  <th className="py-3 px-4 text-left">Monto</th>
                  <th className="py-3 px-4 text-left">Estado</th>
                  <th className="py-3 px-4 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {facturas.map((factura) => (
                  <tr key={factura.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{factura.numeroNota}</td>
                    <td className="py-3 px-4">{factura.id}</td>
                    <td className="py-3 px-4">{factura.proveedor}</td>
                    <td className="py-3 px-4">{factura.fecha}</td>
                    <td className="py-3 px-4">{factura.monto}</td>
                    <td className="py-3 px-4">
                      <Badge className={getEstadoColor(factura.estado)}>{factura.estado}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm" onClick={() => handleVerFactura(factura.id)}>
                        <FileText className="h-4 w-4 mr-2" />
                        Ver
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {selectedFacturaId && (
        <DetalleFacturaProveedorModal
          isOpen={isDetalleModalOpen}
          onClose={() => setIsDetalleModalOpen(false)}
          facturaId={selectedFacturaId}
        />
      )}
    </div>
  )
}
