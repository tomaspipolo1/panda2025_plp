"use client"

import { CalendarIcon, Plus, Search, Eye, Check, X, Ban } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import type { DateRange } from "react-day-picker"
// Primero, importamos el nuevo componente del modal
import { DetalleVisitaModalUsuarioBasico } from "@/components/visitas/detalle-visita-modal-usuario-basico"
import { CancelarVisitaModalUsuarioBasico } from "@/components/visitas/cancelar-visita-modal-usuario-basico"

// Actualizar el componente MisVisitasPage para añadir el estado del modal y la visita seleccionada
export default function MisVisitasPage() {
  const [date, setDate] = useState<DateRange | undefined>()
  const [showCalendar, setShowCalendar] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)
  const [selectedVisita, setSelectedVisita] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [visitaACancelar, setVisitaACancelar] = useState<string | null>(null)

  // Cerrar el calendario cuando se hace clic fuera de él
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Formatear el rango de fechas para mostrar
  const formatDateRange = () => {
    if (!date) return "dd/mm/aaaa"

    if (date.from && date.to) {
      return `${format(date.from, "dd/MM/yyyy", { locale: es })} - ${format(date.to, "dd/MM/yyyy", { locale: es })}`
    }

    if (date.from) {
      return format(date.from, "dd/MM/yyyy", { locale: es })
    }

    return "dd/mm/aaaa"
  }

  const handleAceptar = (visitaId: number) => {
    console.log("Aceptando visita:", visitaId)
    alert("Visita aceptada correctamente")
  }

  const handleRechazar = (visitaId: number) => {
    console.log("Rechazando visita:", visitaId)
    alert("Visita rechazada correctamente")
  }

  const handleCancelar = (visitaId: string) => {
    setVisitaACancelar(visitaId)
    setIsCancelModalOpen(true)
  }

  const confirmarCancelacion = (motivo: string) => {
    console.log("Cancelando visita:", visitaACancelar, "Motivo:", motivo)
    alert("Visita cancelada correctamente")
    setVisitaACancelar(null)
  }

  // Función para abrir el modal con la visita seleccionada
  const handleOpenDetails = (visita: any) => {
    // Agregar datos adicionales a la visita para el modal
    const visitaCompleta = {
      ...visita,
      fechaInicio: visita.fecha,
      fechaFin: visita.fecha,
      horaInicio: visita.hora,
      horaFin: "18:00",
      personasDetalle: [
        { id: "1", nombre: "Juan Pérez", documento: "30.123.456", empresa: "Proveedor ABC" },
        { id: "2", nombre: "María López", documento: "29.876.543", empresa: "Proveedor ABC" },
        { id: "3", nombre: "Carlos Rodríguez", documento: "31.567.890", empresa: "Proveedor ABC" },
      ],
      vehiculosDetalle: [
        { id: "1", tipo: "Auto", patente: "ABC123", marca: "Toyota", modelo: "Corolla" },
        { id: "2", tipo: "Camioneta", patente: "XYZ789", marca: "Ford", modelo: "Ranger" },
      ],
      motivo: "Reunión de trabajo con el equipo de logística para coordinar próximos envíos.",
      observaciones: "Se requiere estacionamiento para los vehículos.",
    }

    setSelectedVisita(visitaCompleta)
    setIsModalOpen(true)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-plp-darkest">Mis Visitas</h1>
        <Link
          href="/usuario-basico/visitas/nueva-visita"
          className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded-md flex items-center transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Visita
        </Link>
      </div>

      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar visita..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plp-primary focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="flex-1 md:flex-initial">
            <select className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plp-primary focus:border-transparent">
              <option value="">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="rechazada">Rechazada</option>
              <option value="aceptada">Aceptada</option>
              <option value="realizada">Finalizada</option>
              <option value="en_curso">En curso</option>
              <option value="en_curso">Cancelada</option>
            </select>
          </div>
          <div className="flex-1 md:flex-initial relative">
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plp-primary focus:border-transparent flex justify-between items-center"
            >
              {formatDateRange()}
              <CalendarIcon className="ml-2 h-4 w-4 text-gray-400" />
            </button>

            {showCalendar && (
              <div ref={calendarRef} className="absolute z-50 mt-1 bg-white rounded-md shadow-lg p-2">
                <div className="flex justify-between items-center mb-2 px-2">
                  <button
                    onClick={() => {
                      const currentDate = new Date()
                      const prevMonth = new Date(currentDate)
                      prevMonth.setMonth(currentDate.getMonth() - 1)
                      document
                        .querySelector(".rdp-nav_button_previous")
                        ?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
                    }}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    &lt;
                  </button>
                  <div className="font-medium">
                    {new Date().toLocaleString("es", { month: "long", year: "numeric" })}
                  </div>
                  <button
                    onClick={() => {
                      const currentDate = new Date()
                      const nextMonth = new Date(currentDate)
                      nextMonth.setMonth(currentDate.getMonth() + 1)
                      document
                        .querySelector(".rdp-nav_button_next")
                        ?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
                    }}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    &gt;
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center mb-1">
                  <div className="text-xs text-gray-500">D</div>
                  <div className="text-xs text-gray-500">L</div>
                  <div className="text-xs text-gray-500">M</div>
                  <div className="text-xs text-gray-500">M</div>
                  <div className="text-xs text-gray-500">J</div>
                  <div className="text-xs text-gray-500">V</div>
                  <div className="text-xs text-gray-500">S</div>
                </div>

                <CalendarGrid
                  date={date}
                  onChange={(range) => {
                    setDate(range)
                    if (range.to) {
                      setShowCalendar(false)
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabla de visitas */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Fecha y Hora
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tipo
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Entidad
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Personas
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Estado
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {visitas.map((visita) => (
              <tr key={visita.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <CalendarIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{visita.fecha}</div>
                      <div className="text-sm text-gray-500">{visita.hora}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{visita.tipo}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{visita.entidad}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{visita.personas}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoColor(visita.estado)}`}
                  >
                    {visita.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                      onClick={() => handleOpenDetails(visita)}
                      title="Ver detalles"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {visita.estado === "Pendiente" && (
                      <>
                        <button
                          className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                          onClick={() => handleAceptar(visita.id)}
                          title="Aceptar visita"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                          onClick={() => handleRechazar(visita.id)}
                          title="Rechazar visita"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    {(visita.estado === "Aceptada" || visita.estado === "En curso") && (
                      <button
                        className="text-orange-600 hover:text-orange-800 p-1 rounded hover:bg-orange-50"
                        onClick={() => handleCancelar(visita.id.toString())}
                        title="Cancelar visita"
                      >
                        <Ban className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Añadir el modal de detalles */}
      <DetalleVisitaModalUsuarioBasico
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        visita={selectedVisita}
        onAceptar={
          selectedVisita?.estado === "Pendiente"
            ? () => {
                handleAceptar(selectedVisita.id)
                setIsModalOpen(false)
              }
            : undefined
        }
        onRechazar={
          selectedVisita?.estado === "Pendiente"
            ? () => {
                handleRechazar(selectedVisita.id)
                setIsModalOpen(false)
              }
            : undefined
        }
      />

      <CancelarVisitaModalUsuarioBasico
        isOpen={isCancelModalOpen}
        onClose={() => {
          setIsCancelModalOpen(false)
          setVisitaACancelar(null)
        }}
        onConfirm={confirmarCancelacion}
        visitaId={visitaACancelar}
      />
    </div>
  )
}

// Componente de cuadrícula de calendario
function CalendarGrid({ date, onChange }: { date: DateRange | undefined; onChange: (range: DateRange) => void }) {
  // Obtener el mes actual
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  // Obtener el primer día del mes y el número de días
  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  // Crear array de días
  const days = []
  for (let i = 0; i < firstDay; i++) {
    days.push(null) // Días vacíos al inicio
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  // Manejar la selección de fechas
  const handleDayClick = (day: number) => {
    if (!day) return

    const clickedDate = new Date(currentYear, currentMonth, day)

    if (!date || !date.from) {
      // Primera selección
      onChange({ from: clickedDate })
    } else if (date.from && !date.to) {
      // Segunda selección
      if (clickedDate < date.from) {
        onChange({ from: clickedDate, to: date.from })
      } else {
        onChange({ from: date.from, to: clickedDate })
      }
    } else {
      // Nueva selección
      onChange({ from: clickedDate })
    }
  }

  // Verificar si un día está seleccionado
  const isDaySelected = (day: number | null) => {
    if (!day || !date) return false

    const dayDate = new Date(currentYear, currentMonth, day)

    if (date.from && date.to) {
      return dayDate >= date.from && dayDate <= date.to
    }

    if (date.from) {
      return dayDate.getTime() === date.from.getTime()
    }

    return false
  }

  // Verificar si un día es hoy
  const isToday = (day: number | null) => {
    if (!day) return false
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
  }

  return (
    <div className="grid grid-cols-7 gap-1">
      {days.map((day, index) => (
        <div key={index} className="text-center">
          {day && (
            <button
              onClick={() => handleDayClick(day)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                isDaySelected(day)
                  ? "bg-blue-600 text-white"
                  : isToday(day)
                    ? "text-blue-600 font-bold"
                    : "hover:bg-gray-100"
              }`}
            >
              {day}
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

// Datos de ejemplo para las visitas
const visitas = [
  {
    id: 1,
    fecha: "15/05/2023",
    hora: "10:00 AM",
    tipo: "Laboral",
    entidad: "Empresa ABC",
    personas: "3",
    estado: "Pendiente",
  },
  {
    id: 2,
    fecha: "20/05/2023",
    hora: "2:30 PM",
    tipo: "Guiada",
    entidad: "Compañía XYZ",
    personas: "2",
    estado: "Aceptada",
  },
  {
    id: 3,
    fecha: "10/05/2023",
    hora: "9:15 AM",
    tipo: "Evento",
    entidad: "Corporación 123",
    personas: "4",
    estado: "Finalizada",
  },
  {
    id: 4,
    fecha: "05/05/2023",
    hora: "11:45 AM",
    tipo: "Laboral",
    entidad: "Empresa ABC",
    personas: "2",
    estado: "Rechazada",
  },
  {
    id: 5,
    fecha: "25/05/2023",
    hora: "3:00 PM",
    tipo: "Evento",
    entidad: "Organización DEF",
    personas: "10",
    estado: "En curso",
  },
  {
    id: 6,
    fecha: "25/05/2023",
    hora: "4:00 PM",
    tipo: "Evento",
    entidad: "Organización DEF",
    personas: "10",
    estado: "Cancelada",
  },
]

// Función para obtener el color según el estado
function getEstadoColor(estado: string) {
  switch (estado) {
    case "Pendiente":
      return "bg-blue-100 text-blue-800"
    case "Aceptada":
      return "bg-green-100 text-green-800"
    case "Realizada":
      return "bg-purple-100 text-purple-800"
    case "Rechazada":
      return "bg-red-100 text-red-800"
    case "En curso":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
