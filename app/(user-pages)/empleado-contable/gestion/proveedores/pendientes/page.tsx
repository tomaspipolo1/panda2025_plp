"use client"

import { useState } from "react"
import { Search, Eye, Download, FileText, FileSpreadsheet, Filter, CheckCircle, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

// Datos de ejemplo para proveedores pendientes
const proveedoresPendientes = [
  {
    id: 1,
    nombre: "Servicios Marítimos del Sur",
    cuit: "30-87654321-2",
    categoria: "Servicios",
    subcategoria: "Mantenimiento",
    estado: "Pendiente",
    fechaSolicitud: "15/04/2023",
  },
  {
    id: 2,
    nombre: "Importadora Atlántica",
    cuit: "30-76543210-3",
    categoria: "Comercio",
    subcategoria: "Importación",
    estado: "Pendiente",
    fechaSolicitud: "22/03/2023",
  },
  {
    id: 3,
    nombre: "Astilleros Patagónicos",
    cuit: "30-65432109-4",
    categoria: "Industria Naval",
    subcategoria: "Construcción Naval",
    estado: "Pendiente",
    fechaSolicitud: "05/04/2023",
  },
  {
    id: 4,
    nombre: "Logística Austral",
    cuit: "30-54321098-5",
    categoria: "Logística",
    subcategoria: "Transporte Marítimo",
    estado: "Pendiente",
    fechaSolicitud: "10/01/2023",
  },
  {
    id: 5,
    nombre: "Suministros Portuarios",
    cuit: "30-43210987-6",
    categoria: "Materiales",
    subcategoria: "Equipamiento Portuario",
    estado: "Pendiente",
    fechaSolicitud: "01/04/2023",
  },
]

// Categorías para filtros
const categorias = [
  { value: "servicios", label: "Servicios" },
  { value: "comercio", label: "Comercio" },
  { value: "industria-naval", label: "Industria Naval" },
  { value: "logistica", label: "Logística" },
  { value: "materiales", label: "Materiales" },
]

export default function ProveedoresPendientesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [selectedProveedor, setSelectedProveedor] = useState<any>(null)
  const [filtroCategoria, setFiltroCategoria] = useState<string[]>([])
  const [rejectReason, setRejectReason] = useState("")
  const [approveComment, setApproveComment] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [proveedores, setProveedores] = useState(proveedoresPendientes)
  const { toast } = useToast()
  const router = useRouter()

  // Función para exportar a Excel
  const exportToExcel = () => {
    console.log("Exportando a Excel...")
    toast({
      title: "Exportando a Excel",
      description: "El archivo se está descargando.",
      duration: 3000,
    })
  }

  // Función para exportar a PDF
  const exportToPDF = () => {
    console.log("Exportando a PDF...")
    toast({
      title: "Exportando a PDF",
      description: "El archivo se está descargando.",
      duration: 3000,
    })
  }

  // Función para ver detalles del proveedor
  const handleViewProveedor = (proveedor: any) => {
    // Navegar a la página de detalle completo
    router.push(`/empleado-contable/gestion/proveedores/pendientes/${proveedor.id}`)
  }

  // Función para abrir modal de aprobación
  const handleOpenApproveModal = (proveedor: any) => {
    setSelectedProveedor(proveedor)
    setApproveComment("")
    setIsApproveModalOpen(true)
  }

  // Función para abrir modal de rechazo
  const handleOpenRejectModal = (proveedor: any) => {
    setSelectedProveedor(proveedor)
    setRejectReason("")
    setIsRejectModalOpen(true)
  }

  // Función para aprobar proveedor
  const handleApproveProveedor = () => {
    // Aquí iría la lógica para aprobar el proveedor
    console.log(`Aprobando proveedor ${selectedProveedor.id} con comentario: ${approveComment}`)

    // Actualizar la lista de proveedores (simulado)
    setProveedores(proveedores.filter((p) => p.id !== selectedProveedor.id))

    setIsApproveModalOpen(false)

    toast({
      title: "Proveedor aprobado",
      description: `${selectedProveedor.nombre} ha sido aprobado exitosamente.`,
      duration: 3000,
    })
  }

  // Función para rechazar proveedor
  const handleRejectProveedor = () => {
    if (!rejectReason.trim()) {
      toast({
        title: "Error",
        description: "Debe proporcionar un motivo para el rechazo.",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    // Aquí iría la lógica para rechazar el proveedor
    console.log(`Rechazando proveedor ${selectedProveedor.id} con motivo: ${rejectReason}`)

    // Actualizar la lista de proveedores (simulado)
    setProveedores(proveedores.filter((p) => p.id !== selectedProveedor.id))

    setIsRejectModalOpen(false)

    toast({
      title: "Proveedor rechazado",
      description: `${selectedProveedor.nombre} ha sido rechazado.`,
      duration: 3000,
    })
  }

  // Filtrar proveedores según la búsqueda y filtros avanzados
  const filteredProveedores = proveedores.filter((proveedor) => {
    // Filtro de búsqueda
    const matchesSearch =
      proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.cuit.includes(searchTerm) ||
      proveedor.categoria.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro de categoría
    const matchesCategoria =
      filtroCategoria.length === 0 ||
      filtroCategoria.some((cat) => proveedor.categoria.toLowerCase() === cat.toLowerCase())

    return matchesSearch && matchesCategoria
  })

  // Verificar si hay filtros activos
  const hasActiveFilters = filtroCategoria.length > 0

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Proveedores Pendientes</h1>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={exportToExcel} className="cursor-pointer">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Exportar a Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToPDF} className="cursor-pointer">
                <FileText className="h-4 w-4 mr-2" />
                Exportar a PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar por nombre, CUIT o categoría..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={hasActiveFilters ? "default" : "outline"}
                  className={hasActiveFilters ? "bg-plp-dark hover:bg-plp-medium" : ""}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                  {hasActiveFilters && (
                    <Badge className="ml-2 bg-white text-plp-dark hover:bg-gray-100">{filtroCategoria.length}</Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">Filtros</h4>

                  <div className="space-y-2">
                    <Label>Categoría</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {categorias.map((categoria) => (
                        <div key={categoria.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`categoria-${categoria.value}`}
                            checked={filtroCategoria.includes(categoria.label)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFiltroCategoria([...filtroCategoria, categoria.label])
                              } else {
                                setFiltroCategoria(filtroCategoria.filter((c) => c !== categoria.label))
                              }
                            }}
                          />
                          <label
                            htmlFor={`categoria-${categoria.value}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {categoria.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFiltroCategoria([])
                      }}
                    >
                      Limpiar filtros
                    </Button>
                    <Button className="bg-plp-dark hover:bg-plp-medium" onClick={() => setIsFilterOpen(false)}>
                      Aplicar filtros
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap gap-2">
              {filtroCategoria.map((cat) => (
                <Badge key={`cat-${cat}`} variant="secondary" className="px-3 py-1">
                  Categoría: {cat}
                  <button
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setFiltroCategoria(filtroCategoria.filter((c) => c !== cat))}
                  >
                    ×
                  </button>
                </Badge>
              ))}

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-3 text-xs"
                  onClick={() => {
                    setFiltroCategoria([])
                  }}
                >
                  Limpiar todos
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="rounded-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white border-b">
                <th className="py-3 px-4 text-left font-medium">Nombre</th>
                <th className="py-3 px-4 text-left font-medium">CUIT</th>
                <th className="py-3 px-4 text-left font-medium">Categoría</th>
                <th className="py-3 px-4 text-left font-medium">Subcategoría</th>
                <th className="py-3 px-4 text-left font-medium">Estado</th>
                <th className="py-3 px-4 text-left font-medium">Fecha Solicitud</th>
                <th className="py-3 px-4 text-center font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProveedores.length > 0 ? (
                filteredProveedores.map((proveedor, index) => (
                  <tr
                    key={proveedor.id}
                    className={`border-b transition-colors hover:bg-blue-50 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="py-3 px-4">{proveedor.nombre}</td>
                    <td className="py-3 px-4">{proveedor.cuit}</td>
                    <td className="py-3 px-4">{proveedor.categoria}</td>
                    <td className="py-3 px-4">{proveedor.subcategoria}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        {proveedor.estado}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{proveedor.fechaSolicitud}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleViewProveedor(proveedor)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Ver detalle completo</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={() => handleOpenApproveModal(proveedor)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Aprobar proveedor</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleOpenRejectModal(proveedor)}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Rechazar proveedor</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-gray-500">
                    No se encontraron proveedores pendientes que coincidan con la búsqueda
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para ver detalles del proveedor - Ya no se usa
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalles del Proveedor</DialogTitle>
            <DialogDescription>Información completa del proveedor seleccionado</DialogDescription>
          </DialogHeader>

          {selectedProveedor && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Nombre</h3>
                  <p className="mt-1">{selectedProveedor.nombre}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">CUIT</h3>
                  <p className="mt-1">{selectedProveedor.cuit}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Categoría</h3>
                  <p className="mt-1">{selectedProveedor.categoria}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Subcategoría</h3>
                  <p className="mt-1">{selectedProveedor.subcategoria}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Estado</h3>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                    {selectedProveedor.estado}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Fecha Solicitud</h3>
                  <p className="mt-1">{selectedProveedor.fechaSolicitud}</p>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Información adicional</h3>
                <p className="text-sm text-gray-500">
                  Este proveedor ha solicitado ser registrado en el sistema y está pendiente de aprobación. Puede
                  aprobar o rechazar esta solicitud utilizando los botones correspondientes.
                </p>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => {
                    setIsViewModalOpen(false)
                    handleViewProveedor(selectedProveedor, true)
                  }}
                >
                  <ExternalLink className="h-4 w-4" />
                  Ver detalle completo
                </Button>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                  Cerrar
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {
                    setIsViewModalOpen(false)
                    handleOpenApproveModal(selectedProveedor)
                  }}
                >
                  Aprobar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setIsViewModalOpen(false)
                    handleOpenRejectModal(selectedProveedor)
                  }}
                >
                  Rechazar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      */}

      {/* Modal para aprobar proveedor */}
      <Dialog open={isApproveModalOpen} onOpenChange={setIsApproveModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Aprobar Proveedor</DialogTitle>
            <DialogDescription>
              ¿Está seguro que desea aprobar a este proveedor? Esta acción permitirá que el proveedor opere en el
              sistema.
            </DialogDescription>
          </DialogHeader>

          {selectedProveedor && (
            <div className="space-y-4">
              <div className="border rounded-md p-3 bg-gray-50">
                <div className="font-medium">{selectedProveedor.nombre}</div>
                <div className="text-sm text-gray-500">CUIT: {selectedProveedor.cuit}</div>
                <div className="text-sm text-gray-500">Categoría: {selectedProveedor.categoria}</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="approveComment">Comentarios (opcional)</Label>
                <Textarea
                  id="approveComment"
                  placeholder="Agregue comentarios adicionales sobre la aprobación..."
                  value={approveComment}
                  onChange={(e) => setApproveComment(e.target.value)}
                />
              </div>

              <DialogFooter className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsApproveModalOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleApproveProveedor}>
                  Confirmar Aprobación
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal para rechazar proveedor */}
      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rechazar Proveedor</DialogTitle>
            <DialogDescription>
              Por favor, indique el motivo por el cual está rechazando a este proveedor.
            </DialogDescription>
          </DialogHeader>

          {selectedProveedor && (
            <div className="space-y-4">
              <div className="border rounded-md p-3 bg-gray-50">
                <div className="font-medium">{selectedProveedor.nombre}</div>
                <div className="text-sm text-gray-500">CUIT: {selectedProveedor.cuit}</div>
                <div className="text-sm text-gray-500">Categoría: {selectedProveedor.categoria}</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rejectReason">
                  Motivo del rechazo <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="rejectReason"
                  placeholder="Indique el motivo del rechazo..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className={!rejectReason.trim() ? "border-red-300 focus-visible:ring-red-500" : ""}
                />
                {!rejectReason.trim() && <p className="text-sm text-red-500">El motivo del rechazo es obligatorio</p>}
              </div>

              <DialogFooter className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsRejectModalOpen(false)}>
                  Cancelar
                </Button>
                <Button variant="destructive" onClick={handleRejectProveedor}>
                  Confirmar Rechazo
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
