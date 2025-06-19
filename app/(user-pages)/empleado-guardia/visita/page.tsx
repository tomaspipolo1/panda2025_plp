"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, User, Calendar, Clock, MapPin, Users, Truck, Eye, PlusCircle, FileText } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { DocumentPreviewModal } from "@/components/ui/document-preview-modal"

// Datos de ejemplo con documentos
const documentosEjemplo = {
  personas: {
    "14.435.686": [
      {
        name: "DNI - Luis Morales",
        type: "application/pdf",
        url: "/placeholder.svg?height=600&width=400&text=DNI+Luis+Morales",
      },
      {
        name: "Licencia de Conducir - Luis Morales",
        type: "application/pdf",
        url: "/placeholder.svg?height=600&width=400&text=Licencia+Luis+Morales",
      },
    ],
    "27.865.547": [
      {
        name: "DNI - Alberto Sagardoy",
        type: "application/pdf",
        url: "/placeholder.svg?height=600&width=400&text=DNI+Alberto+Sagardoy",
      },
    ],
  },
  vehiculos: {
    "AC 879 HV": [
      {
        name: "Seguro del Vehículo - Peugeot 208",
        type: "application/pdf",
        url: "/placeholder.svg?height=600&width=400&text=Seguro+Peugeot+208",
      },
      {
        name: "Cédula Verde - Peugeot 208",
        type: "application/pdf",
        url: "/placeholder.svg?height=600&width=400&text=Cedula+Verde+Peugeot",
      },
    ],
    "AV 545 TV": [
      {
        name: "Seguro del Vehículo - Fiat Cronos",
        type: "application/pdf",
        url: "/placeholder.svg?height=600&width=400&text=Seguro+Fiat+Cronos",
      },
      {
        name: "Cédula Azul - Fiat Cronos",
        type: "application/pdf",
        url: "/placeholder.svg?height=600&width=400&text=Cedula+Azul+Fiat",
      },
    ],
  },
}

// Datos de ejemplo
const visitasData = [
  {
    id: "VIS-2023-0001",
    tipo: "Acceso a Obra",
    estado: "Pendiente",
    fecha: "30/04/2023",
    hora: "09:00",
    sitio: "Terminal 1",
    solicitante: "Juan Pérez",
    empresa: "Constructora ABC",
    personas: 3,
    vehiculos: 1,
    detalles: "Visita para inspección de avance de obra",
  },
  {
    id: "VIS-2023-0002",
    tipo: "Acceso a Muelle",
    estado: "Aprobada",
    fecha: "30/04/2023",
    hora: "10:30",
    sitio: "Muelle Sur",
    solicitante: "María Rodríguez",
    empresa: "Naviera XYZ",
    personas: 2,
    vehiculos: 0,
    detalles: "Reunión con capitán de embarcación",
  },
  {
    id: "VIS-2023-0003",
    tipo: "Materiales",
    estado: "Aprobada",
    fecha: "30/04/2023",
    hora: "14:00",
    sitio: "Almacén Central",
    solicitante: "Carlos Gómez",
    empresa: "Suministros Portuarios",
    personas: 2,
    vehiculos: 1,
    detalles: "Entrega de materiales para mantenimiento",
  },
  {
    id: "VIS-2023-0004",
    tipo: "Acceso a Obra",
    estado: "Pendiente",
    fecha: "30/04/2023",
    hora: "15:30",
    sitio: "Terminal 2",
    solicitante: "Ana Martínez",
    empresa: "Ingeniería Portuaria",
    personas: 4,
    vehiculos: 2,
    detalles: "Inspección técnica de grúas",
  },
  {
    id: "VIS-2023-0005",
    tipo: "Reunión",
    estado: "Pendiente",
    fecha: "01/05/2023",
    hora: "10:00",
    sitio: "Oficinas Centrales",
    solicitante: "Roberto Sánchez",
    empresa: "Logística Marítima",
    personas: 2,
    vehiculos: 1,
    detalles: "Reunión de coordinación logística",
  },
  {
    id: "VIS-2023-0006",
    tipo: "Inspección",
    estado: "Aprobada",
    fecha: "02/05/2023",
    hora: "09:30",
    sitio: "Terminal 3",
    solicitante: "Laura González",
    empresa: "Inspecciones Técnicas",
    personas: 3,
    vehiculos: 1,
    detalles: "Inspección de seguridad",
  },
  {
    id: "VIS-2023-0007",
    tipo: "Entrega",
    estado: "Pendiente",
    fecha: "05/05/2023",
    hora: "11:00",
    sitio: "Almacén Norte",
    solicitante: "Miguel Torres",
    empresa: "Suministros Navales",
    personas: 2,
    vehiculos: 1,
    detalles: "Entrega de equipamiento",
  },
]

