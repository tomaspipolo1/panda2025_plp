"use client"

import { useState } from "react"
import { Printer, FileDown, Plus, Download, Eye, Mail, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FiltrosLicitaciones } from "@/components/licitaciones/filtros-licitaciones"
import { TablaLicitacionesCompras, type Licitacion } from "@/components/licitaciones/tabla-licitaciones-compras"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { VerOfertasModal } from "@/components/licitaciones/ver-ofertas-modal"
import { AnunciarAdjudicacionModal } from "@/components/licitaciones/anunciar-adjudicacion-modal"
import { toast } from "@/components/ui/use-toast"
import { CancelarLicitacionModal } from "@/components/licitaciones/cancelar-licitacion-modal"

// Obtenemos la fecha actual para comparar
const hoy = new Date()
const mesActual = hoy.getMonth() + 1 // Los meses en JS son 0-indexed
const anioActual = hoy.getFullYear()

// Datos de ejemplo para licitaciones con todos los estados
const licitacionesData: Licitacion[] = [
  {
    id: "1",
    numero: "LIC-2023-0125",
    titulo: "Suministro de equipos informáticos",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    fechaApertura: "15/04/2023",
    fechaCierre: "30/04/2023",
    montoEstimado: 1250000,
    estado: "en evaluacion",
  },
  {
    id: "2",
    numero: "LIC-2023-0118",
    titulo: "Servicio de mantenimiento de edificios",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    fechaApertura: "01/03/2023",
    fechaCierre: "15/03/2023",
    montoEstimado: 3500000,
    estado: "finalizada",
  },
  {
    id: "3",
    numero: "LIC-2023-0110",
    titulo: "Provisión de insumos médicos",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    fechaApertura: "15/02/2023",
    fechaCierre: "28/02/2023",
    montoEstimado: 2750000,
    estado: "adjudicada",
    proveedorAdjudicado: {
      nombre: "MediSupplies S.A.",
      monto: 2680000,
    },
  },
  {
    id: "4",
    numero: "LIC-2023-0105",
    titulo: "Construcción de escuela primaria",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    fechaApertura: "10/01/2023",
    fechaCierre: "25/01/2023",
    montoEstimado: 15000000,
    estado: "finalizada",
  },
  {
    id: "5",
    numero: "LIC-2022-0098",
    titulo: "Servicio de limpieza de oficinas",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    fechaApertura: "05/12/2022",
    fechaCierre: "20/12/2022",
    montoEstimado: 1800000,
    estado: "cancelada",
  },
  {
    id: "6",
    numero: "LIC-2023-0130",
    titulo: "Adquisición de vehículos oficiales",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    fechaApertura: `01/12/${anioActual + 1}`,
    fechaCierre: `15/12/${anioActual + 1}`,
    montoEstimado: 8500000,
    estado: "abierta",
  },
  {
    id: "7",
    numero: "LIC-2023-0135",
    titulo: "Renovación de mobiliario de oficinas",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    fechaApertura: "10/05/2023",
    fechaCierre: "25/05/2023",
    montoEstimado: 4200000,
    estado: "en proceso",
  },
  {
    id: "8",
    numero: "LIC-2023-0140",
    titulo: "Servicios de seguridad y vigilancia",
    organismo: "Consorcio de Gestión del Puerto La Plata",
    fechaApertura: "20/03/2023",
    fechaCierre: "05/04/2023",
    montoEstimado: 5800000,
    estado: "adjudicada",
    proveedorAdjudicado: {
      nombre: "Seguridad Integral S.R.L.",
      monto: 5650000,
    },
  },
]

// Datos de ejemplo para documentos
const documentosData = [
  {
    id: "1",
    nombre: "Pliego de Condiciones Generales.pdf",
    tipo: "Pliego",
    fechaSubida: "10/03/2023",
    tamano: "2.5 MB",
  },
  {
    id: "2",
    nombre: "Especificaciones Técnicas.pdf",
    tipo: "Anexo",
    fechaSubida: "10/03/2023",
    tamano: "1.8 MB",
  },
  {
    id: "3",
    nombre: "Formulario de Oferta.docx",
    tipo: "Formulario",
    fechaSubida: "11/03/2023",
    tamano: "520 KB",
  },
  {
    id: "4",
    nombre: "Planos Técnicos.zip",
    tipo: "Anexo",
    fechaSubida: "12/03/2023",
    tamano: "15.2 MB",
  },
]

