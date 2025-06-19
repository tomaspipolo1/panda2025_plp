"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle2, Loader2 } from "lucide-react"

interface CrearEventoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  tituloEvento: string
}

type EstadoModal = "creando" | "completado"

export function CrearEventoModal({ open, onOpenChange, onConfirm, tituloEvento }: CrearEventoModalProps) {
  const [estado, setEstado] = useState<EstadoModal>("creando")

  // Reiniciar el estado cuando se abre el modal
  useEffect(() => {
    if (open) {
      setEstado("creando")

      // Simular la creación del evento (2 segundos)
      setTimeout(() => {
        setEstado("completado")
      }, 2000)
    }
  }, [open])

  const handleClose = () => {
    // Solo permitir cerrar cuando esté completado
    if (estado === "completado") {
      onConfirm()
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {estado === "creando" && (
          <div className="flex flex-col items-center justify-center py-6">
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
            <h3 className="text-lg font-medium">Creando evento</h3>
            <p className="text-sm text-muted-foreground mt-2">Por favor espere mientras se crea el evento...</p>
          </div>
        )}

        {estado === "completado" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                Evento creado exitosamente
              </DialogTitle>
              <DialogDescription>
                El evento "{tituloEvento}" ha sido creado correctamente y agregado al calendario.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="button" onClick={handleClose}>
                Aceptar
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
