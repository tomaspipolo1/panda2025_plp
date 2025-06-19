"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AsignarEmpleadoModalProps {
  isOpen: boolean
  onClose: () => void
  onAsignar: (empleado: any) => void
  solicitudNumero: string
}

// Datos de ejemplo de empleados del departamento de compras
const empleadosCompras = [
  {
    id: 1,
    nombre: "María González",
    cargo: "Analista de Compras Senior",
    avatar: "/placeholder.svg?height=40&width=40&text=MG",
  },
  {
    id: 2,
    nombre: "Carlos Fernández",
    cargo: "Especialista en Proveedores",
    avatar: "/placeholder.svg?height=40&width=40&text=CF",
  },
  {
    id: 3,
    nombre: "Ana Martínez",
    cargo: "Analista de Compras",
    avatar: "/placeholder.svg?height=40&width=40&text=AM",
  },
  {
    id: 4,
    nombre: "Roberto Silva",
    cargo: "Coordinador de Compras",
    avatar: "/placeholder.svg?height=40&width=40&text=RS",
  },
  {
    id: 5,
    nombre: "Laura Pérez",
    cargo: "Analista de Compras Junior",
    avatar: "/placeholder.svg?height=40&width=40&text=LP",
  },
]

export function AsignarEmpleadoModal({ isOpen, onClose, onAsignar, solicitudNumero }: AsignarEmpleadoModalProps) {
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState<any>(null)

  // Efecto para manejar la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  // Limpiar estado al cerrar
  useEffect(() => {
    if (!isOpen) {
      setEmpleadoSeleccionado(null)
    }
  }, [isOpen])

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null

  const handleAsignar = () => {
    if (empleadoSeleccionado) {
      onAsignar(empleadoSeleccionado)
      onClose()
    }
  }

  // Función para manejar el clic en el overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[70vh] overflow-hidden mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Asignar a empleado</h2>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Lista de empleados */}
        <div className="overflow-y-auto max-h-80">
          {empleadosCompras.map((empleado) => (
            <div
              key={empleado.id}
              onClick={() => setEmpleadoSeleccionado(empleado)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                empleadoSeleccionado?.id === empleado.id ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={empleado.avatar || "/placeholder.svg"} alt={empleado.nombre} />
                    <AvatarFallback>{empleado.nombre.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-sm">{empleado.nombre}</h3>
                    <p className="text-xs text-gray-600">{empleado.cargo}</p>
                  </div>
                </div>
                {empleadoSeleccionado?.id === empleado.id && <CheckCircle className="h-5 w-5 text-blue-600" />}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleAsignar} disabled={!empleadoSeleccionado}>
            Asignar
          </Button>
        </div>
      </div>
    </div>
  )
}
