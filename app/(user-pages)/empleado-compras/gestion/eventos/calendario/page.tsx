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
  estado: "pendiente" | "en_curso" | "finalizado"
}

// Eventos de ejemplo para empleado-compras
const eventosEjemplo: Evento[] = [
  {
    id: 1,
    titulo: "Reunión con Proveedor ABC",
    descripcion:
      "Evaluación de nueva propuesta comercial para suministros de oficina. Revisión de precios, condiciones de pago y tiempos de entrega.",
    fecha: new Date(2025, 5, 10, 9, 0), // 10 de junio 2025, 9:00
    fechaInicio: new Date(2025, 5, 10, 9, 0),
    horaInicio: "09:00",
    fechaFin: new Date(2025, 5, 10, 10, 30),
    horaFin: "10:30",
    ubicacion: "Sala de Reuniones - Piso 3",
    tipo: "reunion_proveedor",
    estado: "pendiente",
    participantes: [
      { id: 1, nombre: "Carlos Mendoza", documento: "12345678", empresa: "Proveedor ABC" },
      { id: 2, nombre: "Ana García", documento: "87654321", empresa: "Puerto La Plata" },
      { id: 3, nombre: "Luis Rodriguez", documento: "11223344", empresa: "Puerto La Plata" },
    ],
    imagen: "/diverse-team-meeting.png",
  },
  {
    id: 2,
    titulo: "Evaluación Licitación #2025-001",
    descripcion: "Análisis y evaluación de ofertas recibidas para la licitación de equipos de seguridad portuaria.",
    fecha: new Date(2025, 5, 12, 14, 0), // 12 de junio 2025, 14:00
    fechaInicio: new Date(2025, 5, 12, 14, 0),
    horaInicio: "14:00",
    fechaFin: new Date(2025, 5, 12, 17, 0),
    horaFin: "17:00",
    ubicacion: "Sala de Evaluaciones",
    tipo: "evaluacion",
    estado: "en_curso",
    participantes: [
      { id: 4, nombre: "María López", documento: "55667788", empresa: "Puerto La Plata" },
      { id: 5, nombre: "Roberto Silva", documento: "99887766", empresa: "Puerto La Plata" },
      { id: 6, nombre: "Carmen Torres", documento: "44556677", empresa: "Puerto La Plata" },
    ],
    imagen: "/business-invoice-details.png",
  },
  {
    id: 3,
    titulo: "Presentación Nuevos Productos",
    descripcion: "Presentación de nuevos equipos de manipulación de carga por parte de la empresa TechPort Solutions.",
    fecha: new Date(2025, 5, 15, 10, 0), // 15 de junio 2025, 10:00
    fechaInicio: new Date(2025, 5, 15, 10, 0),
    horaInicio: "10:00",
    fechaFin: new Date(2025, 5, 15, 12, 0),
    horaFin: "12:00",
    ubicacion: "Auditorio Principal",
    tipo: "presentacion",
    estado: "finalizado",
    participantes: [
      { id: 7, nombre: "Diego Fernández", documento: "33445566", empresa: "TechPort Solutions" },
      { id: 8, nombre: "Patricia Ruiz", documento: "77889900", empresa: "TechPort Solutions" },
      { id: 9, nombre: "Andrés Morales", documento: "22334455", empresa: "Puerto La Plata" },
    ],
    imagen: "/vibrant-tech-unveiling.png",
  },
  {
    id: 4,
    titulo: "Auditoría Proveedor XYZ",
    descripcion: "Auditoría de calidad y cumplimiento de estándares del proveedor XYZ para servicios de mantenimiento.",
    fecha: new Date(2025, 5, 18, 8, 30), // 18 de junio 2025, 8:30
    fechaInicio: new Date(2025, 5, 18, 8, 30),
    horaInicio: "08:30",
    fechaFin: new Date(2025, 5, 18, 16, 0),
    horaFin: "16:00",
    ubicacion: "Instalaciones Proveedor XYZ",
    tipo: "auditoria",
    estado: "en_curso",
    participantes: [
      { id: 10, nombre: "Sandra Vega", documento: "66778899", empresa: "Puerto La Plata" },
      { id: 11, nombre: "Miguel Castro", documento: "11335577", empresa: "Puerto La Plata" },
      { id: 12, nombre: "Elena Jiménez", documento: "88990011", empresa: "Proveedor XYZ" },
    ],
    imagen: "/organized-desk.png",
  },
  {
    id: 5,
    titulo: "Capacitación Normativas de Compras",
    descripcion: "Capacitación sobre nuevas normativas y procedimientos de compras públicas.",
    fecha: new Date(2025, 5, 20, 9, 0), // 20 de junio 2025, 9:00
    fechaInicio: new Date(2025, 5, 20, 9, 0),
    horaInicio: "09:00",
    fechaFin: new Date(2025, 5, 20, 17, 0),
    horaFin: "17:00",
    ubicacion: "Centro de Capacitación",
    tipo: "capacitacion",
    estado: "pendiente",
    participantes: [{ id: 13, nombre: "Todo el equipo de compras", documento: "", empresa: "Puerto La Plata" }],
    imagen: "/collaborative-learning-session.png",
  },
  {
    id: 6,
    titulo: "Reunión Mensual Equipo Compras",
    descripcion: "Reunión mensual para revisar indicadores, objetivos y planificación de actividades.",
    fecha: new Date(2025, 5, 25, 15, 0), // 25 de junio 2025, 15:00
    fechaInicio: new Date(2025, 5, 25, 15, 0),
    horaInicio: "15:00",
    fechaFin: new Date(2025, 5, 25, 16, 30),
    horaFin: "16:30",
    ubicacion: "Sala de Reuniones Compras",
    tipo: "reunion_equipo",
    estado: "pendiente",
    participantes: [{ id: 14, nombre: "Equipo Compras", documento: "", empresa: "Puerto La Plata" }],
    imagen: "/collaborative-strategy-session.png",
  },
  {
    id: 7,
    titulo: "Negociación Contrato Anual",
    descripcion: "Negociación de contrato anual para suministro de combustibles y lubricantes.",
    fecha: new Date(2025, 5, 28, 10, 0), // 28 de junio 2025, 10:00
    fechaInicio: new Date(2025, 5, 28, 10, 0),
    horaInicio: "10:00",
    fechaFin: new Date(2025, 5, 28, 15, 0),
    horaFin: "15:00",
    ubicacion: "Sala de Negociaciones",
    tipo: "negociacion",
    estado: "finalizado",
    participantes: [
      { id: 15, nombre: "Fernando Paz", documento: "55443322", empresa: "Combustibles SA" },
      { id: 16, nombre: "Gabriela Herrera", documento: "99887755", empresa: "Puerto La Plata" },
      { id: 17, nombre: "Ricardo Molina", documento: "33221100", empresa: "Puerto La Plata" },
    ],
    imagen: "/global-supply-network.png",
  },
]

