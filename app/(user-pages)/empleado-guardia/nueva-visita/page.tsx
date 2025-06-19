"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Calendar, Plus, Trash2, ChevronLeft, ChevronRight, Camera, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { format, addMonths, subMonths } from "date-fns"
import { es } from "date-fns/locale"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

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
            {(destino === "PLP - Oficinas Administrativas" ||
              destino === "PLP - Pañol/Deposito" ||
              destino === "PLP - Obras e Ingenieria" ||
              destino === "PLP - Taller de herreria" ||
              destino === "PLP - Taller de Locomotoras") && (
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

        {/* Sección de vehículos - Optimizada para tablet */}
        {!transporteTerciarizado && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Vehículos</h2>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsNewVehiculoModalOpen(true)}
                className="flex items-center h-12 px-6 text-base"
              >
                <Plus className="h-5 w-5 mr-2" />
                Nuevo Vehículo
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="vehiculoSeleccionado" className="text-base font-medium text-gray-700 mb-2 block">
                  Seleccionar Vehículo
                </Label>
                <Select value={vehiculoSeleccionado} onValueChange={setVehiculoSeleccionado}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Seleccionar vehículo" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehiculosCargados.map((vehiculo) => (
                      <SelectItem key={vehiculo.id} value={vehiculo.id.toString()} className="text-base py-3">
                        {vehiculo.tipo} - {vehiculo.marca} {vehiculo.modelo} - {vehiculo.patente}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="agregarVehiculo" className="text-base font-medium text-gray-700 mb-2 block">
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
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white h-12 text-base"
                >
                  Agregar Vehículo
                </Button>
              </div>
            </div>

            {vehiculos.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-4 px-4 text-left text-base font-medium text-gray-500">Tipo</th>
                      <th className="py-4 px-4 text-left text-base font-medium text-gray-500">Patente</th>
                      <th className="py-4 px-4 text-left text-base font-medium text-gray-500">Marca</th>
                      <th className="py-4 px-4 text-left text-base font-medium text-gray-500">Modelo</th>
                      <th className="py-4 px-4 text-center text-base font-medium text-gray-500">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehiculos.map((vehiculo) => (
                      <tr key={vehiculo.id} className="border-b border-gray-200">
                        <td className="py-4 px-4 text-base">{vehiculo.tipo}</td>
                        <td className="py-4 px-4 text-base">{vehiculo.patente}</td>
                        <td className="py-4 px-4 text-base">{vehiculo.marca || "-"}</td>
                        <td className="py-4 px-4 text-base">{vehiculo.modelo || "-"}</td>
                        <td className="py-4 px-4 text-center">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => eliminarVehiculo(vehiculo.id)}
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

        {/* Sección de conductores - Solo para Transporte Cargas */}
        {isTransporteCarga && !transporteTerciarizado && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Conductores</h2>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsNewConductorModalOpen(true)}
                className="flex items-center h-12 px-6 text-base"
              >
                <Plus className="h-5 w-5 mr-2" />
                Nuevo Conductor
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="conductorSeleccionado" className="text-base font-medium text-gray-700 mb-2 block">
                  Seleccionar Conductor
                </Label>
                <Select value={conductorSeleccionado} onValueChange={setConductorSeleccionado}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Seleccionar conductor" />
                  </SelectTrigger>
                  <SelectContent>
                    {conductoresCargados.map((conductor) => (
                      <SelectItem key={conductor.id} value={conductor.id.toString()} className="text-base py-3">
                        {conductor.nombre} - DNI: {conductor.dni}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="agregarConductor" className="text-base font-medium text-gray-700 mb-2 block">
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
                          empresa: "Conductor",
                          telefono: conductor.telefono,
                          numeroLicencia: conductor.numeroLicencia,
                        }
                        setPersonas([...personas, nuevaPersona])
                        setConductorSeleccionado("")
                      }
                    }
                  }}
                  disabled={!conductorSeleccionado}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white h-12 text-base"
                >
                  Agregar Conductor
                </Button>
              </div>
            </div>
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
            <Link href="/empleado-guardia/visita">Cancelar</Link>
          </Button>
          <Button type="submit" className="bg-blue-900 hover:bg-blue-950 text-white h-12 px-8 text-base">
            Enviar Solicitud
          </Button>
        </div>
      </form>

      {/* Modal para Nuevo Vehículo */}
      <Dialog open={isNewVehiculoModalOpen} onOpenChange={setIsNewVehiculoModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Nuevo Vehículo</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="patenteVehiculo" className="text-base font-medium text-gray-700 mb-2 block">
                  Patente *
                </Label>
                <Input
                  id="patenteVehiculo"
                  value={patenteVehiculo}
                  onChange={(e) => setPatenteVehiculo(e.target.value.toUpperCase())}
                  placeholder="ABC123 o AB123CD"
                  className="h-12 text-base"
                />
              </div>

              <div>
                <Label htmlFor="tipoVehiculo" className="text-base font-medium text-gray-700 mb-2 block">
                  Tipo de Vehículo
                </Label>
                <Select value={tipoVehiculo} onValueChange={setTipoVehiculo}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposVehiculo.map((tipo) => (
                      <SelectItem key={tipo} value={tipo} className="text-base py-3">
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="marcaVehiculo" className="text-base font-medium text-gray-700 mb-2 block">
                  Marca *
                </Label>
                <Input
                  id="marcaVehiculo"
                  value={marcaVehiculo}
                  onChange={(e) => setMarcaVehiculo(e.target.value)}
                  placeholder="Ej: Toyota, Ford, etc."
                  className="h-12 text-base"
                />
              </div>

              <div>
                <Label htmlFor="modeloVehiculo" className="text-base font-medium text-gray-700 mb-2 block">
                  Modelo *
                </Label>
                <Input
                  id="modeloVehiculo"
                  value={modeloVehiculo}
                  onChange={(e) => setModeloVehiculo(e.target.value)}
                  placeholder="Ej: Corolla, Ranger, etc."
                  className="h-12 text-base"
                />
              </div>
            </div>

            {/* Seguro del vehículo */}
            <div>
              <Label className="text-base font-medium text-gray-700 mb-2 block">Seguro del Vehículo *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {seguroVehiculo ? (
                  <div className="space-y-2">
                    <div className="text-green-600 font-medium">✓ Foto del seguro capturada</div>
                    <div className="text-sm text-gray-500">{seguroVehiculo.name}</div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setSeguroVehiculo(null)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Eliminar
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto" />
                    <div className="text-gray-600">Tomar foto del seguro</div>
                    <Button
                      type="button"
                      onClick={() => capturarFoto(setSeguroVehiculo)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Camera className="h-5 w-5 mr-2" />
                      Capturar Foto
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Cédula verde */}
            <div>
              <Label className="text-base font-medium text-gray-700 mb-2 block">Cédula Verde *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {cedulaVerde ? (
                  <div className="space-y-2">
                    <div className="text-green-600 font-medium">✓ Foto de la cédula verde capturada</div>
                    <div className="text-sm text-gray-500">{cedulaVerde.name}</div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setCedulaVerde(null)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Eliminar
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto" />
                    <div className="text-gray-600">Tomar foto de la cédula verde</div>
                    <Button
                      type="button"
                      onClick={() => capturarFoto(setCedulaVerde)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Camera className="h-5 w-5 mr-2" />
                      Capturar Foto
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Vencimiento del seguro */}
            <div>
              <Label className="text-base font-medium text-gray-700 mb-2 block">Vencimiento del Seguro *</Label>
              <div className="relative" ref={seguroCalendarRef}>
                <div
                  className="flex items-center border border-gray-300 rounded-md px-3 py-3 h-12 cursor-pointer text-base"
                  onClick={() => {
                    setShowSeguroCalendar(!showSeguroCalendar)
                    setShowLicenciaCalendar(false)
                  }}
                >
                  <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="text-gray-600">
                    {fechaVencimientoSeguro ? format(fechaVencimientoSeguro, "dd/MM/yyyy") : "Seleccionar fecha"}
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
          </div>

          <DialogFooter className="space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsNewVehiculoModalOpen(false)
                limpiarCamposVehiculo()
              }}
              className="h-12 px-6 text-base"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={agregarNuevoVehiculo}
              className="bg-blue-900 hover:bg-blue-800 text-white h-12 px-6 text-base"
            >
              Agregar Vehículo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para Nuevo Conductor */}
      <Dialog open={isNewConductorModalOpen} onOpenChange={setIsNewConductorModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Nuevo Conductor</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div>
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

            {/* Licencia de conducir */}
            <div>
              <Label className="text-base font-medium text-gray-700 mb-2 block">Licencia de Conducir *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {licenciaConducir ? (
                  <div className="space-y-2">
                    <div className="text-green-600 font-medium">✓ Foto de la licencia capturada</div>
                    <div className="text-sm text-gray-500">{licenciaConducir.name}</div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setLicenciaConducir(null)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Eliminar
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto" />
                    <div className="text-gray-600">Tomar foto de la licencia de conducir</div>
                    <Button
                      type="button"
                      onClick={() => capturarFoto(setLicenciaConducir)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Camera className="h-5 w-5 mr-2" />
                      Capturar Foto
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsNewConductorModalOpen(false)
                limpiarCamposConductor()
              }}
              className="h-12 px-6 text-base"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={agregarNuevoConductor}
              className="bg-blue-900 hover:bg-blue-800 text-white h-12 px-6 text-base"
            >
              Agregar Conductor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
