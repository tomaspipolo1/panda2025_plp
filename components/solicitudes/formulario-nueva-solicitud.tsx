"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  ArrowLeft,
  Upload,
  Trash2,
  FileText,
  FileSpreadsheet,
  Plus,
  Calendar,
  ChevronUp,
  ChevronDown,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { format, parse, addMonths, subMonths, isValid } from "date-fns"
import { es } from "date-fns/locale"

interface ArchivoAdjunto {
  id: string
  nombre: string
  tipo: string
  tamano: string
  categoria?: string // Propiedad para categorizar los archivos
}

interface Persona {
  id: string
  nombre: string
  apellido: string
  dni: string
  cargo: string
}

interface Vehiculo {
  id: string
  tipo: string
  patente: string
  modelo: string
  seguroId?: string // Referencia al archivo de seguro
}

// Datos de ejemplo para expedientes y órdenes de compra
const expedientesData = [
  { id: "EXP-2025-123456", ordenCompra: "OC-2023-0458" },
  { id: "EXP-2025-789012", ordenCompra: "OC-2023-0457" },
  { id: "EXP-2025-345678", ordenCompra: "OC-2023-0456" },
]

// Tipos de vehículos
const tiposVehiculo = ["Automóvil", "Camioneta", "Camión", "Utilitario", "Maquinaria", "Otro"]

