"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface CancelarVisitaModalClienteProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (motivo: string) => void
  visitaId: number | null
}

export function CancelarVisitaModalCliente({ isOpen, onClose, onConfirm, visitaId }: CancelarVisitaModalClienteProps) {
  const [motivo, setMotivo] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    if (!motivo.trim()) return

    setIsSubmitting(true)

    // Simulamos una petición
    setTimeout(() => {
      onConfirm(motivo)
      setIsSubmitting(false)
      setMotivo("")
      onClose()
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Cancelar Visita</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="mb-4">¿Está seguro que desea cancelar esta visita? Esta acción no se puede deshacer.</p>

          <div className="space-y-2">
            <Label htmlFor="motivo">Motivo de cancelación</Label>
            <Textarea
              id="motivo"
              placeholder="Ingrese el motivo de la cancelación..."
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!motivo.trim() || isSubmitting}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isSubmitting ? "Procesando..." : "Confirmar Cancelación"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
