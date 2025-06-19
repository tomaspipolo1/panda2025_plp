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

// Eventos de ejemplo para empleado-mesa-entradas
const eventosEjemplo: Evento[] = [
  {
    id: 1,
    titulo: "Recepción de expedientes - Licitación Grúas",
    descripcion:
      "Recepción y registro de expedientes para la licitación de grúas portuarias. Verificación de documentación y cumplimiento de requisitos.",
    fecha: new Date(2025, 5, 5, 9, 0), // 5 de junio 2025, 9:00
    fechaInicio: new Date(2025, 5, 5, 9, 0),
    horaInicio: "09:00",
    fechaFin: new Date(2025, 5, 5, 12, 0),
    horaFin: "12:00",
    ubicacion: "Mesa de Entradas Principal",
    tipo: "recepcion",
    color: "bg-blue-100 text-blue-800",
    participantes: [
      { id: 1, nombre: "María González", documento: "12345678", empresa: "Puerto La Plata" },
      { id: 2, nombre: "Carlos Ruiz", documento: "87654321", empresa: "Puerto La Plata" },
      { id: 3, nombre: "Ana Martínez", documento: "11223344", empresa: "Proveedor Grúas SA" },
    ],
    imagen: "/organized-desk.png",
  },
  {
    id: 2,
    titulo: "Capacitación: Sistema de Gestión Documental",
    descripcion:
      "Capacitación sobre el nuevo sistema de gestión documental y archivo digital. Procedimientos de digitalización y clasificación.",
    fecha: new Date(2025, 5, 8, 10, 30), // 8 de junio 2025, 10:30
    fechaInicio: new Date(2025, 5, 8, 10, 30),
    horaInicio: "10:30",
    fechaFin: new Date(2025, 5, 8, 16, 0),
    horaFin: "16:00",
    ubicacion: "Sala de Capacitación - Edificio Administrativo",
    tipo: "capacitacion",
    color: "bg-green-100 text-green-800",
    participantes: [
      { id: 4, nombre: "Luis Fernández", documento: "55667788", empresa: "Sistemas Documentales" },
      { id: 5, nombre: "Patricia López", documento: "99887766", empresa: "Puerto La Plata" },
      { id: 6, nombre: "Roberto Silva", documento: "44556677", empresa: "Puerto La Plata" },
    ],
    imagen: "/collaborative-learning-session.png",
  },
  {
    id: 3,
    titulo: "Auditoría de archivo documental",
    descripcion:
      "Auditoría interna del archivo documental y verificación de expedientes. Control de calidad y cumplimiento normativo.",
    fecha: new Date(2025, 5, 12, 14, 0), // 12 de junio 2025, 14:00
    fechaInicio: new Date(2025, 5, 12, 14, 0),
    horaInicio: "14:00",
    fechaFin: new Date(2025, 5, 12, 17, 0),
    horaFin: "17:00",
    ubicacion: "Archivo Central - Subsuelo",
    tipo: "auditoria",
    color: "bg-red-100 text-red-800",
    participantes: [
      { id: 7, nombre: "Carmen Torres", documento: "33445566", empresa: "Auditoría Interna" },
      { id: 8, nombre: "Diego Morales", documento: "77889900", empresa: "Puerto La Plata" },
      { id: 9, nombre: "Elena Vega", documento: "22334455", empresa: "Puerto La Plata" },
    ],
    imagen: "/business-invoice-details.png",
  },
  {
    id: 4,
    titulo: "Reunión con proveedores - Documentación",
    descripcion: "Reunión informativa con proveedores sobre requisitos de documentación para licitaciones y contratos.",
    fecha: new Date(2025, 5, 15, 11, 0), // 15 de junio 2025, 11:00
    fechaInicio: new Date(2025, 5, 15, 11, 0),
    horaInicio: "11:00",
    fechaFin: new Date(2025, 5, 15, 13, 0),
    horaFin: "13:00",
    ubicacion: "Sala de Reuniones - Administración",
    tipo: "reunion",
    color: "bg-purple-100 text-purple-800",
    participantes: [
      { id: 10, nombre: "Sandra Castro", documento: "66778899", empresa: "Puerto La Plata" },
      { id: 11, nombre: "Miguel Herrera", documento: "11335577", empresa: "Proveedor ABC" },
      { id: 12, nombre: "Gabriela Paz", documento: "88990011", empresa: "Proveedor XYZ" },
      { id: 13, nombre: "Fernando Molina", documento: "55443322", empresa: "Servicios Portuarios" },
    ],
    imagen: "/diverse-business-conference.png",
  },
  {
    id: 5,
    titulo: "Digitalización de expedientes históricos",
    descripcion:
      "Proceso de digitalización de expedientes históricos del archivo. Preservación digital y mejora de accesibilidad.",
    fecha: new Date(2025, 5, 18, 9, 30), // 18 de junio 2025, 9:30
    fechaInicio: new Date(2025, 5, 18, 9, 30),
    horaInicio: "09:30",
    fechaFin: new Date(2025, 5, 18, 17, 0),
    horaFin: "17:00",
    ubicacion: "Oficina de Digitalización - Mesa de Entradas",
    tipo: "digitalizacion",
    color: "bg-orange-100 text-orange-800",
    participantes: [
      { id: 14, nombre: "Ricardo Jiménez", documento: "33221100", empresa: "Archivo Digital" },
      { id: 15, nombre: "Mónica Vargas", documento: "99887755", empresa: "Puerto La Plata" },
      { id: 16, nombre: "Andrés Romero", documento: "44332211", empresa: "Puerto La Plata" },
    ],
    imagen: "/organized-desk.png",
  },
  {
    id: 6,
    titulo: "Revisión de procedimientos administrativos",
    descripcion:
      "Revisión y actualización de procedimientos administrativos de mesa de entradas. Optimización de procesos.",
    fecha: new Date(2025, 5, 22, 10, 0), // 22 de junio 2025, 10:00
    fechaInicio: new Date(2025, 5, 22, 10, 0),
    horaInicio: "10:00",
    fechaFin: new Date(2025, 5, 22, 15, 0),
    horaFin: "15:00",
    ubicacion: "Oficina de Mesa de Entradas - Sector Procedimientos",
    tipo: "revision",
    color: "bg-yellow-100 text-yellow-800",
    participantes: [
      { id: 17, nombre: "Valeria Sánchez", documento: "77665544", empresa: "Calidad" },
      { id: 18, nombre: "Javier Mendoza", documento: "22113344", empresa: "Puerto La Plata" },
      { id: 19, nombre: "Claudia Rojas", documento: "88776655", empresa: "Puerto La Plata" },
    ],
    imagen: "/professional-interview-setup.png",
  },
  {
    id: 7,
    titulo: "Atención especial - Visita de inspectores",
    descripción:
      "Atención especial a inspectores de organismos de control para revisión documental y cumplimiento normativo.",
    fecha: new Date(2025, 5, 25, 15, 30), // 25 de junio 2025, 15:30
    fechaInicio: new Date(2025, 5, 25, 15, 30),
    horaInicio: "15:30",
    fechaFin: new Date(2025, 5, 25, 17, 30),
    horaFin: "17:30",
    ubicacion: "Mesa de Entradas - Atención Especial",
    tipo: "atencion",
    color: "bg-pink-100 text-pink-800",
    participantes: [
      { id: 20, nombre: "Inspector Juan Pérez", documento: "55667799", empresa: "Organismo de Control" },
      { id: 21, nombre: "Inspectora Ana Díaz", documento: "33445588", empresa: "Organismo de Control" },
      { id: 22, nombre: "Laura Guerrero", documento: "11223366", empresa: "Puerto La Plata" },
    ],
    imagen: "/elegant-invitation.png",
  },
  {
    id: 8,
    titulo: "Cierre mensual de expedientes",
    descripcion:
      "Proceso de cierre mensual y estadísticas de expedientes ingresados. Generación de reportes y métricas.",
    fecha: new Date(2025, 5, 28, 13, 0), // 28 de junio 2025, 13:00
    fechaInicio: new Date(2025, 5, 28, 13, 0),
    horaInicio: "13:00",
    fechaFin: new Date(2025, 5, 28, 16, 0),
    horaFin: "16:00",
    ubicacion: "Oficina de Administración - Sector Estadísticas",
    tipo: "cierre",
    color: "bg-gray-100 text-gray-800",
    participantes: [
      { id: 23, nombre: "Equipo Mesa de Entradas", documento: "", empresa: "Puerto La Plata" },
      { id: 24, nombre: "Analista de Datos", documento: "66554433", empresa: "Puerto La Plata" },
    ],
    imagen: "/business-invoice-details.png",
  },
]

export default function CalendarioEventosMesaEntradasPage() {
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
    const eventosGuardados = localStorage.getItem("eventos-mesa-entradas")
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

    localStorage.setItem("eventos-mesa-entradas", JSON.stringify(eventosPersonalizados))
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
          <h1 className="text-2xl font-bold text-gray-900">Calendario de Eventos - Mesa de Entradas</h1>
          <p className="text-gray-600 mt-1">Gestiona recepción de expedientes, auditorías y actividades documentales</p>
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
