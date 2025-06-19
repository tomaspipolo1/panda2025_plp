"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ConfirmarAccionVisitaModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (motivo: string) => void
  accion: "aceptar" | "rechazar" | null
  visitaId?: string
}

export function ConfirmarAccionVisitaModal({
  isOpen,
  onClose,
  onConfirm,
  accion,
  visitaId,
}: ConfirmarAccionVisitaModalProps) {
  const [motivo, setMotivo] = useState("")
  const [error, setError] = useState("")

  const handleConfirm = () => {
    if (accion === "rechazar" && !motivo.trim()) {
      setError("Debe ingresar un motivo para rechazar la visita")
      return
    }
    onConfirm(motivo)
    setMotivo("")
    setError("")
  }

  const handleClose = () => {
    setMotivo("")
    setError("")
    onClose()
  }

  if (!accion) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {accion === "aceptar" ? "Aceptar Visita" : "Rechazar Visita"} #{visitaId}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <Label htmlFor="motivo" className="mb-2 block">
            {accion === "aceptar" ? "Observaciones (opcional)" : "Motivo de rechazo *"}
          </Label>
          <Textarea
            id="motivo"
            value={motivo}
            onChange={(e) => {
              setMotivo(e.target.value)
              if (e.target.value.trim()) setError("")
            }}
            placeholder={
              accion === "aceptar" ? "Ingrese observaciones si es necesario" : "Ingrese el motivo del rechazo"
            }
            className={error ? "border-red-500" : ""}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} variant={accion === "aceptar" ? "default" : "destructive"}>
            {accion === "aceptar" ? "Aceptar Visita" : "Rechazar Visita"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
