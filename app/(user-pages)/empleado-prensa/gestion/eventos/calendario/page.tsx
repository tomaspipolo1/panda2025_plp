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

// Eventos de ejemplo para empleado-prensa
const eventosEjemplo: Evento[] = [
  {
    id: 1,
    titulo: "Conferencia de Prensa Puerto",
    descripcion:
      "Conferencia de prensa sobre las nuevas inversiones en infraestructura portuaria y proyectos de modernización.",
    fecha: new Date(2025, 5, 3, 9, 0), // 3 de junio 2025, 9:00
    fechaInicio: new Date(2025, 5, 3, 9, 0),
    horaInicio: "09:00",
    fechaFin: new Date(2025, 5, 3, 11, 0),
    horaFin: "11:00",
    ubicacion: "Sala de Prensa Principal - Puerto La Plata",
    tipo: "conferencia",
    color: "bg-red-100 text-red-800",
    participantes: [
      { id: 1, nombre: "María González", documento: "12345678", empresa: "Diario El Día" },
      { id: 2, nombre: "Carlos Rodríguez", documento: "87654321", empresa: "Canal 2" },
      { id: 3, nombre: "Ana Martínez", documento: "11223344", empresa: "Radio Universidad" },
    ],
    imagen: "/news-interview-setting.png",
  },
  {
    id: 2,
    titulo: "Entrevista Director Ejecutivo",
    descripcion:
      "Entrevista exclusiva con el Director Ejecutivo sobre los resultados del primer trimestre y planes futuros.",
    fecha: new Date(2025, 5, 5, 14, 0), // 5 de junio 2025, 14:00
    fechaInicio: new Date(2025, 5, 5, 14, 0),
    horaInicio: "14:00",
    fechaFin: new Date(2025, 5, 5, 15, 30),
    horaFin: "15:30",
    ubicacion: "Oficina Dirección Ejecutiva",
    tipo: "entrevista",
    color: "bg-blue-100 text-blue-800",
    participantes: [
      { id: 4, nombre: "Roberto Silva", documento: "55667788", empresa: "La Nación" },
      { id: 5, nombre: "Laura Fernández", documento: "99887766", empresa: "Télam" },
    ],
    imagen: "/professional-interview-setup.png",
  },
  {
    id: 3,
    titulo: "Cobertura Llegada Crucero",
    descripcion: "Cobertura mediática de la llegada del crucero de lujo con 3000 pasajeros al Puerto La Plata.",
    fecha: new Date(2025, 5, 7, 8, 0), // 7 de junio 2025, 8:00
    fechaInicio: new Date(2025, 5, 7, 8, 0),
    horaInicio: "08:00",
    fechaFin: new Date(2025, 5, 7, 12, 0),
    horaFin: "12:00",
    ubicacion: "Muelle de Cruceros - Terminal Pasajeros",
    tipo: "cobertura",
    color: "bg-purple-100 text-purple-800",
    participantes: [
      { id: 6, nombre: "Diego Morales", documento: "44556677", empresa: "TN" },
      { id: 7, nombre: "Sofía López", documento: "33445566", empresa: "C5N" },
      { id: 8, nombre: "Martín Pérez", documento: "22334455", empresa: "América TV" },
    ],
    imagen: "/cruise-ship-arrival.png",
  },
  {
    id: 4,
    titulo: "Reunión Comité Editorial",
    descripcion: "Reunión mensual del comité editorial para revisar contenidos y planificar próximas publicaciones.",
    fecha: new Date(2025, 5, 9, 10, 0), // 9 de junio 2025, 10:00
    fechaInicio: new Date(2025, 5, 9, 10, 0),
    horaInicio: "10:00",
    fechaFin: new Date(2025, 5, 9, 12, 0),
    horaFin: "12:00",
    ubicacion: "Sala de Reuniones Prensa",
    tipo: "reunion",
    color: "bg-green-100 text-green-800",
    participantes: [
      { id: 9, nombre: "Patricia Ruiz", documento: "66778899", empresa: "Puerto La Plata" },
      { id: 10, nombre: "Alejandro Castro", documento: "77889900", empresa: "Puerto La Plata" },
    ],
  },
  {
    id: 5,
    titulo: "Presentación Informe Anual",
    descripcion: "Presentación del informe anual de actividades del puerto ante medios de comunicación.",
    fecha: new Date(2025, 5, 12, 16, 0), // 12 de junio 2025, 16:00
    fechaInicio: new Date(2025, 5, 12, 16, 0),
    horaInicio: "16:00",
    fechaFin: new Date(2025, 5, 12, 18, 0),
    horaFin: "18:00",
    ubicacion: "Auditorio Principal",
    tipo: "presentacion",
    color: "bg-yellow-100 text-yellow-800",
    participantes: [
      { id: 11, nombre: "Gabriela Torres", documento: "88990011", empresa: "Clarín" },
      { id: 12, nombre: "Fernando Vega", documento: "99001122", empresa: "Página/12" },
      { id: 13, nombre: "Valeria Sánchez", documento: "00112233", empresa: "Infobae" },
    ],
    imagen: "/diverse-business-conference.png",
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
    const eventosGuardados = localStorage.getItem("eventos-prensa")
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

    localStorage.setItem("eventos-prensa", JSON.stringify(eventosPersonalizados))
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
        <h1 className="text-2xl font-bold text-gray-900">Calendario de Eventos</h1>
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
