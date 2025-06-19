"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mail,
  Search,
  Filter,
  MoreVertical,
  Reply,
  Forward,
  Archive,
  Trash2,
  Star,
  Clock,
  User,
  Building,
  Calendar,
  Paperclip,
} from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

// Datos de ejemplo para los mensajes
const mensajesData = [
  {
    id: 1,
    remitente: "María González",
    departamento: "Contabilidad",
    asunto: "Consulta sobre facturación proveedor TecnoPort",
    mensaje:
      "Necesito información sobre el estado de la factura FT-2025-001 del proveedor TecnoPort. ¿Podrían confirmar si ya fue procesada?",
    fecha: new Date(2025, 0, 15, 14, 30),
    leido: false,
    importante: true,
    categoria: "consulta",
    adjuntos: ["factura_tecnoport.pdf"],
  },
  {
    id: 2,
    remitente: "Carlos Rodríguez",
    departamento: "Operaciones",
    asunto: "Solicitud de compra urgente - Equipos de seguridad",
    mensaje:
      "Solicito la compra urgente de equipos de seguridad para el muelle 3. Adjunto especificaciones técnicas y justificación.",
    fecha: new Date(2025, 0, 15, 10, 15),
    leido: true,
    importante: false,
    categoria: "solicitud",
    adjuntos: ["especificaciones_seguridad.pdf", "justificacion.docx"],
  },
  {
    id: 3,
    remitente: "Ana Martínez",
    departamento: "Recursos Humanos",
    asunto: "Aprobación presupuesto capacitación proveedores",
    mensaje:
      "Requiero aprobación del presupuesto para el programa de capacitación de proveedores del segundo trimestre.",
    fecha: new Date(2025, 0, 14, 16, 45),
    leido: true,
    importante: false,
    categoria: "aprobacion",
    adjuntos: [],
  },
  {
    id: 4,
    remitente: "Luis Fernández",
    departamento: "Mantenimiento",
    asunto: "Cotización reparación grúa portuaria",
    mensaje:
      "Envío cotización para la reparación de la grúa portuaria #3. Necesito autorización para proceder con el trabajo.",
    fecha: new Date(2025, 0, 14, 9, 20),
    leido: false,
    importante: true,
    categoria: "cotizacion",
    adjuntos: ["cotizacion_grua.pdf"],
  },
  {
    id: 5,
    remitente: "Patricia López",
    departamento: "Logística",
    asunto: "Renovación contrato transporte terrestre",
    mensaje: "Es necesario renovar el contrato con Transportes del Sur. El contrato actual vence el 31 de enero.",
    fecha: new Date(2025, 0, 13, 11, 30),
    leido: true,
    importante: false,
    categoria: "contrato",
    adjuntos: ["contrato_actual.pdf"],
  },
]

const categorias = [
  { value: "todos", label: "Todos", count: 5 },
  { value: "consulta", label: "Consultas", count: 1 },
  { value: "solicitud", label: "Solicitudes", count: 1 },
  { value: "aprobacion", label: "Aprobaciones", count: 1 },
  { value: "cotizacion", label: "Cotizaciones", count: 1 },
  { value: "contrato", label: "Contratos", count: 1 },
]

