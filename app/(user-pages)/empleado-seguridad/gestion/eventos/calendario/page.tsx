"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Calendario from "@/components/calendario/calendario"
import FormularioNuevoEvento from "@/components/eventos/formulario-nuevo-evento"
import ModalEvento from "@/components/eventos/modal-evento"
import ModalConfirmacionEvento from "@/components/eventos/modal-confirmacion-evento"

// Tipos de datos
interface Participante {
  id: number
  nombre: string
  documento: string
  empresa?: string
}

interface Evento {
  id: number
  titulo: string
  descripcion?: string
  fecha: Date
  fechaInicio: Date
  horaInicio?: string
  fechaFin?: Date
  horaFin?: string
  ubicacion?: string
  participantes?: Participante[]
  imagen?: string
  tipo: string
  color?: string
}

// Función para obtener la fecha actual con el día específico
const getDateWithDay = (year: number, month: number, day: number, hour = 0, minute = 0) => {
  const date = new Date(year, month, day)
  date.setHours(hour, minute)
  return date
}

// Obtener el año y mes actuales
const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()

// Eventos de ejemplo para empleado-seguridad
const eventosEjemplo: Evento[] = [
  {
    id: 1,
    titulo: "Simulacro de emergencia portuaria",
    descripcion:
      "Simulacro de emergencia con evacuación de instalaciones y coordinación con bomberos y servicios de emergencia.",
    fecha: getDateWithDay(currentYear, currentMonth, 5, 9, 0),
    fechaInicio: getDateWithDay(currentYear, currentMonth, 5, 9, 0),
    horaInicio: "09:00",
    fechaFin: getDateWithDay(currentYear, currentMonth, 5, 12, 0),
    horaFin: "12:00",
    ubicacion: "Instalaciones Portuarias - Zona de Emergencia",
    tipo: "simulacro",
    color: "bg-red-100 text-red-800",
    participantes: [
      { id: 1, nombre: "Carlos Mendoza", documento: "12345678", empresa: "Bomberos Voluntarios" },
      { id: 2, nombre: "Ana Rodríguez", documento: "87654321", empresa: "Defensa Civil" },
      { id: 3, nombre: "Miguel Torres", documento: "11223344", empresa: "Seguridad Portuaria" },
    ],
    imagen: "/professional-interview-setup.png",
  },
  {
    id: 2,
    titulo: "Capacitación: Nuevos protocolos de seguridad",
    descripcion:
      "Capacitación sobre nuevos protocolos de seguridad, control de accesos y procedimientos de emergencia actualizados.",
    fecha: getDateWithDay(currentYear, currentMonth, 8, 10, 30),
    fechaInicio: getDateWithDay(currentYear, currentMonth, 8, 10, 30),
    horaInicio: "10:30",
    fechaFin: getDateWithDay(currentYear, currentMonth, 8, 15, 30),
    horaFin: "15:30",
    ubicacion: "Aula de Capacitación - Edificio Seguridad",
    tipo: "capacitacion",
    color: "bg-blue-100 text-blue-800",
    participantes: [
      { id: 4, nombre: "Roberto Silva", documento: "55667788", empresa: "Seguridad Portuaria" },
      { id: 5, nombre: "Laura Fernández", documento: "99887766", empresa: "Seguridad Portuaria" },
      { id: 6, nombre: "Diego Morales", documento: "44556677", empresa: "Seguridad Portuaria" },
    ],
    imagen: "/collaborative-learning-session.png",
  },
  {
    id: 3,
    titulo: "Inspección de sistemas de vigilancia",
    descripcion:
      "Inspección y mantenimiento preventivo de cámaras de seguridad, sistemas de monitoreo y equipos de comunicación.",
    fecha: getDateWithDay(currentYear, currentMonth, 12, 14, 0),
    fechaInicio: getDateWithDay(currentYear, currentMonth, 12, 14, 0),
    horaInicio: "14:00",
    fechaFin: getDateWithDay(currentYear, currentMonth, 12, 18, 0),
    horaFin: "18:00",
    ubicacion: "Centro de Control - Torre de Vigilancia",
    tipo: "inspeccion",
    color: "bg-purple-100 text-purple-800",
    participantes: [
      { id: 7, nombre: "Sofía López", documento: "33445566", empresa: "Mantenimiento Técnico" },
      { id: 8, nombre: "Martín Pérez", documento: "22334455", empresa: "Seguridad Portuaria" },
    ],
    imagen: "/organized-desk.png",
  },
  {
    id: 4,
    titulo: "Reunión con fuerzas de seguridad",
    descripcion:
      "Reunión de coordinación mensual con Prefectura Naval, Policía Federal y Gendarmería para revisar protocolos conjuntos.",
    fecha: getDateWithDay(currentYear, currentMonth, 15, 11, 0),
    fechaInicio: getDateWithDay(currentYear, currentMonth, 15, 11, 0),
    horaInicio: "11:00",
    fechaFin: getDateWithDay(currentYear, currentMonth, 15, 13, 0),
    horaFin: "13:00",
    ubicacion: "Sala de Coordinación Interinstitucional",
    tipo: "reunion",
    color: "bg-green-100 text-green-800",
    participantes: [
      { id: 9, nombre: "Patricia Ruiz", documento: "66778899", empresa: "Prefectura Naval" },
      { id: 10, nombre: "Alejandro Castro", documento: "77889900", empresa: "Policía Federal" },
      { id: 11, nombre: "Gabriela Torres", documento: "88990011", empresa: "Gendarmería Nacional" },
    ],
    imagen: "/diverse-business-conference.png",
  },
  {
    id: 5,
    titulo: "Auditoría de seguridad ISPS",
    descripcion:
      "Auditoría del código internacional para la protección de buques e instalaciones portuarias (Código ISPS).",
    fecha: getDateWithDay(currentYear, currentMonth, 18, 9, 30),
    fechaInicio: getDateWithDay(currentYear, currentMonth, 18, 9, 30),
    horaInicio: "09:30",
    fechaFin: getDateWithDay(currentYear, currentMonth, 18, 16, 30),
    horaFin: "16:30",
    ubicacion: "Oficina ISPS - Edificio Administrativo",
    tipo: "auditoria",
    color: "bg-yellow-100 text-yellow-800",
    participantes: [
      { id: 12, nombre: "Fernando Vega", documento: "99001122", empresa: "Auditor ISPS Externo" },
      { id: 13, nombre: "Valeria Sánchez", documento: "00112233", empresa: "Oficial ISPS" },
    ],
    imagen: "/business-invoice-details.png",
  },
  {
    id: 6,
    titulo: "Entrenamiento de respuesta a incidentes",
    descripcion:
      "Entrenamiento del equipo de respuesta rápida ante incidentes de seguridad, incluyendo simulacros prácticos.",
    fecha: getDateWithDay(currentYear, currentMonth, 22, 10, 0),
    fechaInicio: getDateWithDay(currentYear, currentMonth, 22, 10, 0),
    horaInicio: "10:00",
    fechaFin: getDateWithDay(currentYear, currentMonth, 22, 16, 0),
    horaFin: "16:00",
    ubicacion: "Campo de Entrenamiento - Zona Operativa",
    tipo: "entrenamiento",
    color: "bg-indigo-100 text-indigo-800",
    participantes: [
      { id: 14, nombre: "Ricardo Moreno", documento: "11223355", empresa: "Equipo de Respuesta" },
      { id: 15, nombre: "Carmen Jiménez", documento: "22334466", empresa: "Equipo de Respuesta" },
      { id: 16, nombre: "Andrés Vargas", documento: "33445577", empresa: "Instructor Especializado" },
    ],
    imagen: "/port-worker-training.png",
  },
  {
    id: 7,
    titulo: "Control de acceso - Evento especial cruceros",
    descripcion:
      "Operativo especial de control de accesos para temporada alta de cruceros con protocolos reforzados de seguridad.",
    fecha: getDateWithDay(currentYear, currentMonth, 25, 15, 30),
    fechaInicio: getDateWithDay(currentYear, currentMonth, 25, 15, 30),
    horaInicio: "15:30",
    fechaFin: getDateWithDay(currentYear, currentMonth, 25, 20, 30),
    horaFin: "20:30",
    ubicacion: "Terminal de Cruceros - Accesos Principales",
    tipo: "control",
    color: "bg-orange-100 text-orange-800",
    participantes: [
      { id: 17, nombre: "Luis Herrera", documento: "44556688", empresa: "Control de Accesos" },
      { id: 18, nombre: "María González", documento: "55667799", empresa: "Seguridad Portuaria" },
      { id: 19, nombre: "José Ramírez", documento: "66778800", empresa: "Seguridad Portuaria" },
    ],
    imagen: "/cruise-ship-arrival.png",
  },
  {
    id: 8,
    titulo: "Revisión mensual de incidentes",
    descripcion:
      "Revisión mensual de incidentes de seguridad, análisis de causas y propuestas de mejoras en los protocolos.",
    fecha: getDateWithDay(currentYear, currentMonth, 28, 13, 0),
    fechaInicio: getDateWithDay(currentYear, currentMonth, 28, 13, 0),
    horaInicio: "13:00",
    fechaFin: getDateWithDay(currentYear, currentMonth, 28, 15, 0),
    horaFin: "15:00",
    ubicacion: "Oficina Jefatura de Seguridad",
    tipo: "revision",
    color: "bg-gray-100 text-gray-800",
    participantes: [
      { id: 20, nombre: "Elena Castillo", documento: "77889911", empresa: "Jefe de Seguridad" },
      { id: 21, nombre: "Pablo Núñez", documento: "88990022", empresa: "Supervisor de Turno" },
    ],
    imagen: "/professional-interview-setup.png",
  },
]

