"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Briefcase,
  Phone,
  Home,
  FileText,
  UserX,
  ChevronLeft,
  Edit,
  Mail,
  Calendar,
  Hash,
  Building,
  MapPin,
  Clock,
} from "lucide-react"

// Tipo para las direcciones
type Direccion = {
  id: number
  tipo: string
  calle: string
  numero: string
  piso?: string
  departamento?: string
  codigoPostal: string
  localidad: string
  provincia: string
  comentarios?: string
}

// Tipo para el empleado
type Empleado = {
  id: number
  nombre: string
  apellido: string
  dni: string
  cuil: string
  fechaNacimiento: string
  sexo: string
  legajo: string
  fechaIngreso: string
  gerencia: string
  departamento: string
  cargo: string
  estado: string
  email: string
  telefono: string
  telefonoEmpresa?: string
  direcciones: Direccion[]
  avatar?: string
}

// Datos de ejemplo - Esto sería reemplazado por una llamada a la API
const empleadosData: Record<string, Empleado> = {
  "1": {
    id: 1,
    nombre: "Juan Carlos",
    apellido: "González",
    dni: "12345678",
    cuil: "20-12345678-9",
    fechaNacimiento: "1985-03-15",
    sexo: "Masculino",
    legajo: "EMP001",
    fechaIngreso: "2020-01-15",
    gerencia: "Administración",
    departamento: "Contabilidad",
    cargo: "Contador Senior",
    estado: "Activo",
    email: "juan.gonzalez@empresa.com",
    telefono: "+54 11 1234-5678",
    telefonoEmpresa: "+54 11 4000-1000",
    avatar: "/placeholder.svg?height=120&width=120&text=JG",
    direcciones: [
      {
        id: 1,
        tipo: "Personal",
        calle: "Av. Corrientes",
        numero: "1234",
        piso: "5",
        departamento: "A",
        codigoPostal: "1043",
        localidad: "Buenos Aires",
        provincia: "CABA",
        comentarios: "Portero eléctrico",
      },
    ],
  },
  "2": {
    id: 2,
    nombre: "María Elena",
    apellido: "Rodríguez",
    dni: "23456789",
    cuil: "27-23456789-4",
    fechaNacimiento: "1990-07-22",
    sexo: "Femenino",
    legajo: "EMP002",
    fechaIngreso: "2021-03-10",
    gerencia: "Administración",
    departamento: "Finanzas",
    cargo: "Analista Financiero",
    estado: "Activo",
    email: "maria.rodriguez@empresa.com",
    telefono: "+54 11 2345-6789",
    telefonoEmpresa: "", // Sin teléfono de empresa
    avatar: "/placeholder.svg?height=120&width=120&text=MR",
    direcciones: [
      {
        id: 2,
        tipo: "Personal",
        calle: "San Martín",
        numero: "567",
        codigoPostal: "1636",
        localidad: "Olivos",
        provincia: "Buenos Aires",
        comentarios: "",
      },
      {
        id: 3,
        tipo: "Laboral",
        calle: "Av. Santa Fe",
        numero: "890",
        piso: "12",
        departamento: "B",
        codigoPostal: "1059",
        localidad: "Buenos Aires",
        provincia: "CABA",
        comentarios: "Oficina principal",
      },
    ],
  },
  "3": {
    id: 3,
    nombre: "Carlos Alberto",
    apellido: "Martínez",
    dni: "34567890",
    cuil: "20-34567890-1",
    fechaNacimiento: "1982-11-08",
    sexo: "Masculino",
    legajo: "EMP003",
    fechaIngreso: "2019-06-20",
    gerencia: "Administración",
    departamento: "Tesorería",
    cargo: "Tesorero",
    estado: "Activo",
    email: "carlos.martinez@empresa.com",
    telefono: "+54 11 3456-7890",
    telefonoEmpresa: "+54 11 4000-1000",
    avatar: "/placeholder.svg?height=120&width=120&text=CM",
    direcciones: [],
  },
}

// Función para calcular la edad
function calcularEdad(fechaNacimiento: string): number {
  const hoy = new Date()
  const fechaNac = new Date(fechaNacimiento)
  let edad = hoy.getFullYear() - fechaNac.getFullYear()
  const mes = hoy.getMonth() - fechaNac.getMonth()

  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad--
  }

  return edad
}

// Función para formatear fecha
function formatearFecha(fecha: string): string {
  const opciones: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit", year: "numeric" }
  return new Date(fecha).toLocaleDateString("es-AR", opciones)
}

// Función para calcular años de antigüedad
function calcularAntiguedad(fechaIngreso: string): number {
  const hoy = new Date()
  const ingreso = new Date(fechaIngreso)
  let antiguedad = hoy.getFullYear() - ingreso.getFullYear()
  const mes = hoy.getMonth() - ingreso.getMonth()

  if (mes < 0 || (mes === 0 && hoy.getDate() < ingreso.getDate())) {
    antiguedad--
  }

  return antiguedad
}

