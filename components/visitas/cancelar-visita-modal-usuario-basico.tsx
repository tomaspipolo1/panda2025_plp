"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface CancelarVisitaModalUsuarioBasicoProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (motivo: string) => void
  visitaId: string | null
}

export function CancelarVisitaModalUsuarioBasico({
  isOpen,
  onClose,
  onConfirm,
  visitaId,
}: CancelarVisitaModalUsuarioBasicoProps) {
  const [motivo, setMotivo] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleConfirm = async () => {
    if (!motivo.trim()) {
      alert("Debe ingresar un motivo para la cancelación")
      return
    }

    setIsSubmitting(true)
    try {
      await onConfirm(motivo)
      setMotivo("")
      onClose()
    } catch (error) {
      console.error("Error al cancelar visita:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setMotivo("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Cancelar Visita</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            ¿Está seguro que desea cancelar esta visita? Esta acción no se puede deshacer.
          </p>

          <div className="space-y-2">
            <Label htmlFor="motivo">Motivo de cancelación *</Label>
            <Textarea
              id="motivo"
              placeholder="Ingrese el motivo de la cancelación..."
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isSubmitting || !motivo.trim()}
              className="bg-red-600 hover:bg-red-700"
            >
              {isSubmitting ? "Cancelando..." : "Confirmar Cancelación"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
