"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, MoreVertical, Plus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Definir los tipos de estado posibles
type EstadoEntidad = "Pendiente de aprobación" | "Aprobado" | "Activo" | "Inactivo" | "Cancelado" | "Borrador"

// Definir los tipos de entidad
type TipoEntidad = "Proveedor" | "Cliente" | "Agencia Marítima"

// Función para determinar el color del badge según el estado
const getBadgeVariant = (estado: EstadoEntidad) => {
  switch (estado) {
    case "Pendiente de aprobación":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    case "Aprobado":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    case "Activo":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "Inactivo":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    case "Cancelado":
      return "bg-red-100 text-red-800 hover:bg-red-100"
    case "Borrador":
      return "bg-purple-100 text-purple-800 hover:bg-purple-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

// Función para determinar la ruta según el tipo de entidad
const getPortalRoute = (tipo: TipoEntidad) => {
  switch (tipo) {
    case "Proveedor":
      return "/proveedor"
    case "Cliente":
      return "/cliente"
    case "Agencia Marítima":
      // Asumimos que las agencias marítimas usan el portal de proveedor
      return "/proveedor"
    default:
      return "/usuario-basico"
  }
}

export default function MisEntidadesPage() {
  const router = useRouter()

  const [entidades] = useState([
    {
      id: 1,
      nombre: "Auletta SRL",
      cuit: "30-700012533-3",
      tipo: "Proveedor" as TipoEntidad,
      contacto: "Ernesto Gomez",
      email: "ejemplo@auletta.com.ar",
      direccion: "Calle 50 1988 - La Plata - Buenos Aires",
      estado: "Activo" as EstadoEntidad,
    },
    {
      id: 2,
      nombre: "RetóricaJS SA",
      cuit: "30-400222533-1",
      tipo: "Agencia Marítima" as TipoEntidad,
      contacto: "Ernesto Gomez",
      email: "ejemplo@auletta.com.ar",
      direccion: "Calle 50 1988 - La Plata - Buenos Aires",
      estado: "Pendiente de aprobación" as EstadoEntidad,
    },
    {
      id: 3,
      nombre: "Tecnología Avanzada SRL",
      cuit: "30-123456789-0",
      tipo: "Proveedor" as TipoEntidad,
      contacto: "María López",
      email: "contacto@tecnoavanzada.com.ar",
      direccion: "Av. Corrientes 1234 - CABA - Buenos Aires",
      estado: "Aprobado" as EstadoEntidad,
    },
    {
      id: 4,
      nombre: "Logística del Sur SA",
      cuit: "30-987654321-0",
      tipo: "Cliente" as TipoEntidad,
      contacto: "Carlos Rodríguez",
      email: "info@logisticasur.com.ar",
      direccion: "Ruta 2 Km 44 - Berazategui - Buenos Aires",
      estado: "Inactivo" as EstadoEntidad,
    },
    {
      id: 5,
      nombre: "Constructora Omega",
      cuit: "30-555666777-8",
      tipo: "Cliente" as TipoEntidad,
      contacto: "Roberto Sánchez",
      email: "ventas@omega.com.ar",
      direccion: "Calle 7 entre 45 y 46 - La Plata - Buenos Aires",
      estado: "Cancelado" as EstadoEntidad,
    },
    {
      id: 6,
      nombre: "Suministros Industriales SA",
      cuit: "30-111222333-4",
      tipo: "Proveedor" as TipoEntidad,
      contacto: "Laura Martínez",
      email: "contacto@suministrosindustriales.com.ar",
      direccion: "Av. Mitre 500 - Avellaneda - Buenos Aires",
      estado: "Borrador" as EstadoEntidad,
    },
  ])

  // Función para manejar la selección de una entidad
  const handleSeleccionarEntidad = (entidad: (typeof entidades)[0]) => {
    // Permitir seleccionar entidades activas, aprobadas o en borrador
    if (entidad.estado === "Activo" || entidad.estado === "Aprobado" || entidad.estado === "Borrador") {
      // Si es un borrador, redirigir al formulario de alta correspondiente
      if (entidad.estado === "Borrador") {
        if (entidad.tipo === "Proveedor") {
          router.push("/usuario-basico/gestion/nueva-entidad/proveedor?id=" + entidad.id)
        } else if (entidad.tipo === "Cliente") {
          router.push("/usuario-basico/gestion/nueva-entidad/cliente?id=" + entidad.id)
        } else {
          router.push("/usuario-basico/gestion/nueva-entidad")
        }
      } else {
        // Redirigir al portal correspondiente según el tipo de entidad
        router.push(getPortalRoute(entidad.tipo))
      }
    } else {
      // Mostrar un mensaje de que la entidad no está activa o aprobada
      alert(`No se puede seleccionar esta entidad porque su estado es: ${entidad.estado}`)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-plp-darkest">Mis Entidades</h1>
        <Link
          href="/usuario-basico/gestion/nueva-entidad"
          className="bg-[#002060] hover:bg-[#001a4d] text-white px-4 py-2 rounded-md flex items-center transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Entidad
        </Link>
      </div>

      <div className="space-y-4">
        {entidades.map((entidad) => (
          <div key={entidad.id} className="bg-white rounded-lg border border-gray-200 p-6 relative">
            <div className="absolute top-4 right-4">
              <button className="text-gray-500 hover:text-gray-700">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-xl font-semibold text-plp-darkest">{entidad.nombre}</h2>
                <p className="text-sm text-gray-600 mt-1">CUIT: {entidad.cuit}</p>

                <div className="mt-4 text-gray-500">
                  <p>{entidad.contacto}</p>
                  <p>{entidad.email}</p>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-lg font-medium text-plp-dark">{entidad.tipo}</p>
                  <div className="flex items-start mt-2 text-gray-600">
                    <MapPin className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <p>{entidad.direccion}</p>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 md:self-end flex items-center gap-3">
                  <Badge className={getBadgeVariant(entidad.estado)}>{entidad.estado}</Badge>
                  <Button
                    variant="outline"
                    className={`border-plp-primary text-plp-primary hover:bg-plp-lightest ${
                      entidad.estado !== "Activo" && entidad.estado !== "Aprobado" && entidad.estado !== "Borrador"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => handleSeleccionarEntidad(entidad)}
                    disabled={
                      entidad.estado !== "Activo" && entidad.estado !== "Aprobado" && entidad.estado !== "Borrador"
                    }
                  >
                    Seleccionar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
