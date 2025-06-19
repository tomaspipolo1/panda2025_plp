import type { Metadata } from "next"
import DatosGeneralesCliente from "@/components/entidad/cliente/datos-generales-cliente"
import DireccionesCliente from "@/components/entidad/cliente/direcciones-cliente"
import DocumentosCliente from "@/components/entidad/cliente/documentos-cliente"

export const metadata: Metadata = {
  title: "Entidad | Portal Cliente",
  description: "Gestión de entidad para clientes",
}

export default function EntidadClientePage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Entidad</h1>

      <div className="space-y-6">
        <DatosGeneralesCliente />
        <DireccionesCliente />
        <DocumentosCliente />
      </div>
    </div>
  )
}
