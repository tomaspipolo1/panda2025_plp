"use client"

import { useState } from "react"
import { Printer, Download, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { FiltrosSolicitudes } from "@/components/solicitudes/filtros-solicitudes"
import { TablaSolicitudes } from "@/components/solicitudes/tabla-solicitudes"
import { DetalleSolicitudModal } from "@/components/solicitudes/detalle-solicitud-modal"
import { AgregarComentarioModal } from "@/components/solicitudes/agregar-comentario-modal"
import { CancelarSolicitudModal } from "@/components/solicitudes/cancelar-solicitud-modal"

// Datos de ejemplo para solicitudes
const solicitudesData = [
  {
    id: "1",
    fecha: "15/04/2023",
    numero: "SOL-2023-0125",
    tipo: "Cambio de datos",
    asunto: "Actualización de información bancaria",
    estado: "Pendiente",
    ultimaActualizacion: "15/04/2023",
    descripcion:
      "Solicito actualizar la información bancaria de mi cuenta para recibir los pagos en una nueva cuenta del Banco Provincia.",
    comentarios: [],
    historial: [
      {
        id: "h1",
        fecha: "15/04/2023",
        accion: "Creación",
        usuario: "Mariano Hernández",
        comentario: "Solicitud creada",
      },
    ],
  },
  {
    id: "2",
    fecha: "10/04/2023",
    numero: "SOL-2023-0124",
    tipo: "Solicitud de acceso",
    asunto: "Acceso a área restringida",
    estado: "En Proceso",
    ultimaActualizacion: "12/04/2023",
    descripcion:
      "Solicito acceso al área restringida del puerto para realizar trabajos de mantenimiento programados para el día 20/04/2023.",
    comentarios: [
      {
        id: "c1",
        fecha: "12/04/2023",
        usuario: "Administrador",
        texto:
          "Se está evaluando su solicitud. Le pedimos que envíe la documentación de los trabajadores que ingresarán al área.",
      },
    ],
    historial: [
      {
        id: "h1",
        fecha: "10/04/2023",
        accion: "Creación",
        usuario: "Mariano Hernández",
        comentario: "Solicitud creada",
      },
      {
        id: "h2",
        fecha: "12/04/2023",
        accion: "Cambio de estado",
        usuario: "Administrador",
        comentario: "Cambio a En Proceso",
      },
    ],
  },
  {
    id: "3",
    fecha: "05/04/2023",
    numero: "SOL-2023-0123",
    tipo: "Reclamo",
    asunto: "Facturación incorrecta",
    estado: "Resuelta",
    ultimaActualizacion: "08/04/2023",
    descripcion:
      "La factura N° FC-2023-0089 contiene un error en el monto total. El valor correcto debería ser $45,780.00 en lugar de $54,780.00.",
    comentarios: [
      {
        id: "c1",
        fecha: "06/04/2023",
        usuario: "Administrador",
        texto: "Estamos revisando la factura mencionada. Nos comunicaremos a la brevedad.",
      },
      {
        id: "c2",
        fecha: "08/04/2023",
        usuario: "Administrador",
        texto:
          "Se ha emitido una nota de crédito por la diferencia. La encontrará disponible en la sección de facturas.",
      },
    ],
    historial: [
      {
        id: "h1",
        fecha: "05/04/2023",
        accion: "Creación",
        usuario: "Mariano Hernández",
        comentario: "Solicitud creada",
      },
      {
        id: "h2",
        fecha: "06/04/2023",
        accion: "Cambio de estado",
        usuario: "Administrador",
        comentario: "Cambio a En Proceso",
      },
      {
        id: "h3",
        fecha: "08/04/2023",
        accion: "Cambio de estado",
        usuario: "Administrador",
        comentario: "Cambio a Resuelta",
      },
    ],
  },
  {
    id: "4",
    fecha: "28/03/2023",
    numero: "SOL-2023-0122",
    tipo: "Consulta",
    asunto: "Información sobre licitación",
    estado: "Rechazada",
    ultimaActualizacion: "30/03/2023",
    descripcion:
      "Quisiera obtener más información sobre la licitación LIC-2023-0118 respecto a los requisitos técnicos específicos para la presentación.",
    comentarios: [
      {
        id: "c1",
        fecha: "30/03/2023",
        usuario: "Administrador",
        texto:
          "Esta consulta debe realizarse a través del sistema de consultas específico de la licitación. Por favor, utilice la opción 'Ver consultas' en la sección de licitaciones.",
      },
    ],
    historial: [
      {
        id: "h1",
        fecha: "28/03/2023",
        accion: "Creación",
        usuario: "Mariano Hernández",
        comentario: "Solicitud creada",
      },
      {
        id: "h2",
        fecha: "30/03/2023",
        accion: "Cambio de estado",
        usuario: "Administrador",
        comentario: "Cambio a Rechazada",
      },
    ],
  },
]

export default function MisSolicitudesPage() {
  const router = useRouter()
  const [filteredSolicitudes, setFilteredSolicitudes] = useState(solicitudesData)
  const [selectedSolicitud, setSelectedSolicitud] = useState<any>(null)
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false)
  const [isComentarioModalOpen, setIsComentarioModalOpen] = useState(false)
  const [isCancelarModalOpen, setIsCancelarModalOpen] = useState(false)

  const handleFilter = (filters: any) => {
    console.log("Aplicando filtros:", filters)
    // Aquí iría la lógica real de filtrado
    // Por ahora solo simulamos que se aplican los filtros
    setFilteredSolicitudes(solicitudesData)
  }

  const handleVerDetalle = (solicitud: any) => {
    setSelectedSolicitud(solicitud)
    setIsDetalleModalOpen(true)
  }

  const handleAgregarComentario = (solicitud: any) => {
    setSelectedSolicitud(solicitud)
    setIsComentarioModalOpen(true)
  }

  const handleCancelarSolicitud = (solicitud: any) => {
    setSelectedSolicitud(solicitud)
    setIsCancelarModalOpen(true)
  }

  const handleSubmitComentario = (comentario: string) => {
    console.log(`Comentario agregado a la solicitud ${selectedSolicitud?.numero}:`, comentario)
    // Aquí iría la lógica real para agregar el comentario
    alert(`Comentario agregado a la solicitud ${selectedSolicitud?.numero}`)
  }

  const handleConfirmCancelar = (motivo: string) => {
    console.log(`Solicitud ${selectedSolicitud?.numero} cancelada. Motivo:`, motivo)
    // Aquí iría la lógica real para cancelar la solicitud
    alert(`Solicitud ${selectedSolicitud?.numero} cancelada`)
  }

  const handleNuevaSolicitud = () => {
    router.push("/proveedor/gestion/solicitudes/nueva-solicitud")
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-plp-darkest">Mis Solicitudes</h1>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Button variant="outline" className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button onClick={handleNuevaSolicitud} className="bg-black hover:bg-gray-800 text-white flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Solicitud
          </Button>
        </div>
      </div>

      <FiltrosSolicitudes onFilter={handleFilter} />

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <TablaSolicitudes
          solicitudes={filteredSolicitudes}
          onVerDetalle={handleVerDetalle}
          onAgregarComentario={handleAgregarComentario}
          onCancelarSolicitud={handleCancelarSolicitud}
        />
      </div>

      <DetalleSolicitudModal
        isOpen={isDetalleModalOpen}
        onClose={() => setIsDetalleModalOpen(false)}
        solicitud={selectedSolicitud}
      />

      <AgregarComentarioModal
        isOpen={isComentarioModalOpen}
        onClose={() => setIsComentarioModalOpen(false)}
        onSubmit={handleSubmitComentario}
        solicitud={selectedSolicitud}
      />

      <CancelarSolicitudModal
        isOpen={isCancelarModalOpen}
        onClose={() => setIsCancelarModalOpen(false)}
        onConfirm={handleConfirmCancelar}
        solicitud={selectedSolicitud}
      />
    </div>
  )
}