export default function VisitaPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVisita, setSelectedVisita] = useState<any>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [filtroTemporal, setFiltroTemporal] = useState("Hoy")
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [showDocumentPreview, setShowDocumentPreview] = useState(false)

  // Función para filtrar visitas por período
  const filtrarVisitasPorPeriodo = (visitas: any[], filtro: string) => {
    const hoy = new Date()
    const fechaHoy = `${hoy.getDate().toString().padStart(2, "0")}/${(hoy.getMonth() + 1).toString().padStart(2, "0")}/${hoy.getFullYear()}`

    switch (filtro) {
      case "Hoy":
        return visitas.filter((v) => v.fecha === fechaHoy)
      case "Semana":
        // Simulación de filtro por semana (para demo)
        return visitas.filter((v) => ["30/04/2023", "01/05/2023", "02/05/2023"].includes(v.fecha))
      case "Mes":
        // Simulación de filtro por mes (para demo)
        return visitas
      default:
        return visitas
    }
  }

  // Filtrar visitas según término de búsqueda, filtro temporal y solo mostrar las aprobadas
  const filteredVisitas = filtrarVisitasPorPeriodo(visitasData, filtroTemporal).filter(
    (visita) =>
      visita.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visita.solicitante.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visita.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visita.sitio.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleVerDetalle = (visita: any) => {
    setSelectedVisita(visita)
    setShowDialog(true)
  }

  const handleViewDocument = (document: any) => {
    setSelectedDocument(document)
    setShowDocumentPreview(true)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Visitas de {filtroTemporal}</h1>

        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-md p-1">
            <Button
              variant={filtroTemporal === "Hoy" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFiltroTemporal("Hoy")}
              className="rounded-md"
            >
              Hoy
            </Button>
            <Button
              variant={filtroTemporal === "Semana" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFiltroTemporal("Semana")}
              className="rounded-md"
            >
              Semana
            </Button>
            <Button
              variant={filtroTemporal === "Mes" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFiltroTemporal("Mes")}
              className="rounded-md"
            >
              Mes
            </Button>
          </div>

          <Button
            onClick={() => router.push("/empleado-guardia/nueva-visita")}
            className="bg-blue-900 hover:bg-blue-800"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Nueva Visita
          </Button>
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
        <Input
          className="pl-10 py-2"
          placeholder="Buscar por ID, solicitante, empresa o sitio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredVisitas.map((visita) => (
          <Card key={visita.id} className="p-4 shadow-sm border">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-semibold mr-3">{visita.id}</h3>
                  <Badge
                    className={
                      visita.estado === "Pendiente"
                        ? "bg-yellow-500"
                        : visita.estado === "Aprobada"
                          ? "bg-green-500"
                          : "bg-red-500"
                    }
                  >
                    {visita.estado}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    <span>
                      {visita.solicitante} - {visita.empresa}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{visita.fecha}</span>
                    <Clock className="h-4 w-4 ml-4 mr-2 text-gray-500" />
                    <span>{visita.hora}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{visita.sitio}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{visita.personas} personas</span>
                    {visita.vehiculos > 0 && (
                      <>
                        <Truck className="h-4 w-4 ml-4 mr-2 text-gray-500" />
                        <span>{visita.vehiculos} vehículos</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex items-center">
                <Button onClick={() => handleVerDetalle(visita)} className="bg-blue-900 hover:bg-blue-800">
                  <Eye className="mr-2 h-4 w-4" />
                  Ver detalle
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {filteredVisitas.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No hay visitas para mostrar</p>
          </div>
        )}
      </div>

      {/* Diálogo de detalles de visita */}
      <Dialog
        open={showDialog}
        onOpenChange={(open) => {
          if (!open) setShowDialog(false)
        }}
      >
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Solicitud N° {selectedVisita?.id.split("-").pop()}</DialogTitle>
            <Button
              variant="outline"
              className={`text-white hover:opacity-90 ${
                selectedVisita?.estado === "Aprobada"
                  ? "bg-green-500"
                  : selectedVisita?.estado === "Pendiente"
                    ? "bg-yellow-500"
                    : selectedVisita?.estado === "En Curso"
                      ? "bg-blue-500"
                      : selectedVisita?.estado === "Cancelada"
                        ? "bg-red-500"
                        : selectedVisita?.estado === "Finalizada"
                          ? "bg-gray-500"
                          : "bg-purple-500"
              }`}
            >
              {selectedVisita?.estado}
            </Button>
          </DialogHeader>

          {selectedVisita && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Tipo de visita</p>
                  <div className="border rounded p-2 text-sm">{selectedVisita.tipo}</div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Persona que solicitó</p>
                  <div className="border rounded p-2 text-sm">{selectedVisita.solicitante}</div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Fecha de visita</p>
                  <div className="flex items-center">
                    <div className="border rounded p-2 text-sm flex-1">{selectedVisita.fecha}</div>
                    <Button variant="ghost" size="icon" className="ml-1">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Hora de visita</p>
                  <div className="flex items-center">
                    <div className="border rounded p-2 text-sm flex-1">{selectedVisita.hora}</div>
                    <Button variant="ghost" size="icon" className="ml-1">
                      <Clock className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Personas que ingresan */}
              <div className="border rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Personas que ingresan</h3>
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input className="pl-8 h-8 w-40" placeholder="Search" />
                  </div>
                </div>
                <div className="border rounded overflow-x-auto max-h-48 overflow-y-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 text-left">
                      <tr>
                        <th className="p-2 border-b">Nombre</th>
                        <th className="p-2 border-b">Apellido</th>
                        <th className="p-2 border-b">DNI</th>
                        <th className="p-2 border-b">Documentos</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 border-b">Luis</td>
                        <td className="p-2 border-b">Morales</td>
                        <td className="p-2 border-b">14.435.686</td>
                        <td className="p-2 border-b">
                          <div className="flex flex-wrap gap-1">
                            {documentosEjemplo.personas["14.435.686"]?.map((doc, index) => (
                              <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:bg-blue-50 p-1 h-auto flex flex-col items-center"
                                onClick={() => handleViewDocument(doc)}
                              >
                                <FileText className="h-4 w-4 mb-1" />
                                <span className="text-xs">{doc.name.split(" - ")[0]}</span>
                              </Button>
                            ))}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2">Alberto</td>
                        <td className="p-2">Sagardoy</td>
                        <td className="p-2">27.865.547</td>
                        <td className="p-2">
                          <div className="flex flex-wrap gap-1">
                            {documentosEjemplo.personas["27.865.547"]?.map((doc, index) => (
                              <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:bg-blue-50 p-1 h-auto flex flex-col items-center"
                                onClick={() => handleViewDocument(doc)}
                              >
                                <FileText className="h-4 w-4 mb-1" />
                                <span className="text-xs">{doc.name.split(" - ")[0]}</span>
                              </Button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Vehículos */}
              <div className="border rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Vehículos</h3>
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input className="pl-8 h-8 w-40" placeholder="Search" />
                  </div>
                </div>
                <div className="border rounded overflow-x-auto max-h-48 overflow-y-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 text-left">
                      <tr>
                        <th className="p-2 border-b">Marca</th>
                        <th className="p-2 border-b">Modelo</th>
                        <th className="p-2 border-b">Patente</th>
                        <th className="p-2 border-b">Documentos</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 border-b">Peugeot</td>
                        <td className="p-2 border-b">208</td>
                        <td className="p-2 border-b">AC 879 HV</td>
                        <td className="p-2 border-b">
                          <div className="flex flex-wrap gap-1">
                            {documentosEjemplo.vehiculos["AC 879 HV"]?.map((doc, index) => (
                              <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                className={`hover:bg-opacity-10 p-1 h-auto flex flex-col items-center ${
                                  doc.name.includes("Seguro")
                                    ? "text-orange-600 hover:bg-orange-50"
                                    : "text-green-600 hover:bg-green-50"
                                }`}
                                onClick={() => handleViewDocument(doc)}
                              >
                                <FileText className="h-4 w-4 mb-1" />
                                <span className="text-xs">{doc.name.split(" - ")[0]}</span>
                              </Button>
                            ))}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2">Fiat</td>
                        <td className="p-2">Cronos</td>
                        <td className="p-2">AV 545 TV</td>
                        <td className="p-2">
                          <div className="flex flex-wrap gap-1">
                            {documentosEjemplo.vehiculos["AV 545 TV"]?.map((doc, index) => (
                              <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                className={`hover:bg-opacity-10 p-1 h-auto flex flex-col items-center ${
                                  doc.name.includes("Seguro")
                                    ? "text-orange-600 hover:bg-orange-50"
                                    : doc.name.includes("Azul")
                                      ? "text-blue-600 hover:bg-blue-50"
                                      : "text-green-600 hover:bg-green-50"
                                }`}
                                onClick={() => handleViewDocument(doc)}
                              >
                                <FileText className="h-4 w-4 mb-1" />
                                <span className="text-xs">{doc.name.split(" - ")[0]}</span>
                              </Button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-end">
            <Button onClick={() => setShowDialog(false)} className="bg-blue-900 hover:bg-blue-800">
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de vista previa de documentos */}
      <DocumentPreviewModal
        isOpen={showDocumentPreview}
        onClose={() => setShowDocumentPreview(false)}
        document={selectedDocument}
      />
    </div>
  )
}
