"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Building, ClipboardList, CreditCard, Clock, Calendar } from "lucide-react"

export default function EmpleadoMesaEntradasPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-plp-dark">Panel de Mesa de Entradas</h1>
          <p className="text-gray-600 mt-2">Gestión integral de expedientes y documentación del puerto</p>
        </div>
      </div>

      {/* Cards de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expedientes Activos</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+5 nuevos esta semana</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Facturas Pendientes</CardTitle>
            <FileText className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">43</div>
            <p className="text-xs text-muted-foreground">+12 desde ayer</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Licitaciones Activas</CardTitle>
            <Building className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 cierran esta semana</p>
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
              <FileText className="h-5 w-5 text-blue-500" />
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
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors">
              <div>
                <p className="font-medium">Facturas</p>
                <p className="text-sm text-gray-600">Gestionar facturas</p>
              </div>
              <FileText className="h-8 w-8 text-green-500" />
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors">
              <div>
                <p className="font-medium">Licitaciones</p>
                <p className="text-sm text-gray-600">Procesos licitatorios</p>
              </div>
              <Building className="h-8 w-8 text-orange-500" />
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
              <div>
                <p className="font-medium">Mis Gestiones</p>
                <p className="text-sm text-gray-600">Solicitudes y trámites</p>
              </div>
              <ClipboardList className="h-8 w-8 text-blue-500" />
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
                <p className="text-sm font-medium">Vencimiento Licitación Equipos Portuarios</p>
                <p className="text-xs text-gray-600">Mesa de Entradas - Edificio Administrativo</p>
                <p className="text-xs text-gray-500">15 Ene 2025 - 17:00</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Auditoría Expedientes Administrativos</p>
                <p className="text-xs text-gray-600">Oficina Mesa de Entradas - Piso 2</p>
                <p className="text-xs text-gray-500">20 Ene 2025 - 09:00</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Capacitación Gestión Documental</p>
                <p className="text-xs text-gray-600">Sala de Capacitación - Planta Baja</p>
                <p className="text-xs text-gray-500">25 Ene 2025 - 14:00</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Reunión Comité de Compras</p>
                <p className="text-xs text-gray-600">Sala de Reuniones - Piso 3</p>
                <p className="text-xs text-gray-500">30 Ene 2025 - 10:00</p>
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
            <CardDescription>Últimas acciones y documentos procesados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Expediente EXP-2025-00789 ingresado</p>
                  <p className="text-xs text-gray-600">Solicitud de permiso de obra - Muelle 3</p>
                  <p className="text-xs text-gray-500">Hace 1 hora</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Factura FC-2025-001 procesada</p>
                  <p className="text-xs text-gray-600">Servicios de limpieza - Enero 2025</p>
                  <p className="text-xs text-gray-500">Hace 3 horas</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Licitación LIC-2025-003 publicada</p>
                  <p className="text-xs text-gray-600">Equipos de seguridad portuaria</p>
                  <p className="text-xs text-gray-500">Hace 4 horas</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Expediente EXP-2025-00788 derivado</p>
                  <p className="text-xs text-gray-600">Derivado a Gerencia General para aprobación</p>
                  <p className="text-xs text-gray-500">Hace 6 horas</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
