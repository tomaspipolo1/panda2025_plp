"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, PlusCircle, Search, Eye, Upload, Save } from "lucide-react"
import { ProveedoresInvitados } from "@/components/licitaciones/proveedores-invitados"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle2, Loader2 } from "lucide-react"

interface Proveedor {
  id: string
  nombre: string
  email: string
  empresa: string
}

interface DocumentoPliego {
  id: string
  seccion: string
  nombre: string
  descripcion?: string
  tipo: string
  seleccionado: boolean
  requiereFechaVencimiento?: boolean
  requiereFechaEmision?: boolean
  url?: string
}

// Datos de ejemplo para una licitación existente
const licitacionEjemplo = {
  id: "lic-2023-0118",
  numero: "LIC-2023-0118",
  titulo: "Servicio de mantenimiento de edificios",
  categoria: "mantenimiento",
  tipo: "privada",
  descripcion:
    "Contratación de servicios de mantenimiento preventivo y correctivo para los edificios administrativos y operativos del Puerto La Plata. Incluye servicios de electricidad, plomería, carpintería, pintura y reparaciones generales.",
  presupuesto: "3500000",
  moneda: "ars",
  fechaPublicacion: "2023-03-01",
  fechaCierre: "2023-03-15",
  documentosPliego: [
    {
      id: "1",
      seccion: "Cláusulas Legales Generales",
      nombre: "Condiciones Generales de Contratación",
      tipo: "pdf",
      seleccionado: true,
      url: "/documentos/condiciones-generales.pdf",
    },
    {
      id: "2",
      seccion: "Cláusulas Legales Particulares",
      nombre: "Condiciones Particulares de Contratación",
      tipo: "pdf",
      seleccionado: true,
      url: "/documentos/condiciones-particulares.pdf",
    },
    {
      id: "3",
      seccion: "Cláusulas Técnicas Generales",
      nombre: "Especificaciones Técnicas Generales",
      tipo: "pdf",
      seleccionado: true,
      url: "/documentos/especificaciones-tecnicas-generales.pdf",
    },
    {
      id: "4",
      seccion: "Cláusulas Técnicas Particulares",
      nombre: "Especificaciones Técnicas Particulares",
      tipo: "pdf",
      seleccionado: true,
      url: "/documentos/especificaciones-tecnicas-particulares.pdf",
    },
    {
      id: "5",
      seccion: "Cláusulas Legales Generales",
      nombre: "Formulario de Presentación de Oferta",
      tipo: "pdf",
      seleccionado: true,
      url: "/documentos/formulario-presentacion.pdf",
    },
  ],
  proveedores: [
    { id: "1", nombre: "Juan Pérez", email: "juan.perez@empresa.com", empresa: "Constructora ABC" },
    { id: "2", nombre: "María López", email: "maria.lopez@suministros.com", empresa: "Suministros XYZ" },
  ],
  publicacionInmediata: false,
  fechaHoraPublicacion: "2023-03-01T09:00:00",
  tipoPublicacion: "privada",
  mensajeInvitacion: `Estimado %nombre persona a cargo%,

Se le ha invitado a participar de la licitación %título de licitación% en nombre de la empresa %empresa%.

Por favor, ingrese al portal de proveedores para ver los detalles y requisitos de la licitación.

Saludos cordiales,
Departamento de Compras
Puerto La Plata`,
}

