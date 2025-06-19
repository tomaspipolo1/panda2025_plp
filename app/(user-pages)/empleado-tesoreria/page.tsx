<ctrl60>import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Calendar, ShoppingCart, Ship, Anchor, AlertTriangle, DollarSign, TrendingUp, BarChart3, Clock } from 'lucide-react'

export default function EmpleadoTesoreriaPage() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold text-plp-dark">Dashboard Tesorería</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-green-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagos Recibidos</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$78.5M</div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">Este mes</p>
              <div className="flex items-center text-green-500 text-xs">
                <TrendingUp className="h-3 w-3 mr-1" /> 12%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-cyan-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transferencias</CardTitle>
            <Ship className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">En proceso</p>
              <div className="flex items-center text-cyan-500 text-xs">
                <Clock className="h-3 w-3 mr-1" /> 24 hs
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cheques Emitidos</CardTitle>
            <FileText className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">56</div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">Pendientes de cobro</p>
              <div className="flex items-center text-amber-500 text-xs">
                <AlertTriangle className="h-3 w-3 mr-1" /> 2%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cuentas Bancarias</CardTitle>
            <Anchor className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">Activas</p>
              <div className="flex items-center text-blue-500 text-xs">
                <TrendingUp className="h-3 w-3 mr-1" /> 1%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted/80">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white">
            Vista General
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-white">
            Analíticas
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-white">
            Reportes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>Últimas acciones realizadas en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start p-2 rounded-md bg-blue-50">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Pago a proveedor aprobado</p>
                    <p className="text-xs text-muted-foreground">Hoy, 10:23 AM</p>
                  </div>
                </div>
                <div className="flex items-start p-2 rounded-md bg-green-50">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Transferencia bancaria realizada</p>
                    <p className="text-xs text-muted-foreground">Ayer, 15:45 PM</p>
                  </div>
                </div>
                <div className="flex items-start p-2 rounded-md bg-red-50">
                  <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Factura rechazada por inconsistencias</p>
                    <p className="text-xs text-muted-foreground">12/05/2025 - 09:12 AM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Analíticas</CardTitle>
              <CardDescription>Visualización de datos y métricas clave</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-blue-400" />
                </div>
                <p className="mt-4 text-muted-foreground">Contenido de analíticas en desarrollo</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Reportes</CardTitle>
              <CardDescription>Informes y documentación gerencial</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
                  <FileText className="h-16 w-16 text-amber-400" />
                </div>
                <p className="mt-4 text-muted-foreground">Sección de reportes en desarrollo</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
