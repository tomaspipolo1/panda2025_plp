"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Eye, Filter, Search } from "lucide-react"

export default function MisVisitasPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">Mis Visitas</h3>
          <p className="text-muted-foreground">Gestiona tus visitas programadas y pasadas.</p>
        </div>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Nueva Visita
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Filtra las visitas según tus necesidades.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="search">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input id="search" placeholder="Buscar por motivo o visitante" className="pl-8" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="estado">Estado</Label>
              <Select>
                <SelectTrigger id="estado">
                  <SelectValue placeholder="Todos los estados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="confirmada">Confirmada</SelectItem>
                  <SelectItem value="cancelada">Cancelada</SelectItem>
                  <SelectItem value="completada">Completada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fecha">Fecha</Label>
              <Input id="fecha" type="date" />
            </div>
          </div>
          <Button variant="outline" className="mt-4">
            <Filter className="mr-2 h-4 w-4" />
            Aplicar Filtros
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Visitas Programadas</CardTitle>
          <CardDescription>Listado de tus visitas programadas y pasadas.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Visitante/Anfitrión</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">VIS-2025-001</TableCell>
                <TableCell>Reunión con proveedor</TableCell>
                <TableCell>Distribuidora XYZ</TableCell>
                <TableCell>20/05/2025</TableCell>
                <TableCell>10:00</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                    Pendiente
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">VIS-2025-002</TableCell>
                <TableCell>Auditoría financiera</TableCell>
                <TableCell>Consultora ABC</TableCell>
                <TableCell>25/05/2025</TableCell>
                <TableCell>14:30</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                    Confirmada
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">VIS-2025-003</TableCell>
                <TableCell>Reunión con cliente</TableCell>
                <TableCell>Empresa DEF</TableCell>
                <TableCell>15/05/2025</TableCell>
                <TableCell>09:00</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                    Cancelada
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">VIS-2025-004</TableCell>
                <TableCell>Capacitación contable</TableCell>
                <TableCell>Departamento de Finanzas</TableCell>
                <TableCell>10/05/2025</TableCell>
                <TableCell>11:00</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    Completada
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