export default function EditarLicitacionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("general")
  const [titulo, setTitulo] = useState("")
  const [categoria, setCategoria] = useState("")
  const [tipoLicitacion, setTipoLicitacion] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [responsableTecnico, setResponsableTecnico] = useState("")
  const [presupuesto, setPresupuesto] = useState("")
  const [moneda, setMoneda] = useState("")
  const [fechaPublicacion, setFechaPublicacion] = useState<Date | undefined>(undefined)
  const [fechaCierre, setFechaCierre] = useState<Date | undefined>(undefined)
  const [documentosPliego, setDocumentosPliego] = useState<DocumentoPliego[]>([])
  const [proveedores, setProveedores] = useState<Proveedor[]>([])
  const [showProveedoresSection, setShowProveedoresSection] = useState(false)
  const [showPublicacionSection, setShowPublicacionSection] = useState(false)
  const [showGuardarModal, setShowGuardarModal] = useState(false)
  const [publicarInmediatamente, setPublicarInmediatamente] = useState(false)
  const [fechaHoraPublicacion, setFechaHoraPublicacion] = useState<Date | undefined>(undefined)
  const [tipoPublicacion, setTipoPublicacion] = useState("")
  const [mensajeInvitacion, setMensajeInvitacion] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [modalEstado, setModalEstado] = useState<"guardando" | "completado" | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showDocumentoModal, setShowDocumentoModal] = useState(false)
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState<DocumentoPliego | null>(null)
  const [showNuevoDocumentoModal, setShowNuevoDocumentoModal] = useState(false)
  const [nuevoDocumento, setNuevoDocumento] = useState<Omit<DocumentoPliego, "id" | "seleccionado">>({
    seccion: "",
    nombre: "",
    descripcion: "",
    tipo: "pdf",
    requiereFechaVencimiento: false,
    requiereFechaEmision: false,
  })

  // Cargar datos de la licitación
  useEffect(() => {
    // Simulamos una carga de datos
    const timer = setTimeout(() => {
      // Cargar datos de ejemplo
      setTitulo(licitacionEjemplo.titulo)
      setCategoria(licitacionEjemplo.categoria)
      setTipoLicitacion(licitacionEjemplo.tipo)
      setDescripcion(licitacionEjemplo.descripcion)
      setResponsableTecnico("tecnico@puertolaplata.gob.ar")
      setPresupuesto(licitacionEjemplo.presupuesto)
      setMoneda(licitacionEjemplo.moneda)
      setFechaPublicacion(licitacionEjemplo.fechaPublicacion ? new Date(licitacionEjemplo.fechaPublicacion) : undefined)
      setFechaCierre(licitacionEjemplo.fechaCierre ? new Date(licitacionEjemplo.fechaCierre) : undefined)
      setDocumentosPliego(licitacionEjemplo.documentosPliego)
      setProveedores(licitacionEjemplo.proveedores)
      setPublicarInmediatamente(licitacionEjemplo.publicacionInmediata)
      setFechaHoraPublicacion(
        licitacionEjemplo.fechaHoraPublicacion ? new Date(licitacionEjemplo.fechaHoraPublicacion) : undefined,
      )
      setTipoPublicacion(licitacionEjemplo.tipoPublicacion)
      setMensajeInvitacion(licitacionEjemplo.mensajeInvitacion)
      setIsLoading(false)

      // Verificar si la licitación está en estado abierta
      // Para este ejemplo, asumimos que la licitación está abierta
      // En un caso real, verificaríamos el estado de la licitación cargada
      const estadoLicitacion = "abierta" // Simulamos que está abierta
      if (estadoLicitacion !== "abierta") {
        alert("Solo se pueden editar licitaciones en estado ABIERTA")
        router.push("/empleado-compras/gestion/licitaciones/listado")
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [params.id, router])

  // Primero, modificamos la lógica del useEffect para controlar qué secciones se muestran
  useEffect(() => {
    setShowProveedoresSection(
      tipoLicitacion === "privada-sin-publicacion" ||
        tipoLicitacion === "privada-con-publicacion" ||
        tipoLicitacion === "concurso",
    )
    setShowPublicacionSection(tipoLicitacion === "publica" || tipoLicitacion === "privada-con-publicacion")
  }, [tipoLicitacion])

  // Función para formatear fecha para input type="date"
  const formatDateForInput = (date?: Date): string => {
    if (!date) return ""
    return date.toISOString().split("T")[0]
  }

  // Función para manejar cambios en el input de fecha
  const handleFechaPublicacionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const newDate = new Date(e.target.value)
      // Conservar la hora si ya existía una fecha
      if (fechaHoraPublicacion) {
        newDate.setHours(fechaHoraPublicacion.getHours())
        newDate.setMinutes(fechaHoraPublicacion.getMinutes())
      }
      setFechaHoraPublicacion(newDate)
    } else {
      setFechaHoraPublicacion(undefined)
    }
  }

  const handleToggleDocumento = (id: string) => {
    setDocumentosPliego(
      documentosPliego.map((doc) => (doc.id === id ? { ...doc, seleccionado: !doc.seleccionado } : doc)),
    )
  }

  const handleVerDocumento = (documento: DocumentoPliego) => {
    // Establecer el documento seleccionado en el estado
    setDocumentoSeleccionado(documento)
    // Configurar el estado nuevoDocumento con los datos del documento seleccionado
    setNuevoDocumento({
      seccion: documento.seccion,
      nombre: documento.nombre,
      descripcion: documento.descripcion || "",
      tipo: documento.tipo,
      requiereFechaVencimiento: documento.requiereFechaVencimiento || false,
      requiereFechaEmision: documento.requiereFechaEmision || false,
    })
    // Abrir el modal de documento en modo visualización
    setShowDocumentoModal(true)
  }

  const handleAgregarDocumento = () => {
    const newDoc: DocumentoPliego = {
      id: Date.now().toString(),
      ...nuevoDocumento,
      seleccionado: true,
    }
    setDocumentosPliego([...documentosPliego, newDoc])
    setShowNuevoDocumentoModal(false)
    setNuevoDocumento({
      seccion: "",
      nombre: "",
      descripcion: "",
      tipo: "pdf",
      requiereFechaVencimiento: false,
      requiereFechaEmision: false,
    })
  }

  const handleAddProveedor = (nuevoProveedor: Omit<Proveedor, "id">) => {
    setProveedores([
      ...proveedores,
      {
        id: Date.now().toString(),
        ...nuevoProveedor,
      },
    ])
  }

  const handleRemoveProveedor = (id: string) => {
    setProveedores(proveedores.filter((proveedor) => proveedor.id !== id))
  }

  const handleGuardarCambios = () => {
    setModalEstado("guardando")
    setShowGuardarModal(true)

    // Simulamos el guardado
    setTimeout(() => {
      setModalEstado("completado")
    }, 2000)
  }

  const handleCerrarModal = () => {
    if (modalEstado === "completado") {
      setShowGuardarModal(false)
      router.push("/empleado-compras/gestion/licitaciones/listado")
    }
  }

  const filteredDocumentos = documentosPliego.filter(
    (doc) =>
      doc.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.seccion.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <h2 className="text-xl font-semibold">Cargando licitación...</h2>
          <p className="text-gray-500 mt-2">Por favor espere mientras se cargan los datos</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Editar Licitación: {licitacionEjemplo.numero}</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Información General</TabsTrigger>
          <TabsTrigger value="requisitos">Requisitos del Pliego</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
          <TabsTrigger value="publicacion">Publicación</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Datos Generales</CardTitle>
              <CardDescription>Modifique la información básica de la licitación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título de la Licitación</Label>
                <Input
                  id="titulo"
                  placeholder="Ingrese el título de la licitación"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoría</Label>
                  <Select value={categoria} onValueChange={setCategoria}>
                    <SelectTrigger id="categoria">
                      <SelectValue placeholder="Seleccione una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seguridad">Seguridad</SelectItem>
                      <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                      <SelectItem value="tecnologia">Tecnología</SelectItem>
                      <SelectItem value="servicios">Servicios</SelectItem>
                      <SelectItem value="logistica">Logística</SelectItem>
                      <SelectItem value="consultoria">Consultoría</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Licitación</Label>
                  <Select value={tipoLicitacion} onValueChange={setTipoLicitacion}>
                    <SelectTrigger id="tipo">
                      <SelectValue placeholder="Seleccione un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="publica">P��blica</SelectItem>
                      <SelectItem value="privada-sin-publicacion">Privada sin publicación</SelectItem>
                      <SelectItem value="privada-con-publicacion">Privada con publicación</SelectItem>
                      <SelectItem value="concurso">Concurso de Precios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsableTecnico">Responsable técnico (correo electrónico)</Label>
                <Input
                  id="responsableTecnico"
                  placeholder="correo@ejemplo.com"
                  value={responsableTecnico}
                  onChange={(e) => setResponsableTecnico(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  placeholder="Ingrese una descripción detallada de la licitación"
                  rows={4}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsable-tecnico">Responsable Técnico (Email)</Label>
                <Input
                  id="responsable-tecnico"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={responsableTecnico}
                  onChange={(e) => setResponsableTecnico(e.target.value)}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="presupuesto">Presupuesto Estimado</Label>
                  <Input
                    id="presupuesto"
                    placeholder="Ingrese el presupuesto estimado"
                    value={presupuesto}
                    onChange={(e) => setPresupuesto(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="moneda">Moneda</Label>
                  <Select value={moneda} onValueChange={setMoneda}>
                    <SelectTrigger id="moneda">
                      <SelectValue placeholder="Seleccione una moneda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ars">Peso Argentino (ARS)</SelectItem>
                      <SelectItem value="usd">Dólar Estadounidense (USD)</SelectItem>
                      <SelectItem value="eur">Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fecha-publicacion" className="block text-sm font-medium mb-1">
                    Fecha de Publicación
                  </Label>
                  <div className="relative">
                    <Input
                      id="fecha-publicacion"
                      type="date"
                      value={fechaPublicacion ? formatDateForInput(fechaPublicacion) : ""}
                      onChange={(e) => {
                        if (e.target.value) {
                          setFechaPublicacion(new Date(e.target.value))
                        } else {
                          setFechaPublicacion(undefined)
                        }
                      }}
                      className="w-full pl-10"
                      placeholder="dd/mm/aaaa"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="fecha-cierre" className="block text-sm font-medium mb-1">
                    Fecha de Cierre
                  </Label>
                  <div className="relative">
                    <Input
                      id="fecha-cierre"
                      type="date"
                      value={fechaCierre ? formatDateForInput(fechaCierre) : ""}
                      onChange={(e) => {
                        if (e.target.value) {
                          setFechaCierre(new Date(e.target.value))
                        } else {
                          setFechaCierre(undefined)
                        }
                      }}
                      className="w-full pl-10"
                      placeholder="dd/mm/aaaa"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {showProveedoresSection && (
                <>
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Proveedores invitados</h3>
                    </div>

                    <ProveedoresInvitados
                      proveedores={proveedores}
                      onAddProveedor={handleAddProveedor}
                      onRemoveProveedor={handleRemoveProveedor}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button onClick={() => setActiveTab("requisitos")}>Siguiente</Button>
          </div>
        </TabsContent>

        <TabsContent value="requisitos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Requisitos del Pliego</CardTitle>
              <CardDescription>
                Seleccione los documentos que formarán parte del pliego de la licitación
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Buscar documentos..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button onClick={() => setShowNuevoDocumentoModal(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Nuevo documento
                </Button>
              </div>

              <div className="border rounded-md">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sección
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nombre del documento
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tipo
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Acción
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Seleccionar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredDocumentos.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-4 py-4 text-center text-sm text-gray-500">
                            No se encontraron documentos
                          </td>
                        </tr>
                      ) : (
                        filteredDocumentos.map((documento) => (
                          <tr key={documento.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900">{documento.seccion}</td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{documento.nombre}</td>
                            <td className="px-4 py-3 text-sm text-gray-500 uppercase">{documento.tipo}</td>
                            <td className="px-4 py-3 text-sm text-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleVerDocumento(documento)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              <Checkbox
                                checked={documento.seleccionado}
                                onCheckedChange={() => handleToggleDocumento(documento.id)}
                                id={`doc-${documento.id}`}
                              />
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-md border mt-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2">
                    <span className="text-xs font-bold">i</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Los documentos seleccionados formarán parte del pliego de la licitación y serán visibles para los
                    proveedores que participen.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setActiveTab("general")}>
              Anterior
            </Button>
            <Button onClick={() => setActiveTab("documentos")}>Siguiente</Button>
          </div>
        </TabsContent>

        <TabsContent value="documentos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documentos</CardTitle>
              <CardDescription>Gestione los documentos de la licitación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="pliego" className="block">
                      Pliego de Condiciones
                    </Label>
                    <span className="text-xs text-green-600 font-medium">Cargado</span>
                  </div>
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-2 rounded mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-500"
                        >
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">pliego_condiciones_LIC-2023-0118.pdf</p>
                        <p className="text-xs text-gray-500">1.2 MB - Subido el 01/03/2023</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Reemplazar
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="especificaciones" className="block">
                      Especificaciones Técnicas
                    </Label>
                    <span className="text-xs text-green-600 font-medium">Cargado</span>
                  </div>
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-2 rounded mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-500"
                        >
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">especificaciones_tecnicas_LIC-2023-0118.pdf</p>
                        <p className="text-xs text-gray-500">850 KB - Subido el 01/03/2023</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Reemplazar
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="formularios" className="block">
                      Formularios de Presentación
                    </Label>
                    <span className="text-xs text-green-600 font-medium">Cargado</span>
                  </div>
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-2 rounded mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-500"
                        >
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">formularios_presentacion_LIC-2023-0118.docx</p>
                        <p className="text-xs text-gray-500">420 KB - Subido el 01/03/2023</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Reemplazar
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <Label htmlFor="documentos-adicionales" className="block mb-2">
                    Documentos Adicionales
                  </Label>
                  <div className="flex items-center justify-center border-2 border-dashed rounded-md p-6">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-2">
                        <Button variant="outline">Agregar documento</Button>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">PDF, DOCX, XLSX (máx. 10MB)</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setActiveTab("requisitos")}>
              Anterior
            </Button>
            <Button onClick={() => setActiveTab("publicacion")}>Siguiente</Button>
          </div>
        </TabsContent>

        <TabsContent value="publicacion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Publicación</CardTitle>
              <CardDescription>Configure las opciones de publicación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {(tipoLicitacion === "publica" || tipoLicitacion === "privada-con-publicacion") && (
                <>
                  <div className="space-y-2">
                    <Label>Opciones de Publicación</Label>
                    <div className="grid grid-cols-1 gap-2 pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="publicar-inmediatamente"
                          checked={publicarInmediatamente}
                          onCheckedChange={(checked) => setPublicarInmediatamente(checked as boolean)}
                        />
                        <Label htmlFor="publicar-inmediatamente" className="font-normal">
                          Publicar inmediatamente
                        </Label>
                      </div>
                    </div>
                  </div>

                  {!publicarInmediatamente && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fecha-hora-publicacion">Programar fecha y hora de publicación</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="fecha-programada" className="block text-sm font-medium mb-1">
                              Fecha
                            </Label>
                            <div className="relative">
                              <Input
                                id="fecha-programada"
                                type="date"
                                value={fechaHoraPublicacion ? formatDateForInput(fechaHoraPublicacion) : ""}
                                onChange={handleFechaPublicacionChange}
                                className="w-full pl-10"
                                placeholder="dd/mm/aaaa"
                              />
                              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="hora-programada" className="block text-sm font-medium mb-1">
                              Hora
                            </Label>
                            <Input
                              id="hora-programada"
                              type="time"
                              value={
                                fechaHoraPublicacion
                                  ? `${String(fechaHoraPublicacion.getHours()).padStart(2, "0")}:${String(
                                      fechaHoraPublicacion.getMinutes(),
                                    ).padStart(2, "0")}`
                                  : ""
                              }
                              onChange={(e) => {
                                if (e.target.value) {
                                  const [hours, minutes] = e.target.value.split(":").map(Number)
                                  const newDate = fechaHoraPublicacion || new Date()
                                  newDate.setHours(hours)
                                  newDate.setMinutes(minutes)
                                  setFechaHoraPublicacion(new Date(newDate))
                                }
                              }}
                              className="h-10"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="tipo-publicacion">Tipo de Publicación</Label>
                    <Select value={tipoPublicacion} onValueChange={setTipoPublicacion}>
                      <SelectTrigger id="tipo-publicacion">
                        <SelectValue placeholder="Seleccione un tipo de publicación" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="abierta">Publicación abierta (pueden ver todos)</SelectItem>
                        <SelectItem value="privada">Privada (pueden ver solo los invitados)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="mensaje-invitacion">
                  {tipoLicitacion === "publica" || tipoLicitacion === "privada-con-publicacion"
                    ? "Mensaje de Invitación"
                    : "Mensaje de Invitación por Email"}
                </Label>
                <Textarea
                  id="mensaje-invitacion"
                  placeholder="Ingrese un mensaje para los proveedores invitados"
                  rows={4}
                  value={mensajeInvitacion}
                  onChange={(e) => setMensajeInvitacion(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Utilice %nombre persona a cargo%, %título de licitación% y %empresa% como marcadores que serán
                  reemplazados automáticamente.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setActiveTab("documentos")}>
              Anterior
            </Button>
            <Button onClick={handleGuardarCambios} className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de guardado */}
      <Dialog open={showGuardarModal} onOpenChange={handleCerrarModal}>
        <DialogContent className="sm:max-w-md">
          {modalEstado === "guardando" && (
            <div className="flex flex-col items-center justify-center py-6">
              <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
              <h3 className="text-lg font-medium">Guardando cambios</h3>
              <p className="text-sm text-muted-foreground mt-2">Por favor espere mientras se guardan los cambios...</p>
            </div>
          )}

          {modalEstado === "completado" && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  Cambios guardados exitosamente
                </DialogTitle>
                <DialogDescription>
                  Los cambios en la licitación {licitacionEjemplo.numero} han sido guardados correctamente.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button type="button" onClick={handleCerrarModal}>
                  Aceptar
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal para ver documento */}
      <Dialog open={showDocumentoModal} onOpenChange={setShowDocumentoModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Detalles del documento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="seccion-view">Sección</Label>
              <Input id="seccion-view" value={documentoSeleccionado?.seccion || ""} readOnly className="bg-gray-50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nombre-view">Nombre del documento</Label>
              <Input id="nombre-view" value={documentoSeleccionado?.nombre || ""} readOnly className="bg-gray-50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="descripcion-view">Descripción del documento</Label>
              <Textarea
                id="descripcion-view"
                value={documentoSeleccionado?.descripcion || ""}
                readOnly
                className="bg-gray-50"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipo-view">Tipo de archivo</Label>
              <Input
                id="tipo-view"
                value={documentoSeleccionado?.tipo.toUpperCase() || ""}
                readOnly
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id="requiere-vencimiento-view"
                  checked={documentoSeleccionado?.requiereFechaVencimiento || false}
                  disabled
                />
                <Label htmlFor="requiere-vencimiento-view" className="font-normal">
                  Requiere fecha de vencimiento
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requiere-emision-view"
                  checked={documentoSeleccionado?.requiereFechaEmision || false}
                  disabled
                />
                <Label htmlFor="requiere-emision-view" className="font-normal">
                  Requiere fecha de emisión
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowDocumentoModal(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para nuevo documento */}
      <Dialog open={showNuevoDocumentoModal} onOpenChange={setShowNuevoDocumentoModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Agregar nuevo documento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="seccion">Sección</Label>
              <Select
                value={nuevoDocumento.seccion}
                onValueChange={(value) => setNuevoDocumento({ ...nuevoDocumento, seccion: value })}
              >
                <SelectTrigger id="seccion">
                  <SelectValue placeholder="Seleccione una sección" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cláusulas Legales Generales">Cláusulas Legales Generales</SelectItem>
                  <SelectItem value="Cláusulas Legales Particulares">Cláusulas Legales Particulares</SelectItem>
                  <SelectItem value="Cláusulas Técnicas Generales">Cláusulas Técnicas Generales</SelectItem>
                  <SelectItem value="Cláusulas Técnicas Particulares">Cláusulas Técnicas Particulares</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del documento</Label>
              <Input
                id="nombre"
                value={nuevoDocumento.nombre}
                onChange={(e) => setNuevoDocumento({ ...nuevoDocumento, nombre: e.target.value })}
                placeholder="Ingrese el nombre del documento"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción del documento</Label>
              <Textarea
                id="descripcion"
                value={nuevoDocumento.descripcion || ""}
                onChange={(e) => setNuevoDocumento({ ...nuevoDocumento, descripcion: e.target.value })}
                placeholder="Ingrese una descripción del documento"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de archivo</Label>
              <Select
                value={nuevoDocumento.tipo}
                onValueChange={(value) => setNuevoDocumento({ ...nuevoDocumento, tipo: value })}
              >
                <SelectTrigger id="tipo">
                  <SelectValue placeholder="Seleccione un tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="jpg">JPG</SelectItem>
                  <SelectItem value="jpeg">JPEG</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id="requiere-vencimiento"
                  checked={nuevoDocumento.requiereFechaVencimiento}
                  onCheckedChange={(checked) =>
                    setNuevoDocumento({ ...nuevoDocumento, requiereFechaVencimiento: checked as boolean })
                  }
                />
                <Label htmlFor="requiere-vencimiento" className="font-normal">
                  Requiere fecha de vencimiento
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requiere-emision"
                  checked={nuevoDocumento.requiereFechaEmision}
                  onCheckedChange={(checked) =>
                    setNuevoDocumento({ ...nuevoDocumento, requiereFechaEmision: checked as boolean })
                  }
                />
                <Label htmlFor="requiere-emision" className="font-normal">
                  Requiere fecha de emisión
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNuevoDocumentoModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAgregarDocumento} disabled={!nuevoDocumento.seccion || !nuevoDocumento.nombre}>
              Agregar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
