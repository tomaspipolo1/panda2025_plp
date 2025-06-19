"use client"

import { useState, useEffect } from "react"
import { Search, Eye, Star, Download, FileText, FileSpreadsheet, Filter, Plus, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

// Datos de ejemplo para proveedores
const proveedores = [
  {
    id: 1,
    nombre: "Suministros Industriales S.A.",
    cuit: "30-12345678-9",
    categoria: "Materiales",
    subcategoria: "Construcción",
    estado: "Activo",
    ultimaActividad: "15/04/2023",
    calificacion: "Proveedor A",
  },
  {
    id: 2,
    nombre: "Logística Portuaria SRL",
    cuit: "30-98765432-1",
    categoria: "Servicios",
    subcategoria: "Transporte",
    estado: "Activo",
    ultimaActividad: "22/03/2023",
    calificacion: "Proveedor B",
  },
  {
    id: 3,
    nombre: "Tecnología Naval Argentina",
    cuit: "30-56789012-3",
    categoria: "Tecnología",
    subcategoria: "Equipamiento",
    estado: "Activo",
    ultimaActividad: "05/04/2023",
    calificacion: "Proveedor A",
  },
  {
    id: 4,
    nombre: "Seguridad Marítima SA",
    cuit: "30-34567890-1",
    categoria: "Seguridad",
    subcategoria: "Vigilancia",
    estado: "Inactivo",
    ultimaActividad: "10/01/2023",
    calificacion: "Proveedor B",
  },
  {
    id: 5,
    nombre: "Construcciones Portuarias",
    cuit: "30-23456789-0",
    categoria: "Construcción",
    subcategoria: "Infraestructura",
    estado: "Activo",
    ultimaActividad: "01/04/2023",
    calificacion: "Proveedor C",
  },
  {
    id: 6,
    nombre: "Servicios Marítimos del Sur",
    cuit: "30-87654321-2",
    categoria: "Servicios",
    subcategoria: "Mantenimiento",
    estado: "Potencial",
    ultimaActividad: "N/A",
    calificacion: "NO APROBADO",
  },
  {
    id: 7,
    nombre: "Importadora Atlántica",
    cuit: "30-76543210-3",
    categoria: "Comercio",
    subcategoria: "Importación",
    estado: "Potencial",
    ultimaActividad: "N/A",
    calificacion: "NO APROBADO",
  },
]

// Datos de ejemplo para usuarios (sugerencias)
const usuariosEjemplo = [
  "Ana García - Compras",
  "Juan Pérez - Logística",
  "María Rodríguez - Finanzas",
  "Carlos López - Compras",
  "Laura Martínez - Administración",
  "Pedro Sánchez - Compras",
  "Sofía Fernández - Logística",
  "Diego Ramírez - Finanzas",
]

// Categorías y subcategorías para filtros
const categorias = [
  { value: "materiales", label: "Materiales" },
  { value: "servicios", label: "Servicios" },
  { value: "tecnologia", label: "Tecnología" },
  { value: "seguridad", label: "Seguridad" },
  { value: "construccion", label: "Construcción" },
  { value: "comercio", label: "Comercio" },
]

const subcategorias = [
  { value: "construccion", label: "Construcción" },
  { value: "transporte", label: "Transporte" },
  { value: "equipamiento", label: "Equipamiento" },
  { value: "vigilancia", label: "Vigilancia" },
  { value: "infraestructura", label: "Infraestructura" },
  { value: "mantenimiento", label: "Mantenimiento" },
  { value: "importacion", label: "Importación" },
]

// Criterios de evaluación
const criteriosEvaluacion = [
  { id: "respuesta", nombre: "Respuesta a sus Requerimientos" },
  { id: "calidad", nombre: "Calidad de los materiales/servicios provistos" },
  { id: "plazos", nombre: "Cumplimiento de los plazos de entrega" },
  { id: "competitividad", nombre: "Competitividad de la oferta" },
  { id: "reclamos", nombre: "Atención de reclamos" },
]

// Función para determinar la clasificación del proveedor según el promedio
const obtenerClasificacion = (promedio: number): string => {
  if (promedio >= 4) return "Proveedor A"
  if (promedio >= 3.5) return "Proveedor B"
  if (promedio >= 3) return "Proveedor C"
  return "NO APROBADO"
}

// Función para obtener el color de la clasificación
const obtenerColorClasificacion = (clasificacion: string): string => {
  switch (clasificacion) {
    case "Proveedor A":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "Proveedor B":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    case "Proveedor C":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100"
    case "NO APROBADO":
      return "bg-red-100 text-red-800 hover:bg-red-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

export default function ListadoProveedoresPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("todos")
  const [isCalificarModalOpen, setIsCalificarModalOpen] = useState(false)
  const [selectedProveedor, setSelectedProveedor] = useState<any>(null)
  const [observaciones, setObservaciones] = useState("")
  const [enviarACalificar, setEnviarACalificar] = useState(false)
  const [usuarioCalificador, setUsuarioCalificador] = useState("")
  const [usuariosSugeridos, setUsuariosSugeridos] = useState<string[]>([])
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false)
  const [filtroCategoria, setFiltroCategoria] = useState<string[]>([])
  const [filtroSubcategoria, setFiltroSubcategoria] = useState<string[]>([])
  const [filtroEstado, setFiltroEstado] = useState<string[]>([])
  const [filtroCalificacion, setFiltroCalificacion] = useState<string | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Estado para errores de validación
  const [erroresValidacion, setErroresValidacion] = useState<Record<string, string>>({})

  // Estado para criterios seleccionados para enviar a calificar
  const [criteriosSeleccionados, setCriteriosSeleccionados] = useState<Record<string, boolean>>({
    respuesta: true,
    calidad: true,
    plazos: true,
    competitividad: true,
    reclamos: true,
  })

  // Estado para los valores de evaluación
  const [evaluaciones, setEvaluaciones] = useState<Record<string, number>>({
    respuesta: 0,
    calidad: 0,
    plazos: 0,
    competitividad: 0,
    reclamos: 0,
  })

  // Estado para el promedio calculado
  const [promedio, setPromedio] = useState<number>(0)
  const [clasificacion, setClasificacion] = useState<string>("")

  // Calcular promedio y clasificación cuando cambian las evaluaciones
  useEffect(() => {
    // Solo considerar los criterios que no están seleccionados para enviar a otro usuario
    // cuando el modo "enviar a calificar" está activo
    const valoresAConsiderar = Object.entries(evaluaciones)
      .filter(([criterioId, _]) => !enviarACalificar || !criteriosSeleccionados[criterioId])
      .map(([_, valor]) => valor)

    const suma = valoresAConsiderar.reduce((acc, val) => acc + val, 0)
    const nuevoPromedio = valoresAConsiderar.length > 0 ? suma / valoresAConsiderar.length : 0
    setPromedio(nuevoPromedio)
    setClasificacion(obtenerClasificacion(nuevoPromedio))
  }, [evaluaciones, criteriosSeleccionados, enviarACalificar])

  // Función para actualizar una evaluación individual
  const actualizarEvaluacion = (criterio: string, valor: string) => {
    const valorNumerico = Number.parseFloat(valor)

    // Validar que sea un número y esté en el rango correcto
    if (isNaN(valorNumerico)) {
      setErroresValidacion((prev) => ({
        ...prev,
        [criterio]: "Ingrese un valor numérico",
      }))
      return
    }

    if (valorNumerico < 0 || valorNumerico > 5) {
      setErroresValidacion((prev) => ({
        ...prev,
        [criterio]: "El valor debe estar entre 0 y 5",
      }))
      return
    }

    // Si pasa la validación, limpiar el error y actualizar el valor
    setErroresValidacion((prev) => {
      const newErrors = { ...prev }
      delete newErrors[criterio]
      return newErrors
    })

    setEvaluaciones((prev) => ({
      ...prev,
      [criterio]: valorNumerico,
    }))
  }

  // Función para abrir el modal de calificación
  const handleCalificar = (proveedor: any) => {
    setSelectedProveedor(proveedor)
    // Inicializar evaluaciones en 0
    setEvaluaciones({
      respuesta: 0,
      calidad: 0,
      plazos: 0,
      competitividad: 0,
      reclamos: 0,
    })
    // Inicializar todos los criterios como seleccionados
    setCriteriosSeleccionados({
      respuesta: true,
      calidad: true,
      plazos: true,
      competitividad: true,
      reclamos: true,
    })
    setObservaciones("")
    setEnviarACalificar(false)
    setUsuarioCalificador("")
    setIsCalificarModalOpen(true)
  }

  // Función para guardar la calificación
  const handleGuardarCalificacion = () => {
    // Aquí iría la lógica para guardar la calificación en la base de datos
    console.log("Calificación guardada:", {
      proveedorId: selectedProveedor?.id,
      evaluaciones,
      promedio,
      clasificacion,
      observaciones,
    })

    // Actualizar la calificación en el estado local (simulación)
    const updatedProveedores = proveedores.map((p) =>
      p.id === selectedProveedor?.id ? { ...p, calificacion: clasificacion } : p,
    )

    // Cerrar el modal y resetear estados
    setIsCalificarModalOpen(false)
    setEnviarACalificar(false)
  }

  // Función para exportar a Excel
  const exportToExcel = () => {
    // Aquí iría la lógica para exportar a Excel
    console.log("Exportando a Excel...")
    alert("Exportando a Excel... (Funcionalidad simulada)")
  }

  // Función para exportar a PDF
  const exportToPDF = () => {
    // Aquí iría la lógica para exportar a PDF
    console.log("Exportando a PDF...")
    alert("Exportando a PDF... (Funcionalidad simulada)")
  }

  // Filtrar proveedores según la búsqueda y filtros avanzados
  const filteredProveedores = proveedores.filter((proveedor) => {
    // Filtro de búsqueda
    const matchesSearch =
      proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.cuit.includes(searchTerm) ||
      proveedor.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.subcategoria.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro de categoría
    const matchesCategoria =
      filtroCategoria.length === 0 ||
      filtroCategoria.some((cat) => proveedor.categoria.toLowerCase() === cat.toLowerCase())

    // Filtro de subcategoría
    const matchesSubcategoria =
      filtroSubcategoria.length === 0 ||
      filtroSubcategoria.some((subcat) => proveedor.subcategoria.toLowerCase() === subcat.toLowerCase())

    // Filtro de estado
    const matchesEstado =
      filtroEstado.length === 0 ||
      filtroEstado.some((estado) => proveedor.estado.toLowerCase() === estado.toLowerCase())

    // Filtro de calificación
    const matchesCalificacion = filtroCalificacion === null || proveedor.calificacion === filtroCalificacion

    return matchesSearch && matchesCategoria && matchesSubcategoria && matchesEstado && matchesCalificacion
  })

  // Filtrar proveedores según la pestaña activa
  const tabFilteredProveedores = filteredProveedores.filter((proveedor) => {
    if (activeTab === "todos") return true
    if (activeTab === "activos") return proveedor.estado === "Activo"
    if (activeTab === "potenciales") return proveedor.estado === "Potencial"
    return true
  })

  // Verificar si hay filtros activos
  const hasActiveFilters =
    filtroCategoria.length > 0 ||
    filtroSubcategoria.length > 0 ||
    filtroEstado.length > 0 ||
    filtroCalificacion !== null

  // Función para filtrar usuarios según lo que se escribe
  const filtrarUsuarios = (texto: string) => {
    const filtrados = usuariosEjemplo.filter((usuario) => usuario.toLowerCase().includes(texto.toLowerCase()))
    setUsuariosSugeridos(filtrados)
    setMostrarSugerencias(true)
  }

  // Función para seleccionar un usuario de las sugerencias
  const seleccionarUsuario = (usuario: string) => {
    setUsuarioCalificador(usuario)
    setMostrarSugerencias(false)
  }

  // Función para enviar solicitud de calificación
  const enviarSolicitudCalificacion = () => {
    // Verificar que al menos un criterio esté seleccionado
    const hayCriteriosSeleccionados = Object.values(criteriosSeleccionados).some((value) => value)

    if (!hayCriteriosSeleccionados) {
      alert("Debe seleccionar al menos un criterio para calificar")
      return
    }

    // Verificar si hay errores de validación en los criterios que califica el usuario actual
    const hayErroresEnCriteriosUsuarioActual = Object.entries(erroresValidacion).some(
      ([criterioId, _]) => !criteriosSeleccionados[criterioId],
    )

    if (hayErroresEnCriteriosUsuarioActual) {
      alert("Hay errores en los criterios que está calificando. Por favor, corríjalos antes de continuar.")
      return
    }

    // Obtener los criterios seleccionados para el otro usuario
    const criteriosParaOtroUsuario = Object.entries(criteriosSeleccionados)
      .filter(([_, selected]) => selected)
      .map(([criterioId, _]) => {
        const criterio = criteriosEvaluacion.find((c) => c.id === criterioId)
        return criterio ? criterio.nombre : criterioId
      })

    // Obtener los criterios calificados por el usuario actual
    const criteriosCalificadosPorUsuarioActual = Object.entries(criteriosSeleccionados)
      .filter(([criterioId, selected]) => !selected)
      .map(([criterioId, _]) => {
        const criterio = criteriosEvaluacion.find((c) => c.id === criterioId)
        return {
          nombre: criterio ? criterio.nombre : criterioId,
          valor: evaluaciones[criterioId],
        }
      })

    console.log("Solicitud de calificación enviada a:", usuarioCalificador)
    console.log("Criterios a calificar por otro usuario:", criteriosParaOtroUsuario)
    console.log("Criterios calificados por usuario actual:", criteriosCalificadosPorUsuarioActual)

    // Aquí iría la lógica para enviar la notificación al usuario
    let mensaje = `Solicitud de calificación enviada a ${usuarioCalificador} para los criterios: ${criteriosParaOtroUsuario.join(", ")}`

    if (criteriosCalificadosPorUsuarioActual.length > 0) {
      mensaje += `\n\nCriterios calificados por usted: ${criteriosCalificadosPorUsuarioActual.map((c) => `${c.nombre} (${c.valor})`).join(", ")}`
    }

    alert(mensaje)

    // Cerrar el modal
    setIsCalificarModalOpen(false)
  }

  // Verificar si hay criterios no seleccionados para enviar a otro usuario
  const hayCriteriosParaUsuarioActual =
    enviarACalificar && Object.values(criteriosSeleccionados).some((value) => !value)

  // Verificar si hay errores en los criterios que califica el usuario actual
  const hayErroresEnCriteriosUsuarioActual = Object.entries(erroresValidacion).some(
    ([criterioId, _]) => !criteriosSeleccionados[criterioId],
  )

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Listado de Proveedores</h1>
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

          <Button asChild className="bg-plp-dark hover:bg-plp-medium">
            <Link href="/empleado-compras/gestion/proveedores/nuevo">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Proveedor
            </Link>
          </Button>
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
                    <Badge className="ml-2 bg-white text-plp-dark hover:bg-gray-100">
                      {filtroCategoria.length +
                        filtroSubcategoria.length +
                        filtroEstado.length +
                        (filtroCalificacion !== null ? 1 : 0)}
                    </Badge>
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

                  <div className="space-y-2">
                    <Label>Subcategoría</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {subcategorias.map((subcategoria) => (
                        <div key={subcategoria.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`subcategoria-${subcategoria.value}`}
                            checked={filtroSubcategoria.includes(subcategoria.label)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFiltroSubcategoria([...filtroSubcategoria, subcategoria.label])
                              } else {
                                setFiltroSubcategoria(filtroSubcategoria.filter((c) => c !== subcategoria.label))
                              }
                            }}
                          />
                          <label
                            htmlFor={`subcategoria-${subcategoria.value}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {subcategoria.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Estado</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Activo", "Inactivo", "Potencial"].map((estado) => (
                        <div key={estado} className="flex items-center space-x-2">
                          <Checkbox
                            id={`estado-${estado.toLowerCase()}`}
                            checked={filtroEstado.includes(estado)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFiltroEstado([...filtroEstado, estado])
                              } else {
                                setFiltroEstado(filtroEstado.filter((e) => e !== estado))
                              }
                            }}
                          />
                          <label
                            htmlFor={`estado-${estado.toLowerCase()}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {estado}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Calificación</Label>
                    <Select
                      value={filtroCalificacion || ""}
                      onValueChange={(value) => setFiltroCalificacion(value === "any" ? null : value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Cualquier calificación" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Cualquier calificación</SelectItem>
                        <SelectItem value="Proveedor A">Proveedor A</SelectItem>
                        <SelectItem value="Proveedor B">Proveedor B</SelectItem>
                        <SelectItem value="Proveedor C">Proveedor C</SelectItem>
                        <SelectItem value="NO APROBADO">NO APROBADO</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-between pt-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFiltroCategoria([])
                        setFiltroSubcategoria([])
                        setFiltroEstado([])
                        setFiltroCalificacion(null)
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

              {filtroSubcategoria.map((subcat) => (
                <Badge key={`subcat-${subcat}`} variant="secondary" className="px-3 py-1">
                  Subcategoría: {subcat}
                  <button
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setFiltroSubcategoria(filtroSubcategoria.filter((s) => s !== subcat))}
                  >
                    ×
                  </button>
                </Badge>
              ))}

              {filtroEstado.map((estado) => (
                <Badge key={`estado-${estado}`} variant="secondary" className="px-3 py-1">
                  Estado: {estado}
                  <button
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setFiltroEstado(filtroEstado.filter((e) => e !== estado))}
                  >
                    ×
                  </button>
                </Badge>
              ))}

              {filtroCalificacion !== null && (
                <Badge variant="secondary" className="px-3 py-1">
                  Calificación: {filtroCalificacion}
                  <button
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setFiltroCalificacion(null)}
                  >
                    ×
                  </button>
                </Badge>
              )}

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-3 text-xs"
                  onClick={() => {
                    setFiltroCategoria([])
                    setFiltroSubcategoria([])
                    setFiltroEstado([])
                    setFiltroCalificacion(null)
                  }}
                >
                  Limpiar todos
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="todos" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="todos" className="data-[state=active]:bg-plp-dark data-[state=active]:text-white">
            Todos
          </TabsTrigger>
          <TabsTrigger value="activos" className="data-[state=active]:bg-plp-dark data-[state=active]:text-white">
            Activos
          </TabsTrigger>
          <TabsTrigger value="potenciales" className="data-[state=active]:bg-plp-dark data-[state=active]:text-white">
            Potenciales
          </TabsTrigger>
        </TabsList>

        {["todos", "activos", "potenciales"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-0">
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="py-3 px-4 text-left font-medium">Nombre</th>
                      <th className="py-3 px-4 text-left font-medium">CUIT</th>
                      <th className="py-3 px-4 text-left font-medium">Categoría</th>
                      <th className="py-3 px-4 text-left font-medium">Subcategoría</th>
                      <th className="py-3 px-4 text-left font-medium">Estado</th>
                      <th className="py-3 px-4 text-left font-medium">Última actividad</th>
                      <th className="py-3 px-4 text-left font-medium">Calificación</th>
                      <th className="py-3 px-4 text-center font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tabFilteredProveedores.length > 0 ? (
                      tabFilteredProveedores.map((proveedor) => (
                        <tr key={proveedor.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{proveedor.nombre}</td>
                          <td className="py-3 px-4">{proveedor.cuit}</td>
                          <td className="py-3 px-4">{proveedor.categoria}</td>
                          <td className="py-3 px-4">{proveedor.subcategoria}</td>
                          <td className="py-3 px-4">
                            <Badge
                              variant="outline"
                              className={
                                proveedor.estado === "Activo"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : proveedor.estado === "Potencial"
                                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                              }
                            >
                              {proveedor.estado}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">{proveedor.ultimaActividad}</td>
                          <td className="py-3 px-4">
                            {proveedor.calificacion ? (
                              <Badge variant="outline" className={obtenerColorClasificacion(proveedor.calificacion)}>
                                {proveedor.calificacion}
                              </Badge>
                            ) : (
                              <span className="text-gray-500">Sin calificar</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Ver detalles</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => handleCalificar(proveedor)}
                                    >
                                      <Star className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Calificar</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-6 text-center text-gray-500">
                          No se encontraron proveedores que coincidan con la búsqueda
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Modal para calificar proveedor */}
      <Dialog open={isCalificarModalOpen} onOpenChange={setIsCalificarModalOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Calificar Proveedor</DialogTitle>
            <DialogDescription>
              {selectedProveedor?.nombre} - {selectedProveedor?.cuit}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 overflow-y-auto pr-1">
            <div className="flex items-center space-x-2 mb-6">
              <Switch id="enviar-a-calificar" checked={enviarACalificar} onCheckedChange={setEnviarACalificar} />
              <Label htmlFor="enviar-a-calificar">Enviar a calificar por otro usuario</Label>
            </div>

            {enviarACalificar ? (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="usuario-calificador" className="block mb-2">
                    Nombre Completo
                  </Label>
                  <div className="relative">
                    <div className="flex gap-2">
                      <Input
                        id="usuario-calificador"
                        value={usuarioCalificador}
                        onChange={(e) => {
                          setUsuarioCalificador(e.target.value)
                          filtrarUsuarios(e.target.value)
                        }}
                        onFocus={() => filtrarUsuarios(usuarioCalificador)}
                        placeholder="Buscar usuario..."
                        className="flex-1"
                      />
                    </div>

                    {mostrarSugerencias && usuariosSugeridos.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {usuariosSugeridos.map((usuario, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => seleccionarUsuario(usuario)}
                          >
                            {usuario}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Criterios a calificar por otro usuario</h3>
                  <div className="space-y-2 border rounded-md p-3 bg-gray-50">
                    {criteriosEvaluacion.map((criterio) => (
                      <div key={criterio.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`criterio-${criterio.id}`}
                          checked={criteriosSeleccionados[criterio.id]}
                          onCheckedChange={(checked) => {
                            setCriteriosSeleccionados({
                              ...criteriosSeleccionados,
                              [criterio.id]: !!checked,
                            })
                          }}
                        />
                        <label
                          htmlFor={`criterio-${criterio.id}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {criterio.nombre}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Criterios a calificar por el usuario actual */}
                {hayCriteriosParaUsuarioActual && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Criterios a calificar por usted</h3>
                    <div className="mb-6 border rounded-md overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b">
                            <th className="py-2 px-4 text-left font-medium w-1/2">Criterio</th>
                            <th className="py-2 px-4 text-left font-medium">Calificación (0-5)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {criteriosEvaluacion
                            .filter((criterio) => !criteriosSeleccionados[criterio.id])
                            .map((criterio) => (
                              <tr key={criterio.id} className="border-b">
                                <td className="py-3 px-4">{criterio.nombre}</td>
                                <td className="py-3 px-4">
                                  <div className="space-y-1">
                                    <Input
                                      type="number"
                                      step="0.1"
                                      min="0"
                                      max="5"
                                      value={evaluaciones[criterio.id].toString()}
                                      onChange={(e) => actualizarEvaluacion(criterio.id, e.target.value)}
                                      className={erroresValidacion[criterio.id] ? "border-red-500" : ""}
                                    />
                                    {erroresValidacion[criterio.id] && (
                                      <p className="text-xs text-red-500">{erroresValidacion[criterio.id]}</p>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Resultado de la evaluación para criterios del usuario actual */}
                    {hayCriteriosParaUsuarioActual && (
                      <div className="mb-6 p-4 border rounded-md bg-gray-50">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Promedio de su evaluación:</p>
                            <p className="text-2xl font-bold">{promedio.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="font-medium">Clasificación parcial:</p>
                            <Badge
                              variant="outline"
                              className={`text-lg px-3 py-1 ${obtenerColorClasificacion(clasificacion)}`}
                            >
                              {clasificacion}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Nota: Esta clasificación es parcial y se basa solo en los criterios que usted está
                          calificando.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <Separator className="my-4" />

                {/* Campo de observaciones */}
                <div className="mb-4">
                  <Label htmlFor="observaciones" className="block mb-2">
                    Observaciones
                  </Label>
                  <textarea
                    id="observaciones"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={4}
                    placeholder="Ingrese observaciones sobre el proveedor..."
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={enviarSolicitudCalificacion}
                    disabled={
                      !usuarioCalificador ||
                      !Object.values(criteriosSeleccionados).some((v) => v) ||
                      hayErroresEnCriteriosUsuarioActual
                    }
                    className="bg-plp-dark hover:bg-plp-medium"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Enviar solicitud
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Tabla de criterios de evaluación */}
                <div className="mb-6 border rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="py-2 px-4 text-left font-medium w-1/2">Criterio</th>
                        <th className="py-2 px-4 text-left font-medium">Calificación (0-5)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {criteriosEvaluacion.map((criterio) => (
                        <tr key={criterio.id} className="border-b">
                          <td className="py-3 px-4">{criterio.nombre}</td>
                          <td className="py-3 px-4">
                            <div className="space-y-1">
                              <Input
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                value={evaluaciones[criterio.id].toString()}
                                onChange={(e) => actualizarEvaluacion(criterio.id, e.target.value)}
                                className={erroresValidacion[criterio.id] ? "border-red-500" : ""}
                              />
                              {erroresValidacion[criterio.id] && (
                                <p className="text-xs text-red-500">{erroresValidacion[criterio.id]}</p>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Resultado de la evaluación */}
                <div className="mb-6 p-4 border rounded-md bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Promedio de evaluación:</p>
                      <p className="text-2xl font-bold">{promedio.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="font-medium">Clasificación:</p>
                      <Badge
                        variant="outline"
                        className={`text-lg px-3 py-1 ${obtenerColorClasificacion(clasificacion)}`}
                      >
                        {clasificacion}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Campo de observaciones */}
                <div className="mb-4">
                  <Label htmlFor="observaciones" className="block mb-2">
                    Observaciones
                  </Label>
                  <textarea
                    id="observaciones"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={4}
                    placeholder="Ingrese observaciones sobre el proveedor..."
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCalificarModalOpen(false)}>
              Cancelar
            </Button>
            {!enviarACalificar && (
              <Button
                className="bg-plp-dark hover:bg-plp-medium"
                onClick={handleGuardarCalificacion}
                disabled={Object.keys(erroresValidacion).length > 0}
              >
                Guardar calificación
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

import Link from "next/link"
