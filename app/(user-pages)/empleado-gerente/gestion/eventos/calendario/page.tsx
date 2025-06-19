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

// Eventos de ejemplo para empleado-gerente
const eventosEjemplo: Evento[] = [
  {
    id: 1,
    titulo: "Reunión de Directorio",
    descripcion:
      "Reunión mensual del directorio para revisar resultados financieros, aprobar inversiones y tomar decisiones estratégicas para el puerto.",
    fecha: new Date(2025, 5, 5, 9, 0), // 5 de junio 2025, 9:00
    fechaInicio: new Date(2025, 5, 5, 9, 0),
    horaInicio: "09:00",
    fechaFin: new Date(2025, 5, 5, 12, 0),
    horaFin: "12:00",
    ubicacion: "Sala de Reuniones - Presidencia",
    tipo: "directorio",
    color: "bg-red-100 text-red-800",
    participantes: [
      { id: 1, nombre: "Dr. Carlos Mendoza", documento: "12345678", empresa: "Presidente del Directorio" },
      { id: 2, nombre: "Ing. Ana García", documento: "87654321", empresa: "Directora Ejecutiva" },
      { id: 3, nombre: "Lic. Roberto Silva", documento: "11223344", empresa: "Director Financiero" },
      { id: 4, nombre: "Dra. María López", documento: "55667788", empresa: "Directora de Operaciones" },
    ],
    imagen: "/diverse-business-conference.png",
  },
  {
    id: 2,
    titulo: "Presentación Resultados Trimestrales",
    descripcion:
      "Presentación de resultados financieros y operativos del trimestre a los accionistas y stakeholders principales.",
    fecha: new Date(2025, 5, 8, 10, 30), // 8 de junio 2025, 10:30
    fechaInicio: new Date(2025, 5, 8, 10, 30),
    horaInicio: "10:30",
    fechaFin: new Date(2025, 5, 8, 12, 30),
    horaFin: "12:30",
    ubicacion: "Salón Auditorio - Planta Baja",
    tipo: "presentacion",
    color: "bg-blue-100 text-blue-800",
    participantes: [
      { id: 5, nombre: "Lic. Fernando Paz", documento: "99887766", empresa: "Gerente General" },
      { id: 6, nombre: "CPN. Carmen Torres", documento: "44556677", empresa: "Gerente Financiero" },
      { id: 7, nombre: "Ing. Diego Fernández", documento: "33445566", empresa: "Gerente de Operaciones" },
    ],
    imagen: "/international-press-briefing.png",
  },
  {
    id: 3,
    titulo: "Planificación Estratégica Anual",
    descripcion:
      "Sesión de planificación estratégica para definir objetivos, metas y proyectos prioritarios del próximo año fiscal.",
    fecha: new Date(2025, 5, 12, 14, 0), // 12 de junio 2025, 14:00
    fechaInicio: new Date(2025, 5, 12, 14, 0),
    horaInicio: "14:00",
    fechaFin: new Date(2025, 5, 12, 18, 0),
    horaFin: "18:00",
    ubicacion: "Sala de Conferencias - Edificio Central",
    tipo: "planificacion",
    color: "bg-purple-100 text-purple-800",
    participantes: [
      { id: 8, nombre: "Lic. Patricia Ruiz", documento: "77889900", empresa: "Planificación Estratégica" },
      { id: 9, nombre: "Ing. Andrés Morales", documento: "22334455", empresa: "Desarrollo de Proyectos" },
      { id: 10, nombre: "Dra. Sandra Vega", documento: "66778899", empresa: "Consultoría Externa" },
    ],
    imagen: "/collaborative-strategy-session.png",
  },
  {
    id: 4,
    titulo: "Reunión con Sindicatos",
    descripcion:
      "Reunión de negociación colectiva con representantes sindicales para revisar condiciones laborales y beneficios.",
    fecha: new Date(2025, 5, 15, 11, 0), // 15 de junio 2025, 11:00
    fechaInicio: new Date(2025, 5, 15, 11, 0),
    horaInicio: "11:00",
    fechaFin: new Date(2025, 5, 15, 15, 0),
    horaFin: "15:00",
    ubicacion: "Sala de Reuniones - Gerencia",
    tipo: "negociacion",
    color: "bg-orange-100 text-orange-800",
    participantes: [
      { id: 11, nombre: "Sr. Miguel Castro", documento: "11335577", empresa: "Sindicato Portuario" },
      { id: 12, nombre: "Sra. Elena Jiménez", documento: "88990011", empresa: "Sindicato de Empleados" },
      { id: 13, nombre: "Lic. Gabriela Herrera", documento: "99887755", empresa: "Recursos Humanos" },
    ],
    imagen: "/diverse-team-meeting.png",
  },
  {
    id: 5,
    titulo: "Visita de Autoridades Portuarias",
    descripcion:
      "Visita oficial de autoridades portuarias nacionales para inspección de instalaciones y evaluación de cumplimiento normativo.",
    fecha: new Date(2025, 5, 18, 9, 30), // 18 de junio 2025, 9:30
    fechaInicio: new Date(2025, 5, 18, 9, 30),
    horaInicio: "09:30",
    fechaFin: new Date(2025, 5, 18, 16, 0),
    horaFin: "16:00",
    ubicacion: "Terminal Portuaria - Muelle Principal",
    tipo: "institucional",
    color: "bg-green-100 text-green-800",
    participantes: [
      { id: 14, nombre: "Dr. Ricardo Molina", documento: "33221100", empresa: "Autoridad Portuaria Nacional" },
      { id: 15, nombre: "Ing. Lucía Vargas", documento: "55443322", empresa: "Inspección Técnica" },
      { id: 16, nombre: "Lic. Martín Sosa", documento: "77665544", empresa: "Relaciones Institucionales" },
    ],
    imagen: "/bustling-port.png",
  },
  {
    id: 6,
    titulo: "Comité Ejecutivo",
    descripcion:
      "Reunión semanal del comité ejecutivo para revisar operaciones diarias, tomar decisiones urgentes y coordinar actividades.",
    fecha: new Date(2025, 5, 22, 10, 0), // 22 de junio 2025, 10:00
    fechaInicio: new Date(2025, 5, 22, 10, 0),
    horaInicio: "10:00",
    fechaFin: new Date(2025, 5, 22, 11, 30),
    horaFin: "11:30",
    ubicacion: "Oficina de Gerencia General",
    tipo: "comite",
    color: "bg-indigo-100 text-indigo-800",
    participantes: [
      { id: 17, nombre: "Lic. Fernando Paz", documento: "99887766", empresa: "Gerente General" },
      { id: 18, nombre: "Ing. Diego Fernández", documento: "33445566", empresa: "Gerente de Operaciones" },
      { id: 19, nombre: "CPN. Carmen Torres", documento: "44556677", empresa: "Gerente Financiero" },
    ],
    imagen: "/professional-interview-setup.png",
  },
  {
    id: 7,
    titulo: "Evaluación de Inversiones",
    descripcion:
      "Evaluación de propuestas de inversión en infraestructura portuaria, equipamiento y tecnología para modernización.",
    fecha: new Date(2025, 5, 25, 15, 30), // 25 de junio 2025, 15:30
    fechaInicio: new Date(2025, 5, 25, 15, 30),
    horaInicio: "15:30",
    fechaFin: new Date(2025, 5, 25, 17, 30),
    horaFin: "17:30",
    ubicacion: "Oficina de Planificación - Piso 2",
    tipo: "evaluacion",
    color: "bg-yellow-100 text-yellow-800",
    participantes: [
      { id: 20, nombre: "Ing. Patricia Ruiz", documento: "77889900", empresa: "Comité de Inversiones" },
      { id: 21, nombre: "Arq. Andrés Morales", documento: "22334455", empresa: "Desarrollo de Infraestructura" },
      { id: 22, nombre: "Lic. Sandra Vega", documento: "66778899", empresa: "Análisis Financiero" },
    ],
    imagen: "/organized-desk.png",
  },
  {
    id: 8,
    titulo: "Reunión con Clientes Estratégicos",
    descripcion:
      "Reunión con principales clientes del puerto para revisar servicios, negociar nuevos contratos y fortalecer relaciones comerciales.",
    fecha: new Date(2025, 5, 28, 13, 0), // 28 de junio 2025, 13:00
    fechaInicio: new Date(2025, 5, 28, 13, 0),
    horaInicio: "13:00",
    fechaFin: new Date(2025, 5, 28, 16, 0),
    horaFin: "16:00",
    ubicacion: "Sala de Reuniones - Directorio",
    tipo: "comercial",
    color: "bg-pink-100 text-pink-800",
    participantes: [
      { id: 23, nombre: "Sr. Miguel Castro", documento: "11335577", empresa: "Naviera Internacional" },
      { id: 24, nombre: "Sra. Elena Jiménez", documento: "88990011", empresa: "Logística Global" },
      { id: 25, nombre: "Lic. Gabriela Herrera", documento: "99887755", empresa: "Gerencia Comercial" },
    ],
    imagen: "/elegant-charity-evening.png",
  },
]

export default function CalendarioEventosGerentePage() {
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
    const eventosGuardados = localStorage.getItem("eventos-gerente")
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

    localStorage.setItem("eventos-gerente", JSON.stringify(eventosPersonalizados))
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
          <h1 className="text-2xl font-bold text-gray-900">Calendario de Eventos - Gerencia</h1>
          <p className="text-gray-600 mt-1">Gestiona reuniones directivas, presentaciones y actividades ejecutivas</p>
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