// Componente de calendario personalizado
function CustomCalendar({
  selectedDate,
  onSelectDate,
  minDate,
  onClose,
}: {
  selectedDate?: Date
  onSelectDate: (date: Date) => void
  minDate?: Date
  onClose: () => void
}) {
  const [currentMonth, setCurrentMonth] = useState<Date>(selectedDate || new Date())

  const daysOfWeek = ["LU", "MA", "MI", "JU", "VI", "SA", "DO"]

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const handleSelectDate = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    if (minDate && newDate < minDate) return
    onSelectDate(newDate)
  }

  const handleClear = () => {
    onSelectDate(new Date(0)) // Fecha inválida para indicar borrado
    onClose()
  }

  const handleToday = () => {
    const today = new Date()
    setCurrentMonth(today)
    onSelectDate(today)
    onClose()
  }

  // Generar días del mes actual
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    // Obtener el día de la semana (0 = domingo, 1 = lunes, ..., 6 = sábado)
    const firstDay = new Date(year, month, 1).getDay()
    // Convertir a formato donde lunes es el primer día (0 = lunes, ..., 6 = domingo)
    return firstDay === 0 ? 6 : firstDay - 1
  }

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  // Días del mes anterior para completar la primera semana
  const daysInPrevMonth = getDaysInMonth(year, month - 1)
  const prevMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => daysInPrevMonth - firstDayOfMonth + i + 1)

  // Días del mes actual
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Días del mes siguiente para completar la última semana
  const nextMonthDays = Array.from({ length: 42 - (firstDayOfMonth + daysInMonth) }, (_, i) => i + 1)

  // Verificar si un día está seleccionado
  const isSelectedDay = (day: number) => {
    if (!selectedDate) return false
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    )
  }

  // Verificar si un día está deshabilitado
  const isDisabledDay = (day: number, isCurrentMonth: boolean) => {
    if (!minDate || !isCurrentMonth) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return date < minDate
  }

  return (
    <div className="bg-white border rounded-md shadow-md w-[250px]">
      <div className="flex justify-between items-center p-2 border-b">
        <div className="font-medium">{format(currentMonth, "MMMM 'de' yyyy", { locale: es })}</div>
        <div className="flex space-x-1">
          <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded" aria-label="Mes anterior">
            <ChevronUp className="h-4 w-4" />
          </button>
          <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded" aria-label="Mes siguiente">
            <ChevronDown className="h-4 w-4" />
          </button>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded ml-1" aria-label="Cerrar">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-2">
        <div className="grid grid-cols-7 gap-1 mb-1">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {/* Días del mes anterior */}
          {prevMonthDays.map((day) => (
            <button
              key={`prev-${day}`}
              className="h-7 w-7 text-center text-xs text-gray-400 hover:bg-gray-100 rounded-sm"
              onClick={() => {
                const prevMonth = new Date(year, month - 1, day)
                setCurrentMonth(prevMonth)
                handleSelectDate(day)
              }}
              disabled={isDisabledDay(day, false)}
            >
              {day}
            </button>
          ))}

          {/* Días del mes actual */}
          {currentMonthDays.map((day) => (
            <button
              key={`current-${day}`}
              className={`h-7 w-7 text-center text-xs rounded-sm ${
                isSelectedDay(day) ? "bg-blue-500 text-white" : "hover:bg-gray-100 text-gray-900"
              } ${isDisabledDay(day, true) ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => handleSelectDate(day)}
              disabled={isDisabledDay(day, true)}
            >
              {day}
            </button>
          ))}

          {/* Días del mes siguiente */}
          {nextMonthDays.map((day) => (
            <button
              key={`next-${day}`}
              className="h-7 w-7 text-center text-xs text-gray-400 hover:bg-gray-100 rounded-sm"
              onClick={() => {
                const nextMonth = new Date(year, month + 1, day)
                setCurrentMonth(nextMonth)
                handleSelectDate(day)
              }}
              disabled={isDisabledDay(day, false)}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between p-2 border-t text-xs">
        <button onClick={handleClear} className="text-blue-500 hover:text-blue-700">
          Borrar
        </button>
        <button onClick={handleToday} className="text-blue-500 hover:text-blue-700">
          Hoy
        </button>
      </div>
    </div>
  )
}

export function FormularioNuevaSolicitud() {
  const [tipoSolicitud, setTipoSolicitud] = useState<string>("")
  const [expediente, setExpediente] = useState<string>("")
  const [ordenCompra, setOrdenCompra] = useState<string>("")
  const [asunto, setAsunto] = useState<string>("")
  const [descripcion, setDescripcion] = useState<string>("")
  const [archivosAdjuntos, setArchivosAdjuntos] = useState<ArchivoAdjunto[]>([])

  // Campos para Acceso a Obra
  const [fechaInicio, setFechaInicio] = useState<Date | undefined>(undefined)
  const [fechaFin, setFechaFin] = useState<Date | undefined>(undefined)
  const [fechaInicioStr, setFechaInicioStr] = useState<string>("")
  const [fechaFinStr, setFechaFinStr] = useState<string>("")
  const [showCalendarInicio, setShowCalendarInicio] = useState(false)
  const [showCalendarFin, setShowCalendarFin] = useState(false)
  const [personal, setPersonal] = useState<Persona[]>([])
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([])

  // Campos para nuevo personal
  const [nuevoNombre, setNuevoNombre] = useState("")
  const [nuevoApellido, setNuevoApellido] = useState("")
  const [nuevoDNI, setNuevoDNI] = useState("")
  const [nuevoCargo, setNuevoCargo] = useState("")

  // Campos para nuevo vehículo
  const [nuevoTipo, setNuevoTipo] = useState("")
  const [nuevaPatente, setNuevaPatente] = useState("")
  const [nuevoModelo, setNuevoModelo] = useState("")
  const [mostrarFormVehiculo, setMostrarFormVehiculo] = useState(false)
  const [mostrarFormPersonal, setMostrarFormPersonal] = useState(false)

  // Campos específicos para "Cambio de datos"
  const [origenDato, setOrigenDato] = useState<string>("")
  const [tipoDato, setTipoDato] = useState<string>("")

  // Referencias para los inputs de archivo
  const fileInputRef = useRef<HTMLInputElement>(null)
  const notaInputRef = useRef<HTMLInputElement>(null)
  const otrosArchivosInputRef = useRef<HTMLInputElement>(null)
  const segurosInputRef = useRef<HTMLInputElement>(null)
  const artInputRef = useRef<HTMLInputElement>(null)
  const seguroVehiculoInputRef = useRef<HTMLInputElement>(null)

  // Referencias para los calendarios
  const calendarInicioRef = useRef<HTMLDivElement>(null)
  const calendarFinRef = useRef<HTMLDivElement>(null)

  // Cerrar calendarios al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarInicioRef.current && !calendarInicioRef.current.contains(event.target as Node)) {
        setShowCalendarInicio(false)
      }
      if (calendarFinRef.current && !calendarFinRef.current.contains(event.target as Node)) {
        setShowCalendarFin(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Autocompletar orden de compra cuando se selecciona un expediente
  useEffect(() => {
    if (expediente) {
      const expedienteEncontrado = expedientesData.find((exp) => exp.id === expediente)
      if (expedienteEncontrado) {
        setOrdenCompra(expedienteEncontrado.ordenCompra)
      }
    }
  }, [expediente])

  // Actualizar strings de fecha cuando cambian las fechas
  useEffect(() => {
    if (fechaInicio && isValid(fechaInicio)) {
      setFechaInicioStr(format(fechaInicio, "dd/MM/yyyy"))
    }
  }, [fechaInicio])

  useEffect(() => {
    if (fechaFin && isValid(fechaFin)) {
      setFechaFinStr(format(fechaFin, "dd/MM/yyyy"))
    }
  }, [fechaFin])

  // Actualizar fechas cuando cambian los strings (input manual)
  const handleFechaInicioStrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFechaInicioStr(value)

    try {
      if (value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        const parsedDate = parse(value, "dd/MM/yyyy", new Date())
        if (isValid(parsedDate)) {
          setFechaInicio(parsedDate)
        }
      }
    } catch (error) {
      // Si hay error de parseo, no actualizamos la fecha
    }
  }

  const handleFechaFinStrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFechaFinStr(value)

    try {
      if (value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        const parsedDate = parse(value, "dd/MM/yyyy", new Date())
        if (isValid(parsedDate)) {
          setFechaFin(parsedDate)
        }
      }
    } catch (error) {
      // Si hay error de parseo, no actualizamos la fecha
    }
  }

  const handleSelectFechaInicio = (date: Date) => {
    if (date.getTime() === 0) {
      // Fecha inválida indica borrado
      setFechaInicio(undefined)
      setFechaInicioStr("")
    } else {
      setFechaInicio(date)
      setFechaInicioStr(format(date, "dd/MM/yyyy"))
    }
  }

  const handleSelectFechaFin = (date: Date) => {
    if (date.getTime() === 0) {
      // Fecha inválida indica borrado
      setFechaFin(undefined)
      setFechaFinStr("")
    } else {
      setFechaFin(date)
      setFechaFinStr(format(date, "dd/MM/yyyy"))
    }
  }

  const handleAdjuntarArchivo = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleAdjuntarNota = () => {
    if (notaInputRef.current) {
      notaInputRef.current.click()
    }
  }

  const handleAdjuntarOtrosArchivos = () => {
    if (otrosArchivosInputRef.current) {
      otrosArchivosInputRef.current.click()
    }
  }

  const handleAdjuntarSeguros = () => {
    if (segurosInputRef.current) {
      segurosInputRef.current.click()
    }
  }

  const handleAdjuntarART = () => {
    if (artInputRef.current) {
      artInputRef.current.click()
    }
  }

  const handleAdjuntarSeguroVehiculo = () => {
    if (seguroVehiculoInputRef.current) {
      seguroVehiculoInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, categoria?: string) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        nombre: file.name,
        tipo: file.type,
        tamano: formatFileSize(file.size),
        categoria: categoria,
      }))
      setArchivosAdjuntos([...archivosAdjuntos, ...newFiles])
    }
    // Reset input value to allow selecting the same file again
    if (e.target.value) {
      e.target.value = ""
    }
  }

  const handleRemoveFile = (id: string) => {
    setArchivosAdjuntos(archivosAdjuntos.filter((archivo) => archivo.id !== id))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleAgregarPersona = () => {
    if (nuevoNombre && nuevoApellido && nuevoDNI) {
      const nuevaPersona: Persona = {
        id: Math.random().toString(36).substring(2, 9),
        nombre: nuevoNombre,
        apellido: nuevoApellido,
        dni: nuevoDNI,
        cargo: nuevoCargo,
      }
      setPersonal([...personal, nuevaPersona])
      // Limpiar campos
      setNuevoNombre("")
      setNuevoApellido("")
      setNuevoDNI("")
      setNuevoCargo("")
      setMostrarFormPersonal(false)
    }
  }

  const handleRemovePersona = (id: string) => {
    setPersonal(personal.filter((persona) => persona.id !== id))
  }

  const handleAgregarVehiculo = () => {
    if (nuevoTipo && nuevaPatente && nuevoModelo) {
      const nuevoVehiculo: Vehiculo = {
        id: Math.random().toString(36).substring(2, 9),
        tipo: nuevoTipo,
        patente: nuevaPatente,
        modelo: nuevoModelo,
      }
      setVehiculos([...vehiculos, nuevoVehiculo])
      // Limpiar campos
      setNuevoTipo("")
      setNuevaPatente("")
      setNuevoModelo("")
      setMostrarFormVehiculo(false)
    }
  }

  const handleRemoveVehiculo = (id: string) => {
    setVehiculos(vehiculos.filter((vehiculo) => vehiculo.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log({
      tipoSolicitud,
      expediente,
      ordenCompra,
      asunto,
      descripcion,
      origenDato,
      tipoDato,
      archivosAdjuntos,
      // Campos de Acceso a Obra
      fechaInicio,
      fechaFin,
      personal,
      vehiculos,
    })
    alert("Solicitud enviada correctamente")
  }

  // Determinar qué campos mostrar según el tipo de solicitud
  const mostrarExpediente = tipoSolicitud === "redeterminacion" || tipoSolicitud === "acceso_obra"
  const mostrarOrdenCompra = tipoSolicitud === "redeterminacion" || tipoSolicitud === "acceso_obra"
  const mostrarCamposCambioDatos = tipoSolicitud === "cambio_datos"
  const mostrarCamposSimples = tipoSolicitud === "reclamo" || tipoSolicitud === "consulta"
  const mostrarCamposRedeterminacion = tipoSolicitud === "redeterminacion"
  const mostrarCamposAccesoObra = tipoSolicitud === "acceso_obra"

  // Filtrar archivos por categoría para mostrarlos en secciones separadas
  const archivosGenerales = archivosAdjuntos.filter((archivo) => !archivo.categoria || archivo.categoria === "general")
  const archivosNota = archivosAdjuntos.filter((archivo) => archivo.categoria === "nota")
  const archivosOtros = archivosAdjuntos.filter((archivo) => archivo.categoria === "otros")
  const archivosSeguros = archivosAdjuntos.filter((archivo) => archivo.categoria === "seguros")
  const archivosART = archivosAdjuntos.filter((archivo) => archivo.categoria === "art")

  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Link href="/proveedor/gestion/solicitudes/mis-solicitudes" className="flex items-center text-plp-dark mr-4">
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Volver</span>
        </Link>
        <h1 className="text-2xl font-bold text-plp-darkest">Nueva Solicitud</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-4">Formulario de Solicitud</h2>
          <p className="text-gray-600 mb-6">Complete los datos para generar una nueva solicitud</p>

          <div className="space-y-6">
            {/* Tipo de Solicitud */}
            <div>
              <label htmlFor="tipoSolicitud" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Solicitud
              </label>
              <Select value={tipoSolicitud} onValueChange={setTipoSolicitud}>
                <SelectTrigger id="tipoSolicitud" className="w-full">
                  <SelectValue placeholder="Seleccionar tipo de solicitud" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="redeterminacion">Redeterminación</SelectItem>
                  <SelectItem value="cambio_datos">Cambio de datos</SelectItem>
                  <SelectItem value="reclamo">Reclamo</SelectItem>
                  <SelectItem value="consulta">Consulta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Campos específicos para Acceso a Obra */}
            {mostrarCamposAccesoObra && (
              <>
                {/* Fechas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio</label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="dd/mm/aaaa"
                        value={fechaInicioStr}
                        onChange={handleFechaInicioStrChange}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-0 top-0 h-full px-3 py-2"
                        onClick={() => setShowCalendarInicio(!showCalendarInicio)}
                      >
                        <Calendar className="h-4 w-4" />
                      </button>

                      {showCalendarInicio && (
                        <div ref={calendarInicioRef} className="absolute z-10 mt-1" style={{ left: "0" }}>
                          <CustomCalendar
                            selectedDate={fechaInicio}
                            onSelectDate={handleSelectFechaInicio}
                            onClose={() => setShowCalendarInicio(false)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Fin</label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="dd/mm/aaaa"
                        value={fechaFinStr}
                        onChange={handleFechaFinStrChange}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-0 top-0 h-full px-3 py-2"
                        onClick={() => setShowCalendarFin(!showCalendarFin)}
                      >
                        <Calendar className="h-4 w-4" />
                      </button>

                      {showCalendarFin && (
                        <div ref={calendarFinRef} className="absolute z-10 mt-1" style={{ left: "0" }}>
                          <CustomCalendar
                            selectedDate={fechaFin}
                            onSelectDate={handleSelectFechaFin}
                            minDate={fechaInicio}
                            onClose={() => setShowCalendarFin(false)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Campos específicos para Redeterminación y Acceso a Obra */}
            {mostrarExpediente && (
              <div>
                <label htmlFor="expediente" className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Expediente
                </label>
                <Select value={expediente} onValueChange={setExpediente}>
                  <SelectTrigger id="expediente" className="w-full">
                    <SelectValue placeholder="Seleccionar número de expediente" />
                  </SelectTrigger>
                  <SelectContent>
                    {expedientesData.map((exp) => (
                      <SelectItem key={exp.id} value={exp.id}>
                        {exp.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {mostrarOrdenCompra && (
              <div>
                <label htmlFor="ordenCompra" className="block text-sm font-medium text-gray-700 mb-1">
                  Orden de Compra
                </label>
                <Input id="ordenCompra" value={ordenCompra} readOnly className="w-full bg-gray-50" />
              </div>
            )}

            {/* Campos específicos para Cambio de datos */}
            {mostrarCamposCambioDatos && (
              <>
                <div>
                  <label htmlFor="origenDato" className="block text-sm font-medium text-gray-700 mb-1">
                    De
                  </label>
                  <Select value={origenDato} onValueChange={setOrigenDato}>
                    <SelectTrigger id="origenDato" className="w-full">
                      <SelectValue placeholder="Seleccionar origen del dato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usuario">Usuario</SelectItem>
                      <SelectItem value="entidad">Entidad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="tipoDato" className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de dato
                  </label>
                  <Input
                    id="tipoDato"
                    value={tipoDato}
                    onChange={(e) => setTipoDato(e.target.value)}
                    className="w-full"
                    placeholder="Ingrese el tipo de dato a modificar"
                  />
                </div>
              </>
            )}

            {/* Asunto (antes Motivo) */}
            <div>
              <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1">
                Asunto
              </label>
              <Input
                id="asunto"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                className="w-full"
                placeholder="Ingrese el asunto de la solicitud"
              />
            </div>

            {/* Descripción */}
            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <Textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Describa detalladamente el motivo de su solicitud..."
                rows={6}
              />
            </div>

            {/* Sección de Personal para Acceso a Obra */}
            {mostrarCamposAccesoObra && (
              <div className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Personal</h3>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setMostrarFormPersonal(true)}
                    className="flex items-center"
                    disabled={mostrarFormPersonal}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Personal
                  </Button>
                </div>

                {/* Formulario para agregar personal */}
                {mostrarFormPersonal && (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="font-medium mb-3">Nuevo Personal</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <Input
                          value={nuevoNombre}
                          onChange={(e) => setNuevoNombre(e.target.value)}
                          placeholder="Ingrese nombre"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                        <Input
                          value={nuevoApellido}
                          onChange={(e) => setNuevoApellido(e.target.value)}
                          placeholder="Ingrese apellido"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
                        <Input
                          value={nuevoDNI}
                          onChange={(e) => setNuevoDNI(e.target.value)}
                          placeholder="Ingrese DNI"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                        <Input
                          value={nuevoCargo}
                          onChange={(e) => setNuevoCargo(e.target.value)}
                          placeholder="Ingrese cargo"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setMostrarFormPersonal(false)}>
                        Cancelar
                      </Button>
                      <Button
                        type="button"
                        onClick={handleAgregarPersona}
                        disabled={!nuevoNombre || !nuevoApellido || !nuevoDNI}
                      >
                        Agregar
                      </Button>
                    </div>
                  </div>
                )}

                {/* Tabla de personal */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Nombre</th>
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Apellido</th>
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">DNI</th>
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Cargo</th>
                        <th className="py-3 px-4 text-center text-gray-600 font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {personal.length > 0 ? (
                        personal.map((persona) => (
                          <tr key={persona.id} className="border-b border-gray-200">
                            <td className="py-4 px-4">{persona.nombre}</td>
                            <td className="py-4 px-4">{persona.apellido}</td>
                            <td className="py-4 px-4">{persona.dni}</td>
                            <td className="py-4 px-4">{persona.cargo}</td>
                            <td className="py-4 px-4 text-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemovePersona(persona.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-4 px-4 text-center text-gray-500 italic">
                            No hay personal registrado
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sección de Vehículos para Acceso a Obra */}
            {mostrarCamposAccesoObra && (
              <div className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Vehículos</h3>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setMostrarFormVehiculo(true)}
                    className="flex items-center"
                    disabled={mostrarFormVehiculo}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Vehículo
                  </Button>
                </div>

                {/* Formulario para agregar vehículo */}
                {mostrarFormVehiculo && (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="font-medium mb-3">Nuevo Vehículo</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                        <Select value={nuevoTipo} onValueChange={setNuevoTipo}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccionar tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            {tiposVehiculo.map((tipo) => (
                              <SelectItem key={tipo} value={tipo}>
                                {tipo}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Patente</label>
                        <Input
                          value={nuevaPatente}
                          onChange={(e) => setNuevaPatente(e.target.value)}
                          placeholder="Ingrese patente"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
                        <Input
                          value={nuevoModelo}
                          onChange={(e) => setNuevoModelo(e.target.value)}
                          placeholder="Ingrese modelo"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Seguro (PDF)</label>
                      <div className="flex items-center">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleAdjuntarSeguroVehiculo}
                          className="flex items-center"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Adjuntar Seguro
                        </Button>
                        <input
                          type="file"
                          ref={seguroVehiculoInputRef}
                          onChange={(e) => handleFileChange(e, "seguro_vehiculo")}
                          className="hidden"
                          accept=".pdf"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setMostrarFormVehiculo(false)}>
                        Cancelar
                      </Button>
                      <Button
                        type="button"
                        onClick={handleAgregarVehiculo}
                        disabled={!nuevoTipo || !nuevaPatente || !nuevoModelo}
                      >
                        Agregar
                      </Button>
                    </div>
                  </div>
                )}

                {/* Tabla de vehículos */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Tipo</th>
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Patente</th>
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Modelo</th>
                        <th className="py-3 px-4 text-center text-gray-600 font-medium">Seguro</th>
                        <th className="py-3 px-4 text-center text-gray-600 font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehiculos.length > 0 ? (
                        vehiculos.map((vehiculo) => (
                          <tr key={vehiculo.id} className="border-b border-gray-200">
                            <td className="py-4 px-4">{vehiculo.tipo}</td>
                            <td className="py-4 px-4">{vehiculo.patente}</td>
                            <td className="py-4 px-4">{vehiculo.modelo}</td>
                            <td className="py-4 px-4 text-center">
                              {vehiculo.seguroId ? (
                                <span className="text-green-500">✓</span>
                              ) : (
                                <span className="text-red-500">✗</span>
                              )}
                            </td>
                            <td className="py-4 px-4 text-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveVehiculo(vehiculo.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-4 px-4 text-center text-gray-500 italic">
                            No hay vehículos registrados
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Documentación Adjunta */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Documentación Adjunta</h2>
            <Button type="button" variant="outline" onClick={handleAdjuntarArchivo} className="flex items-center">
              <Upload className="mr-2 h-4 w-4" />
              Adjuntar Archivo
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFileChange(e, "general")}
              className="hidden"
              multiple
            />
          </div>

          {/* Campos adicionales para Redeterminación */}
          {mostrarCamposRedeterminacion && (
            <div className="mb-6 space-y-6 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold">Documentación específica para Redeterminación</h3>

              {/* Nota */}
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Nota</h4>
                  <p className="text-sm text-gray-500">Adjunte la nota de redeterminación</p>
                </div>
                <Button type="button" variant="outline" onClick={handleAdjuntarNota} className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Adjuntar Nota
                </Button>
                <input
                  type="file"
                  ref={notaInputRef}
                  onChange={(e) => handleFileChange(e, "nota")}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />
              </div>

              {/* Tabla de archivos de nota */}
              {archivosNota.length > 0 && (
                <div className="overflow-x-auto mt-2">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Nombre del Archivo</th>
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Tipo</th>
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Tamaño</th>
                        <th className="py-3 px-4 text-center text-gray-600 font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {archivosNota.map((archivo) => (
                        <tr key={archivo.id} className="border-b border-gray-200">
                          <td className="py-4 px-4">{archivo.nombre}</td>
                          <td className="py-4 px-4">{archivo.tipo}</td>
                          <td className="py-4 px-4">{archivo.tamano}</td>
                          <td className="py-4 px-4 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveFile(archivo.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Otros archivos */}
              <div className="flex justify-between items-center mt-4">
                <div>
                  <h4 className="font-medium">Otros archivos</h4>
                  <p className="text-sm text-gray-500">Adjunte planillas de cálculo, documentación adicional, etc.</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAdjuntarOtrosArchivos}
                  className="flex items-center"
                >
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Adjuntar Otros
                </Button>
                <input
                  type="file"
                  ref={otrosArchivosInputRef}
                  onChange={(e) => handleFileChange(e, "otros")}
                  className="hidden"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
                />
              </div>

              {/* Tabla de otros archivos */}
              {archivosOtros.length > 0 && (
                <div className="overflow-x-auto mt-2">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Nombre del Archivo</th>
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Tipo</th>
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Tamaño</th>
                        <th className="py-3 px-4 text-center text-gray-600 font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {archivosOtros.map((archivo) => (
                        <tr key={archivo.id} className="border-b border-gray-200">
                          <td className="py-4 px-4">{archivo.nombre}</td>
                          <td className="py-4 px-4">{archivo.tipo}</td>
                          <td className="py-4 px-4">{archivo.tamano}</td>
                          <td className="py-4 px-4 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveFile(archivo.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Campos adicionales para Acceso a Obra */}
          {mostrarCamposAccesoObra && (
            <div className="mb-6 space-y-6 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold">Documentación específica para Acceso a Obra</h3>

              {/* Seguros */}
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Seguros</h4>
                  <p className="text-sm text-gray-500">Adjunte los seguros requeridos</p>
                </div>
                <Button type="button" variant="outline" onClick={handleAdjuntarSeguros} className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Adjuntar Seguros
                </Button>
                <input
                  type="file"
                  ref={segurosInputRef}
                  onChange={(e) => handleFileChange(e, "seguros")}
                  className="hidden"
                  multiple
                  accept=".pdf"
                />
              </div>

              {/* Tabla de archivos de seguros */}
              {archivosSeguros.length > 0 && (
                <div className="overflow-x-auto mt-2">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Nombre del Archivo</th>
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Tipo</th>
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Tamaño</th>
                        <th className="py-3 px-4 text-center text-gray-600 font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {archivosSeguros.map((archivo) => (
                        <tr key={archivo.id} className="border-b border-gray-200">
                          <td className="py-4 px-4">{archivo.nombre}</td>
                          <td className="py-4 px-4">{archivo.tipo}</td>
                          <td className="py-4 px-4">{archivo.tamano}</td>
                          <td className="py-4 px-4 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveFile(archivo.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* ART */}
              <div className="flex justify-between items-center mt-4">
                <div>
                  <h4 className="font-medium">ART</h4>
                  <p className="text-sm text-gray-500">Adjunte la documentación de ART</p>
                </div>
                <Button type="button" variant="outline" onClick={handleAdjuntarART} className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Adjuntar ART
                </Button>
                <input
                  type="file"
                  ref={artInputRef}
                  onChange={(e) => handleFileChange(e, "art")}
                  className="hidden"
                  multiple
                  accept=".pdf"
                />
              </div>

              {/* Tabla de archivos de ART */}
              {archivosART.length > 0 && (
                <div className="overflow-x-auto mt-2">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Nombre del Archivo</th>
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Tipo</th>
                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Tamaño</th>
                        <th className="py-3 px-4 text-center text-gray-600 font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {archivosART.map((archivo) => (
                        <tr key={archivo.id} className="border-b border-gray-200">
                          <td className="py-4 px-4">{archivo.nombre}</td>
                          <td className="py-4 px-4">{archivo.tipo}</td>
                          <td className="py-4 px-4">{archivo.tamano}</td>
                          <td className="py-4 px-4 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveFile(archivo.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">Nombre del Archivo</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">Tipo</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">Tamaño</th>
                  <th className="py-3 px-4 text-center text-gray-600 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {archivosGenerales.length > 0 ? (
                  archivosGenerales.map((archivo) => (
                    <tr key={archivo.id} className="border-b border-gray-200">
                      <td className="py-4 px-4">{archivo.nombre}</td>
                      <td className="py-4 px-4">{archivo.tipo}</td>
                      <td className="py-4 px-4">{archivo.tamano}</td>
                      <td className="py-4 px-4 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFile(archivo.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 px-4 text-center text-gray-500 italic">
                      No hay archivos adjuntos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button" asChild>
            <Link href="/proveedor/gestion/solicitudes/mis-solicitudes">Cancelar</Link>
          </Button>
          <Button type="submit" className="bg-black hover:bg-gray-800">
            Enviar Solicitud
          </Button>
        </div>
      </form>
    </div>
  )
}
