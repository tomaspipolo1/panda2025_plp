"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Building2, Users } from "lucide-react"

export default function NuevaEntidadPage() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)

  const handleSelectTipo = (tipo: "proveedor" | "cliente") => {
    setIsOpen(false)
    router.push(`/usuario-basico/gestion/nueva-entidad/${tipo}`)
  }

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Seleccionar tipo de entidad</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div
              onClick={() => handleSelectTipo("proveedor")}
              className="flex flex-col items-center justify-center h-40 p-6 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow cursor-pointer transition-colors"
            >
              <Building2 className="h-12 w-12 mb-2 text-blue-600" />
              <span className="text-lg font-medium">Proveedor</span>
              <p className="text-xs text-gray-500 mt-2 text-center w-full">Crear un nuevo proveedor para el sistema</p>
            </div>
            <div
              onClick={() => handleSelectTipo("cliente")}
              className="flex flex-col items-center justify-center h-40 p-6 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow cursor-pointer transition-colors"
            >
              <Users className="h-12 w-12 mb-2 text-green-600" />
              <span className="text-lg font-medium">Cliente</span>
              <p className="text-xs text-gray-500 mt-2 text-center w-full">Crear un nuevo cliente para el sistema</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {!isOpen && (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Redirigiendo...</p>
        </div>
      )}
    </div>
  )
}
