import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FiltrosVisitas } from "@/components/visitas/filtros-visitas"
import { TablaVisitasEmpleadoSeguridad } from "@/components/visitas/tabla-visitas-empleado-seguridad"

export default function VisitasPendientesPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Accesos Pendientes de Aprobación</h1>

      <Card>
        <CardHeader>
          <CardTitle>Solicitudes de Acceso</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="todos" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="obra">Acceso a Obra</TabsTrigger>
              <TabsTrigger value="muelle">Acceso a Muelle</TabsTrigger>
              <TabsTrigger value="laboral">Laboral</TabsTrigger>
              <TabsTrigger value="guiada">Guiada</TabsTrigger>
              <TabsTrigger value="evento">Evento</TabsTrigger>
              <TabsTrigger value="materiales">Materiales</TabsTrigger>
            </TabsList>

            <TabsContent value="todos">
              <FiltrosVisitas />
              <TablaVisitasEmpleadoSeguridad
                visitas={[
                  {
                    id: "1",
                    numero: "ACC-2023-045",
                    visitante: "Roberto Gómez",
                    empresa: "Logística ABC",
                    fechaVisita: "2023-05-20",
                    horaVisita: "10:00",
                    estado: "Pendiente",
                    motivo: "Inspección de seguridad",
                    tipo: "Acceso a Obra",
                    sitio: "Terminal 1",
                    personas: 3,
                    vehiculos: 1,
                  },
                  {
                    id: "2",
                    numero: "ACC-2023-046",
                    visitante: "Laura Sánchez",
                    empresa: "Transportes XYZ",
                    fechaVisita: "2023-05-21",
                    horaVisita: "14:30",
                    estado: "Pendiente",
                    motivo: "Supervisión de carga",
                    tipo: "Acceso a Muelle",
                    sitio: "Muelle Sur",
                    personas: 2,
                    vehiculos: 0,
                  },
                  {
                    id: "3",
                    numero: "ACC-2023-047",
                    visitante: "Miguel Fernández",
                    empresa: "Consultora Marítima",
                    fechaVisita: "2023-05-22",
                    horaVisita: "09:15",
                    estado: "Pendiente",
                    motivo: "Inauguración",
                    tipo: "Evento",
                    sitio: "Salón Principal",
                    personas: 25,
                    vehiculos: 5,
                  },
                  {
                    id: "4",
                    numero: "ACC-2023-048",
                    visitante: "Ana Martínez",
                    empresa: "Servicios Portuarios",
                    fechaVisita: "2023-05-22",
                    horaVisita: "11:30",
                    estado: "Pendiente",
                    motivo: "Grupo escolar",
                    tipo: "Guiada",
                    sitio: "Terminal Principal",
                    personas: 30,
                    vehiculos: 1,
                  },
                  {
                    id: "5",
                    numero: "ACC-2023-049",
                    visitante: "Carlos Rodríguez",
                    empresa: "Constructora Puerto",
                    fechaVisita: "2023-05-23",
                    horaVisita: "08:00",
                    estado: "Pendiente",
                    motivo: "Entrega de equipos",
                    tipo: "Materiales",
                    sitio: "Almacén Central",
                    personas: 4,
                    vehiculos: 2,
                  },
                ]}
              />
            </TabsContent>

            <TabsContent value="obra">
              <FiltrosVisitas />
              <TablaVisitasEmpleadoSeguridad
                visitas={[
                  {
                    id: "1",
                    numero: "ACC-2023-045",
                    visitante: "Roberto Gómez",
                    empresa: "Logística ABC",
                    fechaVisita: "2023-05-20",
                    horaVisita: "10:00",
                    estado: "Pendiente",
                    motivo: "Inspección de seguridad",
                    tipo: "Acceso a Obra",
                    sitio: "Terminal 1",
                    personas: 3,
                    vehiculos: 1,
                  },
                ]}
              />
            </TabsContent>

            <TabsContent value="muelle">
              <FiltrosVisitas />
              <TablaVisitasEmpleadoSeguridad
                visitas={[
                  {
                    id: "2",
                    numero: "ACC-2023-046",
                    visitante: "Laura Sánchez",
                    empresa: "Transportes XYZ",
                    fechaVisita: "2023-05-21",
                    horaVisita: "14:30",
                    estado: "Pendiente",
                    motivo: "Supervisión de carga",
                    tipo: "Acceso a Muelle",
                    sitio: "Muelle Sur",
                    personas: 2,
                    vehiculos: 0,
                  },
                ]}
              />
            </TabsContent>

            <TabsContent value="evento">
              <FiltrosVisitas />
              <TablaVisitasEmpleadoSeguridad
                visitas={[
                  {
                    id: "3",
                    numero: "ACC-2023-047",
                    visitante: "Miguel Fernández",
                    empresa: "Consultora Marítima",
                    fechaVisita: "2023-05-22",
                    horaVisita: "09:15",
                    estado: "Pendiente",
                    motivo: "Inauguración",
                    tipo: "Evento",
                    sitio: "Salón Principal",
                    personas: 25,
                    vehiculos: 5,
                  },
                ]}
              />
            </TabsContent>

            <TabsContent value="guiada">
              <FiltrosVisitas />
              <TablaVisitasEmpleadoSeguridad
                visitas={[
                  {
                    id: "4",
                    numero: "ACC-2023-048",
                    visitante: "Ana Martínez",
                    empresa: "Servicios Portuarios",
                    fechaVisita: "2023-05-22",
                    horaVisita: "11:30",
                    estado: "Pendiente",
                    motivo: "Grupo escolar",
                    tipo: "Guiada",
                    sitio: "Terminal Principal",
                    personas: 30,
                    vehiculos: 1,
                  },
                ]}
              />
            </TabsContent>

            <TabsContent value="materiales">
              <FiltrosVisitas />
              <TablaVisitasEmpleadoSeguridad
                visitas={[
                  {
                    id: "5",
                    numero: "ACC-2023-049",
                    visitante: "Carlos Rodríguez",
                    empresa: "Constructora Puerto",
                    fechaVisita: "2023-05-23",
                    horaVisita: "08:00",
                    estado: "Pendiente",
                    motivo: "Entrega de equipos",
                    tipo: "Materiales",
                    sitio: "Almacén Central",
                    personas: 4,
                    vehiculos: 2,
                  },
                ]}
              />
            </TabsContent>

            <TabsContent value="laboral">
              <FiltrosVisitas />
              <p className="text-center py-8 text-gray-500">No hay solicitudes pendientes de tipo Laboral.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