// Función para obtener el color según el estado del evento
const getColorByEstado = (estado: string): string => {
  switch (estado) {
    case "pendiente":
      return "bg-pink-100 text-pink-800"
    case "en_curso":
      return "bg-blue-100 text-blue-800"
    case "finalizado":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function CalendarioEventosComprasPage() {
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
    // Primero cargamos los eventos de ejemplo y les asignamos colores según su estado
    const eventosBase = eventosEjemplo.map((evento) => ({
      ...evento,
      color: getColorByEstado(evento.estado),
    }))

    // Luego intentamos cargar eventos personalizados del localStorage
    const eventosGuardados = localStorage.getItem("eventos-compras")
    if (eventosGuardados) {
      try {
        const eventosParsed = JSON.parse(eventosGuardados).map((evento: any) => ({
          ...evento,
          fecha: new Date(evento.fecha),
          fechaInicio: new Date(evento.fechaInicio),
          fechaFin: evento.fechaFin ? new Date(evento.fechaFin) : null,
          color: getColorByEstado(evento.estado || "pendiente"), // Asignar color según estado
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

    localStorage.setItem("eventos-compras", JSON.stringify(eventosPersonalizados))
  }

  // Manejar clic en evento del calendario
  const handleEventoClick = (evento: Evento) => {
    setEventoSeleccionado(evento)
    setMostrarModalEvento(true)
  }

  // Manejar creación o actualización de evento
  const handleGuardarEvento = (evento: Evento) => {
    let eventosActualizados: Evento[]

    // Asignar color según estado
    const eventoConColor = {
      ...evento,
      color: getColorByEstado(evento.estado),
    }

    if (eventoParaEditar) {
      // Actualizar evento existente
      eventosActualizados = eventos.map((e) => {
        if (e.id === evento.id) {
          // Aseguramos que la fecha también se actualice
          return {
            ...eventoConColor,
            fecha: evento.fechaInicio, // Actualizamos la fecha para que coincida con fechaInicio
          }
        }
        return e
      })

      setAccionConfirmacion("actualizar")
    } else {
      // Crear nuevo evento
      const nuevoEvento = {
        ...eventoConColor,
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
          <h1 className="text-2xl font-bold text-gray-900">Calendario de Eventos - Compras</h1>
          <p className="text-gray-600 mt-1">Gestiona reuniones, evaluaciones y actividades del departamento</p>
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

      {/* Leyenda de colores */}
      <div className="flex items-center gap-4 mb-4 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-pink-400 mr-1"></div>
          <span>Pendiente</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-400 mr-1"></div>
          <span>En Curso</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-400 mr-1"></div>
          <span>Finalizado</span>
        </div>
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
