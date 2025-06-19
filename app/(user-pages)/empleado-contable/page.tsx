"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, ClipboardList, CreditCard, Clock, Calendar, UserPlus } from "lucide-react"

export default function EmpleadoContablePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-plp-dark">Panel de Contabilidad</h1>
          <p className="text-gray-600 mt-2">Gestión integral de proveedores, clientes y finanzas del puerto</p>
        </div>
      </div>

      {/* Cards de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proveedores Pendientes</CardTitle>
            <Building2 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">+3 desde la semana pasada</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Pendientes</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">-2 desde ayer</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gestiones Pendientes</CardTitle>
            <ClipboardList className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+1 desde ayer</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Días Vacaciones</CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Días restantes 2025</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-indigo-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Días Trámite</CardTitle>
            <Clock className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Días restantes disponibles</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-pink-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Préstamo Disponible</CardTitle>
            <CreditCard className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$850K</div>
            <p className="text-xs text-muted-foreground">Monto máximo disponible</p>
          </CardContent>
        </Card>
      </div>

      {/* Secciones principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menú de Acceso Rápido */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-500" />
              Acceso Rápido
            </CardTitle>
            <CardDescription>Accesos directos a módulos importantes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors">
              <div>
                <p className="font-medium">Calendario</p>
                <p className="text-sm text-gray-600">Eventos y reuniones</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
              <div>
                <p className="font-medium">Proveedores</p>
                <p className="text-sm text-gray-600">Gestionar proveedores</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-500" />
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors">
              <div>
                <p className="font-medium">Clientes</p>
                <p className="text-sm text-gray-600">Gestionar clientes</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
            <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg cursor-pointer hover:bg-indigo-100 transition-colors">
              <div>
                <p className="font-medium">Nueva Visita</p>
                <p className="text-sm text-gray-600">Programar visita</p>
              </div>
              <UserPlus className="h-8 w-8 text-indigo-500" />
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors">
              <div>
                <p className="font-medium">Mis Gestiones</p>
                <p className="text-sm text-gray-600">Solicitudes y trámites</p>
              </div>
              <ClipboardList className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        {/* Próximos Eventos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              Próximos Eventos
            </CardTitle>
            <CardDescription>Eventos programados en el calendario</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Auditoría Financiera Trimestral</p>
                <p className="text-xs text-gray-600">Oficina Contabilidad - Piso 2</p>
                <p className="text-xs text-gray-500">15 Ene 2025 - 09:00</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Reunión con Proveedores Estratégicos</p>
                <p className="text-xs text-gray-600">Sala de Reuniones - Piso 3</p>
                <p className="text-xs text-gray-500">20 Ene 2025 - 14:00</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Capacitación Normativas Fiscales</p>
                <p className="text-xs text-gray-600">Aula de Capacitación - Edificio Administrativo</p>
                <p className="text-xs text-gray-500">25 Ene 2025 - 10:00</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Cierre Contable Mensual</p>
                <p className="text-xs text-gray-600">Departamento Contable - Todo el día</p>
                <p className="text-xs text-gray-500">31 Ene 2025 - 08:00</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actividades Recientes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-orange-500" />
              Actividades Recientes
            </CardTitle>
            <CardDescription>Últimas acciones y gestiones procesadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Proveedor aprobado</p>
                  <p className="text-xs text-gray-600">Transportes Marítimos del Plata S.A.</p>
                  <p className="text-xs text-gray-500">Hace 1 hora</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Cliente registrado</p>
                  <p className="text-xs text-gray-600">Logística Portuaria Internacional</p>
                  <p className="text-xs text-gray-500">Hace 2 horas</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Factura procesada</p>
                  <p className="text-xs text-gray-600">FC-2025-001 - Servicios Portuarios</p>
                  <p className="text-xs text-gray-500">Hace 3 horas</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Solicitud de alta procesada</p>
                  <p className="text-xs text-gray-600">Nuevo proveedor de equipamiento</p>
                  <p className="text-xs text-gray-500">Hace 4 horas</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
