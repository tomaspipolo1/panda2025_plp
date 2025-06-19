"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Download, Eye, Filter, Search, CheckCircle, XCircle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Datos de ejemplo para clientes pendientes
const clientesPendientesData = [
  {
    id: 1,
    nombre: "Logística Portuaria Internacional",
    cuit: "30-87654321-9",
    tipoCliente: "Agencia Marítima",
    subcategoria: "Importación",
    estado: "Pendiente",
    fechaSolicitud: "10/05/2023",
  },
  {
    id: 2,
    nombre: "Servicios Marítimos del Plata",
    cuit: "30-76543210-8",
    tipoCliente: "Empresa de Servicios Portuarios",
    subcategoria: "Mantenimiento",
    estado: "Pendiente",
    fechaSolicitud: "15/05/2023",
  },
  {
    id: 3,
    nombre: "Terminal Portuaria Sur",
    cuit: "30-65432109-7",
    tipoCliente: "Permisionario",
    subcategoria: "Carga",
    estado: "Pendiente",
    fechaSolicitud: "20/05/2023",
  },
  {
    id: 4,
    nombre: "Astilleros Navales Argentinos",
    cuit: "30-54321098-6",
    tipoCliente: "Consecionarios",
    subcategoria: "Construcción",
    estado: "Pendiente",
    fechaSolicitud: "25/05/2023",
  },
  {
    id: 5,
    nombre: "Operadora Logística del Sur",
    cuit: "30-43210987-5",
    tipoCliente: "Empresa de Servicios Portuarios",
    subcategoria: "Logística",
    estado: "Pendiente",
    fechaSolicitud: "01/06/2023",
  },
]