// Datos de ejemplo para historial
const historialData = [
  {
    id: "1",
    fecha: "10/03/2023 09:15",
    accion: "Creación de licitación",
    usuario: "Juan Pérez",
    comentario: "Creación inicial de la licitación",
  },
  {
    id: "2",
    fecha: "10/03/2023 14:30",
    accion: "Carga de documentos",
    usuario: "Juan Pérez",
    comentario: "Se cargaron los pliegos y anexos",
  },
  {
    id: "3",
    fecha: "11/03/2023 10:45",
    accion: "Publicación",
    usuario: "María Gómez",
    comentario: "Licitación publicada en el portal",
  },
  {
    id: "4",
    fecha: "12/03/2023 16:20",
    accion: "Modificación",
    usuario: "Juan Pérez",
    comentario: "Se actualizaron las especificaciones técnicas",
  },
]

// Datos de ejemplo para proveedores inscritos
const proveedoresData = [
  {
    id: "1",
    nombre: "Carlos Rodríguez",
    correo: "carlos.rodriguez@tecnosoluciones.com",
    empresa: "TecnoSoluciones S.A.",
    fechaInscripcion: "12/03/2023 14:25",
  },
  {
    id: "2",
    nombre: "Laura Martínez",
    correo: "lmartinez@innovatech.com.ar",
    empresa: "InnovaTech Argentina",
    fechaInscripcion: "13/03/2023 09:10",
  },
  {
    id: "3",
    nombre: "Roberto Sánchez",
    correo: "roberto@equipamientosur.com.ar",
    empresa: "Equipamiento Sur",
    fechaInscripcion: "13/03/2023 16:45",
  },
  {
    id: "4",
    nombre: "Ana González",
    correo: "agonzalez@sistemasintegrados.com",
    empresa: "Sistemas Integrados S.R.L.",
    fechaInscripcion: "14/03/2023 11:30",
  },
]

