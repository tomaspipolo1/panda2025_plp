"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, MapPin, Users, ImageIcon, AlertTriangle } from "lucide-react"
import Image from "next/image"
import { format } from "date-fns"
import { es } from "date-fns/locale"

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

interface ModalEventoProps {
  evento: Evento | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

export default function ModalEvento({ evento, open, onOpenChange, onEdit, onDelete }: ModalEventoProps) {
  const router = useRouter()
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (!evento) return null

  const handleEdit = () => {
    if (onEdit) {
      onEdit(evento.id)
    } else {
      // Redirigir a la página de edición con el ID del evento
      router.push(`/empleado-prensa/gestion/eventos/editar/${evento.id}`)
    }
    onOpenChange(false)
  }

  const handleDelete = () => {
    if (confirmDelete) {
      if (onDelete) {
        onDelete(evento.id)
      }
      onOpenChange(false)
      setConfirmDelete(false)
    } else {
      setConfirmDelete(true)
    }
  }

  const formatFecha = (fecha: Date) => {
    return format(fecha, "EEEE d 'de' MMMM 'de' yyyy", { locale: es })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{evento.titulo}</DialogTitle>
          <div className="mt-1">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                evento.estado === "pendiente"
                  ? "bg-pink-100 text-pink-800"
                  : evento.estado === "en_curso"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
              }`}
            >
              {evento.estado === "pendiente" ? "Pendiente" : evento.estado === "en_curso" ? "En Curso" : "Finalizado"}
            </span>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Columna izquierda - Imagen y descripción */}
          <div className="space-y-4">
            {/* Imagen del evento */}
            {evento.imagen ? (
              <div className="relative w-full h-48 rounded-md overflow-hidden">
                <Image src={evento.imagen || "/placeholder.svg"} alt={evento.titulo} fill className="object-cover" />
              </div>
            ) : (
              <div className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-gray-400" />
                <span className="text-gray-500 ml-2">Sin imagen</span>
              </div>
            )}

            {/* Descripción */}
            {evento.descripcion && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Descripción</h3>
                <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">{evento.descripcion}</p>
              </div>
            )}
          </div>

          {/* Columna derecha - Detalles del evento */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 mb-4">Detalles del evento</h3>

            {/* Fecha y hora de inicio */}
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Fecha de inicio</p>
                <p className="text-gray-700 text-sm capitalize">{formatFecha(evento.fechaInicio)}</p>
              </div>
            </div>

            {/* Hora de inicio */}
            {evento.horaInicio && (
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Hora de inicio</p>
                  <p className="text-gray-700 text-sm">{evento.horaInicio}</p>
                </div>
              </div>
            )}

            {/* Fecha de fin */}
            {evento.fechaFin && (
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Fecha de fin</p>
                  <p className="text-gray-700 text-sm capitalize">{formatFecha(evento.fechaFin)}</p>
                </div>
              </div>
            )}

            {/* Hora de fin */}
            {evento.horaFin && (
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Hora de fin</p>
                  <p className="text-gray-700 text-sm">{evento.horaFin}</p>
                </div>
              </div>
            )}

            {/* Ubicación */}
            {evento.ubicacion && (
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Ubicación</p>
                  <p className="text-gray-700 text-sm">{evento.ubicacion}</p>
                </div>
              </div>
            )}

            {/* Participantes - Solo mostrar cantidad */}
            {evento.participantes && evento.participantes.length > 0 && (
              <div className="flex items-start">
                <Users className="h-5 w-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Participantes</p>
                  <p className="text-gray-700 text-sm">{evento.participantes.length} personas confirmadas</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Botones de acción */}
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button variant="outline" onClick={handleEdit}>
            Editar
          </Button>
          <Button
            variant={confirmDelete ? "destructive" : "outline"}
            onClick={handleDelete}
            className={confirmDelete ? "bg-red-600 hover:bg-red-700" : "text-red-600 hover:text-red-700"}
          >
            {confirmDelete ? (
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Confirmar
              </div>
            ) : (
              "Eliminar"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
