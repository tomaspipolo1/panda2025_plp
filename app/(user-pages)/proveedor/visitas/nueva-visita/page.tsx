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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

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

interface Documento {
  id: string
  nombre: string
  archivo: File
  tipo: string
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

// Datos de ejemplo para personal cargado (desde Mi Personal)
const personalCargadoData = [
  {
    id: 1,
    nombreCompleto: "Juan Carlos Pérez",
    dni: "12.345.678",
    telefono: "+54 11 1234-5678",
  },
  {
    id: 2,
    nombreCompleto: "María Elena González",
    dni: "23.456.789",
    telefono: "+54 11 2345-6789",
  },
  {
    id: 3,
    nombreCompleto: "Roberto Silva",
    dni: "34.567.890",
    telefono: "+54 11 3456-7890",
  },
  {
    id: 4,
    nombreCompleto: "Ana Martínez",
    dni: "45.678.901",
    telefono: "+54 11 4567-8901",
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
  const [telefonoPersona, setTelefonoPersona] = useState<string>("")

  // Estados para vehículos
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([])

  // Estados para vehículos y conductores cargados
  const [vehiculosCargados, setVehiculosCargados] = useState(vehiculosCargadosData)
  const [conductoresCargados, setConductoresCargados] = useState(conductoresCargadosData)
  const [personalCargado, setPersonalCargado] = useState(personalCargadoData)
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
  const categoriasLicencia = [
    "A.1",
    "A.2",
    "A.3",
    "A.4",
    "A.5",
    "B.1",
    "B.2",
    "C.1",
    "C.2",
    "D.1",
    "D.2",
    "D.3",
    "E.1",
    "E.2",
    "F",
    "G.1",
    "G.2",
    "G.3",
  ]

  // Estados para conductor
  const [nombreConductor, setNombreConductor] = useState<string>("")
  const [dniConductor, setDniConductor] = useState<string>("")
  const [telefonoConductor, setTelefonoConductor] = useState<string>("")
  const [emailConductor, setEmailConductor] = useState<string>("")
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

  // Estados para documentos
  const [documentos, setDocumentos] = useState<Documento[]>([])
  const [tipoDocumento, setTipoDocumento] = useState<string>("")
  const [archivoDocumento, setArchivoDocumento] = useState<File | null>(null)

  const tiposVisita = ["Laboral", "Transporte Cargas", "Acceso a Obra", "Acceso a Muelle"]

  const tiposVehiculo = ["Auto", "Camioneta", "Camión", "Utilitario", "Moto", "Acoplado"]

  // Opciones de destino
  const opcionesDestino = [
    "Areneras",
    "Terminal TEC Plata",
    "Copetro",
    "Deposito Fiscal",
    "PLP - Oficinas Administrativas",
    "Zona Operativa/Muelles",
    "PLP - Pañol/Deposito",
    "PLP - Obras e Ingenieria",
    "PLP - Taller de herreria",
    "PLP - Taller de Locomotoras",
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

  // Estados para autocompletado de personal
  const [nombreSugerencias, setNombreSugerencias] = useState<typeof personalCargadoData>([])
  const [showSugerencias, setShowSugerencias] = useState(false)

  // Agregar referencia para el autocompletado
  const autocompletadoRef = useRef<HTMLDivElement>(null)

  // Función para filtrar sugerencias de personal
  const filtrarSugerencias = (texto: string) => {
    if (texto.length < 2) {
      setNombreSugerencias([])
      setShowSugerencias(false)
      return
    }

    const sugerencias = personalCargado.filter((persona) =>
      persona.nombreCompleto.toLowerCase().includes(texto.toLowerCase()),
    )
    setNombreSugerencias(sugerencias)
    setShowSugerencias(sugerencias.length > 0)
  }

  // Función para seleccionar una sugerencia
  const seleccionarSugerencia = (persona: (typeof personalCargadoData)[0]) => {
    setNombrePersona(persona.nombreCompleto)
    setDocumentoPersona(persona.dni)
    setTelefonoPersona(persona.telefono)
    setShowSugerencias(false)
    setNombreSugerencias([])
  }

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
      if (autocompletadoRef.current && !autocompletadoRef.current.contains(event.target as Node)) {
        setShowSugerencias(false)
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
      (destino === "PLP - Oficinas Administrativas" ||
        destino === "PLP - Pañol/Deposito" ||
        destino === "PLP - Obras e Ingenieria" ||
        destino === "PLP - Taller de herreria" ||
        destino === "PLP - Taller de Locomotoras") &&
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
        empresa: "",
        telefono: telefonoPersona,
      }
      setPersonas([...personas, nuevaPersona])

      // Limpiar campos
      setNombrePersona("")
      setDocumentoPersona("")
      setTelefonoPersona("")
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

  // Función para agregar documento
  const agregarDocumento = () => {
    if (archivoDocumento && tipoDocumento) {
      const nuevoDocumento: Documento = {
        id: Date.now().toString(),
        nombre: archivoDocumento.name,
        archivo: archivoDocumento,
        tipo: tipoDocumento,
      }
      setDocumentos([...documentos, nuevoDocumento])
      setArchivoDocumento(null)
      setTipoDocumento("")

      // Resetear el input de archivo
      const fileInput = document.getElementById("documentoInput") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    }
  }

  // Función para eliminar documento
  const eliminarDocumento = (id: string) => {
    setDocumentos(documentos.filter((doc) => doc.id !== id))
  }

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    if (validateForm()) {
      console.log("Formulario enviado correctamente")
      console.log("Operacion:", operacion)
      console.log("Persona Responsable:", personaResponsable)
      // Aquí iría la lógica para enviar los datos al servidor
      alert("Solicitud enviada correctamente")
      setOperacion("")
      setPersonaResponsable("")
    } else {
      console.log("Formulario con errores", errors)
    }
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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <Link
          href="/proveedor/visitas/mis-visitas"
          className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Volver</span>
        </Link>
        <h1 className="text-2xl font-bold">Nueva Visita</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Sección principal */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
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

          {/* Operacion (solo para Transporte Cargas) */}
          {isTransporteCarga && (
            <div>
              <Label htmlFor="operacion" className="text-sm font-medium text-gray-700 mb-1 block">
                Operación
              </Label>
              <Select value={operacion} onValueChange={setOperacion}>
                <SelectTrigger
                  id="operacion"
                  className={`w-full ${submitted && errors.operacion ? "border-red-500 focus:ring-red-500" : ""}`}
                >
                  <SelectValue placeholder="Seleccionar operación" />
                </SelectTrigger>
                <SelectContent>
                  {tiposOperacion.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {submitted && errors.operacion && <p className="text-red-500 text-xs mt-1">{errors.operacion}</p>}
            </div>
          )}

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

          {/* Especificar otro tipo de carga (cuando se selecciona "Otro") */}
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

          {/* Destino y Transporte terciarizado en la misma fila */}
          {isTransporteCarga ? (
            <>
              {/* Si hay persona responsable, destino y persona responsable van juntos */}
              {destino === "PLP - Oficinas Administrativas" ||
              destino === "PLP - Pañol/Deposito" ||
              destino === "PLP - Obras e Ingenieria" ||
              destino === "PLP - Taller de herreria" ||
              destino === "PLP - Taller de Locomotoras" ? (
                <>
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

                  {/* Persona Responsable del Puerto */}
                  <div>
                    <Label htmlFor="personaResponsable" className="text-sm font-medium text-gray-700 mb-1 block">
                      Persona Responsable del Puerto
                    </Label>
                    <Select value={personaResponsable} onValueChange={setPersonaResponsable}>
                      <SelectTrigger
                        id="personaResponsable"
                        className={`w-full ${submitted && errors.personaResponsable ? "border-red-500 focus:ring-red-500" : ""}`}
                      >
                        <SelectValue placeholder="Seleccionar persona responsable" />
                      </SelectTrigger>
                      <SelectContent>
                        {personasResponsables.map((persona) => (
                          <SelectItem key={persona} value={persona}>
                            {persona}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {submitted && errors.personaResponsable && (
                      <p className="text-red-500 text-xs mt-1">{errors.personaResponsable}</p>
                    )}
                  </div>

                  {/* Checkbox para transporte terciarizado en fila separada */}
                  <div className="col-span-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="transporteTerciarizado"
                        checked={transporteTerciarizado}
                        onCheckedChange={(checked) => setTransporteTerciarizado(checked as boolean)}
                      />
                      <Label htmlFor="transporteTerciarizado" className="font-medium text-gray-700">
                        Transporte terciarizado
                      </Label>
                    </div>
                  </div>
                </>
              ) : (
                /* Si no hay persona responsable, destino y checkbox van juntos */
                <div className="col-span-2 grid grid-cols-2 gap-10 items-end">
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

                  {/* Checkbox para transporte terciarizado */}
                  <div className="pb-1">
                    <div className="flex items-center space-x-2 h-10">
                      <Checkbox
                        id="transporteTerciarizado"
                        checked={transporteTerciarizado}
                        onCheckedChange={(checked) => setTransporteTerciarizado(checked as boolean)}
                      />
                      <Label htmlFor="transporteTerciarizado" className="font-medium text-gray-700">
                        Transporte terciarizado
                      </Label>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Destino solo cuando no es Transporte Cargas */}
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

              {/* Persona Responsable del Puerto (para destinos específicos cuando NO es Transporte Cargas) */}
              {(destino === "PLP - Oficinas Administrativas" ||
                destino === "PLP - Pañol/Deposito" ||
                destino === "PLP - Obras e Ingenieria" ||
                destino === "PLP - Taller de herreria" ||
                destino === "PLP - Taller de Locomotoras") && (
                <div>
                  <Label htmlFor="personaResponsable" className="text-sm font-medium text-gray-700 mb-1 block">
                    Persona Responsable del Puerto
                  </Label>
                  <Select value={personaResponsable} onValueChange={setPersonaResponsable}>
                    <SelectTrigger
                      id="personaResponsable"
                      className={`w-full ${submitted && errors.personaResponsable ? "border-red-500 focus:ring-red-500" : ""}`}
                    >
                      <SelectValue placeholder="Seleccionar persona responsable" />
                    </SelectTrigger>
                    <SelectContent>
                      {personasResponsables.map((persona) => (
                        <SelectItem key={persona} value={persona}>
                          {persona}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {submitted && errors.personaResponsable && (
                    <p className="text-red-500 text-xs mt-1">{errors.personaResponsable}</p>
                  )}
                </div>
              )}
            </>
          )}

          {/* Empresa de transporte (solo para Transporte Cargas terciarizado) */}
          {isTransporteCarga && transporteTerciarizado && (
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

          {/* Checkbox para visita recurrente (solo para tipos específicos) */}
          {(tipoVisita === "Transporte Cargas" ||
            tipoVisita === "Acceso a Obra" ||
            tipoVisita === "Acceso a Muelle") && (
            <div className="col-span-3">
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="visitaRecurrente"
                  checked={visitaRecurrente}
                  onCheckedChange={(checked) => setVisitaRecurrente(checked as boolean)}
                />
                <Label htmlFor="visitaRecurrente" className="font-medium text-gray-700">
                  Visita Recurrente
                </Label>
              </div>
            </div>
          )}

          {!visitaRecurrente ? (
            <>
              {/* Fecha y hora desde (para visitas no recurrentes) */}
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
                        setShowCalendarHasta(false)
                      }}
                    >
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-600">
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
                    {submitted && errors.fechaDesde && <p className="text-red-500 text-xs mt-1">{errors.fechaDesde}</p>}
                  </div>

                  {/* Selector de hora desde */}
                  <Input
                    id="horaDesde"
                    type="time"
                    value={horaDesde}
                    onChange={(e) => setHoraDesde(e.target.value)}
                    className={`w-full ${submitted && errors.horaDesde ? "border-red-500 focus:ring-red-500" : ""}`}
                  />
                  {submitted && errors.horaDesde && <p className="text-red-500 text-xs mt-1">{errors.horaDesde}</p>}
                </div>
              </div>

              {/* Fecha y hora hasta (para visitas no recurrentes) */}
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
                        setShowCalendarDesde(false)
                      }}
                    >
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-600">
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
                    {submitted && errors.fechaHasta && <p className="text-red-500 text-xs mt-1">{errors.fechaHasta}</p>}
                  </div>

                  {/* Selector de hora hasta */}
                  <Input
                    id="horaHasta"
                    type="time"
                    value={horaHasta}
                    onChange={(e) => setHoraHasta(e.target.value)}
                    className={`w-full ${submitted && errors.horaHasta ? "border-red-500 focus:ring-red-500" : ""}`}
                  />
                  {submitted && errors.horaHasta && <p className="text-red-500 text-xs mt-1">{errors.horaHasta}</p>}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Campos para visita recurrente */}
              <div className="col-span-3">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <h3 className="text-md font-medium text-gray-700 mb-3">Días de la semana</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {diasDeLaSemana.map((dia) => (
                      <div key={dia} className="flex items-center space-x-2">
                        <Checkbox
                          id={`dia-${dia}`}
                          checked={diasSemana.includes(dia)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setDiasSemana([...diasSemana, dia])
                            } else {
                              setDiasSemana(diasSemana.filter((d) => d !== dia))
                            }
                          }}
                        />
                        <Label htmlFor={`dia-${dia}`} className="text-sm font-normal">
                          {dia}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {submitted && diasSemana.length === 0 && (
                    <p className="text-red-500 text-xs mt-2">Debe seleccionar al menos un día de la semana</p>
                  )}
                </div>
              </div>

              {/* Horarios para visitas recurrentes */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Hora de ingreso</Label>
                <Input
                  id="horaDesde"
                  type="time"
                  value={horaDesde}
                  onChange={(e) => setHoraDesde(e.target.value)}
                  className={`w-full ${submitted && errors.horaDesde ? "border-red-500 focus:ring-red-500" : ""}`}
                />
                {submitted && errors.horaDesde && <p className="text-red-500 text-xs mt-1">{errors.horaDesde}</p>}
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Hora de egreso</Label>
                <Input
                  id="horaHasta"
                  type="time"
                  value={horaHasta}
                  onChange={(e) => setHoraHasta(e.target.value)}
                  className={`w-full ${submitted && errors.horaHasta ? "border-red-500 focus:ring-red-500" : ""}`}
                />
                {submitted && errors.horaHasta && <p className="text-red-500 text-xs mt-1">{errors.horaHasta}</p>}
              </div>

              {/* Fecha de inicio y fin de la recurrencia */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Fecha de inicio</Label>
                <div className="relative" ref={calendarDesdeRef}>
                  <div
                    className={`flex items-center border ${
                      submitted && errors.fechaDesde ? "border-red-500" : "border-gray-300"
                    } rounded-md px-3 py-2 h-10 cursor-pointer`}
                    onClick={() => {
                      setShowCalendarDesde(!showCalendarDesde)
                      setShowCalendarHasta(false)
                    }}
                  >
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600">
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
                  {submitted && errors.fechaDesde && <p className="text-red-500 text-xs mt-1">{errors.fechaDesde}</p>}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Fecha de fin</Label>
                <div className="relative" ref={calendarHastaRef}>
                  <div
                    className={`flex items-center border ${
                      submitted && errors.fechaHasta ? "border-red-500" : "border-gray-300"
                    } rounded-md px-3 py-2 h-10 cursor-pointer`}
                    onClick={() => {
                      setShowCalendarHasta(!showCalendarHasta)
                      setShowCalendarDesde(false)
                    }}
                  >
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600">
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
                  {submitted && errors.fechaHasta && <p className="text-red-500 text-xs mt-1">{errors.fechaHasta}</p>}
                </div>
              </div>
            </>
          )}
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

        {/* Sección de conductor (solo para Transporte Cargas NO terciarizado o Acceso a Obra) */}
        {((isTransporteCarga && !transporteTerciarizado) || tipoVisita === "Acceso a Obra") && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{tipoVisita === "Acceso a Obra" ? "Conductor" : "Conductor"}</h2>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="md:col-span-2">
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
                  onClick={() => {
                    if (conductorSeleccionado) {
                      const conductor = conductoresCargados.find((c) => c.id.toString() === conductorSeleccionado)
                      if (conductor) {
                        const nuevaPersona: Persona = {
                          id: Date.now().toString(),
                          nombre: conductor.nombre,
                          documento: conductor.dni,
                          empresa: empresaTransporte,
                          telefono: conductor.telefono,
                          numeroLicencia: conductor.numeroLicencia,
                          categorias: conductor.categorias,
                          fechaVencimientoLicencia: conductor.fechaVencimientoLicencia
                            ? new Date(conductor.fechaVencimientoLicencia)
                            : undefined,
                        }
                        setPersonas([...personas, nuevaPersona])
                        setConductorSeleccionado("")
                      }
                    }
                  }}
                  disabled={!conductorSeleccionado}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white"
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
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">N° de Licencia</th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-500">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {personas.map((persona) => (
                      <tr key={persona.id} className="border-b border-gray-200">
                        <td className="py-3 px-4">{persona.nombre}</td>
                        <td className="py-3 px-4">{persona.documento}</td>
                        <td className="py-3 px-4">{persona.numeroLicencia || "-"}</td>
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
            {submitted && errors.conductor && <p className="text-red-500 text-sm mt-2">{errors.conductor}</p>}
          </div>
        )}

        {/* Sección de personas (solo para visitas que no son Transporte Cargas O para Transporte Cargas NO terciarizado) */}
        {(!isTransporteCarga || (isTransporteCarga && !transporteTerciarizado)) && (
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
              <div className="relative" ref={autocompletadoRef}>
                <Label htmlFor="nombrePersona" className="text-sm font-medium text-gray-700 mb-1 block">
                  Nombre
                </Label>
                <Input
                  id="nombrePersona"
                  value={nombrePersona}
                  onChange={(e) => {
                    setNombrePersona(e.target.value)
                    filtrarSugerencias(e.target.value)
                  }}
                  placeholder="Nombre completo"
                  autoComplete="off"
                />
                {showSugerencias && (
                  <div className="absolute z-10 top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {nombreSugerencias.map((persona) => (
                      <div
                        key={persona.id}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() => seleccionarSugerencia(persona)}
                      >
                        <div className="font-medium text-sm">{persona.nombreCompleto}</div>
                        <div className="text-xs text-gray-500">DNI: {persona.dni}</div>
                      </div>
                    ))}
                  </div>
                )}
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
                <Label htmlFor="telefonoPersona" className="text-sm font-medium text-gray-700 mb-1 block">
                  Teléfono (opcional)
                </Label>
                <Input
                  id="telefonoPersona"
                  value={telefonoPersona}
                  onChange={(e) => setTelefonoPersona(e.target.value)}
                  placeholder="Número de teléfono"
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
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Teléfono</th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-500">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {personas.map((persona) => (
                      <tr key={persona.id} className="border-b border-gray-200">
                        <td className="py-3 px-4">{persona.nombre}</td>
                        <td className="py-3 px-4">{persona.documento}</td>
                        <td className="py-3 px-4">{persona.telefono || "-"}</td>
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

        {/* Sección de vehículos (solo cuando NO es transporte terciarizado) */}
        {!transporteTerciarizado && (
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="md:col-span-2">
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
                  onClick={() => {
                    if (vehiculoSeleccionado) {
                      const vehiculo = vehiculosCargados.find((v) => v.id.toString() === vehiculoSeleccionado)
                      if (vehiculo) {
                        const nuevoVehiculo: Vehiculo = {
                          id: Date.now().toString(),
                          tipo: vehiculo.tipo,
                          patente: vehiculo.patente,
                          marca: vehiculo.marca,
                          modelo: vehiculo.modelo,
                          fechaVencimientoSeguro: vehiculo.fechaVencimientoSeguro
                            ? new Date(vehiculo.fechaVencimientoSeguro)
                            : undefined,
                        }
                        setVehiculos([...vehiculos, nuevoVehiculo])
                        setVehiculoSeleccionado("")
                      }
                    }
                  }}
                  disabled={!vehiculoSeleccionado}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white"
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
        )}

        {/* Sección de observaciones */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <Label htmlFor="observaciones" className="text-sm font-medium text-gray-700 mb-1 block">
            Observaciones
          </Label>
          <Textarea
            id="observaciones"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            placeholder="Ingrese cualquier información adicional relevante para la visita..."
            rows={4}
          />
        </div>

        {/* Sección de documentación (solo para Acceso a Obra) */}
        {tipoVisita === "Acceso a Obra" && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Documentación</h2>
              <Button
                type="button"
                variant="outline"
                onClick={agregarDocumento}
                className="flex items-center"
                disabled={!archivoDocumento || !tipoDocumento}
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Documento
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <Label htmlFor="tipoDocumento" className="text-sm font-medium text-gray-700 mb-1 block">
                  Tipo de Documento
                </Label>
                <Select value={tipoDocumento} onValueChange={setTipoDocumento}>
                  <SelectTrigger id="tipoDocumento">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ART">ART</SelectItem>
                    <SelectItem value="Seguro">Seguro</SelectItem>
                    <SelectItem value="Certificado">Certificado</SelectItem>
                    <SelectItem value="Permiso">Permiso</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="documentoInput" className="text-sm font-medium text-gray-700 mb-1 block">
                  Archivo
                </Label>
                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 h-10 cursor-pointer">
                  <label htmlFor="documentoInput" className="flex items-center cursor-pointer w-full">
                    <Upload className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600 truncate">
                      {archivoDocumento ? archivoDocumento.name : "Seleccionar archivo"}
                    </span>
                  </label>
                  <input
                    id="documentoInput"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setArchivoDocumento(e.target.files[0])
                      }
                    }}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                </div>
              </div>
            </div>

            {documentos.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Tipo</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Nombre</th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-500">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documentos.map((documento) => (
                      <tr key={documento.id} className="border-b border-gray-200">
                        <td className="py-3 px-4">{documento.tipo}</td>
                        <td className="py-3 px-4">{documento.nombre}</td>
                        <td className="py-3 px-4 text-center">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => eliminarDocumento(documento.id)}
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
              <p className="text-gray-500 text-sm italic">
                No hay documentos cargados. Agregue documentos como ART, seguros, certificados u otros permisos
                necesarios.
              </p>
            )}
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button" asChild>
            <Link href="/proveedor/visitas/mis-visitas">Cancelar</Link>
          </Button>
          <Button type="submit" className="bg-blue-900 hover:bg-blue-950 text-white">
            Enviar Solicitud
          </Button>
        </div>
      </form>

      {/* Modal para agregar nuevo conductor */}
      <Dialog open={isNewConductorModalOpen} onOpenChange={setIsNewConductorModalOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nuevo Conductor</DialogTitle>
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
                email: emailConductor,
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
              setEmailConductor("")
              setNumeroLicencia("")
              setCategoriasSeleccionadas([])
              setLicenciaConducir(null)
              setFechaVencimientoLicencia(undefined)
              setErrorCategorias("")

              setIsNewConductorModalOpen(false)
            }}
            className="space-y-6"
          >
            {/* Primera fila: Nombre, DNI, Teléfono */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="nombreConductor" className="text-sm font-medium text-gray-700">
                  Nombre Completo
                </Label>
                <Input
                  id="nombreConductor"
                  name="nombreConductor"
                  value={nombreConductor}
                  onChange={(e) => setNombreConductor(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="dniConductor" className="text-sm font-medium text-gray-700">
                  DNI
                </Label>
                <Input
                  id="dniConductor"
                  name="dniConductor"
                  value={dniConductor}
                  onChange={(e) => setDniConductor(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="telefonoConductor" className="text-sm font-medium text-gray-700">
                  Teléfono
                </Label>
                <Input
                  id="telefonoConductor"
                  name="telefonoConductor"
                  value={telefonoConductor}
                  onChange={(e) => setTelefonoConductor(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Segunda fila: Email, N° Licencia, Fecha Vencimiento */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="emailConductor" className="text-sm font-medium text-gray-700">
                  Email (Opcional)
                </Label>
                <Input
                  id="emailConductor"
                  name="emailConductor"
                  type="email"
                  value={emailConductor}
                  onChange={(e) => setEmailConductor(e.target.value)}
                  placeholder="ejemplo@email.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="numeroLicencia" className="text-sm font-medium text-gray-700">
                  N° de Licencia
                </Label>
                <Input
                  id="numeroLicencia"
                  name="numeroLicencia"
                  value={numeroLicencia}
                  onChange={(e) => setNumeroLicencia(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="fechaVencimientoLicencia" className="text-sm font-medium text-gray-700">
                  Fecha Vencimiento Licencia
                </Label>
                <div className="relative mt-1" ref={licenciaCalendarRef}>
                  <div
                    className="flex items-center border border-gray-300 rounded-md px-3 py-2 h-10 cursor-pointer"
                    onClick={() => setShowLicenciaCalendar(!showLicenciaCalendar)}
                  >
                    <span className="text-sm text-gray-600 flex-1">
                      {fechaVencimientoLicencia
                        ? format(fechaVencimientoLicencia, "dd/MM/yyyy", { locale: es })
                        : "dd/mm/aaaa"}
                    </span>
                    <Calendar className="h-4 w-4 text-gray-500" />
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
            </div>

            {/* Categorías de Licencia */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Categorías de Licencia</Label>
              <div className="border rounded-md p-4 bg-gray-50">
                <p className="text-sm text-gray-600 mb-3">Seleccione todas las categorías que apliquen:</p>
                <div className="grid grid-cols-6 gap-3">
                  {categoriasLicencia.map((categoria) => (
                    <div key={categoria} className="flex items-center space-x-2">
                      <Checkbox
                        id={`categoria-${categoria}`}
                        checked={categoriasSeleccionadas.includes(categoria)}
                        onCheckedChange={(checked) => {
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
                {errorCategorias && <p className="text-red-500 text-sm mt-2">{errorCategorias}</p>}
              </div>
            </div>

            {/* Licencia de Conducir */}
            <div>
              <Label htmlFor="licenciaConducir" className="text-sm font-medium text-gray-700 mb-2 block">
                Licencia de Conducir
              </Label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 h-10 cursor-pointer bg-white">
                <label htmlFor="licenciaConducirInput" className="flex items-center cursor-pointer w-full">
                  <span className="text-sm text-gray-600">Seleccionar archivo</span>
                  <span className="text-sm text-gray-400 ml-2">
                    {licenciaConducir ? licenciaConducir.name : "Ningún archivo seleccionado"}
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
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setNombreConductor("")
                  setDniConductor("")
                  setTelefonoConductor("")
                  setEmailConductor("")
                  setNumeroLicencia("")
                  setCategoriasSeleccionadas([])
                  setLicenciaConducir(null)
                  setFechaVencimientoLicencia(undefined)
                  setErrorCategorias("")
                  setIsNewConductorModalOpen(false)
                }}
                className="px-6"
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-900 hover:bg-blue-800 text-white px-6">
                Guardar Conductor
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal para agregar nuevo vehículo */}
      <Dialog open={isNewVehiculoModalOpen} onOpenChange={setIsNewVehiculoModalOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nuevo Vehículo</DialogTitle>
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
                  onChange={(e) => setPatenteVehiculo(e.target.value)}
                  required
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