export default function ListadoLicitacionesPage() {
  const router = useRouter()
  const [selectedLicitacion, setSelectedLicitacion] = useState<Licitacion | null>(null)
  const [openDetailDialog, setOpenDetailDialog] = useState(false)
  const [filteredLicitaciones, setFilteredLicitaciones] = useState<Licitacion[]>(licitacionesData)

  // Estado para el modal de ofertas
  const [openOfertasDialog, setOpenOfertasDialog] = useState(false)
  const [licitacionOfertas, setLicitacionOfertas] = useState<Licitacion | null>(null)

  // Agregar estados para el modal de adjudicación
  const [openAdjudicacionDialog, setOpenAdjudicacionDialog] = useState(false)
  const [licitacionAdjudicacion, setLicitacionAdjudicacion] = useState<Licitacion | null>(null)

  // Agregar estados para el modal de cancelación
  const [openCancelacionDialog, setOpenCancelacionDialog] = useState(false)
  const [licitacionCancelacion, setLicitacionCancelacion] = useState<Licitacion | null>(null)

  // Stats
  const totalLicitaciones = filteredLicitaciones.length
  const abiertas = filteredLicitaciones.filter((l) => l.estado === "abierta").length
  const enProceso = filteredLicitaciones.filter((l) => l.estado === "en proceso").length
  const enEvaluacion = filteredLicitaciones.filter((l) => l.estado === "en evaluacion").length
  const adjudicadas = filteredLicitaciones.filter((l) => l.estado === "adjudicada").length
  const finalizadas = filteredLicitaciones.filter((l) => l.estado === "finalizada").length
  const perdidas = 0 // El estado "perdida" solo se muestra al proveedor
  const canceladas = filteredLicitaciones.filter((l) => l.estado === "cancelada").length

  const handleEditar = (licitacion: Licitacion) => {
    if (licitacion.estado !== "abierta") {
      // Mostrar un mensaje o alerta indicando que solo se pueden editar licitaciones abiertas
      alert("Solo se pueden editar licitaciones en estado ABIERTA")
      return
    }

    // Redirigir a la página de edición
    router.push(`/empleado-compras/gestion/licitaciones/editar/${licitacion.id}`)
  }

  const handleVisualizar = (licitacion: Licitacion) => {
    setSelectedLicitacion(licitacion)
    setOpenDetailDialog(true)
  }

  const handleVerOfertas = (licitacion: Licitacion) => {
    setLicitacionOfertas(licitacion)
    setOpenOfertasDialog(true)
  }

  // Agregar la función para manejar la acción de anunciar adjudicación
  const handleAnunciarAdjudicacion = (licitacion: Licitacion) => {
    setLicitacionAdjudicacion(licitacion)
    setOpenAdjudicacionDialog(true)
  }

  // Agregar la función para manejar la acción de cancelar licitación
  const handleCancelarLicitacion = (licitacion: Licitacion) => {
    setLicitacionCancelacion(licitacion)
    setOpenCancelacionDialog(true)
  }

  // Agregar la función para manejar la adjudicación
  const handleAdjudicar = (ofertaId: string, proveedorNombre: string, montoOferta: number) => {
    // Actualizar el estado de la licitación a "adjudicada"
    if (licitacionAdjudicacion) {
      const updatedLicitaciones = filteredLicitaciones.map((l) => {
        if (l.id === licitacionAdjudicacion.id) {
          return {
            ...l,
            estado: "adjudicada" as const,
            proveedorAdjudicado: {
              nombre: proveedorNombre,
              monto: montoOferta,
            },
          }
        }
        return l
      })

      setFilteredLicitaciones(updatedLicitaciones)

      // Mostrar notificación de éxito
      toast({
        title: "Licitación adjudicada",
        description: `Se ha adjudicado la licitación ${licitacionAdjudicacion.numero} a ${proveedorNombre} por un monto de $${montoOferta.toLocaleString()}.`,
      })

      // Simular envío de notificaciones
      console.log(`Enviando notificación de adjudicación a ${proveedorNombre}`)
      console.log("Enviando notificaciones de no selección a los demás proveedores")

      // Cerrar el modal y limpiar el estado
      setOpenAdjudicacionDialog(false)
      setLicitacionAdjudicacion(null)
    }
  }

  // Agregar la función para manejar la cancelación
  const handleCancelar = (motivo: string) => {
    // Actualizar el estado de la licitación a "cancelada"
    if (licitacionCancelacion) {
      const updatedLicitaciones = filteredLicitaciones.map((l) => {
        if (l.id === licitacionCancelacion.id) {
          return {
            ...l,
            estado: "cancelada" as const,
          }
        }
        return l
      })

      setFilteredLicitaciones(updatedLicitaciones)

      // Mostrar notificación de éxito
      toast({
        title: "Licitación cancelada",
        description: `Se ha cancelado la licitación ${licitacionCancelacion.numero}. Motivo: ${motivo}`,
      })

      // Simular envío de notificaciones
      console.log(`Enviando notificación de cancelación a todos los proveedores inscritos`)
      console.log(`Motivo de cancelación: ${motivo}`)

      // Cerrar el modal y limpiar el estado
      setOpenCancelacionDialog(false)
      setTimeout(() => {
        setLicitacionCancelacion(null)
      }, 100)
    }
  }

  const handleCloseAdjudicacionModal = () => {
    // Asegurarse de limpiar completamente el estado
    setOpenAdjudicacionDialog(false)
    setTimeout(() => {
      setLicitacionAdjudicacion(null)
    }, 100)
  }

  const handleCloseCancelacionModal = () => {
    // Asegurarse de limpiar completamente el estado
    setOpenCancelacionDialog(false)
    setTimeout(() => {
      setLicitacionCancelacion(null)
    }, 100)
  }

  const handleNuevaLicitacion = () => {
    router.push("/empleado-compras/gestion/licitaciones/nueva")
  }

  const handleVerEstados = () => {
    router.push("/empleado-compras/gestion/licitaciones/estados")
  }

  const handleFilter = (filters: any) => {
    let result = [...licitacionesData]

    // Filtrar por número de licitación
    if (filters.numeroLicitacion) {
      result = result.filter((l) => l.numero.toLowerCase().includes(filters.numeroLicitacion.toLowerCase()))
    }

    // Filtrar por estado
    if (filters.estado && filters.estado !== "todos") {
      result = result.filter((l) => l.estado === filters.estado)
    }

    // Filtrar por fecha desde
    if (filters.fechaDesde) {
      const fechaDesde = new Date(filters.fechaDesde)
      result = result.filter((l) => {
        const partes = l.fechaApertura.split("/")
        const fechaApertura = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`)
        return fechaApertura >= fechaDesde
      })
    }

    // Filtrar por fecha hasta
    if (filters.fechaHasta) {
      const fechaHasta = new Date(filters.fechaHasta)
      result = result.filter((l) => {
        const partes = l.fechaCierre.split("/")
        const fechaCierre = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`)
        return fechaCierre <= fechaHasta
      })
    }

    setFilteredLicitaciones(result)
  }

  // Función para enviar correo a un proveedor
  const handleEnviarCorreo = (correo: string) => {
    console.log("Enviar correo a:", correo)
    // Aquí iría la lógica para abrir un modal de envío de correo o similar
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Listado de Licitaciones</h1>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="flex items-center" onClick={handleVerEstados}>
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Estados
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ver información sobre los estados de licitación</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button variant="outline" className="flex items-center">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button variant="outline" className="flex items-center">
            <FileDown className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button className="flex items-center" onClick={handleNuevaLicitacion}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Licitación
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Total Licitaciones</p>
            <p className="text-4xl font-bold">{totalLicitaciones}</p>
            <p className="text-sm text-gray-500">En el último año</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 flex flex-col">
            <p className="text-sm text-gray-500">Por Estado</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge className="bg-green-100 text-green-800">Abiertas: {abiertas}</Badge>
              <Badge className="bg-blue-100 text-blue-800">En Proceso: {enProceso}</Badge>
              <Badge className="bg-yellow-100 text-yellow-800">En Evaluación: {enEvaluacion}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 flex flex-col">
            <p className="text-sm text-gray-500">Resultados</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge className="bg-purple-100 text-purple-800">Adjudicadas: {adjudicadas}</Badge>
              <Badge className="bg-gray-100 text-gray-800">Finalizadas: {finalizadas}</Badge>
              {/* El estado "perdida" solo se muestra al proveedor */}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Canceladas</p>
            <p className="text-4xl font-bold text-red-600">{canceladas}</p>
            <p className="text-sm text-gray-500">No realizadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <FiltrosLicitaciones onFilter={handleFilter} />

      {/* Tabla de Licitaciones */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <TablaLicitacionesCompras
          licitaciones={filteredLicitaciones}
          onEditar={handleEditar}
          onVisualizar={handleVisualizar}
          onVerOfertas={handleVerOfertas}
          onAnunciarAdjudicacion={handleAnunciarAdjudicacion}
          onCancelarLicitacion={handleCancelarLicitacion}
        />
      </div>

      {/* Detalle de Licitación Dialog */}
      <Dialog open={openDetailDialog} onOpenChange={setOpenDetailDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Detalle de Licitación</DialogTitle>
            <DialogDescription>
              {selectedLicitacion?.numero} - {selectedLicitacion?.titulo}
            </DialogDescription>
          </DialogHeader>

          {selectedLicitacion && (
            <Tabs defaultValue="general" className="mt-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general">Información General</TabsTrigger>
                <TabsTrigger value="documentos">Documentos</TabsTrigger>
                <TabsTrigger value="proveedores">Proveedores</TabsTrigger>
                <TabsTrigger value="historial">Historial</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold">Número</h3>
                    <p>{selectedLicitacion.numero}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Estado</h3>
                    <Badge
                      className={
                        selectedLicitacion.estado === "abierta"
                          ? "bg-green-100 text-green-800"
                          : selectedLicitacion.estado === "en proceso"
                            ? "bg-blue-100 text-blue-800"
                            : selectedLicitacion.estado === "en evaluacion"
                              ? "bg-yellow-100 text-yellow-800"
                              : selectedLicitacion.estado === "adjudicada"
                                ? "bg-purple-100 text-purple-800"
                                : selectedLicitacion.estado === "finalizada"
                                  ? "bg-gray-100 text-gray-800"
                                  : selectedLicitacion.estado === "perdida"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-red-100 text-red-800"
                      }
                    >
                      {selectedLicitacion.estado.charAt(0).toUpperCase() +
                        selectedLicitacion.estado.slice(1).replace(/_/g, " ")}
                    </Badge>
                  </div>

                  <div className="col-span-2">
                    <h3 className="font-semibold">Título</h3>
                    <p>{selectedLicitacion.titulo}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold">Organismo</h3>
                    <p>{selectedLicitacion.organismo}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold">Monto Estimado</h3>
                    <p>
                      {new Intl.NumberFormat("es-AR", {
                        style: "currency",
                        currency: "ARS",
                        minimumFractionDigits: 0,
                      }).format(selectedLicitacion.montoEstimado)}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold">Fecha de Apertura</h3>
                    <p>{selectedLicitacion.fechaApertura}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold">Fecha de Cierre</h3>
                    <p>{selectedLicitacion.fechaCierre}</p>
                  </div>

                  {selectedLicitacion.estado === "adjudicada" && selectedLicitacion.proveedorAdjudicado && (
                    <>
                      <div>
                        <h3 className="font-semibold">Proveedor Adjudicado</h3>
                        <p>{selectedLicitacion.proveedorAdjudicado.nombre}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Monto Adjudicado</h3>
                        <p>
                          {new Intl.NumberFormat("es-AR", {
                            style: "currency",
                            currency: "ARS",
                            minimumFractionDigits: 0,
                          }).format(selectedLicitacion.proveedorAdjudicado.monto)}
                        </p>
                      </div>
                    </>
                  )}

                  <div className="col-span-2">
                    <h3 className="font-semibold">Descripción</h3>
                    <p className="text-gray-700">
                      Esta licitación tiene como objetivo la adquisición de bienes y servicios para el Consorcio de
                      Gestión del Puerto La Plata, según las especificaciones detalladas en el pliego de condiciones.
                    </p>
                  </div>

                  <div className="col-span-2">
                    <h3 className="font-semibold">Requisitos</h3>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Inscripción en el Registro de Proveedores del Puerto</li>
                      <li>Certificado fiscal para contratar vigente</li>
                      <li>Declaración jurada de no encontrarse en proceso de quiebra o concurso</li>
                      <li>Antecedentes de provisión de bienes o servicios similares</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="documentos" className="mt-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Documentos de la Licitación</h3>
                    <Button variant="outline" size="sm">
                      <FileDown className="h-4 w-4 mr-2" />
                      Descargar Todos
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Nombre</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Tipo</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Fecha de Subida</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Tamaño</th>
                          <th className="py-2 px-4 text-center text-sm font-medium text-gray-600">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {documentosData.map((documento) => (
                          <tr key={documento.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm">{documento.nombre}</td>
                            <td className="py-3 px-4 text-sm">{documento.tipo}</td>
                            <td className="py-3 px-4 text-sm">{documento.fechaSubida}</td>
                            <td className="py-3 px-4 text-sm">{documento.tamano}</td>
                            <td className="py-3 px-4 text-sm text-center">
                              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Descargar</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">Ver</span>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="proveedores" className="mt-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Proveedores Inscritos</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileDown className="h-4 w-4 mr-2" />
                        Exportar Lista
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Enviar Correo a Todos
                      </Button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Nombre</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Correo Electrónico</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Empresa</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">
                            Fecha de Inscripción
                          </th>
                          <th className="py-2 px-4 text-center text-sm font-medium text-gray-600">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {proveedoresData.map((proveedor) => (
                          <tr key={proveedor.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm">{proveedor.nombre}</td>
                            <td className="py-3 px-4 text-sm">{proveedor.correo}</td>
                            <td className="py-3 px-4 text-sm">{proveedor.empresa}</td>
                            <td className="py-3 px-4 text-sm">{proveedor.fechaInscripcion}</td>
                            <td className="py-3 px-4 text-sm text-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-800"
                                onClick={() => handleEnviarCorreo(proveedor.correo)}
                              >
                                <Mail className="h-4 w-4" />
                                <span className="sr-only">Enviar Correo</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">Ver Detalles</span>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="historial" className="mt-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Historial de Cambios</h3>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Fecha y Hora</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Acción</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Usuario</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Comentario</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historialData.map((evento) => (
                          <tr key={evento.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm">{evento.fecha}</td>
                            <td className="py-3 px-4 text-sm">{evento.accion}</td>
                            <td className="py-3 px-4 text-sm">{evento.usuario}</td>
                            <td className="py-3 px-4 text-sm">{evento.comentario}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Ver Ofertas */}
      {licitacionOfertas && (
        <VerOfertasModal
          isOpen={openOfertasDialog}
          onClose={() => {
            setOpenOfertasDialog(false)
            setTimeout(() => setLicitacionOfertas(null), 100)
          }}
          licitacionId={licitacionOfertas.id}
          licitacionTitulo={licitacionOfertas.titulo}
          estado={licitacionOfertas.estado}
        />
      )}

      {/* Modal de Anunciar Adjudicación */}
      {licitacionAdjudicacion && (
        <AnunciarAdjudicacionModal
          isOpen={openAdjudicacionDialog}
          onClose={handleCloseAdjudicacionModal}
          licitacionId={licitacionAdjudicacion.id}
          licitacionTitulo={licitacionAdjudicacion.titulo}
          licitacionNumero={licitacionAdjudicacion.numero}
          onAdjudicar={handleAdjudicar}
        />
      )}

      {/* Modal de Cancelar Licitación */}
      {licitacionCancelacion && (
        <CancelarLicitacionModal
          isOpen={openCancelacionDialog}
          onClose={handleCloseCancelacionModal}
          licitacionId={licitacionCancelacion.id}
          licitacionTitulo={licitacionCancelacion.titulo}
          licitacionNumero={licitacionCancelacion.numero}
          onCancelar={handleCancelar}
        />
      )}
    </div>
  )
}
