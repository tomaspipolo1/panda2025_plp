"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Download, Eye, Filter, Plus, Search } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

// Datos de ejemplo para clientes
const clientesData = [
  {
    id: 1,
    nombre: "Distribuidora Marítima S.A.",
    cuit: "30-12345678-9",
    tipoCliente: "Agencia Marítima",
    subcategoria: "Mayorista",
    estado: "Activo",
    ultimaActividad: "15/04/2023",
  },
  {
    id: 2,
    nombre: "Transportes Rápidos SRL",
    cuit: "30-98765432-1",
    tipoCliente: "Empresa de Servicios Portuarios",
    subcategoria: "Transporte",
    estado: "Activo",
    ultimaActividad: "22/03/2023",
  },
  {
    id: 3,
    nombre: "Tecnología Avanzada Argentina",
    cuit: "30-56789012-3",
    tipoCliente: "Permisionario",
    subcategoria: "Equipamiento",
    estado: "Activo",
    ultimaActividad: "05/04/2023",
  },
  {
    id: 4,
    nombre: "Seguridad Integral SA",
    cuit: "30-34567890-1",
    tipoCliente: "Consecionarios",
    subcategoria: "Vigilancia",
    estado: "Inactivo",
    ultimaActividad: "10/01/2023",
  },
  {
    id: 5,
    nombre: "Constructora del Sur",
    cuit: "30-23456789-0",
    tipoCliente: "Permisionario",
    subcategoria: "Infraestructura",
    estado: "Activo",
    ultimaActividad: "01/04/2023",
  },
  {
    id: 6,
    nombre: "Servicios Portuarios del Sur",
    cuit: "30-87654321-2",
    tipoCliente: "Empresa de Servicios Portuarios",
    subcategoria: "Mantenimiento",
    estado: "Potencial",
    ultimaActividad: "N/A",
  },
  {
    id: 7,
    nombre: "Exportadora Atlántica",
    cuit: "30-76543210-3",
    tipoCliente: "Agencia Marítima",
    subcategoria: "Exportación",
    estado: "Potencial",
    ultimaActividad: "N/A",
  },
]

export default function ListadoClientesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("todos")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [showClientDetails, setShowClientDetails] = useState(false)

  // Filtrar clientes según la pestaña activa
  const filteredClientes = clientesData.filter((cliente) => {
    let statusMatch = true

    if (activeTab === "activos") {
      statusMatch = cliente.estado === "Activo"
    } else if (activeTab === "potenciales") {
      statusMatch = cliente.estado === "Potencial"
    }

    // Aplicar búsqueda si hay un término
    const searchMatch =
      searchTerm === "" ||
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.cuit.includes(searchTerm) ||
      cliente.tipoCliente.toLowerCase().includes(searchTerm.toLowerCase())

    return statusMatch && searchMatch
  })

  const handleViewDetails = (cliente) => {
    setSelectedClient(cliente)
    setShowClientDetails(true)
  }

  const handleExport = (format) => {
    alert(`Exportando en formato ${format}...`)
    // Aquí iría la lógica real de exportación
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Listado de Clientes</h1>
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
          <Button onClick={() => (window.location.href = "/empleado-contable/gestion/clientes/nuevo")}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Cliente
          </Button>
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
                <Label>Estado</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="activo" />
                    <label htmlFor="activo">Activo</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="inactivo" />
                    <label htmlFor="inactivo">Inactivo</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="potencial" />
                    <label htmlFor="potencial">Potencial</label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="todos" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="todos" className="data-[state=active]:bg-[#001f5c] data-[state=active]:text-white">
            Todos
          </TabsTrigger>
          <TabsTrigger value="activos" className="data-[state=active]:bg-[#001f5c] data-[state=active]:text-white">
            Activos
          </TabsTrigger>
          <TabsTrigger value="potenciales" className="data-[state=active]:bg-[#001f5c] data-[state=active]:text-white">
            Potenciales
          </TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="mt-0">
          <ClientesTable clientes={filteredClientes} onViewDetails={handleViewDetails} />
        </TabsContent>

        <TabsContent value="activos" className="mt-0">
          <ClientesTable clientes={filteredClientes} onViewDetails={handleViewDetails} />
        </TabsContent>

        <TabsContent value="potenciales" className="mt-0">
          <ClientesTable clientes={filteredClientes} onViewDetails={handleViewDetails} />
        </TabsContent>
      </Tabs>

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
                <h3 className="font-semibold mb-2">Estado y Actividad</h3>
                <p>
                  <span className="font-medium">Estado:</span>
                  <Badge
                    className={`ml-2 ${
                      selectedClient.estado === "Activo"
                        ? "bg-green-100 text-green-800"
                        : selectedClient.estado === "Inactivo"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {selectedClient.estado}
                  </Badge>
                </p>
                <p>
                  <span className="font-medium">Última actividad:</span> {selectedClient.ultimaActividad}
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
              <h3 className="font-semibold mb-2">Historial de Operaciones</h3>
              <p>
                <span className="font-medium">Última compra:</span> 15/03/2023
              </p>
              <p>
                <span className="font-medium">Monto total operado:</span> $1,250,000.00
              </p>
              <p>
                <span className="font-medium">Operaciones en curso:</span> 3
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// Componente de tabla de clientes
function ClientesTable({ clientes, onViewDetails }) {
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
              <th className="py-3 px-4 text-left font-medium border-b">Última actividad</th>
              <th className="py-3 px-4 text-center font-medium border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-muted-foreground">
                  No se encontraron clientes con los criterios seleccionados
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
                    <Badge
                      className={
                        cliente.estado === "Activo"
                          ? "bg-green-100 text-green-800"
                          : cliente.estado === "Inactivo"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                      }
                    >
                      {cliente.estado}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">{cliente.ultimaActividad}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => onViewDetails(cliente)} title="Ver detalles">
                        <Eye className="h-4 w-4" />
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