export default function ClientesPendientesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [showClientDetails, setShowClientDetails] = useState(false)
  const [showAcceptDialog, setShowAcceptDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [comentario, setComentario] = useState("")
  const [clientesData, setClientesData] = useState(clientesPendientesData)

  // Filtrar clientes según la búsqueda
  const filteredClientes = clientesData.filter((cliente) => {
    // Aplicar búsqueda si hay un término
    const searchMatch =
      searchTerm === "" ||
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.cuit.includes(searchTerm) ||
      cliente.tipoCliente.toLowerCase().includes(searchTerm.toLowerCase())

    return searchMatch
  })

  const handleViewDetails = (cliente) => {
    setSelectedClient(cliente)
    setShowClientDetails(true)
  }

  const handleAcceptClick = (cliente) => {
    setSelectedClient(cliente)
    setShowAcceptDialog(true)
  }

  const handleRejectClick = (cliente) => {
    setSelectedClient(cliente)
    setShowRejectDialog(true)
  }

  const handleAcceptConfirm = () => {
    // Aquí iría la lógica real para aceptar el cliente
    toast({
      title: "Cliente aceptado",
      description: `${selectedClient.nombre} ha sido aprobado exitosamente.`,
    })

    // Actualizar la lista de clientes (simulado)
    setClientesData(clientesData.filter((cliente) => cliente.id !== selectedClient.id))

    setShowAcceptDialog(false)
    setComentario("")
  }

  const handleRejectConfirm = () => {
    // Aquí iría la lógica real para rechazar el cliente
    if (!comentario.trim()) {
      toast({
        title: "Error",
        description: "Debe proporcionar un motivo para el rechazo.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Cliente rechazado",
      description: `${selectedClient.nombre} ha sido rechazado.`,
    })

    // Actualizar la lista de clientes (simulado)
    setClientesData(clientesData.filter((cliente) => cliente.id !== selectedClient.id))

    setShowRejectDialog(false)
    setComentario("")
  }

  const handleExport = (format) => {
    alert(`Exportando en formato ${format}...`)
    // Aquí iría la lógica real de exportación
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clientes Pendientes</h1>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40">
              <div className="flex flex-col gap-2">
                <Button variant="ghost" onClick={() => handleExport("excel")}>
                  Excel
                </Button>
                <Button variant="ghost" onClick={() => handleExport("pdf")}>
                  PDF
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por nombre, CUIT o tipo de cliente..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? "bg-accent" : ""}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>

          {showFilters && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <Label>Tipo Cliente</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="permisionario" />
                    <label htmlFor="permisionario">Permisionario</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="agencia-maritima" />
                    <label htmlFor="agencia-maritima">Agencia Marítima</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="servicios-portuarios" />
                    <label htmlFor="servicios-portuarios">Empresa de Servicios Portuarios</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="consecionarios" />
                    <label htmlFor="consecionarios">Consecionarios</label>
                  </div>
                </div>
              </div>

              <div>
                <Label>Fecha de Solicitud</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ultimo-mes" />
                    <label htmlFor="ultimo-mes">Último mes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ultimo-trimestre" />
                    <label htmlFor="ultimo-trimestre">Último trimestre</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ultimo-anio" />
                    <label htmlFor="ultimo-anio">Último año</label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <ClientesPendientesTable
        clientes={filteredClientes}
        onViewDetails={handleViewDetails}
        onAccept={handleAcceptClick}
        onReject={handleRejectClick}
      />

      {/* Modal de detalles del cliente */}
      {selectedClient && (
        <Dialog open={showClientDetails} onOpenChange={setShowClientDetails}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Detalles del Cliente</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Información General</h3>
                <p>
                  <span className="font-medium">Nombre:</span> {selectedClient.nombre}
                </p>
                <p>
                  <span className="font-medium">CUIT:</span> {selectedClient.cuit}
                </p>
                <p>
                  <span className="font-medium">TIPO CLIENTE:</span> {selectedClient.tipoCliente}
                </p>
                <p>
                  <span className="font-medium">Subcategoría:</span> {selectedClient.subcategoria}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Estado y Solicitud</h3>
                <p>
                  <span className="font-medium">Estado:</span>
                  <Badge className="ml-2 bg-yellow-100 text-yellow-800">{selectedClient.estado}</Badge>
                </p>
                <p>
                  <span className="font-medium">Fecha de solicitud:</span> {selectedClient.fechaSolicitud}
                </p>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Información de Contacto</h3>
              <p>
                <span className="font-medium">Dirección:</span> Av. Principal 123, La Plata
              </p>
              <p>
                <span className="font-medium">Teléfono:</span> (221) 123-4567
              </p>
              <p>
                <span className="font-medium">Email:</span> contacto@
                {selectedClient.nombre.toLowerCase().replace(/\s+/g, "")}.com
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Documentación</h3>
              <p>
                <span className="font-medium">Documentos presentados:</span> 5 de 5 requeridos
              </p>
              <p>
                <span className="font-medium">Verificación:</span> Pendiente de revisión
              </p>
            </div>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setShowClientDetails(false)}>
                Cerrar
              </Button>
              <Button
                variant="default"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  setShowClientDetails(false)
                  handleAcceptClick(selectedClient)
                }}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Aprobar
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setShowClientDetails(false)
                  handleRejectClick(selectedClient)
                }}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Rechazar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal de confirmación para aceptar cliente */}
      <Dialog open={showAcceptDialog} onOpenChange={setShowAcceptDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aprobar Cliente</DialogTitle>
          </DialogHeader>
          <p>
            ¿Está seguro que desea aprobar a <strong>{selectedClient?.nombre}</strong>?
          </p>
          <p className="text-sm text-muted-foreground">
            Esta acción cambiará el estado del cliente a "Activo" y le permitirá acceder a todas las funcionalidades del
            sistema.
          </p>
          <div className="mt-2">
            <Label htmlFor="comentario">Comentario (opcional)</Label>
            <Textarea
              id="comentario"
              placeholder="Agregar un comentario..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              className="mt-1"
            />
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowAcceptDialog(false)}>
              Cancelar
            </Button>
            <Button variant="default" className="bg-green-600 hover:bg-green-700" onClick={handleAcceptConfirm}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirmar Aprobación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de confirmación para rechazar cliente */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rechazar Cliente</DialogTitle>
          </DialogHeader>
          <p>
            ¿Está seguro que desea rechazar a <strong>{selectedClient?.nombre}</strong>?
          </p>
          <p className="text-sm text-muted-foreground">
            Esta acción rechazará la solicitud del cliente y le notificará el motivo del rechazo.
          </p>
          <div className="mt-2">
            <Label htmlFor="motivo">
              Motivo del rechazo <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="motivo"
              placeholder="Indique el motivo del rechazo..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              className="mt-1"
              required
            />
            {comentario.trim() === "" && (
              <p className="text-sm text-red-500 mt-1">El motivo del rechazo es obligatorio</p>
            )}
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleRejectConfirm}>
              <XCircle className="h-4 w-4 mr-2" />
              Confirmar Rechazo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Componente de tabla de clientes pendientes
function ClientesPendientesTable({ clientes, onViewDetails, onAccept, onReject }) {
  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-white">
              <th className="py-3 px-4 text-left font-medium border-b">Nombre</th>
              <th className="py-3 px-4 text-left font-medium border-b">CUIT</th>
              <th className="py-3 px-4 text-left font-medium border-b">Tipo</th>
              <th className="py-3 px-4 text-left font-medium border-b">Estado</th>
              <th className="py-3 px-4 text-left font-medium border-b">Fecha Solicitud</th>
              <th className="py-3 px-4 text-center font-medium border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-muted-foreground">
                  No hay clientes pendientes de aprobación
                </td>
              </tr>
            ) : (
              clientes.map((cliente, index) => (
                <tr
                  key={cliente.id}
                  className={`
                    border-b hover:bg-blue-50 transition-colors
                    ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  `}
                >
                  <td className="py-3 px-4">{cliente.nombre}</td>
                  <td className="py-3 px-4">{cliente.cuit}</td>
                  <td className="py-3 px-4">{cliente.tipoCliente}</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-yellow-100 text-yellow-800">{cliente.estado}</Badge>
                  </td>
                  <td className="py-3 px-4">{cliente.fechaSolicitud}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => onViewDetails(cliente)} title="Ver detalles">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onAccept(cliente)}
                        title="Aprobar cliente"
                        className="text-green-600 hover:text-green-700"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onReject(cliente)}
                        title="Rechazar cliente"
                        className="text-red-600 hover:text-red-700"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
