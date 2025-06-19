"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

interface ModalEditarPersonalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: { id: number; nombreCompleto: string; dni: string; telefono: string }) => void
  personalData: { id: number; nombreCompleto: string; dni: string; telefono: string } | null
}

export function ModalEditarPersonal({ isOpen, onClose, onSave, personalData }: ModalEditarPersonalProps) {
  const [formData, setFormData] = useState({
    id: 0,
    nombreCompleto: "",
    dni: "",
    telefono: "",
  })

  useEffect(() => {
    if (isOpen && personalData) {
      setFormData(personalData)
    }
  }, [isOpen, personalData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.nombreCompleto && formData.dni) {
      onSave(formData)
      onClose()
    }
  }

  const handleClose = () => {
    setFormData({ id: 0, nombreCompleto: "", dni: "", telefono: "" })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={handleClose} />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Editar Personal</h2>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nombreCompleto">Nombre Completo *</Label>
            <Input
              id="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={(e) => setFormData((prev) => ({ ...prev, nombreCompleto: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="dni">DNI *</Label>
            <Input
              id="dni"
              value={formData.dni}
              onChange={(e) => setFormData((prev) => ({ ...prev, dni: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              value={formData.telefono}
              onChange={(e) => setFormData((prev) => ({ ...prev, telefono: e.target.value }))}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
