"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Calendar, Plus, Trash2, ChevronLeft, ChevronRight, Upload } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { format, addMonths, subMonths } from "date-fns"
import { es } from "date-fns/locale"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Interfaces
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
  titular?: string
  seguro?: File | null
  cedulaVerde?: File | null
  certificadoSeguridadVehicular?: File | null
  conductorNoTitular?: boolean
  cedulaAzul?: File | null
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
    telefono: "1145678901",
    numeroLicencia: "11-1234-5678",
    categorias: ["B", "C"],
    licencia: "licencia_carlos.pdf",
    fechaVencimientoLicencia: "2025-05-15",
  },
  {
    id: 2,
    nombre: "María González",
    dni: "30987654",
    telefono: "1156789012",
    numeroLicencia: "11-5678-1234",
    categorias: ["B"],
    licencia: "licencia_maria.pdf",
    fechaVencimientoLicencia: "2025-06-20",
  },
  {
    id: 3,
    nombre: "Juan Pérez",
    dni: "25678901",
    telefono: "1167890123",
    numeroLicencia: "11-9012-3456",
    categorias: ["A", "B", "E"],
    licencia: "licencia_juan.pdf",
    fechaVencimientoLicencia: "2025-07-10",
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

// Componente DatePicker Inline (sin modal)
function DatePickerInline({ date, setDate }: { date?: Date; setDate: (date: Date) => void }) {
  const [showCalendar, setShowCalendar] = useState(false)

  return (
    <div className="relative">
      <div
        className="flex items-center border border-gray-300 rounded-md px-3 py-2 h-10 cursor-pointer"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
        <span className="text-sm text-gray-600">
          {date ? format(date, "dd/MM/yyyy", { locale: es }) : "Seleccionar fecha"}
        </span>
      </div>
      {showCalendar && (
        <div className="absolute z-10 top-full mt-1">
          <CustomCalendar
            selectedDate={date}
            onSelectDate={(date) => {
              setDate(date)
              setShowCalendar(false)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default function NuevaVisitaPage() {
  // Estados para los campos del formulario
  const [tipoVisita, setTipoVisita] = useState<string>("")

  // Estado para destino
  const [destino, setDestino] = useState<string>("")

  // Estado para persona responsable del puerto
  const [personaResponsable, setPersonaResponsable] = useState<string>("")

  // Estado para operacion (cuando se selecciona Transporte Cargas)
  const [operacion, setOperacion] = useState<string>("")

  // Estado para tipo de carga (cuando se selecciona Transporte Cargas)
  const [tipoCarga, setTipoCarga] = useState<string>("")
  const [otroTipoCarga, setOtroTipoCarga] = useState<string>("")
  const [empresaTransporte, setEmpresaTransporte] = useState<string>("")
  const [transporteTerciarizado, setTransporteTerciarizado] = useState<boolean>(false)

  // Estados para fecha y hora desde
  const [fechaDesde, setFechaDesde] = useState<Date | undefined>(undefined)
  const [horaDesde, setHoraDesde] = useState<string>("")
  const [showCalendarDesde, setShowCalendarDesde] = useState(false)

  // Estados para fecha y hora hasta
  const [fechaHasta, setFechaHasta] = useState<Date | undefined>(undefined)
  const [horaHasta, setHoraHasta] = useState<string>("")
  const [showCalendarHasta, setShowCalendarHasta] = useState(false)

  // Estado para el personal a visitar (solo para visitas laborales)
  const [personalVisita, setPersonalVisita] = useState<string>("")

  // Estados para personas
  const [personas, setPersonas] = useState<Persona[]>([])
  const [nombrePersona, setNombrePersona] = useState<string>("")
  const [documentoPersona, setDocumentoPersona] = useState<string>("")
  const [empresaPersona, setEmpresaPersona] = useState<string>("")

  // Estados para vehículos
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([])

  // Estados para vehículos y conductores cargados
  const [vehiculosCargados, setVehiculosCargados] = useState(vehiculosCargadosData)
  const [conductoresCargados, setConductoresCargados] = useState(conductoresCargadosData)
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState<string>("")
  const [conductorSeleccionado, setConductorSeleccionado] = useState<string>("")
  const [isNewVehiculoModalOpen, setIsNewVehiculoModalOpen] = useState(false)
  const [isNewConductorModalOpen, setIsNewConductorModalOpen] = useState(false)

  // Estados para fechas de vencimiento
  const [fechaVencimientoLicencia, setFechaVencimientoLicencia] = useState<Date | undefined>(undefined)
  const [fechaVencimientoSeguro, setFechaVencimientoSeguro] = useState<Date | undefined>(undefined)

  // Estados para controlar la visibilidad de los calendarios en los modales
  const [showLicenciaCalendar, setShowLicenciaCalendar] = useState(false)
  const [showSeguroCalendar, setShowSeguroCalendar] = useState(false)

  // Categorías de licencia disponibles
  const categoriasLicencia = ["A", "B", "C", "D", "E", "F", "G"]

  // Estados para conductor
  const [nombreConductor, setNombreConductor] = useState<string>("")
  const [dniConductor, setDniConductor] = useState<string>("")
  const [telefonoConductor, setTelefonoConductor] = useState<string>("")
  const [numeroLicencia, setNumeroLicencia] = useState<string>("")
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<string[]>([])
  const [licenciaConducir, setLicenciaConducir] = useState<File | null>(null)
  const [errorCategorias, setErrorCategorias] = useState<string>("")

  // Estados para vehículo
  const [tipoVehiculo, setTipoVehiculo] = useState<string>("")
  const [patenteVehiculo, setPatenteVehiculo] = useState<string>("")
  const [marcaVehiculo, setMarcaVehiculo] = useState<string>("")
  const [modeloVehiculo, setModeloVehiculo] = useState<string>("")
  const [titularVehiculo, setTitularVehiculo] = useState<string>("")
  const [cedulaVerde, setCedulaVerde] = useState<File | null>(null)
  const [seguroVehiculo, setSeguroVehiculo] = useState<File | null>(null)
  const [certificadoSeguridadVehicular, setCertificadoSeguridadVehicular] = useState<File | null>(null)
  const [conductorNoTitular, setConductorNoTitular] = useState<boolean>(false)
  const [cedulaAzul, setCedulaAzul] = useState<File | null>(null)

  // Estado para visita recurrente
  const [visitaRecurrente, setVisitaRecurrente] = useState<boolean>(false)
  const [diasSemana, setDiasSemana] = useState<string[]>([])

  const tiposVisita = ["Laboral", "Transporte Cargas", "Acceso a Obra", "Acceso a Muelle"]

  const tiposVehiculo = ["Auto", "Camioneta", "Camión", "Utilitario", "Moto", "Acoplado"]

  // Opciones de destino
  const opcionesDestino = [
    "Areneras",
    "Terminal TEC Plata",
    "Copetro",
    "Deposito Fiscal",
    "Oficinas Administrativas",
    "Zona Operativa/Muelles",
    "Pañol/Deposito",
    "Obras e Ingenieria",
    "Taller de herreria",
    "Taller de Locomotoras",
  ]

  const personasResponsables = ["Adrian Monticelli", "Aquiles Ruiz", "Facundo Fiorino", "Julian Pertierra"]

  const tiposOperacion = ["Descarga", "Carga", "Carga y Descarga"]

  const diasDeLaSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

  // Estado para observaciones
  const [observaciones, setObservaciones] = useState<string>("")

  // Estado para validación del formulario
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  // Referencias para cerrar los calendarios al hacer clic fuera
  const calendarDesdeRef = useRef<HTMLDivElement>(null)
  const calendarHastaRef = useRef<HTMLDivElement>(null)
  const licenciaCalendarRef = useRef<HTMLDivElement>(null)
  const seguroCalendarRef = useRef<HTMLDivElement>(null)

  // Cerrar calendarios al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarDesdeRef.current && !calendarDesdeRef.current.contains(event.target as Node)) {
        setShowCalendarDesde(false)
      }
      if (calendarHastaRef.current && !calendarHastaRef.current.contains(event.target as Node)) {
        setShowCalendarHasta(false)
      }
      if (licenciaCalendarRef.current && !licenciaCalendarRef.current.contains(event.target as Node)) {
        setShowLicenciaCalendar(false)
      }
      if (seguroCalendarRef.current && !seguroCalendarRef.current.contains(event.target as Node)) {
        setShowSeguroCalendar(false)
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

    // Validar persona responsable (para destinos específicos)
    if (
      (destino === "Oficinas Administrativas" ||
        destino === "Pañol/Deposito" ||
        destino === "Obras e Ingenieria" ||
        destino === "Taller de herreria" ||
        destino === "Taller de Locomotoras") &&
      !personaResponsable
    ) {
      newErrors.personaResponsable = "La persona responsable es obligatoria"
    }

    // Validaciones específicas para Transporte Cargas
    if (tipoVisita === "Transporte Cargas") {
      // Validar operacion
      if (!operacion) {
        newErrors.operacion = "La operación es obligatoria"
      }

      // Validar tipo de carga
      if (!tipoCarga) {
        newErrors.tipoCarga = "El tipo de carga es obligatoria"
      }

      // Validar otro tipo de carga si se seleccionó "Otro"
      if (tipoCarga === "Otro" && !otroTipoCarga) {
        newErrors.otroTipoCarga = "Debe especificar el tipo de carga"
      }

      // Validaciones según si es transporte terciarizado o no
      if (transporteTerciarizado) {
        // Validar empresa de transporte solo si es terciarizado
        if (!empresaTransporte) {
          newErrors.empresaTransporte = "La empresa de transporte es obligatoria"
        }
      } else {
        // Validar conductor y vehículos solo si NO es terciarizado
        if (personas.length === 0) {
          newErrors.conductor = "Debe agregar al menos un conductor"
        }

        if (vehiculos.length === 0) {
          newErrors.vehiculos = "Debe agregar al menos un vehículo"
        }
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

    // Validar hora hasta (para todas las visitas)
    if (!horaHasta) {
      newErrors.horaHasta = "La hora hasta es obligatoria"
    }

    if (visitaRecurrente && diasSemana.length === 0) {
      newErrors.diasSemana = "Debe seleccionar al menos un día de la semana"
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

  // Función para eliminar persona
  const eliminarPersona = (id: string) => {
    setPersonas(personas.filter((persona) => persona.id !== id))
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
    console.log("Formulario enviado correctamente")
    alert("Solicitud enviada correctamente")
  }

  // Determinar si estamos en modo Transporte Cargas
  const isTransporteCarga = tipoVisita === "Transporte Cargas"

  const tiposCarga = [
    "Granel",
    "Liquida",
    "Gases",
    "Contenedores",
    "Paquetes",
    "Materiales de Construcción",
    "Maquinaria",
    "Otro",
  ]

  // Función para limpiar campos del vehículo
  const limpiarCamposVehiculo = () => {
    setTipoVehiculo("")
    setPatenteVehiculo("")
    setMarcaVehiculo("")
    setModeloVehiculo("")
    setSeguroVehiculo(null)
    setCedulaVerde(null)
    setFechaVencimientoSeguro(undefined)
  }

  // Función para limpiar campos del conductor
  const limpiarCamposConductor = () => {
    setNombreConductor("")
    setDniConductor("")
    setTelefonoConductor("")
    setNumeroLicencia("")
    setLicenciaConducir(null)
  }

  // Función para agregar nuevo vehículo
  const agregarNuevoVehiculo = () => {
    if (patenteVehiculo && marcaVehiculo && modeloVehiculo && seguroVehiculo && cedulaVerde && fechaVencimientoSeguro) {
      const nuevoVehiculo = {
        id: Date.now(),
        tipo: tipoVehiculo || "Auto",
        patente: patenteVehiculo,
        marca: marcaVehiculo,
        modelo: modeloVehiculo,
        seguro: `seguro_${patenteVehiculo}.jpg`,
        fechaVencimientoSeguro: fechaVencimientoSeguro.toISOString().split("T")[0],
      }

      setVehiculosCargados([...vehiculosCargados, nuevoVehiculo])
      limpiarCamposVehiculo()
      setIsNewVehiculoModalOpen(false)
      alert("Vehículo agregado correctamente")
    } else {
      alert("Por favor complete todos los campos obligatorios")
    }
  }

  // Función para agregar nuevo conductor
  const agregarNuevoConductor = () => {
    if (nombreConductor && dniConductor && telefonoConductor && numeroLicencia && licenciaConducir) {
      const nuevoConductor = {
        id: Date.now(),
        nombre: `${nombreConductor}`,
        dni: dniConductor,
        telefono: telefonoConductor,
        numeroLicencia: numeroLicencia,
        categorias: ["B"],
        licencia: `licencia_${dniConductor}.jpg`,
        fechaVencimientoLicencia: "2025-12-31",
      }

      setConductoresCargados([...conductoresCargados, nuevoConductor])
      limpiarCamposConductor()
      setIsNewConductorModalOpen(false)
      alert("Conductor agregado correctamente")
    } else {
      alert("Por favor complete todos los campos obligatorios")
    }
  }

  // Función para capturar foto desde la cámara
  const capturarFoto = (setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.capture = "environment" // Usar cámara trasera en dispositivos móviles
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        setFile(file)
      }
    }
    input.click()
  }

  return (
    <div className="p-4 max-w-6xl mx-auto min-h-screen bg-gray-50">
      <div className="flex items-center mb-6">
        <Link href="/empleado-guardia/visita" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
          <ArrowLeft className="h-6 w-6 mr-2" />
          <span className="text-lg">Volver</span>
        </Link>
        <h1 className="text-3xl font-bold">Nueva Visita</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sección principal - Optimizada para tablet */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tipo de visita */}
            <div>
              <Label htmlFor="tipoVisita" className="text-base font-medium text-gray-700 mb-2 block">
                Tipo Visita
              </Label>
              <Select value={tipoVisita} onValueChange={setTipoVisita}>
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tiposVisita.map((tipo) => (
                    <SelectItem key={tipo} value={tipo} className="text-base py-3">
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Operacion (solo para Transporte Cargas) */}
            {isTransporteCarga && (
              <div>
                <Label htmlFor="operacion" className="text-base font-medium text-gray-700 mb-2 block">
                  Operación
                </Label>
                <Select value={operacion} onValueChange={setOperacion}>
                  <SelectTrigger className="w-full h-12 text-base">
                    <SelectValue placeholder="Seleccionar operación" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposOperacion.map((tipo) => (
                      <SelectItem key={tipo} value={tipo} className="text-base py-3">
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Tipo de carga (solo para Transporte Cargas) */}
            {isTransporteCarga && (
              <div>
                <Label htmlFor="tipoCarga" className="text-base font-medium text-gray-700 mb-2 block">
                  Tipo Carga
                </Label>
                <Select value={tipoCarga} onValueChange={setTipoCarga}>
                  <SelectTrigger className="w-full h-12 text-base">
                    <SelectValue placeholder="Seleccionar tipo de carga" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposCarga.map((tipo) => (
                      <SelectItem key={tipo} value={tipo} className="text-base py-3">
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Destino */}
            <div>
              <Label htmlFor="destino" className="text-base font-medium text-gray-700 mb-2 block">
                Destino
              </Label>
              <Select value={destino} onValueChange={setDestino}>
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Seleccionar destino" />
                </SelectTrigger>
                <SelectContent>
                  {opcionesDestino.map((opcion) => (
                    <SelectItem key={opcion} value={opcion} className="text-base py-3">
                      {opcion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Persona Responsable del Puerto (para destinos específicos) */}
            {(destino === "Oficinas Administrativas" ||
              destino === "Pañol/Deposito" ||
              destino === "Obras e Ingenieria" ||
              destino === "Taller de herreria" ||
              destino === "Taller de Locomotoras") && (
              <div>
                <Label htmlFor="personaResponsable" className="text-base font-medium text-gray-700 mb-2 block">
                  Persona Responsable del Puerto
                </Label>
                <Select value={personaResponsable} onValueChange={setPersonaResponsable}>
                  <SelectTrigger className="w-full h-12 text-base">
                    <SelectValue placeholder="Seleccionar persona responsable" />
                  </SelectTrigger>
                  <SelectContent>
                    {personasResponsables.map((persona) => (
                      <SelectItem key={persona} value={persona} className="text-base py-3">
                        {persona}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Checkbox para transporte terciarizado */}
            {isTransporteCarga && (
              <div className="flex items-center space-x-3 pt-8">
                <Checkbox
                  id="transporteTerciarizado"
                  checked={transporteTerciarizado}
                  onCheckedChange={(checked) => setTransporteTerciarizado(checked as boolean)}
                  className="h-5 w-5"
                />
                <Label htmlFor="transporteTerciarizado" className="text-base font-medium text-gray-700">
                  Transporte terciarizado
                </Label>
              </div>
            )}

            {/* Empresa de transporte (solo para Transporte Cargas terciarizado) */}
            {isTransporteCarga && transporteTerciarizado && (
              <div>
                <Label htmlFor="empresaTransporte" className="text-base font-medium text-gray-700 mb-2 block">
                  Empresa de Transporte
                </Label>
                <Input
                  id="empresaTransporte"
                  value={empresaTransporte}
                  onChange={(e) => setEmpresaTransporte(e.target.value)}
                  placeholder="Nombre de la empresa"
                  className="w-full h-12 text-base"
                />
              </div>
            )}
          </div>

          {/* Fechas y horarios - Layout optimizado para tablet */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fecha y hora desde */}
            <div>
              <Label className="text-base font-medium text-gray-700 mb-2 block">Desde</Label>
              <div className="grid grid-cols-2 gap-3">
                {/* Selector de fecha desde */}
                <div className="relative" ref={calendarDesdeRef}>
                  <div
                    className="flex items-center border border-gray-300 rounded-md px-3 py-3 h-12 cursor-pointer text-base"
                    onClick={() => {
                      setShowCalendarDesde(!showCalendarDesde)
                      setShowCalendarHasta(false)
                    }}
                  >
                    <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                    <span className="text-gray-600">
                      {fechaDesde ? format(fechaDesde, "dd/MM/yyyy") : "dd/mm/aaaa"}
                    </span>
                  </div>
                  {showCalendarDesde && (
                    <div className="absolute z-10 top-full mt-1">
                      <CustomCalendar
                        selectedDate={fechaDesde}
                        onSelectDate={(date) => {
                          setFechaDesde(date)
                          setShowCalendarDesde(false)
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Selector de hora desde */}
                <Input
                  id="horaDesde"
                  type="time"
                  value={horaDesde}
                  onChange={(e) => setHoraDesde(e.target.value)}
                  className="w-full h-12 text-base"
                />
              </div>
            </div>

            {/* Fecha y hora hasta */}
            <div>
              <Label className="text-base font-medium text-gray-700 mb-2 block">Hasta</Label>
              <div className="grid grid-cols-2 gap-3">
                {/* Selector de fecha hasta */}
                <div className="relative" ref={calendarHastaRef}>
                  <div
                    className="flex items-center border border-gray-300 rounded-md px-3 py-3 h-12 cursor-pointer text-base"
                    onClick={() => {
                      setShowCalendarHasta(!showCalendarHasta)
                      setShowCalendarDesde(false)
                    }}
                  >
                    <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                    <span className="text-gray-600">
                      {fechaHasta ? format(fechaHasta, "dd/MM/yyyy") : "dd/mm/aaaa"}
                    </span>
                  </div>
                  {showCalendarHasta && (
                    <div className="absolute z-10 top-full mt-1">
                      <CustomCalendar
                        selectedDate={fechaHasta}
                        onSelectDate={(date) => {
                          setFechaHasta(date)
                          setShowCalendarHasta(false)
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Selector de hora hasta */}
                <Input
                  id="horaHasta"
                  type="time"
                  value={horaHasta}
                  onChange={(e) => setHoraHasta(e.target.value)}
                  className="w-full h-12 text-base"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Campo de personal a visitar (solo para visitas laborales) */}
        {tipoVisita === "Laboral" && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <Label htmlFor="personalVisita" className="text-base font-medium text-gray-700 mb-2 block">
              Personal a visitar
            </Label>
            <Input
              id="personalVisita"
              value={personalVisita}
              onChange={(e) => setPersonalVisita(e.target.value)}
              placeholder="Nombre y apellido de la persona a visitar"
              className="w-full h-12 text-base"
            />
          </div>
        )}

        {/* Sección de personas que asistirán - Optimizada para tablet */}
        {(!isTransporteCarga || (isTransporteCarga && !transporteTerciarizado)) && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Personas que asistirán</h2>
              <Button
                type="button"
                variant="outline"
                onClick={agregarPersona}
                className="flex items-center h-12 px-6 text-base"
                disabled={!nombrePersona || !documentoPersona}
              >
                <Plus className="h-5 w-5 mr-2" />
                Agregar Persona
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <Label htmlFor="nombrePersona" className="text-base font-medium text-gray-700 mb-2 block">
                  Nombre
                </Label>
                <Input
                  id="nombrePersona"
                  value={nombrePersona}
                  onChange={(e) => setNombrePersona(e.target.value)}
                  placeholder="Nombre completo"
                  className="h-12 text-base"
                />
              </div>
              <div>
                <Label htmlFor="documentoPersona" className="text-base font-medium text-gray-700 mb-2 block">
                  Documento
                </Label>
                <Input
                  id="documentoPersona"
                  value={documentoPersona}
                  onChange={(e) => setDocumentoPersona(e.target.value)}
                  placeholder="Número de documento"
                  className="h-12 text-base"
                />
              </div>
              <div>
                <Label htmlFor="empresaPersona" className="text-base font-medium text-gray-700 mb-2 block">
                  Empresa
                </Label>
                <Input
                  id="empresaPersona"
                  value={empresaPersona}
                  onChange={(e) => setEmpresaPersona(e.target.value)}
                  placeholder="Nombre de la empresa"
                  className="h-12 text-base"
                />
              </div>
            </div>

            {personas.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-4 px-4 text-left text-base font-medium text-gray-500">Nombre</th>
                      <th className="py-4 px-4 text-left text-base font-medium text-gray-500">Documento</th>
                      <th className="py-4 px-4 text-left text-base font-medium text-gray-500">Empresa</th>
                      <th className="py-4 px-4 text-center text-base font-medium text-gray-500">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {personas.map((persona) => (
                      <tr key={persona.id} className="border-b border-gray-200">
                        <td className="py-4 px-4 text-base">{persona.nombre}</td>
                        <td className="py-4 px-4 text-base">{persona.documento}</td>
                        <td className="py-4 px-4 text-base">{persona.empresa}</td>
                        <td className="py-4 px-4 text-center">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => eliminarPersona(persona.id)}
                            className="text-red-500 hover:text-red-700 h-10 w-10"
                          >
                            <Trash2 className="h-5 w-5" />
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

        {/* Sección de observaciones */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <Label htmlFor="observaciones" className="text-base font-medium text-gray-700 mb-2 block">
            Observaciones
          </Label>
          <Textarea
            id="observaciones"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            placeholder="Ingrese cualquier información adicional relevante para la visita..."
            rows={4}
            className="text-base"
          />
        </div>

        {/* Botones de acción - Optimizados para tablet */}
        <div className="flex justify-end space-x-4 pb-6">
          <Button variant="outline" type="button" asChild className="h-12 px-8 text-base">
            <Link href="/proveedor/visitas/mis-visitas">Cancelar</Link>
          </Button>
          <Button type="submit" className="bg-blue-900 hover:bg-blue-950 text-white h-12 px-8 text-base">
            Enviar Solicitud
          </Button>
        </div>
      </form>

      {/* Modal para agregar nuevo conductor */}
      <Dialog open={isNewConductorModalOpen} onOpenChange={setIsNewConductorModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Nuevo Conductor</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()

              // Validar que al menos una categoría esté seleccionada
              if (categoriasSeleccionadas.length === 0) {
                setErrorCategorias("Seleccione al menos una categoría")
                return
              }

              const nuevoConductor = {
                id: conductoresCargados.length + 1,
                nombre: nombreConductor,
                dni: dniConductor,
                telefono: telefonoConductor,
                numeroLicencia: numeroLicencia,
                categorias: categoriasSeleccionadas,
                licencia: licenciaConducir ? licenciaConducir.name : "sin_licencia.pdf",
                fechaVencimientoLicencia: fechaVencimientoLicencia
                  ? fechaVencimientoLicencia.toISOString().split("T")[0]
                  : new Date().toISOString().split("T")[0],
              }

              setConductoresCargados([...conductoresCargados, nuevoConductor])

              // Limpiar campos
              setNombreConductor("")
              setDniConductor("")
              setTelefonoConductor("")
              setNumeroLicencia("")
              setCategoriasSeleccionadas([])
              setLicenciaConducir(null)
              setFechaVencimientoLicencia(undefined)
              setErrorCategorias("")

              setIsNewConductorModalOpen(false)
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="nombreConductor" className="text-base font-medium text-gray-700 mb-2 block">
                  Nombre *
                </Label>
                <Input
                  id="nombreConductor"
                  value={nombreConductor}
                  onChange={(e) => setNombreConductor(e.target.value)}
                  placeholder="Nombre completo"
                  className="h-12 text-base"
                />
              </div>
              <div>
                <Label htmlFor="dniConductor" className="text-base font-medium text-gray-700 mb-2 block">
                  DNI *
                </Label>
                <Input
                  id="dniConductor"
                  value={dniConductor}
                  onChange={(e) => setDniConductor(e.target.value.replace(/\D/g, ""))}
                  placeholder="12345678"
                  maxLength={8}
                  className="h-12 text-base"
                />
              </div>
              <div>
                <Label htmlFor="telefonoConductor" className="text-base font-medium text-gray-700 mb-2 block">
                  Teléfono *
                </Label>
                <Input
                  id="telefonoConductor"
                  value={telefonoConductor}
                  onChange={(e) => setTelefonoConductor(e.target.value)}
                  placeholder="11-1234-5678"
                  className="h-12 text-base"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="numeroLicencia" className="text-base font-medium text-gray-700 mb-2 block">
                  Número de Licencia *
                </Label>
                <Input
                  id="numeroLicencia"
                  value={numeroLicencia}
                  onChange={(e) => setNumeroLicencia(e.target.value)}
                  placeholder="11-1234-5678"
                  className="h-12 text-base"
                />
              </div>
            </div>

            <div>
              <Label className="mb-2 block">Categorías de Licencia</Label>
              <div className="border rounded-md p-4">
                <p className="text-sm text-gray-600 mb-2">Seleccione todas las categorías que apliquen:</p>
                <div className="grid grid-cols-7 gap-2">
                  {categoriasLicencia.map((categoria) => (
                    <div key={categoria} className="flex items-center space-x-2">
                      <Checkbox
                        id={`categoria-${categoria}`}
                        checked={categoriasSeleccionadas.includes(categoria)}
                        onChange={(e) => {
                          const checked = e.target.checked
                          if (checked) {
                            setCategoriasSeleccionadas([...categoriasSeleccionadas, categoria])
                            setErrorCategorias("")
                          } else {
                            setCategoriasSeleccionadas(categoriasSeleccionadas.filter((cat) => cat !== categoria))
                          }
                        }}
                      />
                      <Label htmlFor={`categoria-${categoria}`} className="text-sm font-normal">
                        {categoria}
                      </Label>
                    </div>
                  ))}
                </div>
                {errorCategorias && <p className="text-red-500 text-xs mt-2">{errorCategorias}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fechaVencimientoLicencia">Fecha Vencimiento Licencia</Label>
                <div className="relative" ref={licenciaCalendarRef}>
                  <div
                    className="flex items-center border border-gray-300 rounded-md px-3 py-2 h-10 cursor-pointer"
                    onClick={() => setShowLicenciaCalendar(!showLicenciaCalendar)}
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
                <Label htmlFor="licenciaConducir">Licencia de Conducir</Label>
                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 h-10 cursor-pointer">
                  <label htmlFor="licenciaConducirInput" className="flex items-center cursor-pointer w-full">
                    <Upload className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600 truncate">
                      {licenciaConducir ? licenciaConducir.name : "Seleccionar archivo"}
                    </span>
                  </label>
                  <input
                    id="licenciaConducirInput"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setLicenciaConducir)}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Ningún archivo seleccionado</p>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setNombreConductor("")
                  setDniConductor("")
                  setTelefonoConductor("")
                  setNumeroLicencia("")
                  setCategoriasSeleccionadas([])
                  setLicenciaConducir(null)
                  setFechaVencimientoLicencia(undefined)
                  setErrorCategorias("")
                  setIsNewConductorModalOpen(false)
                }}
                className="border border-gray-300 bg-white text-black hover:bg-gray-50"
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-900 hover:bg-blue-800 text-white">
                Guardar Conductor
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal para agregar nuevo vehículo */}
      <Dialog open={isNewVehiculoModalOpen} onOpenChange={setIsNewVehiculoModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Nuevo Vehículo</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()

              const nuevoVehiculo = {
                id: vehiculosCargados.length + 1,
                tipo: tipoVehiculo,
                patente: patenteVehiculo,
                marca: marcaVehiculo,
                modelo: modeloVehiculo,
                titular: titularVehiculo,
                conductorNoTitular: tipoVehiculo !== "Acoplado" && conductorNoTitular,
                seguro: seguroVehiculo ? seguroVehiculo.name : "sin_seguro.pdf",
                cedulaVerde: cedulaVerde ? cedulaVerde.name : "sin_cedula_verde.pdf",
                certificadoSeguridadVehicular: certificadoSeguridadVehicular
                  ? certificadoSeguridadVehicular.name
                  : null,
                cedulaAzul: conductorNoTitular && cedulaAzul ? cedulaAzul.name : null,
                fechaVencimientoSeguro: fechaVencimientoSeguro
                  ? fechaVencimientoSeguro.toISOString().split("T")[0]
                  : new Date().toISOString().split("T")[0],
              }

              setVehiculosCargados([...vehiculosCargados, nuevoVehiculo])

              // Limpiar campos
              setTipoVehiculo("")
              setPatenteVehiculo("")
              setMarcaVehiculo("")
              setModeloVehiculo("")
              setTitularVehiculo("")
              setConductorNoTitular(false)
              setSeguroVehiculo(null)
              setCedulaVerde(null)
              setCertificadoSeguridadVehicular(null)
              setCedulaAzul(null)
              setFechaVencimientoSeguro(undefined)
              setIsNewVehiculoModalOpen(false)
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tipoVehiculo">Tipo</Label>
                <Select value={tipoVehiculo} onValueChange={setTipoVehiculo} required>
                  <SelectTrigger id="tipoVehiculo">
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
                <Label htmlFor="patenteVehiculo">Patente</Label>
                <Input
                  id="patenteVehiculo"
                  value={patenteVehiculo}
                  onChange={(e) => setPatenteVehiculo(e.target.value.toUpperCase())}
                  placeholder="ABC123 o AB123CD"
                  className="h-12 text-base"
                />
              </div>
              <div>
                <Label htmlFor="marcaVehiculo">Marca</Label>
                <Input id="marcaVehiculo" value={marcaVehiculo} onChange={(e) => setMarcaVehiculo(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="modeloVehiculo">Modelo</Label>
                <Input id="modeloVehiculo" value={modeloVehiculo} onChange={(e) => setModeloVehiculo(e.target.value)} />
              </div>
              <div className="col-span-2">
                <Label htmlFor="titularVehiculo">Nombre completo del titular</Label>
                <Input
                  id="titularVehiculo"
                  value={titularVehiculo}
                  onChange={(e) => setTitularVehiculo(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cedulaVerde">Cédula Verde</Label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 h-10 cursor-pointer">
                <label htmlFor="cedulaVerdeInput" className="flex items-center cursor-pointer w-full">
                  <Upload className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600 truncate">
                    {cedulaVerde ? cedulaVerde.name : "Seleccionar archivo"}
                  </span>
                </label>
                <input
                  id="cedulaVerdeInput"
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setCedulaVerde)}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Ningún archivo seleccionado</p>
            </div>

            <div>
              <Label htmlFor="seguroVehiculo">Seguro</Label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 h-10 cursor-pointer">
                <label htmlFor="seguroVehiculoInput" className="flex items-center cursor-pointer w-full">
                  <Upload className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600 truncate">
                    {seguroVehiculo ? seguroVehiculo.name : "Seleccionar archivo"}
                  </span>
                </label>
                <input
                  id="seguroVehiculoInput"
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setSeguroVehiculo)}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Ningún archivo seleccionado</p>
            </div>

            {tipoVehiculo === "Acoplado" && (
              <div>
                <Label htmlFor="certificadoSeguridadVehicular">Certificado de Seguridad Vehicular</Label>
                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 h-10 cursor-pointer">
                  <label
                    htmlFor="certificadoSeguridadVehicularInput"
                    className="flex items-center cursor-pointer w-full"
                  >
                    <Upload className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600 truncate">
                      {certificadoSeguridadVehicular ? certificadoSeguridadVehicular.name : "Seleccionar archivo"}
                    </span>
                  </label>
                  <input
                    id="certificadoSeguridadVehicularInput"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setCertificadoSeguridadVehicular)}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Ningún archivo seleccionado</p>
              </div>
            )}

            {tipoVehiculo !== "Acoplado" && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="conductorNoTitular"
                  checked={conductorNoTitular}
                  onCheckedChange={(checked) => setConductorNoTitular(checked as boolean)}
                />
                <Label htmlFor="conductorNoTitular" className="text-sm font-normal">
                  El vehículo lo conduce alguien que no es el titular
                </Label>
              </div>
            )}

            {tipoVehiculo !== "Acoplado" && conductorNoTitular && (
              <div>
                <Label htmlFor="cedulaAzul">Cédula Azul</Label>
                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 h-10 cursor-pointer">
                  <label htmlFor="cedulaAzulInput" className="flex items-center cursor-pointer w-full">
                    <Upload className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600 truncate">
                      {cedulaAzul ? cedulaAzul.name : "Seleccionar archivo"}
                    </span>
                  </label>
                  <input
                    id="cedulaAzulInput"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setCedulaAzul)}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Ningún archivo seleccionado</p>
              </div>
            )}

            <div>
              <Label htmlFor="fechaVencimientoSeguro">Fecha Vencimiento Seguro</Label>
              <div className="relative" ref={seguroCalendarRef}>
                <div
                  className="flex items-center border border-gray-300 rounded-md px-3 py-2 h-10 cursor-pointer"
                  onClick={() => setShowSeguroCalendar(!showSeguroCalendar)}
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
                onClick={() => {
                  setTipoVehiculo("")
                  setPatenteVehiculo("")
                  setMarcaVehiculo("")
                  setModeloVehiculo("")
                  setTitularVehiculo("")
                  setConductorNoTitular(false)
                  setSeguroVehiculo(null)
                  setCedulaVerde(null)
                  setCertificadoSeguridadVehicular(null)
                  setCedulaAzul(null)
                  setFechaVencimientoSeguro(undefined)
                  setIsNewVehiculoModalOpen(false)
                }}
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