export default function PerfilEmpleadoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const empleadoId = params.id
  const empleado = empleadosData[empleadoId]

  // Si no existe el empleado, redirigir al listado
  if (!empleado) {
    router.push("/empleado-rrhh/gestion/empleados/listado")
    return null
  }

  // Calcular edad y antigüedad
  const edad = calcularEdad(empleado.fechaNacimiento)
  const antiguedad = calcularAntiguedad(empleado.fechaIngreso)

  // Función para manejar la edición del empleado
  const manejarEditarEmpleado = () => {
    router.push(`/empleado-rrhh/gestion/empleados/editar/${empleadoId}`)
  }

  // Obtener color del badge según estado
  const getEstadoBadge = (estado: string) => {
    const variants = {
      Activo: { variant: "default" as const, className: "bg-green-600 hover:bg-green-700" },
      Inactivo: { variant: "secondary" as const, className: "bg-gray-500 hover:bg-gray-600" },
      Licencia: {
        variant: "outline" as const,
        className: "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500",
      },
      Vacaciones: { variant: "destructive" as const, className: "bg-red-500 hover:bg-red-600" },
      Baja: { variant: "destructive" as const, className: "bg-red-700 hover:bg-red-800" },
    }
    return variants[estado as keyof typeof variants] || variants.Activo
  }

  const estadoBadge = getEstadoBadge(empleado.estado)

  // Generar iniciales para el avatar
  const iniciales = `${empleado.nombre.charAt(0)}${empleado.apellido.charAt(0)}`

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Contenedor principal con márgenes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Encabezado mejorado */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/empleado-rrhh/gestion/empleados/listado")}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Volver al listado
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Perfil de Empleado</h1>
                <p className="text-sm text-gray-500 mt-1">Información completa del empleado</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={manejarEditarEmpleado}>
                <Edit className="h-4 w-4" />
                Editar empleado
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Ver legajo PDF
              </Button>
              <Button variant="destructive" size="sm" className="flex items-center gap-2">
                <UserX className="h-4 w-4" />
                Dar de baja
              </Button>
            </div>
          </div>
        </div>

        {/* Información principal con avatar */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage
                src={empleado.avatar || "/placeholder.svg"}
                alt={`${empleado.nombre} ${empleado.apellido}`}
              />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {iniciales}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-3xl font-bold text-gray-900">
                  {empleado.nombre} {empleado.apellido}
                </h2>
                <Badge variant={estadoBadge.variant} className={estadoBadge.className}>
                  {empleado.estado}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Legajo:</span>
                  <span className="font-medium">{empleado.legajo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Departamento:</span>
                  <span className="font-medium">{empleado.departamento}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Cargo:</span>
                  <span className="font-medium">{empleado.cargo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Antigüedad:</span>
                  <span className="font-medium">{antiguedad} años</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de información detallada - 2 columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Columna izquierda (más ancha) - 3/5 del espacio */}
          <div className="lg:col-span-3 grid grid-rows-2 gap-6">
            {/* Datos Personales */}
            <Card className="shadow-sm border-0 bg-white h-full">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  Datos Personales
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                  <div className="flex items-center gap-3">
                    <Hash className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">DNI</p>
                      <p className="font-medium text-gray-900">{empleado.dni}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Hash className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">CUIL</p>
                      <p className="font-medium text-gray-900">{empleado.cuil}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Fecha de nacimiento</p>
                      <p className="font-medium text-gray-900">{formatearFecha(empleado.fechaNacimiento)}</p>
                      <p className="text-sm text-gray-500">{edad} años</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Sexo</p>
                      <p className="font-medium text-gray-900">{empleado.sexo}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Datos Laborales */}
            <Card className="shadow-sm border-0 bg-white h-full">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Briefcase className="h-5 w-5 text-green-600" />
                  </div>
                  Datos Laborales
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Fecha de ingreso</p>
                      <p className="font-medium text-gray-900">{formatearFecha(empleado.fechaIngreso)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Gerencia</p>
                      <p className="font-medium text-gray-900">{empleado.gerencia}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Departamento</p>
                      <p className="font-medium text-gray-900">{empleado.departamento}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Cargo</p>
                      <p className="font-medium text-gray-900">{empleado.cargo}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna derecha (más angosta) - 2/5 del espacio */}
          <div className="lg:col-span-2 grid grid-rows-2 gap-6">
            {/* Datos de Contacto */}
            <Card className="shadow-sm border-0 bg-white h-full">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Phone className="h-5 w-5 text-purple-600" />
                  </div>
                  Datos de Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-1">
                <div className="space-y-4 h-full flex flex-col justify-center">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{empleado.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Teléfono</p>
                      <p className="font-medium text-gray-900">{empleado.telefono}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Teléfono Empresa</p>
                      <p className="font-medium text-gray-900">{empleado.telefonoEmpresa || "-"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Direcciones */}
            <Card className="shadow-sm border-0 bg-white h-full">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
                <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Home className="h-5 w-5 text-orange-600" />
                  </div>
                  Direcciones
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-1">
                {empleado.direcciones.length > 0 ? (
                  <div className="space-y-4 h-full overflow-y-auto">
                    {empleado.direcciones.map((direccion) => (
                      <div key={direccion.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <Badge variant="outline" className="text-xs">
                            {direccion.tipo}
                          </Badge>
                        </div>

                        <div className="text-sm space-y-1">
                          <p className="font-medium text-gray-900">
                            {direccion.calle} {direccion.numero}
                            {direccion.piso && `, Piso ${direccion.piso}`}
                            {direccion.departamento && `, Depto ${direccion.departamento}`}
                          </p>
                          <p className="text-gray-600">
                            CP {direccion.codigoPostal}, {direccion.localidad}
                          </p>
                          <p className="text-gray-600">{direccion.provincia}</p>
                          {direccion.comentarios && (
                            <p className="text-gray-500 italic text-xs mt-2">{direccion.comentarios}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 h-full flex flex-col justify-center">
                    <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-sm">Este empleado no tiene direcciones cargadas.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
