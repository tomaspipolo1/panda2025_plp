"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  ArrowLeft,
  Calendar,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Upload,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, addMonths, subMonths } from "date-fns"
import { es } from "date-fns/locale"
import { Dialog, DialogContent } from "@/components/ui/dialog"

// Añadir este estilo global después de las importaciones:
const scrollbarHideStyle = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`

interface Persona {
  id: string
  nombre: string
  documento: string
  empresa: string
  telefono?: string
  licenciaConducir?: File | null
  numeroLicencia?: string
  categorias?: string[]
  fechaVencimientoLicencia?: Date | undefined
}

interface Vehiculo {
  id: string
  tipo: string
  patente: string
  marca?: string
  modelo?: string
  seguro?: File | null
  cedulaVerde?: File | null
  titular?: string
  conductorNoTitular?: boolean
  cedulaAzul?: File | null
  certificadoSeguridad?: File | null
  fechaVencimientoSeguro?: Date | undefined
}

// Datos de ejemplo para vehículos cargados
const vehiculosCargadosData = [
  {
    id: 1,
    tipo: "Auto",
    patente: "AB123CD",
    marca: "Toyota",
    modelo: "Corolla",
    seguro: "seguro_auto_1.pdf",
    fechaVencimientoSeguro: "2025-05-15",
  },
  {
    id: 2,
    tipo: "Camioneta",
    patente: "XY456ZW",
    marca: "Ford",
    modelo: "Ranger",
    seguro: "seguro_camioneta_1.pdf",
    fechaVencimientoSeguro: "2025-06-20",
  },
  {
    id: 3,
    tipo: "Camion",
    patente: "CD789EF",
    marca: "Mercedes-Benz",
    modelo: "Actros",
    seguro: "seguro_camion_1.pdf",
    fechaVencimientoSeguro: "2025-07-10",
  },
]

// Datos de ejemplo para conductores cargados
const conductoresCargadosData = [
  {
    id: 1,
    nombre: "Carlos Rodríguez",
    dni: "28456789",
    telefono: "1155667788",
    numeroLicencia: "A-12345678",
    licencia: "licencia_carlos.pdf",
    fechaVencimientoLicencia: "2025-05-15",
    categorias: ["B", "C"],
  },
  {
    id: 2,
    nombre: "María González",
    dni: "30987654",
    telefono: "1145678901",
    numeroLicencia: "B-87654321",
    licencia: "licencia_maria.pdf",
    fechaVencimientoLicencia: "2025-06-20",
    categorias: ["A", "B"],
  },
  {
    id: 3,
    nombre: "Juan Pérez",
    dni: "25678901",
    telefono: "1167890123",
    numeroLicencia: "C-23456789",
    licencia: "licencia_juan.pdf",
    fechaVencimientoLicencia: "2025-07-10",
    categorias: ["D", "E"],
  },
]

// Componente de calendario personalizado
const CustomCalendar = ({
  selectedDate,
  onSelectDate,
}: {
  selectedDate?: Date
  onSelectDate: (date: Date) => void
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Obtener el primer día del mes actual
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)

  // Obtener el día de la semana del primer día (0 = domingo, 1 = lunes, etc.)
  const firstDayOfWeek = firstDayOfMonth.getDay()

  // Obtener el número de días en el mes actual
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()

  // Crear un array con los días del mes
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Función para ir al mes anterior
  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  // Función para ir al mes siguiente
  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  // Obtener el nombre del mes y el año
  const monthName = format(currentMonth, "MMMM yyyy", { locale: es })

  // Capitalizar la primera letra del mes
  const capitalizedMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1)

  // Días de la semana
  const weekDays = ["D", "L", "M", "M", "J", "V", "S"]

  // Verificar si un día es el seleccionado
  const isSelectedDay = (day: number) => {
    if (!selectedDate) return false

    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    )
  }

  // Verificar si un día es hoy
  const isToday = (day: number) => {
    const today = new Date()
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear()
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-[320px]">
      <div className="flex justify-between items-center mb-4">
        <button type="button" onClick={goToPreviousMonth} className="text-gray-600 hover:text-gray-900">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="text-center font-medium">{capitalizedMonthName}</div>
        <button type="button" onClick={goToNextMonth} className="text-gray-600 hover:text-gray-900">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {/* Días de la semana */}
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="text-center text-sm font-medium text-gray-500 h-8 flex items-center justify-center"
          >
            {day}
          </div>
        ))}

        {/* Espacios vacíos antes del primer día */}
        {Array.from({ length: firstDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} className="h-8"></div>
        ))}

        {/* Días del mes */}
        {days.map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => onSelectDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
            className={`h-9 w-9 rounded-full flex items-center justify-center text-sm ${
              isSelectedDay(day)
                ? "bg-blue-600 text-white"
                : isToday(day)
                  ? "text-blue-600 font-bold"
                  : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  )
}

