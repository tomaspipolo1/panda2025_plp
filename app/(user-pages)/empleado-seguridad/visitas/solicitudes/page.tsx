import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FiltrosVisitas } from "@/components/visitas/filtros-visitas"
import { TablaVisitasEmpleadoSeguridad } from "@/components/visitas/tabla-visitas-empleado-seguridad"

export default function SolicitudesAccesoPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Historial de Solicitudes de Acceso</h1>

      <Card>
        <CardHeader>
          <CardTitle>Todas las Solicitudes</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="todos" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="aprobados">Aprobados</TabsTrigger>
              <TabsTrigger value="rechazados">Rechazados</TabsTrigger>
              <TabsTrigger value="finalizados">Finalizados</TabsTrigger>
            </TabsList>

            <TabsContent value="todos">
              <FiltrosVisitas />
              <TablaVisitasEmpleadoSeguridad
                visitas={[
                  {
                    id: "1",
                    numero: "ACC-2023-040",
                    visitante: "Roberto Gómez",
                    empresa: "Logística ABC",
                    fechaVisita: "2023-05-15",
                    horaVisita: "10:00",
                    estado: "Aprobada",
                    motivo: "Inspección de seguridad",
                    tipo: "Acceso a Obra",
                    sitio: "Terminal 1",
                    personas: 3,
                    vehiculos: 1,
                  },
                  {
                    id: "2",
                    numero: "ACC-2023-041",
                    visitante: "Laura Sánchez",
                    empresa: "Transportes XYZ",
                    fechaVisita: "2023-05-16",
                    horaVisita: "14:30",
                    estado: "Rechazada",
                    motivo: "Supervisión de carga",
                    tipo: "Acceso a Muelle",
                    sitio: "Muelle Sur",
                    personas: 2,
                    vehiculos: 0,
                  },
                  {
                    id: "3",
                    numero: "ACC-2023-042",
                    visitante: "Miguel Fernández",
                    empresa: "Consultora Marítima",
                    fechaVisita: "2023-05-17",
                    horaVisita: "09:15",
                    estado: "Finalizada",
                    motivo: "Inauguración",
                    tipo: "Evento",
                    sitio: "Salón Principal",
                    personas: 25,
                    vehiculos: 5,
                  },
                  {
                    id: "4",
                    numero: "ACC-2023-043",
                    visitante: "Ana Martínez",
                    empresa: "Servicios Portuarios",
                    fechaVisita: "2023-05-18",
                    horaVisita: "11:30",
                    estado: "En Curso",
                    motivo: "Grupo escolar",
                    tipo: "Guiada",
                    sitio: "Terminal Principal",
                    personas: 30,
                    vehiculos: 1,
                  },
                ]}
              />
            </TabsContent>

            <TabsContent value="aprobados">
              <FiltrosVisitas />
              <TablaVisitasEmpleadoSeguridad
                visitas={[
                  {
                    id: "1",
                    numero: "ACC-2023-040",
                    visitante: "Roberto Gómez",
                    empresa: "Logística ABC",
                    fechaVisita: "2023-05-15",
                    horaVisita: "10:00",
                    estado: "Aprobada",
                    motivo: "Inspección de seguridad",
                    tipo: "Acceso a Obra",
                    sitio: "Terminal 1",
                    personas: 3,
                    vehiculos: 1,
                  },
                ]}
              />
            </TabsContent>

            <TabsContent value="rechazados">
              <FiltrosVisitas />
              <TablaVisitasEmpleadoSeguridad
                visitas={[
                  {
                    id: "2",
                    numero: "ACC-2023-041",
                    visitante: "Laura Sánchez",
                    empresa: "Transportes XYZ",
                    fechaVisita: "2023-05-16",
                    horaVisita: "14:30",
                    estado: "Rechazada",
                    motivo: "Supervisión de carga",
                    tipo: "Acceso a Muelle",
                    sitio: "Muelle Sur",
                    personas: 2,
                    vehiculos: 0,
                  },
                ]}
              />
            </TabsContent>

            <TabsContent value="finalizados">
              <FiltrosVisitas />
              <TablaVisitasEmpleadoSeguridad
                visitas={[
                  {
                    id: "3",
                    numero: "ACC-2023-042",
                    visitante: "Miguel Fernández",
                    empresa: "Consultora Marítima",
                    fechaVisita: "2023-05-17",
                    horaVisita: "09:15",
                    estado: "Finalizada",
                    motivo: "Inauguración",
                    tipo: "Evento",
                    sitio: "Salón Principal",
                    personas: 25,
                    vehiculos: 5,
                  },
                ]}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
