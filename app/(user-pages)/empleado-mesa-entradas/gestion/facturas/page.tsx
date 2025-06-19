import { Search, Filter, Download, Eye, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FacturasPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Facturas</h1>
        <p className="text-muted-foreground">Administra las facturas recibidas en Mesa de Entradas.</p>
      </div>

      <Tabs defaultValue="pendientes">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
          <TabsTrigger value="procesadas">Procesadas</TabsTrigger>
          <TabsTrigger value="rechazadas">Rechazadas</TabsTrigger>
        </TabsList>

        <div className="flex items-center justify-between my-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar facturas..." className="pl-8" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
        </div>

        <TabsContent value="pendientes">
          <Card>
            <CardHeader>
              <CardTitle>Facturas Pendientes</CardTitle>
              <CardDescription>Facturas recibidas que requieren procesamiento.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nº Factura
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Proveedor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Monto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      {
                        numero: "F-0001-00012345",
                        proveedor: "Suministros Navales S.A.",
                        fecha: "10/05/2023",
                        monto: "$145,780.00",
                        estado: "Pendiente",
                      },
                      {
                        numero: "F-0002-00054321",
                        proveedor: "Logística Portuaria",
                        fecha: "09/05/2023",
                        monto: "$87,500.00",
                        estado: "Pendiente",
                      },
                      {
                        numero: "F-0003-00098765",
                        proveedor: "Servicios Marítimos del Sur",
                        fecha: "08/05/2023",
                        monto: "$230,450.00",
                        estado: "Pendiente",
                      },
                      {
                        numero: "F-0001-00012346",
                        proveedor: "Transportes Atlánticos",
                        fecha: "07/05/2023",
                        monto: "$56,780.00",
                        estado: "Pendiente",
                      },
                      {
                        numero: "F-0002-00054322",
                        proveedor: "Astilleros Unidos",
                        fecha: "06/05/2023",
                        monto: "$178,900.00",
                        estado: "Pendiente",
                      },
                    ].map((factura, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {factura.numero}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{factura.proveedor}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{factura.fecha}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{factura.monto}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            {factura.estado}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-green-600">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-600">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="procesadas">
          <Card>
            <CardHeader>
              <CardTitle>Facturas Procesadas</CardTitle>
              <CardDescription>Facturas que han sido procesadas y enviadas al área correspondiente.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nº Factura
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Proveedor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Monto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      {
                        numero: "F-0001-00012340",
                        proveedor: "Suministros Navales S.A.",
                        fecha: "05/05/2023",
                        monto: "$98,450.00",
                        estado: "Procesada",
                      },
                      {
                        numero: "F-0002-00054320",
                        proveedor: "Logística Portuaria",
                        fecha: "04/05/2023",
                        monto: "$45,780.00",
                        estado: "Procesada",
                      },
                      {
                        numero: "F-0003-00098760",
                        proveedor: "Servicios Marítimos del Sur",
                        fecha: "03/05/2023",
                        monto: "$123,670.00",
                        estado: "Procesada",
                      },
                    ].map((factura, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {factura.numero}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{factura.proveedor}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{factura.fecha}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{factura.monto}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {factura.estado}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rechazadas">
          <Card>
            <CardHeader>
              <CardTitle>Facturas Rechazadas</CardTitle>
              <CardDescription>Facturas que han sido rechazadas por inconsistencias o errores.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nº Factura
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Proveedor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Monto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Motivo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      {
                        numero: "F-0001-00012341",
                        proveedor: "Suministros Navales S.A.",
                        fecha: "02/05/2023",
                        monto: "$76,890.00",
                        estado: "Rechazada",
                        motivo: "Datos incorrectos",
                      },
                      {
                        numero: "F-0002-00054323",
                        proveedor: "Logística Portuaria",
                        fecha: "01/05/2023",
                        monto: "$34,560.00",
                        estado: "Rechazada",
                        motivo: "Falta documentación",
                      },
                    ].map((factura, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {factura.numero}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{factura.proveedor}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{factura.fecha}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{factura.monto}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            {factura.estado}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{factura.motivo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