export default function BuzonDepartamentoPage() {
  const [mensajes, setMensajes] = useState(mensajesData)
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState<any>(null)
  const [filtroCategoria, setFiltroCategoria] = useState("todos")
  const [busqueda, setBusqueda] = useState("")
  const [tabActiva, setTabActiva] = useState("recibidos")

  // Filtrar mensajes
  const mensajesFiltrados = mensajes.filter((mensaje) => {
    const coincideBusqueda =
      mensaje.asunto.toLowerCase().includes(busqueda.toLowerCase()) ||
      mensaje.remitente.toLowerCase().includes(busqueda.toLowerCase()) ||
      mensaje.departamento.toLowerCase().includes(busqueda.toLowerCase())

    const coincideCategoria = filtroCategoria === "todos" || mensaje.categoria === filtroCategoria

    return coincideBusqueda && coincideCategoria
  })

  // Marcar como leído
  const marcarComoLeido = (id: number) => {
    setMensajes(mensajes.map((msg) => (msg.id === id ? { ...msg, leido: true } : msg)))
  }

  // Obtener color de la categoría
  const getColorCategoria = (categoria: string) => {
    const colores: Record<string, string> = {
      consulta: "bg-blue-100 text-blue-800",
      solicitud: "bg-green-100 text-green-800",
      aprobacion: "bg-yellow-100 text-yellow-800",
      cotizacion: "bg-purple-100 text-purple-800",
      contrato: "bg-orange-100 text-orange-800",
    }
    return colores[categoria] || "bg-gray-100 text-gray-800"
  }

  const mensajesNoLeidos = mensajes.filter((m) => !m.leido).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-plp-dark">Buzón Departamento</h1>
          <p className="text-gray-600 mt-2">Gestión de comunicaciones internas del departamento</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {mensajesNoLeidos} sin leer
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Panel lateral - Categorías */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Categorías
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categorias.map((categoria) => (
                <button
                  key={categoria.value}
                  onClick={() => setFiltroCategoria(categoria.value)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                    filtroCategoria === categoria.value ? "bg-blue-100 text-blue-900" : "hover:bg-gray-100"
                  }`}
                >
                  <span className="text-sm font-medium">{categoria.label}</span>
                  <Badge variant="secondary" className="text-xs">
                    {categoria.count}
                  </Badge>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Panel principal */}
        <div className="lg:col-span-3">
          <Tabs value={tabActiva} onValueChange={setTabActiva}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="recibidos">Recibidos</TabsTrigger>
              <TabsTrigger value="enviados">Enviados</TabsTrigger>
              <TabsTrigger value="archivados">Archivados</TabsTrigger>
            </TabsList>

            <TabsContent value="recibidos" className="space-y-4">
              {/* Barra de búsqueda */}
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar mensajes..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>

              {/* Lista de mensajes */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {/* Lista de mensajes */}
                <div className="space-y-2">
                  {mensajesFiltrados.map((mensaje) => (
                    <Card
                      key={mensaje.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        mensajeSeleccionado?.id === mensaje.id ? "ring-2 ring-blue-500" : ""
                      } ${!mensaje.leido ? "bg-blue-50 border-blue-200" : ""}`}
                      onClick={() => {
                        setMensajeSeleccionado(mensaje)
                        if (!mensaje.leido) {
                          marcarComoLeido(mensaje.id)
                        }
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium">{mensaje.remitente}</span>
                            </div>
                            {mensaje.importante && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                          </div>
                          <div className="flex items-center space-x-2">
                            {!mensaje.leido && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 mb-2">
                          <Building className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-600">{mensaje.departamento}</span>
                          <Badge className={`text-xs ${getColorCategoria(mensaje.categoria)}`}>
                            {mensaje.categoria}
                          </Badge>
                        </div>

                        <h3 className={`text-sm mb-2 ${!mensaje.leido ? "font-semibold" : "font-medium"}`}>
                          {mensaje.asunto}
                        </h3>

                        <p className="text-xs text-gray-600 line-clamp-2 mb-2">{mensaje.mensaje}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {format(mensaje.fecha, "dd/MM/yyyy HH:mm", { locale: es })}
                            </span>
                          </div>
                          {mensaje.adjuntos.length > 0 && (
                            <div className="flex items-center space-x-1">
                              <Paperclip className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{mensaje.adjuntos.length}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Panel de detalle del mensaje */}
                <div>
                  {mensajeSeleccionado ? (
                    <Card className="h-fit">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{mensajeSeleccionado.asunto}</CardTitle>
                            <CardDescription className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center space-x-1">
                                <User className="h-4 w-4" />
                                <span>{mensajeSeleccionado.remitente}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Building className="h-4 w-4" />
                                <span>{mensajeSeleccionado.departamento}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{format(mensajeSeleccionado.fecha, "dd/MM/yyyy HH:mm", { locale: es })}</span>
                              </div>
                            </CardDescription>
                          </div>
                          <Badge className={getColorCategoria(mensajeSeleccionado.categoria)}>
                            {mensajeSeleccionado.categoria}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="prose prose-sm max-w-none">
                            <p className="text-gray-700 leading-relaxed">{mensajeSeleccionado.mensaje}</p>
                          </div>

                          {mensajeSeleccionado.adjuntos.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Adjuntos:</h4>
                              <div className="space-y-2">
                                {mensajeSeleccionado.adjuntos.map((adjunto: string, index: number) => (
                                  <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                                    <Paperclip className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm text-gray-700">{adjunto}</span>
                                    <Button variant="ghost" size="sm" className="ml-auto">
                                      Descargar
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center space-x-2 pt-4 border-t">
                            <Button size="sm" className="flex items-center space-x-1">
                              <Reply className="h-4 w-4" />
                              <span>Responder</span>
                            </Button>
                            <Button variant="outline" size="sm" className="flex items-center space-x-1">
                              <Forward className="h-4 w-4" />
                              <span>Reenviar</span>
                            </Button>
                            <Button variant="outline" size="sm" className="flex items-center space-x-1">
                              <Archive className="h-4 w-4" />
                              <span>Archivar</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>Eliminar</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="h-64 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Selecciona un mensaje para ver los detalles</p>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="enviados">
              <Card className="h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No hay mensajes enviados</p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="archivados">
              <Card className="h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Archive className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No hay mensajes archivados</p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
