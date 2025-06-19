"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface CancelarVisitaModalEmpleadoComprasProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (motivo: string) => void
  visitaId: string
}

export function CancelarVisitaModalEmpleadoCompras({
  isOpen,
  onClose,
  onConfirm,
  visitaId,
}: CancelarVisitaModalEmpleadoComprasProps) {
  const [motivo, setMotivo] = useState("")
  const [error, setError] = useState("")

  const handleConfirm = () => {
    if (!motivo.trim()) {
      setError("Por favor, ingrese un motivo para la cancelación")
      return
    }
    onConfirm(motivo)
    setMotivo("")
    setError("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Cancelar Visita</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <p className="text-gray-600 mb-4">
            ¿Está seguro que desea cancelar esta visita? Esta acción no se puede deshacer.
          </p>

          <div className="space-y-2">
            <Label htmlFor="motivo" className="text-sm font-medium">
              Motivo de cancelación <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="motivo"
              value={motivo}
              onChange={(e) => {
                setMotivo(e.target.value)
                if (e.target.value.trim()) setError("")
              }}
              placeholder="Ingrese el motivo de la cancelación"
              className={error ? "border-red-500" : ""}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Volver
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Confirmar Cancelación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
