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

// Eventos de ejemplo para empleado-rrhh
const eventosEjemplo: Evento[] = [
  {
    id: 1,
    titulo: "Entrevistas Nuevos Candidatos",
    descripcion:
      "Entrevistas para cubrir vacantes en el departamento de operaciones portuarias. Se evaluarán 5 candidatos preseleccionados.",
    fecha: new Date(2025, 5, 10, 9, 0), // 10 de junio 2025, 9:00
    fechaInicio: new Date(2025, 5, 10, 9, 0),
    horaInicio: "09:00",
    fechaFin: new Date(2025, 5, 10, 14, 30),
    horaFin: "14:30",
    ubicacion: "Sala de Reuniones - RRHH",
    tipo: "entrevista",
    color: "bg-blue-100 text-blue-800",
    participantes: [
      { id: 1, nombre: "Mariana Sánchez", documento: "12345678", empresa: "Puerto La Plata" },
      { id: 2, nombre: "Javier Méndez", documento: "87654321", empresa: "Puerto La Plata" },
      { id: 3, nombre: "Lucía Fernández", documento: "11223344", empresa: "Puerto La Plata" },
    ],
    imagen: "/professional-interview-setup.png",
  },
  {
    id: 2,
    titulo: "Capacitación Seguridad Laboral",
    descripcion: "Capacitación obligatoria sobre nuevos protocolos de seguridad para personal de muelles y almacenes.",
    fecha: new Date(2025, 5, 12, 14, 0), // 12 de junio 2025, 14:00
    fechaInicio: new Date(2025, 5, 12, 14, 0),
    horaInicio: "14:00",
    fechaFin: new Date(2025, 5, 12, 17, 0),
    horaFin: "17:00",
    ubicacion: "Salón Auditorio - Planta Baja",
    tipo: "capacitacion",
    color: "bg-orange-100 text-orange-800",
    participantes: [
      { id: 4, nombre: "Personal Operativo", documento: "", empresa: "Puerto La Plata" },
      { id: 5, nombre: "Roberto Silva", documento: "99887766", empresa: "Consultora Seguridad Industrial" },
    ],
    imagen: "/port-worker-training.png",
  },
  {
    id: 3,
    titulo: "Evaluación de Desempeño Trimestral",
    descripcion: "Revisión de objetivos y evaluación de desempeño del personal administrativo.",
    fecha: new Date(2025, 5, 15, 10, 0), // 15 de junio 2025, 10:00
    fechaInicio: new Date(2025, 5, 15, 10, 0),
    horaInicio: "10:00",
    fechaFin: new Date(2025, 5, 15, 18, 0),
    horaFin: "18:00",
    ubicacion: "Oficina de RRHH - Sector Evaluaciones",
    tipo: "evaluacion",
    color: "bg-green-100 text-green-800",
    participantes: [
      { id: 7, nombre: "Gerentes de Departamento", documento: "", empresa: "Puerto La Plata" },
      { id: 8, nombre: "Equipo RRHH", documento: "", empresa: "Puerto La Plata" },
    ],
    imagen: "/organized-desk.png",
  },
  {
    id: 4,
    titulo: "Inducción Nuevos Empleados",
    descripcion: "Jornada de inducción para el personal recientemente incorporado a la empresa.",
    fecha: new Date(2025, 5, 18, 8, 30), // 18 de junio 2025, 8:30
    fechaInicio: new Date(2025, 5, 18, 8, 30),
    horaInicio: "08:30",
    fechaFin: new Date(2025, 5, 18, 16, 0),
    horaFin: "16:00",
    ubicacion: "Sala de Capacitación - Edificio Administrativo",
    tipo: "induccion",
    color: "bg-red-100 text-red-800",
    participantes: [
      { id: 10, nombre: "Nuevos Empleados", documento: "", empresa: "Puerto La Plata" },
      { id: 11, nombre: "Miguel Castro", documento: "11335577", empresa: "Puerto La Plata" },
      { id: 12, nombre: "Elena Jiménez", documento: "88990011", empresa: "Puerto La Plata" },
    ],
    imagen: "/diverse-online-profiles.png",
  },
  {
    id: 5,
    titulo: "Taller Clima Laboral",
    descripcion: "Taller para mejorar el clima laboral y la comunicación entre departamentos.",
    fecha: new Date(2025, 5, 20, 9, 0), // 20 de junio 2025, 9:00
    fechaInicio: new Date(2025, 5, 20, 9, 0),
    horaInicio: "09:00",
    fechaFin: new Date(2025, 5, 20, 13, 0),
    horaFin: "13:00",
    ubicacion: "Salón Auditorio - Planta Baja",
    tipo: "taller",
    color: "bg-purple-100 text-purple-800",
    participantes: [
      { id: 13, nombre: "Representantes de cada área", documento: "", empresa: "Puerto La Plata" },
      { id: 14, nombre: "Consultora Externa", documento: "", empresa: "Desarrollo Organizacional SA" },
    ],
    imagen: "/collaborative-learning-session.png",
  },
  {
    id: 6,
    titulo: "Reunión Comité de Convivencia",
    descripcion: "Reunión mensual del comité de convivencia para tratar casos y propuestas de mejora.",
    fecha: new Date(2025, 5, 25, 15, 0), // 25 de junio 2025, 15:00
    fechaInicio: new Date(2025, 5, 25, 15, 0),
    horaInicio: "15:00",
    fechaFin: new Date(2025, 5, 25, 16, 30),
    horaFin: "16:30",
    ubicacion: "Sala de Reuniones - Presidencia",
    tipo: "reunion_comite",
    color: "bg-indigo-100 text-indigo-800",
    participantes: [
      { id: 15, nombre: "Miembros del Comité", documento: "", empresa: "Puerto La Plata" },
      { id: 16, nombre: "Representante Sindicato", documento: "", empresa: "Sindicato Portuario" },
    ],
    imagen: "/diverse-team-meeting.png",
  },
  {
    id: 7,
    titulo: "Jornada de Bienestar",
    descripcion:
      "Actividades de bienestar para empleados: chequeos médicos, actividades recreativas y charlas de salud.",
    fecha: new Date(2025, 5, 28, 8, 0), // 28 de junio 2025, 8:00
    fechaInicio: new Date(2025, 5, 28, 8, 0),
    horaInicio: "08:00",
    fechaFin: new Date(2025, 5, 28, 17, 0),
    horaFin: "17:00",
    ubicacion: "Terminal Portuaria - Área Recreativa",
    tipo: "bienestar",
    color: "bg-yellow-100 text-yellow-800",
    participantes: [
      { id: 17, nombre: "Todo el personal", documento: "", empresa: "Puerto La Plata" },
      { id: 18, nombre: "Equipo Médico", documento: "", empresa: "Servicios de Salud Ocupacional" },
    ],
    imagen: "/gentle-care.png",
  },
]

export default function CalendarioEventosRRHHPage() {
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
    const eventosGuardados = localStorage.getItem("eventos-rrhh")
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

    localStorage.setItem("eventos-rrhh", JSON.stringify(eventosPersonalizados))
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
          <h1 className="text-2xl font-bold text-gray-900">Calendario de Eventos - RRHH</h1>
          <p className="text-gray-600 mt-1">Gestiona entrevistas, capacitaciones y actividades del departamento</p>
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