export default function CalendarioEventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [eventoSeleccionado, setEventoSeleccionado] = useState<Evento | null>(null)
  const [mostrarModalEvento, setMostrarModalEvento] = useState(false)
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)
  const [accionConfirmacion, setAccionConfirmacion] = useState<"crear" | "actualizar">("crear")
  const [tituloEventoConfirmacion, setTituloEventoConfirmacion] = useState("")
  const [eventoParaEditar, setEventoParaEditar] = useState<Evento | null>(null)

  // Cargar eventos del localStorage al montar el componente
  useEffect(() => {
    // Primero cargamos los eventos de ejemplo
    const eventosBase = [...eventosEjemplo]

    // Luego intentamos cargar eventos personalizados del localStorage
    const eventosGuardados = localStorage.getItem("eventos-seguridad")
    if (eventosGuardados) {
      try {
        const eventosParsed = JSON.parse(eventosGuardados).map((evento: any) => ({
          ...evento,
          fecha: new Date(evento.fecha),
          fechaInicio: new Date(evento.fechaInicio),
          fechaFin: evento.fechaFin ? new Date(evento.fechaFin) : null,
        }))

        // Combinamos ambos arrays
        setEventos([...eventosBase, ...eventosParsed])
      } catch (error) {
        console.error("Error al cargar eventos:", error)
        setEventos(eventosBase)
      }
    } else {
      setEventos(eventosBase)
    }
  }, [])

  // Guardar eventos en localStorage
  const guardarEventos = (nuevosEventos: Evento[]) => {
    // Solo guardamos en localStorage los eventos personalizados (no los de ejemplo)
    const eventosPersonalizados = nuevosEventos.filter((evento) => {
      // Un evento es personalizado si no está en la lista de eventos de ejemplo
      return !eventosEjemplo.some((ejemploEvento) => ejemploEvento.id === evento.id)
    })

    localStorage.setItem("eventos-seguridad", JSON.stringify(eventosPersonalizados))
  }

  // Manejar clic en evento del calendario
  const handleEventoClick = (evento: Evento) => {
    setEventoSeleccionado(evento)
    setMostrarModalEvento(true)
  }

  // Manejar creación o actualización de evento
  const handleGuardarEvento = (evento: Evento) => {
    let eventosActualizados: Evento[]

    if (eventoParaEditar) {
      // Actualizar evento existente
      eventosActualizados = eventos.map((e) => {
        if (e.id === evento.id) {
          // Aseguramos que la fecha también se actualice
          return {
            ...evento,
            fecha: evento.fechaInicio, // Actualizamos la fecha para que coincida con fechaInicio
          }
        }
        return e
      })

      setAccionConfirmacion("actualizar")
    } else {
      // Crear nuevo evento
      const nuevoEvento = {
        ...evento,
        fecha: evento.fechaInicio, // Aseguramos que fecha coincida con fechaInicio
      }
      eventosActualizados = [...eventos, nuevoEvento]
      setAccionConfirmacion("crear")
    }

    setEventos(eventosActualizados)
    guardarEventos(eventosActualizados)
    setMostrarFormulario(false)
    setEventoParaEditar(null)
    setTituloEventoConfirmacion(evento.titulo)
    setMostrarConfirmacion(true)
  }

  // Manejar eliminación de evento
  const handleEliminarEvento = (id: number) => {
    const eventosActualizados = eventos.filter((evento) => evento.id !== id)
    setEventos(eventosActualizados)
    guardarEventos(eventosActualizados)
    setMostrarModalEvento(false)
  }

  // Manejar edición de evento
  const handleEditarEvento = (id: number) => {
    const evento = eventos.find((e) => e.id === id)
    if (evento) {
      setEventoParaEditar(evento)
      setMostrarFormulario(true)
      setMostrarModalEvento(false)
    }
  }

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendario de Eventos - Seguridad</h1>
          <p className="text-gray-600 mt-1">
            Gestiona simulacros, capacitaciones y actividades del departamento de seguridad
          </p>
        </div>
        <Button
          onClick={() => {
            setEventoParaEditar(null)
            setMostrarFormulario(true)
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Evento
        </Button>
      </div>

      {/* Calendario */}
      <Calendario eventos={eventos} onEventClick={handleEventoClick} />

      {/* Modal Formulario Nuevo/Editar Evento */}
      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <FormularioNuevoEvento
              onSubmit={handleGuardarEvento}
              onCancel={() => {
                setMostrarFormulario(false)
                setEventoParaEditar(null)
              }}
              eventoParaEditar={eventoParaEditar}
            />
          </div>
        </div>
      )}

      {/* Modal Detalle Evento */}
      <ModalEvento
        evento={eventoSeleccionado}
        open={mostrarModalEvento}
        onOpenChange={setMostrarModalEvento}
        onEdit={handleEditarEvento}
        onDelete={handleEliminarEvento}
      />

      {/* Modal Confirmación */}
      <ModalConfirmacionEvento
        open={mostrarConfirmacion}
        onOpenChange={setMostrarConfirmacion}
        onConfirm={() => setMostrarConfirmacion(false)}
        tituloEvento={tituloEventoConfirmacion}
        accion={accionConfirmacion}
      />
    </div>
  )
}
