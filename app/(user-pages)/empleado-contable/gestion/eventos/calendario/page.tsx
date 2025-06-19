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

// Eventos de ejemplo para empleado-contable
const eventosEjemplo: Evento[] = [
  {
    id: 1,
    titulo: "Cierre Contable Mensual",
    descripcion:
      "Proceso de cierre contable del mes anterior, revisión de estados financieros y preparación de informes para la dirección.",
    fecha: new Date(2025, 5, 3, 9, 0), // 3 de junio 2025, 9:00
    fechaInicio: new Date(2025, 5, 3, 9, 0),
    horaInicio: "09:00",
    fechaFin: new Date(2025, 5, 3, 12, 0),
    horaFin: "12:00",
    ubicacion: "Departamento de Contabilidad - Oficina Principal",
    tipo: "cierre",
    color: "bg-red-100 text-red-800",
    participantes: [
      { id: 1, nombre: "María Elena Rodríguez", documento: "12345678", empresa: "Puerto La Plata - Contabilidad" },
      { id: 2, nombre: "Carlos Alberto Fernández", documento: "87654321", empresa: "Puerto La Plata - Contabilidad" },
      { id: 3, nombre: "Ana Sofía Martínez", documento: "11223344", empresa: "Puerto La Plata - Tesorería" },
    ],
    imagen: "/organized-desk.png",
  },
  {
    id: 2,
    titulo: "Auditoría Externa - Revisión de Cuentas",
    descripcion:
      "Sesión de trabajo con auditores externos para revisión de cuentas por cobrar, cuentas por pagar y conciliaciones bancarias.",
    fecha: new Date(2025, 5, 5, 10, 30), // 5 de junio 2025, 10:30
    fechaInicio: new Date(2025, 5, 5, 10, 30),
    horaInicio: "10:30",
    fechaFin: new Date(2025, 5, 5, 15, 30),
    horaFin: "15:30",
    ubicacion: "Sala de Auditoría - Edificio Administrativo",
    tipo: "auditoria",
    color: "bg-purple-100 text-purple-800",
    participantes: [
      { id: 4, nombre: "Roberto Silva", documento: "55667788", empresa: "Estudio Contable Asociados" },
      { id: 5, nombre: "Laura Fernández", documento: "99887766", empresa: "Estudio Contable Asociados" },
      { id: 6, nombre: "Diego Morales", documento: "44556677", empresa: "Puerto La Plata - Contabilidad" },
    ],
    imagen: "/professional-interview-setup.png",
  },
  {
    id: 3,
    titulo: "Capacitación: Nuevas Normas Contables",
    descripcion:
      "Capacitación sobre las nuevas normas contables internacionales NIIF y su implementación en el sistema portuario.",
    fecha: new Date(2025, 5, 7, 14, 0), // 7 de junio 2025, 14:00
    fechaInicio: new Date(2025, 5, 7, 14, 0),
    horaInicio: "14:00",
    fechaFin: new Date(2025, 5, 7, 17, 0),
    horaFin: "17:00",
    ubicacion: "Aula de Capacitación - Centro de Formación",
    tipo: "capacitacion",
    color: "bg-blue-100 text-blue-800",
    participantes: [
      { id: 7, nombre: "Sofía López", documento: "33445566", empresa: "Consejo Profesional de Ciencias Económicas" },
      { id: 8, nombre: "Martín Pérez", documento: "22334455", empresa: "Puerto La Plata - Contabilidad" },
      { id: 9, nombre: "Patricia Ruiz", documento: "66778899", empresa: "Puerto La Plata - Contabilidad" },
    ],
    imagen: "/collaborative-learning-session.png",
  },
  {
    id: 4,
    titulo: "Reunión con Bancos - Líneas de Crédito",
    descripcion:
      "Reunión con representantes bancarios para negociar nuevas líneas de crédito y condiciones financieras.",
    fecha: new Date(2025, 5, 9, 11, 0), // 9 de junio 2025, 11:00
    fechaInicio: new Date(2025, 5, 9, 11, 0),
    horaInicio: "11:00",
    fechaFin: new Date(2025, 5, 9, 13, 0),
    horaFin: "13:00",
    ubicacion: "Sala de Reuniones Ejecutiva - Dirección Financiera",
    tipo: "reunion",
    color: "bg-green-100 text-green-800",
    participantes: [
      { id: 10, nombre: "Alejandro Castro", documento: "77889900", empresa: "Banco Nación" },
      { id: 11, nombre: "Gabriela Torres", documento: "88990011", empresa: "Banco Provincia" },
      { id: 12, nombre: "Fernando Vega", documento: "99001122", empresa: "Puerto La Plata - Finanzas" },
    ],
    imagen: "/diverse-business-conference.png",
  },
  {
    id: 5,
    titulo: "Presentación Resultados Trimestrales",
    descripcion:
      "Presentación de resultados financieros del trimestre ante el directorio y análisis de indicadores económicos.",
    fecha: new Date(2025, 5, 12, 16, 0), // 12 de junio 2025, 16:00
    fechaInicio: new Date(2025, 5, 12, 16, 0),
    horaInicio: "16:00",
    fechaFin: new Date(2025, 5, 12, 18, 0),
    horaFin: "18:00",
    ubicacion: "Sala de Directorio - Edificio Central",
    tipo: "presentacion",
    color: "bg-orange-100 text-orange-800",
    participantes: [
      { id: 13, nombre: "Valeria Sánchez", documento: "00112233", empresa: "Puerto La Plata - Directorio" },
      { id: 14, nombre: "Ricardo Gómez", documento: "11223355", empresa: "Puerto La Plata - Directorio" },
      { id: 15, nombre: "Claudia Herrera", documento: "22334466", empresa: "Puerto La Plata - Contabilidad" },
    ],
    imagen: "/international-press-briefing.png",
  },
  {
    id: 6,
    titulo: "Reconciliación Bancaria Mensual",
    descripcion:
      "Proceso de reconciliación de todas las cuentas bancarias de la empresa y verificación de movimientos.",
    fecha: new Date(2025, 5, 15, 9, 30), // 15 de junio 2025, 9:30
    fechaInicio: new Date(2025, 5, 15, 9, 30),
    horaInicio: "09:30",
    fechaFin: new Date(2025, 5, 15, 12, 30),
    horaFin: "12:30",
    ubicacion: "Oficina de Tesorería - Departamento Financiero",
    tipo: "reconciliacion",
    color: "bg-yellow-100 text-yellow-800",
    participantes: [
      { id: 16, nombre: "Miguel Ángel Torres", documento: "33445577", empresa: "Puerto La Plata - Tesorería" },
      { id: 17, nombre: "Lucía Moreno", documento: "44556688", empresa: "Puerto La Plata - Contabilidad" },
    ],
    imagen: "/business-invoice-details.png",
  },
  {
    id: 7,
    titulo: "Comité de Finanzas Mensual",
    descripcion:
      "Reunión mensual del comité de finanzas para revisar presupuestos, proyecciones y tomar decisiones estratégicas.",
    fecha: new Date(2025, 5, 18, 10, 0), // 18 de junio 2025, 10:00
    fechaInicio: new Date(2025, 5, 18, 10, 0),
    horaInicio: "10:00",
    fechaFin: new Date(2025, 5, 18, 12, 0),
    horaFin: "12:00",
    ubicacion: "Sala de Comités - Edificio Administrativo",
    tipo: "comite",
    color: "bg-indigo-100 text-indigo-800",
    participantes: [
      { id: 18, nombre: "Eduardo Ramírez", documento: "55667799", empresa: "Puerto La Plata - Finanzas" },
      { id: 19, nombre: "Silvia Mendoza", documento: "66778800", empresa: "Puerto La Plata - Contabilidad" },
      { id: 20, nombre: "Jorge Luis Vargas", documento: "77889911", empresa: "Puerto La Plata - Directorio" },
    ],
    imagen: "/diverse-team-meeting.png",
  },
  {
    id: 8,
    titulo: "Revisión Presupuesto Anual",
    descripcion:
      "Revisión y ajuste del presupuesto anual según los resultados del primer semestre y proyecciones futuras.",
    fecha: new Date(2025, 5, 22, 13, 30), // 22 de junio 2025, 13:30
    fechaInicio: new Date(2025, 5, 22, 13, 30),
    horaInicio: "13:30",
    fechaFin: new Date(2025, 5, 22, 16, 30),
    horaFin: "16:30",
    ubicacion: "Sala de Planificación - Departamento Financiero",
    tipo: "revision",
    color: "bg-gray-100 text-gray-800",
    participantes: [
      { id: 21, nombre: "Andrea Castillo", documento: "88990022", empresa: "Puerto La Plata - Planificación" },
      { id: 22, nombre: "Sebastián Rojas", documento: "99001133", empresa: "Puerto La Plata - Contabilidad" },
      { id: 23, nombre: "Mónica Delgado", documento: "00112244", empresa: "Puerto La Plata - Finanzas" },
    ],
    imagen: "/collaborative-strategy-session.png",
  },
]

export default function CalendarioEventosContablePage() {
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
    const eventosGuardados = localStorage.getItem("eventos-contable")
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

    localStorage.setItem("eventos-contable", JSON.stringify(eventosPersonalizados))
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
          <h1 className="text-2xl font-bold text-gray-900">Calendario de Eventos - Contabilidad</h1>
          <p className="text-gray-600 mt-1">Gestiona cierres contables, auditorías y actividades del departamento</p>
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