// Componente de selector de hora personalizado
const TimeSelector = ({
  value,
  onChange,
  onClose,
}: {
  value: string
  onChange: (value: string) => void
  onClose: () => void
}) => {
  // Separar la hora actual en horas y minutos
  const [currentHour, currentMinute] = value ? value.split(":").map(Number) : [12, 0]

  // Estado para las horas y minutos visibles en el selector
  const [hourIndex, setHourIndex] = useState(currentHour || 12)
  const [minuteIndex, setMinuteIndex] = useState(currentMinute || 0)

  // Generar todas las horas (0-23)
  const hours = Array.from({ length: 24 }, (_, i) => i)

  // Generar todos los minutos (0-59)
  const minutes = Array.from({ length: 60 }, (_, i) => i)

  // Obtener las horas visibles (7 elementos centrados en el seleccionado)
  const getVisibleHours = () => {
    const startIdx = Math.max(0, hourIndex - 3)
    const endIdx = Math.min(hours.length - 1, startIdx + 6)
    return hours.slice(startIdx, endIdx + 1)
  }

  // Obtener los minutos visibles (7 elementos centrados en el seleccionado)
  const getVisibleMinutes = () => {
    const startIdx = Math.max(0, minuteIndex - 3)
    const endIdx = Math.min(minutes.length - 1, startIdx + 6)
    return minutes.slice(startIdx, endIdx + 1)
  }

  // Manejar scroll de horas hacia arriba
  const scrollHoursUp = () => {
    setHourIndex(Math.max(0, hourIndex - 1))
  }

  // Manejar scroll de horas hacia abajo
  const scrollHoursDown = () => {
    setHourIndex(Math.min(hours.length - 1, hourIndex + 1))
  }

  // Manejar scroll de minutos hacia arriba
  const scrollMinutesUp = () => {
    setMinuteIndex(Math.max(0, minuteIndex - 1))
  }

  // Manejar scroll de minutos hacia abajo
  const scrollMinutesDown = () => {
    setMinuteIndex(Math.min(minutes.length - 1, minuteIndex + 1))
  }

  // Seleccionar hora y minuto
  const handleSelect = (hour: number, minute: number) => {
    const formattedHour = hour.toString().padStart(2, "0")
    const formattedMinute = minute.toString().padStart(2, "0")
    onChange(`${formattedHour}:${formattedMinute}`)
    onClose()
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 w-[140px] overflow-hidden">
      {/* Botones de scroll superior */}
      <div className="grid grid-cols-2 border-b border-gray-200">
        <button
          type="button"
          onClick={scrollHoursUp}
          className="flex items-center justify-center py-1 hover:bg-gray-100"
        >
          <ChevronUp className="h-4 w-4 text-gray-500" />
        </button>
        <button
          type="button"
          onClick={scrollMinutesUp}
          className="flex items-center justify-center py-1 hover:bg-gray-100 border-l border-gray-200"
        >
          <ChevronUp className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      {/* Columnas de horas y minutos */}
      <div className="grid grid-cols-2">
        {/* Columna de horas */}
        <div
          className="border-r border-gray-200 overflow-y-auto scrollbar-hide"
          style={{ maxHeight: "200px", scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {getVisibleHours().map((hour) => (
            <button
              key={`hour-${hour}`}
              type="button"
              onClick={() => {
                setHourIndex(hour)
                handleSelect(hour, minuteIndex)
              }}
              className={`w-full py-2 text-center ${
                hourIndex === hour ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`}
            >
              {hour.toString().padStart(2, "0")}
            </button>
          ))}
        </div>

        {/* Columna de minutos */}
        <div
          className="overflow-y-auto scrollbar-hide"
          style={{ maxHeight: "200px", scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {getVisibleMinutes().map((minute) => (
            <button
              key={`minute-${minute}`}
              type="button"
              onClick={() => {
                setMinuteIndex(minute)
                handleSelect(hourIndex, minute)
              }}
              className={`w-full py-2 text-center ${
                minuteIndex === minute ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`}
            >
              {minute.toString().padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>

      {/* Botones de scroll inferior */}
      <div className="grid grid-cols-2 border-t border-gray-200">
        <button
          type="button"
          onClick={scrollHoursDown}
          className="flex items-center justify-center py-1 hover:bg-gray-100"
        >
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
        <button
          type="button"
          onClick={scrollMinutesDown}
          className="flex items-center justify-center py-1 hover:bg-gray-100 border-l border-gray-200"
        >
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
      </div>
    </div>
  )
}

function DatePickerModal({ date, setDate }: { date?: Date; setDate: (date: Date) => void }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className="w-full justify-start text-left font-normal"
        onClick={() => setIsOpen(true)}
      >
        <Calendar className="mr-2 h-4 w-4" />
        {date ? format(date, "PPP") : <span>Pick a date</span>}
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <CustomCalendar selectedDate={date} onSelectDate={setDate} />
          <Button onClick={() => setIsOpen(false)}>Cerrar</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Categorías de licencia disponibles
const categoriasLicencia = ["A", "B", "C", "D", "E", "F", "G"]

export default function NuevaVisitaPage() {
  // Estados para los campos del formulario
  const [tipoVisita, setTipoVisita] = useState<string>("Laboral")
  const [destino, setDestino] = useState<string>("")

  // Estado para tipo de carga (cuando se selecciona Transporte Cargas)
  const [tipoCarga, setTipoCarga] = useState<string>("")
  const [otroTipoCarga, setOtroTipoCarga] = useState<string>("")
  const [empresaTransporte, setEmpresaTransporte] = useState<string>("")

  // Estados para fecha y hora desde
  const [fechaDesde, setFechaDesde] = useState<Date | undefined>(undefined)
  const [horaDesde, setHoraDesde] = useState<string>("")
  const [showCalendarDesde, setShowCalendarDesde] = useState(false)
  const [showTimeDesde, setShowTimeDesde] = useState(false)

  // Estados para fecha y hora hasta
  const [fechaHasta, setFechaHasta] = useState<Date | undefined>(undefined)
  const [horaHasta, setHoraHasta] = useState<string>("")
  const [showCalendarHasta, setShowCalendarHasta] = useState(false)
  const [showTimeHasta, setShowTimeHasta] = useState(false)

  // Estado para el personal a visitar (solo para visitas laborales)
  const [personalVisita, setPersonalVisita] = useState<string>("")

  // Estados para conductor (para Transporte Cargas)
  const [nombreConductor, setNombreConductor] = useState<string>("")
  const [dniConductor, setDniConductor] = useState<string>("")
  const [telefonoConductor, setTelefonoConductor] = useState<string>("")
  const [numeroLicencia, setNumeroLicencia] = useState<string>("")
  const [licenciaConducir, setLicenciaConducir] = useState<File | null>(null)
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<string[]>([])

  // Estados para personas
  const [personas, setPersonas] = useState<Persona[]>([])
  const [nombrePersona, setNombrePersona] = useState<string>("")
  const [documentoPersona, setDocumentoPersona] = useState<string>("")
  const [empresaPersona, setEmpresaPersona] = useState<string>("")

  // Estados para vehículos
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([])
  const [tipoVehiculo, setTipoVehiculo] = useState<string>("")
  const [patenteVehiculo, setPatenteVehiculo] = useState<string>("")
  const [marcaVehiculo, setMarcaVehiculo] = useState<string>("")
  const [modeloVehiculo, setModeloVehiculo] = useState<string>("")
  const [titularVehiculo, setTitularVehiculo] = useState<string>("")
  const [seguroVehiculo, setSeguroVehiculo] = useState<File | null>(null)
  const [cedulaVerde, setCedulaVerde] = useState<File | null>(null)
  const [conductorNoTitular, setConductorNoTitular] = useState<boolean>(false)
  const [cedulaAzul, setCedulaAzul] = useState<File | null>(null)

  // Estados para vehículos y conductores cargados
  const [vehiculosCargados, setVehiculosCargados] = useState(vehiculosCargadosData)
  const [conductoresCargados, setConductoresCargados] = useState(conductoresCargadosData)
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState<string>("")
  const [conductorSeleccionado, setConductorSeleccionado] = useState<string>("")
  const [isNewVehiculoModalOpen, setIsNewVehiculoModalOpen] = useState(false)
  const [isNewConductorModalOpen, setIsNewConductorModalOpen] = useState(false)

  const [fechaVencimientoLicencia, setFechaVencimientoLicencia] = useState<Date | undefined>(undefined)
  const [fechaVencimientoSeguro, setFechaVencimientoSeguro] = useState<Date | undefined>(undefined)

  // Tipos de carga disponibles
  const tiposCarga = [
    "Materiales",
    "Equipamiento",
    "Herramientas",
    "Insumos",
    "Productos terminados",
    "Mercancía general",
    "Otro",
  ]

  const tiposVehiculo = ["Auto", "Camioneta", "Camión", "Utilitario", "Moto"]

  // Estado para observaciones
  const [observaciones, setObservaciones] = useState<string>("")

  // Estado para validación del formulario
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  // Referencias para cerrar los calendarios y selectores de hora al hacer clic fuera
  const calendarDesdeRef = useRef<HTMLDivElement>(null)
  const calendarHastaRef = useRef<HTMLDivElement>(null)
  const timeDesdeRef = useRef<HTMLDivElement>(null)
  const timeHastaRef = useRef<HTMLDivElement>(null)
  const licenciaCalendarRef = useRef<HTMLDivElement>(null)
  const seguroCalendarRef = useRef<HTMLDivElement>(null)

  const [showLicenciaCalendar, setShowLicenciaCalendar] = useState(false)
  const [showSeguroCalendar, setShowSeguroCalendar] = useState(false)

  // Cerrar calendarios y selectores de hora al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarDesdeRef.current && !calendarDesdeRef.current.contains(event.target as Node)) {
        setShowCalendarDesde(false)
      }
      if (calendarHastaRef.current && !calendarHastaRef.current.contains(event.target as Node)) {
        setShowCalendarHasta(false)
      }
      if (timeDesdeRef.current && !timeDesdeRef.current.contains(event.target as Node)) {
        setShowTimeDesde(false)
      }
      if (timeHastaRef.current && !timeHastaRef.current.contains(event.target as Node)) {
        setShowTimeHasta(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Validar el formulario
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validar tipo de visita
    if (!tipoVisita) {
      newErrors.tipoVisita = "El tipo de visita es obligatorio"
    }

    // Validar destino
    if (!destino) {
      newErrors.destino = "El destino es obligatorio"
    }

    // Validaciones específicas para Transporte Cargas
    if (tipoVisita === "Transporte Cargas") {
      // Validar tipo de carga
      if (!tipoCarga) {
        newErrors.tipoCarga = "El tipo de carga es obligatorio"
      }

      // Validar otro tipo de carga si se seleccionó "Otro"
      if (tipoCarga === "Otro" && !otroTipoCarga) {
        newErrors.otroTipoCarga = "Debe especificar el tipo de carga"
      }

      // Validar empresa de transporte
      if (!empresaTransporte) {
        newErrors.empresaTransporte = "La empresa de transporte es obligatoria"
      }

      // Validar que haya al menos un vehículo
      if (vehiculos.length === 0) {
        newErrors.vehiculos = "Debe agregar al menos un vehículo"
      }
    } else {
      // Validaciones para otros tipos de visita

      // Validar personal a visitar (solo para visitas laborales)
      if (tipoVisita === "Laboral" && !personalVisita) {
        newErrors.personalVisita = "El personal a visitar es obligatorio"
      }

      // Validar que haya al menos una persona
      if (personas.length === 0) {
        newErrors.personas = "Debe agregar al menos una persona"
      }
    }

    // Validar fecha y hora desde
    if (!fechaDesde) {
      newErrors.fechaDesde = "La fecha desde es obligatoria"
    }

    if (!horaDesde) {
      newErrors.horaDesde = "La hora desde es obligatoria"
    }

    // Validar fecha y hora hasta
    if (!fechaHasta) {
      newErrors.fechaHasta = "La fecha hasta es obligatoria"
    }

    if (!horaHasta) {
      newErrors.horaHasta = "La hora hasta es obligatoria"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Función para agregar persona
  const agregarPersona = () => {
    if (nombrePersona && documentoPersona) {
      const nuevaPersona: Persona = {
        id: Date.now().toString(),
        nombre: nombrePersona,
        documento: documentoPersona,
        empresa: empresaPersona,
      }
      setPersonas([...personas, nuevaPersona])

      // Limpiar campos
      setNombrePersona("")
      setDocumentoPersona("")
      setEmpresaPersona("")
    }
  }

  // Función para agregar conductor (para Transporte Cargas)
  const agregarConductor = () => {
    if (conductorSeleccionado) {
      const conductor = conductoresCargados.find((c) => c.id.toString() === conductorSeleccionado)
      if (conductor) {
        const nuevaPersona: Persona = {
          id: Date.now().toString(),
          nombre: conductor.nombre,
          documento: conductor.dni,
          empresa: empresaTransporte,
          licenciaConducir: null,
        }
        setPersonas([...personas, nuevaPersona])
        setConductorSeleccionado("")
      }
    }
  }

  // Función para eliminar persona
  const eliminarPersona = (id: string) => {
    setPersonas(personas.filter((persona) => persona.id !== id))
  }

  // Función para agregar vehículo
  const agregarVehiculo = () => {
    if (vehiculoSeleccionado) {
      const vehiculo = vehiculosCargados.find((v) => v.id.toString() === vehiculoSeleccionado)
      if (vehiculo) {
        const nuevoVehiculo: Vehiculo = {
          id: Date.now().toString(),
          tipo: vehiculo.tipo.toLowerCase(),
          patente: vehiculo.patente,
          marca: vehiculo.marca,
          modelo: vehiculo.modelo,
          seguro: null,
        }
        setVehiculos([...vehiculos, nuevoVehiculo])
        setVehiculoSeleccionado("")
      }
    }
  }

  // Función para eliminar vehículo
  const eliminarVehiculo = (id: string) => {
    setVehiculos(vehiculos.filter((vehiculo) => vehiculo.id !== id))
  }

  // Función para manejar la carga de archivos
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    if (validateForm()) {
      console.log("Formulario enviado correctamente")
      // Aquí iría la lógica para enviar los datos al servidor
      alert("Solicitud enviada correctamente")
    } else {
      console.log("Formulario con errores", errors)
    }
  }

  const tiposVisita = ["Laboral", "Guiada", "Evento"]

  const opcionesDestino = [
    "Areneras",
    "Terminal TEC Plata",
    "Copetro",
    "Deposito Fiscal",
    "Oficinas Administrativas",
    "Zona Operativa/Muelles",
    "Pañol/Deposito",
  ]

  // Determinar si estamos en modo Transporte Cargas
  const isTransporteCarga = tipoVisita === "Transporte Cargas"

  // Manejar cambio en categorías de licencia
  const handleCategoriaChange = (categoria: string) => {
    setCategoriasSeleccionadas((prev) => {
      if (prev.includes(categoria)) {
        return prev.filter((c) => c !== categoria)
      } else {
        return [...prev, categoria]
      }
    })
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <Link
          href="/usuario-basico/visitas/mis-visitas"
          className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Volver</span>
        </Link>
        <h1 className="text-2xl font-bold">Nueva Visita</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Sección principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          {/* Tipo de visita */}
          <div>
            <Label htmlFor="tipoVisita" className="text-sm font-medium text-gray-700 mb-1 block">
              Tipo Visita
            </Label>
            <Select value={tipoVisita} onValueChange={setTipoVisita}>
              <SelectTrigger
                id="tipoVisita"
                className={`w-full ${submitted && errors.tipoVisita ? "border-red-500 focus:ring-red-500" : ""}`}
              >
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                {tiposVisita.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {submitted && errors.tipoVisita && <p className="text-red-500 text-xs mt-1">{errors.tipoVisita}</p>}
          </div>

          {/* Destino */}
          <div>
            <Label htmlFor="destino" className="text-sm font-medium text-gray-700 mb-1 block">
              Destino
            </Label>
            <Select value={destino} onValueChange={setDestino}>
              <SelectTrigger
                id="destino"
                className={`w-full ${submitted && errors.destino ? "border-red-500 focus:ring-red-500" : ""}`}
              >
                <SelectValue placeholder="Seleccionar destino" />
              </SelectTrigger>
              <SelectContent>
                {opcionesDestino.map((opcion) => (
                  <SelectItem key={opcion} value={opcion}>
                    {opcion}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {submitted && errors.destino && <p className="text-red-500 text-xs mt-1">{errors.destino}</p>}
          </div>

          {/* Tipo de carga (solo para Transporte Cargas) */}
          {isTransporteCarga && (
            <div>
              <Label htmlFor="tipoCarga" className="text-sm font-medium text-gray-700 mb-1 block">
                Tipo Carga
              </Label>
              <Select value={tipoCarga} onValueChange={setTipoCarga}>
                <SelectTrigger
                  id="tipoCarga"
                  className={`w-full ${submitted && errors.tipoCarga ? "border-red-500 focus:ring-red-500" : ""}`}
                >
                  <SelectValue placeholder="Seleccionar tipo de carga" />
                </SelectTrigger>
                <SelectContent>
                  {tiposCarga.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {submitted && errors.tipoCarga && <p className="text-red-500 text-xs mt-1">{errors.tipoCarga}</p>}
            </div>
          )}

          {/* Campo para especificar otro tipo de carga */}
          {isTransporteCarga && tipoCarga === "Otro" && (
            <div>
              <Label htmlFor="otroTipoCarga" className="text-sm font-medium text-gray-700 mb-1 block">
                Especifique el tipo de carga
              </Label>
              <Input
                id="otroTipoCarga"
                value={otroTipoCarga}
                onChange={(e) => setOtroTipoCarga(e.target.value)}
                placeholder="Describa el tipo de carga"
                className={`w-full ${submitted && errors.otroTipoCarga ? "border-red-500 focus:ring-red-500" : ""}`}
              />
              {submitted && errors.otroTipoCarga && <p className="text-red-500 text-xs mt-1">{errors.otroTipoCarga}</p>}
            </div>
          )}

          {/* Empresa de transporte (solo para Transporte Cargas) */}
          {isTransporteCarga && (
            <div>
              <Label htmlFor="empresaTransporte" className="text-sm font-medium text-gray-700 mb-1 block">
                Empresa de Transporte
              </Label>
              <Input
                id="empresaTransporte"
                value={empresaTransporte}
                onChange={(e) => setEmpresaTransporte(e.target.value)}
                placeholder="Nombre de la empresa"
                className={`w-full ${submitted && errors.empresaTransporte ? "border-red-500 focus:ring-red-500" : ""}`}
              />
              {submitted && errors.empresaTransporte && (
                <p className="text-red-500 text-xs mt-1">{errors.empresaTransporte}</p>
              )}
            </div>
          )}

          {/* Fecha y hora desde */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-1 block">Desde</Label>
            <div className="grid grid-cols-2 gap-2">
              {/* Selector de fecha desde */}
              <div className="relative" ref={calendarDesdeRef}>
                <div
                  className={`flex items-center border ${
                    submitted && errors.fechaDesde ? "border-red-500" : "border-gray-300"
                  } rounded-md px-3 py-2 h-10 cursor-pointer`}
                  onClick={() => {
                    setShowCalendarDesde(!showCalendarDesde)
                    setShowTimeDesde(false)
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {fechaDesde ? format(fechaDesde, "dd/MM/yyyy") : "dd/mm/aaaa"}
                  </span>
                </div>
                {showCalendarDesde && (
                  <div className="absolute z-10 mt-1">
                    <CustomCalendar
                      selectedDate={fechaDesde}
                      onSelectDate={(date) => {
                        setFechaDesde(date)
                        setShowCalendarDesde(false)
                      }}
                    />
                  </div>
                )}
                {submitted && errors.fechaDesde && <p className="text-red-500 text-xs mt-1">{errors.fechaDesde}</p>}
              </div>

              {/* Selector de hora desde */}
              <div className="relative" ref={timeDesdeRef}>
                <div
                  className={`flex items-center border ${
                    submitted && errors.horaDesde ? "border-red-500" : "border-gray-300"
                  } rounded-md px-3 py-2 h-10 cursor-pointer`}
                  onClick={() => {
                    setShowTimeDesde(!showTimeDesde)
                    setShowCalendarDesde(false)
                  }}
                >
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">{horaDesde || "--:--"}</span>
                </div>
                {showTimeDesde && (
                  <div className="absolute z-10 mt-1">
                    <TimeSelector value={horaDesde} onChange={setHoraDesde} onClose={() => setShowTimeDesde(false)} />
                  </div>
                )}
                {submitted && errors.horaDesde && <p className="text-red-500 text-xs mt-1">{errors.horaDesde}</p>}
              </div>
            </div>
          </div>

          {/* Fecha y hora hasta */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-1 block">Hasta</Label>
            <div className="grid grid-cols-2 gap-2">
              {/* Selector de fecha hasta */}
              <div className="relative" ref={calendarHastaRef}>
                <div
                  className={`flex items-center border ${
                    submitted && errors.fechaHasta ? "border-red-500" : "border-gray-300"
                  } rounded-md px-3 py-2 h-10 cursor-pointer`}
                  onClick={() => {
                    setShowCalendarHasta(!showCalendarHasta)
                    setShowTimeHasta(false)
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {fechaHasta ? format(fechaHasta, "dd/MM/yyyy") : "dd/mm/aaaa"}
                  </span>
                </div>
                {showCalendarHasta && (
                  <div className="absolute z-10 mt-1">
                    <CustomCalendar
                      selectedDate={fechaHasta}
                      onSelectDate={(date) => {
                        setFechaHasta(date)
                        setShowCalendarHasta(false)
                      }}
                    />
                  </div>
                )}
                {submitted && errors.fechaHasta && <p className="text-red-500 text-xs mt-1">{errors.fechaHasta}</p>}
              </div>

              {/* Selector de hora hasta */}
              <div className="relative" ref={timeHastaRef}>
                <div
                  className={`flex items-center border ${
                    submitted && errors.horaHasta ? "border-red-500" : "border-gray-300"
                  } rounded-md px-3 py-2 h-10 cursor-pointer`}
                  onClick={() => {
                    setShowTimeHasta(!showTimeHasta)
                    setShowCalendarHasta(false)
                  }}
                >
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">{horaHasta || "--:--"}</span>
                </div>
                {showTimeHasta && (
                  <div className="absolute z-10 mt-1">
                    <TimeSelector value={horaHasta} onChange={setHoraHasta} onClose={() => setShowTimeHasta(false)} />
                  </div>
                )}
                {submitted && errors.horaHasta && <p className="text-red-500 text-xs mt-1">{errors.horaHasta}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Campo de personal a visitar (solo para visitas laborales) */}
        {tipoVisita === "Laboral" && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <Label htmlFor="personalVisita" className="text-sm font-medium text-gray-700 mb-1 block">
              Personal a visitar
            </Label>
            <Input
              id="personalVisita"
              value={personalVisita}
              onChange={(e) => setPersonalVisita(e.target.value)}
              placeholder="Nombre y apellido de la persona a visitar"
              className={`w-full ${submitted && errors.personalVisita ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            {submitted && errors.personalVisita && <p className="text-red-500 text-xs mt-1">{errors.personalVisita}</p>}
          </div>
        )}

        {/* Sección de conductor (solo para Transporte Cargas) */}
        {isTransporteCarga && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Conductor</h2>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsNewConductorModalOpen(true)}
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Conductor
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="conductorSeleccionado" className="text-sm font-medium text-gray-700 mb-1 block">
                  Seleccionar Conductor
                </Label>
                <Select value={conductorSeleccionado} onValueChange={setConductorSeleccionado}>
                  <SelectTrigger id="conductorSeleccionado">
                    <SelectValue placeholder="Seleccionar conductor" />
                  </SelectTrigger>
                  <SelectContent>
                    {conductoresCargados.map((conductor) => (
                      <SelectItem key={conductor.id} value={conductor.id.toString()}>
                        {conductor.nombre} - DNI: {conductor.dni}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="agregarConductor" className="text-sm font-medium text-gray-700 mb-1 block">
                  Agregar al listado
                </Label>
                <Button
                  type="button"
                  onClick={agregarConductor}
                  disabled={!conductorSeleccionado}
                  className="w-full bg-blue-400 hover:bg-blue-500 text-white"
                >
                  Agregar Conductor
                </Button>
              </div>
            </div>

            {personas.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Nombre</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Documento</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Empresa</th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-500">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {personas.map((persona) => (
                      <tr key={persona.id} className="border-b border-gray-200">
                        <td className="py-3 px-4">{persona.nombre}</td>
                        <td className="py-3 px-4">{persona.documento}</td>
                        <td className="py-3 px-4">{persona.empresa}</td>
                        <td className="py-3 px-4 text-center">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => eliminarPersona(persona.id)}
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

        {/* Sección de personas (solo para visitas que no son Transporte Cargas) */}
        {!isTransporteCarga && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Personas que asistirán</h2>
              <Button
                type="button"
                variant="outline"
                onClick={agregarPersona}
                className="flex items-center"
                disabled={!nombrePersona || !documentoPersona}
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Persona
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <Label htmlFor="nombrePersona" className="text-sm font-medium text-gray-700 mb-1 block">
                  Nombre
                </Label>
                <Input
                  id="nombrePersona"
                  value={nombrePersona}
                  onChange={(e) => setNombrePersona(e.target.value)}
                  placeholder="Nombre completo"
                />
              </div>
              <div>
                <Label htmlFor="documentoPersona" className="text-sm font-medium text-gray-700 mb-1 block">
                  Documento
                </Label>
                <Input
                  id="documentoPersona"
                  value={documentoPersona}
                  onChange={(e) => setDocumentoPersona(e.target.value)}
                  placeholder="Número de documento"
                />
              </div>
              <div>
                <Label htmlFor="empresaPersona" className="text-sm font-medium text-gray-700 mb-1 block">
                  Empresa
                </Label>
                <Input
                  id="empresaPersona"
                  value={empresaPersona}
                  onChange={(e) => setEmpresaPersona(e.target.value)}
                  placeholder="Nombre de la empresa"
                />
              </div>
            </div>

            {personas.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Nombre</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Documento</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Empresa</th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-500">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {personas.map((persona) => (
                      <tr key={persona.id} className="border-b border-gray-200">
                        <td className="py-3 px-4">{persona.nombre}</td>
                        <td className="py-3 px-4">{persona.documento}</td>
                        <td className="py-3 px-4">{persona.empresa}</td>
                        <td className="py-3 px-4 text-center">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => eliminarPersona(persona.id)}
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
            ) : (
              submitted && errors.personas && <p className="text-red-500 text-sm mt-2">{errors.personas}</p>
            )}
          </div>
        )}

        {/* Sección de vehículos */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Vehículos</h2>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsNewVehiculoModalOpen(true)}
              className="flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Vehículo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="vehiculoSeleccionado" className="text-sm font-medium text-gray-700 mb-1 block">
                Seleccionar Vehículo
              </Label>
              <Select value={vehiculoSeleccionado} onValueChange={setVehiculoSeleccionado}>
                <SelectTrigger id="vehiculoSeleccionado">
                  <SelectValue placeholder="Seleccionar vehículo" />
                </SelectTrigger>
                <SelectContent>
                  {vehiculosCargados.map((vehiculo) => (
                    <SelectItem key={vehiculo.id} value={vehiculo.id.toString()}>
                      {vehiculo.tipo} - {vehiculo.marca} {vehiculo.modelo} - {vehiculo.patente}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="agregarVehiculo" className="text-sm font-medium text-gray-700 mb-1 block">
                Agregar al listado
              </Label>
              <Button
                type="button"
                onClick={agregarVehiculo}
                disabled={!vehiculoSeleccionado}
                className="w-full bg-blue-400 hover:bg-blue-500 text-white"
              >
                Agregar Vehículo
              </Button>
            </div>
          </div>

          {vehiculos.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Tipo</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Patente</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Marca</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Modelo</th>
                    {isTransporteCarga && (
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Seguro</th>
                    )}
                    <th className="py-3 px-4 text-center text-sm font-medium text-gray-500">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {vehiculos.map((vehiculo) => (
                    <tr key={vehiculo.id} className="border-b border-gray-200">
                      <td className="py-3 px-4">{vehiculo.tipo}</td>
                      <td className="py-3 px-4">{vehiculo.patente}</td>
                      <td className="py-3 px-4">{vehiculo.marca || "-"}</td>
                      <td className="py-3 px-4">{vehiculo.modelo || "-"}</td>
                      {isTransporteCarga && <td className="py-3 px-4">{vehiculo.seguro ? "✓" : "✗"}</td>}
                      <td className="py-3 px-4 text-center">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => eliminarVehiculo(vehiculo.id)}
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
          ) : (
            isTransporteCarga &&
            submitted &&
            errors.vehiculos && <p className="text-red-500 text-sm mt-2">{errors.vehiculos}</p>
          )}
        </div>

        {/* Sección de observaciones */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <Label htmlFor="observaciones" className="text-sm font-medium text-gray-700 mb-1 block">
            Observaciones
          </Label>
          <textarea
            id="observaciones"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            placeholder="Ingrese cualquier información adicional relevante para la visita..."
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button" asChild>
            <Link href="/usuario-basico/visitas/mis-visitas">Cancelar</Link>
          </Button>
          <Button type="submit" className="bg-blue-900 hover:bg-blue-950 text-white">
            Enviar Solicitud
          </Button>
        </div>
      </form>

      {/* Modal para agregar nuevo conductor */}
      <Dialog open={isNewConductorModalOpen} onOpenChange={setIsNewConductorModalOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="text-lg font-semibold mb-4">Nuevo Conductor</div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)

              // Validar que al menos una categoría esté seleccionada
              if (categoriasSeleccionadas.length === 0) {
                return
              }

              const nuevoConductor = {
                id: conductoresCargados.length + 1,
                nombre: (formData.get("nombre") as string) || "",
                dni: (formData.get("dni") as string) || "",
                telefono: (formData.get("telefono") as string) || "",
                numeroLicencia: (formData.get("numeroLicencia") as string) || "",
                licencia: formData.get("licencia") ? (formData.get("licencia") as File).name : "sin_licencia.pdf",
                fechaVencimientoLicencia: fechaVencimientoLicencia
                  ? fechaVencimientoLicencia.toISOString().split("T")[0]
                  : new Date().toISOString().split("T")[0],
                categorias: categoriasSeleccionadas,
              }

              setConductoresCargados([...conductoresCargados, nuevoConductor])
              setCategoriasSeleccionadas([])
              setFechaVencimientoLicencia(undefined)
              setIsNewConductorModalOpen(false)
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="nombre">Nombre Completo</Label>
                <Input id="nombre" name="nombre" required />
              </div>
              <div>
                <Label htmlFor="dni">DNI</Label>
                <Input id="dni" name="dni" required />
              </div>
              <div>
                <Label htmlFor="telefono">Teléfono</Label>
                <Input id="telefono" name="telefono" />
              </div>
              <div>
                <Label htmlFor="numeroLicencia">N° de Licencia</Label>
                <Input id="numeroLicencia" name="numeroLicencia" required />
              </div>
            </div>

            <div>
              <Label>Categorías de Licencia</Label>
              <div className="border border-gray-300 rounded-md p-4 mt-1">
                <p className="text-sm text-gray-500 mb-2">Seleccione todas las categorías que apliquen:</p>
                <div className="grid grid-cols-7 gap-2">
                  {categoriasLicencia.map((categoria) => (
                    <div key={categoria} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`categoria-${categoria}`}
                        checked={categoriasSeleccionadas.includes(categoria)}
                        onChange={() => handleCategoriaChange(categoria)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Label htmlFor={`categoria-${categoria}`} className="text-sm">
                        {categoria}
                      </Label>
                    </div>
                  ))}
                </div>
                {categoriasSeleccionadas.length === 0 && (
                  <p className="text-red-500 text-xs mt-2">Seleccione al menos una categoría</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="fecha-vencimiento-licencia">Fecha Vencimiento Licencia</Label>
              <div className="relative" ref={licenciaCalendarRef}>
                <div
                  className="flex items-center border border-gray-300 rounded-md px-3 py-2 h-10 cursor-pointer"
                  onClick={() => {
                    setShowLicenciaCalendar(!showLicenciaCalendar)
                    setShowSeguroCalendar(false)
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {fechaVencimientoLicencia
                      ? format(fechaVencimientoLicencia, "dd/MM/yyyy", { locale: es })
                      : "dd/mm/aaaa"}
                  </span>
                </div>
                {showLicenciaCalendar && (
                  <div className="absolute z-10 top-full mt-1">
                    <CustomCalendar
                      selectedDate={fechaVencimientoLicencia}
                      onSelectDate={(date) => {
                        setFechaVencimientoLicencia(date)
                        setShowLicenciaCalendar(false)
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="licencia">Licencia de Conducir</Label>
              <div className="flex items-center">
                <label
                  htmlFor="licencia"
                  className="flex items-center justify-center w-full border border-gray-300 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">Seleccionar archivo</span>
                </label>
                <input
                  id="licencia"
                  name="licencia"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Ningún archivo seleccionado</p>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsNewConductorModalOpen(false)}
                className="border border-gray-300 bg-white text-black hover:bg-gray-50"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-blue-900 hover:bg-blue-800 text-white"
                disabled={categoriasSeleccionadas.length === 0}
              >
                Guardar Conductor
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal para agregar nuevo vehículo */}
      <Dialog open={isNewVehiculoModalOpen} onOpenChange={setIsNewVehiculoModalOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="text-lg font-semibold mb-4">Nuevo Vehículo</div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)

              const nuevoVehiculo = {
                id: vehiculosCargados.length + 1,
                tipo: (formData.get("tipo") as string) || "Auto",
                patente: (formData.get("patente") as string) || "",
                marca: (formData.get("marca") as string) || "",
                modelo: (formData.get("modelo") as string) || "",
                titular: (formData.get("titular") as string) || "",
                conductorNoTitular: formData.get("conductorNoTitular") === "on",
                seguro: formData.get("seguro") ? (formData.get("seguro") as File).name : "sin_seguro.pdf",
                cedulaVerde: formData.get("cedulaVerde")
                  ? (formData.get("cedulaVerde") as File).name
                  : "sin_cedula.pdf",
                fechaVencimientoSeguro: fechaVencimientoSeguro
                  ? fechaVencimientoSeguro.toISOString().split("T")[0]
                  : new Date().toISOString().split("T")[0],
              }

              setVehiculosCargados([...vehiculosCargados, nuevoVehiculo])
              setFechaVencimientoSeguro(undefined)
              setConductorNoTitular(false)
              setIsNewVehiculoModalOpen(false)
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tipo">Tipo</Label>
                <Select defaultValue="Auto" name="tipo">
                  <SelectTrigger id="tipo">
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
                <Label htmlFor="patente">Patente</Label>
                <Input id="patente" name="patente" required />
              </div>
              <div>
                <Label htmlFor="marca">Marca</Label>
                <Input id="marca" name="marca" />
              </div>
              <div>
                <Label htmlFor="modelo">Modelo</Label>
                <Input id="modelo" name="modelo" />
              </div>
            </div>

            <div>
              <Label htmlFor="titular">Nombre completo del titular</Label>
              <Input id="titular" name="titular" required />
            </div>

            <div>
              <Label htmlFor="cedulaVerde">Cédula Verde</Label>
              <div className="flex items-center">
                <label
                  htmlFor="cedulaVerde"
                  className="flex items-center justify-center w-full border border-gray-300 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">Seleccionar archivo</span>
                </label>
                <input
                  id="cedulaVerde"
                  name="cedulaVerde"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Ningún archivo seleccionado</p>
            </div>

            <div>
              <Label htmlFor="seguro">Seguro</Label>
              <div className="flex items-center">
                <label
                  htmlFor="seguro"
                  className="flex items-center justify-center w-full border border-gray-300 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">Seleccionar archivo</span>
                </label>
                <input
                  id="seguro"
                  name="seguro"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Ningún archivo seleccionado</p>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="conductorNoTitular"
                name="conductorNoTitular"
                checked={conductorNoTitular}
                onChange={(e) => {
                  setConductorNoTitular(e.target.checked)
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Label htmlFor="conductorNoTitular">El vehículo lo conduce alguien que no es el titular</Label>
            </div>

            <div>
              <Label htmlFor="fecha-vencimiento-seguro">Fecha Vencimiento Seguro</Label>
              <div className="relative" ref={seguroCalendarRef}>
                <div
                  className="flex items-center border border-gray-300 rounded-md px-3 py-2 h-10 cursor-pointer"
                  onClick={() => {
                    setShowSeguroCalendar(!showSeguroCalendar)
                    setShowLicenciaCalendar(false)
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {fechaVencimientoSeguro
                      ? format(fechaVencimientoSeguro, "dd/MM/yyyy", { locale: es })
                      : "dd/mm/aaaa"}
                  </span>
                </div>
                {showSeguroCalendar && (
                  <div className="absolute z-10 top-full mt-1">
                    <CustomCalendar
                      selectedDate={fechaVencimientoSeguro}
                      onSelectDate={(date) => {
                        setFechaVencimientoSeguro(date)
                        setShowSeguroCalendar(false)
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsNewVehiculoModalOpen(false)}
                className="border border-gray-300 bg-white text-black hover:bg-gray-50"
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-900 hover:bg-blue-800 text-white">
                Guardar Vehículo
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
