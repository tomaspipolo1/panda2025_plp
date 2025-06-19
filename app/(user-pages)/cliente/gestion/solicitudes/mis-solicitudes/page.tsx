"use client"

import { useState } from "react"
import { Plus, Printer, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FiltrosSolicitudesCliente } from "@/components/solicitudes/filtros-solicitudes-cliente"
import { TablaSolicitudesCliente } from "@/components/solicitudes/tabla-solicitudes-cliente"
import { DetalleSolicitudModalCliente } from "@/components/solicitudes/detalle-solicitud-modal-cliente"
import { AgregarComentarioModalCliente } from "@/components/solicitudes/agregar-comentario-modal-cliente"
import { CancelarSolicitudModalCliente } from "@/components/solicitudes/cancelar-solicitud-modal-cliente"
import Link from "next/link"

// Datos de ejemplo
const solicitudesEjemplo = [
  {
    id: "1",
    fecha: "15/04/2023",
    numero: "SOL-2023-0125",
    tipo: "Cambio de datos",
    asunto: "Actualización de información bancaria",
    estado: "Pendiente" as const,
    ultimaActualizacion: "15/04/2023",
    descripcion: "Solicito actualizar la información bancaria de mi cuenta para recibir los pagos en una nueva cuenta.",
    comentarios: [
      {
        id: "c1",
        fecha: "15/04/2023",
        usuario: "Juan Pérez",
        texto: "Adjunto comprobante de la nueva cuenta bancaria.",
      },
    ],
    historial: [
      {
        id: "h1",
        fecha: "15/04/2023",
        accion: "Creación de solicitud",
        usuario: "Juan Pérez",
        comentario: null,
      },
    ],
  },
  {
    id: "2",
    fecha: "10/04/2023",
    numero: "SOL-2023-0124",
    tipo: "Solicitud de acceso",
    asunto: "Acceso a área restringida",
    estado: "En Proceso" as const,
    ultimaActualizacion: "12/04/2023",
    descripcion: "Necesito acceso al área de facturación para revisar documentos históricos.",
    comentarios: [],
    historial: [
      {
        id: "h2",
        fecha: "10/04/2023",
        accion: "Creación de solicitud",
        usuario: "Juan Pérez",
        comentario: null,
      },
      {
        id: "h3",
        fecha: "12/04/2023",
        accion: "Cambio de estado",
        usuario: "Admin",
        comentario: "En proceso de evaluación",
      },
    ],
  },
  {
    id: "3",
    fecha: "05/04/2023",
    numero: "SOL-2023-0123",
    tipo: "Reclamo",
    asunto: "Facturación incorrecta",
    estado: "Resuelta" as const,
    ultimaActualizacion: "08/04/2023",
    descripcion: "La factura #F-2023-0089 contiene un error en el monto total.",
    comentarios: [
      {
        id: "c2",
        fecha: "06/04/2023",
        usuario: "Juan Pérez",
        texto: "Adjunto la factura con el error señalado.",
      },
      {
        id: "c3",
        fecha: "07/04/2023",
        usuario: "Soporte",
        texto: "Estamos revisando el caso. Nos comunicaremos a la brevedad.",
      },
      {
        id: "c4",
        fecha: "08/04/2023",
        usuario: "Soporte",
        texto: "Se ha emitido una nota de crédito y una nueva factura con el monto correcto.",
      },
    ],
    historial: [
      {
        id: "h4",
        fecha: "05/04/2023",
        accion: "Creación de solicitud",
        usuario: "Juan Pérez",
        comentario: null,
      },
      {
        id: "h5",
        fecha: "06/04/2023",
        accion: "Cambio de estado",
        usuario: "Admin",
        comentario: "En proceso de revisión",
      },
      {
        id: "h6",
        fecha: "08/04/2023",
        accion: "Resolución",
        usuario: "Admin",
        comentario: "Se emitió nota de crédito #NC-2023-0012",
      },
    ],
  },
  {
    id: "4",
    fecha: "28/03/2023",
    numero: "SOL-2023-0122",
    tipo: "Consulta",
    asunto: "Información sobre licitación",
    estado: "Rechazada" as const,
    ultimaActualizacion: "30/03/2023",
    descripcion: "Solicito información adicional sobre la licitación LIC-2023-005.",
    comentarios: [
      {
        id: "c5",
        fecha: "29/03/2023",
        usuario: "Soporte",
        texto: "La licitación mencionada no está disponible para su perfil de usuario.",
      },
    ],
    historial: [
      {
        id: "h7",
        fecha: "28/03/2023",
        accion: "Creación de solicitud",
        usuario: "Juan Pérez",
        comentario: null,
      },
      {
        id: "h8",
        fecha: "30/03/2023",
        accion: "Rechazo",
        usuario: "Admin",
        comentario: "No cumple con los requisitos para acceder a esta información",
      },
    ],
  },
]

export default function MisSolicitudesClientePage() {
  const [filtros, setFiltros] = useState({})
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<any>(null)
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false)
  const [isComentarioModalOpen, setIsComentarioModalOpen] = useState(false)
  const [isCancelarModalOpen, setIsCancelarModalOpen] = useState(false)

  const handleFiltrar = (nuevosFiltros: any) => {
    setFiltros(nuevosFiltros)
    // Aquí iría la lógica para filtrar las solicitudes según los filtros aplicados
  }

  const handleVerDetalle = (solicitud: any) => {
    setSolicitudSeleccionada(solicitud)
    setIsDetalleModalOpen(true)
  }

  const handleAgregarComentario = (solicitud: any) => {
    setSolicitudSeleccionada(solicitud)
    setIsComentarioModalOpen(true)
  }

  const handleCancelarSolicitud = (solicitud: any) => {
    setSolicitudSeleccionada(solicitud)
    setIsCancelarModalOpen(true)
  }

  const handleSubmitComentario = (comentario: string) => {
    console.log(`Comentario enviado para solicitud ${solicitudSeleccionada?.numero}:`, comentario)
    // Aquí iría la lógica para enviar el comentario al backend
  }

  const handleConfirmCancelacion = (motivo: string) => {
    console.log(`Solicitud ${solicitudSeleccionada?.numero} cancelada. Motivo:`, motivo)
    // Aquí iría la lógica para cancelar la solicitud en el backend
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-plp-darkest">Mis Solicitudes</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Link href="/cliente/gestion/solicitudes/nueva-solicitud">
            <Button size="sm" className="bg-black hover:bg-gray-800">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Solicitud
            </Button>
          </Link>
        </div>
      </div>

      <FiltrosSolicitudesCliente onFilter={handleFiltrar} />

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <TablaSolicitudesCliente
          solicitudes={solicitudesEjemplo}
          onVerDetalle={handleVerDetalle}
          onAgregarComentario={handleAgregarComentario}
          onCancelarSolicitud={handleCancelarSolicitud}
        />
      </div>

      {/* Modales */}
      <DetalleSolicitudModalCliente
        isOpen={isDetalleModalOpen}
        onClose={() => setIsDetalleModalOpen(false)}
        solicitud={solicitudSeleccionada}
      />

      <AgregarComentarioModalCliente
        isOpen={isComentarioModalOpen}
        onClose={() => setIsComentarioModalOpen(false)}
        onSubmit={handleSubmitComentario}
        solicitudNumero={solicitudSeleccionada?.numero || ""}
      />

      <CancelarSolicitudModalCliente
        isOpen={isCancelarModalOpen}
        onClose={() => setIsCancelarModalOpen(false)}
        onConfirm={handleConfirmCancelacion}
        solicitudNumero={solicitudSeleccionada?.numero || ""}
      />
    </div>
  )
}
