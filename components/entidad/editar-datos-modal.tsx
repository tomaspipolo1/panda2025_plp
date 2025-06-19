"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

interface ContactoInfo {
  nombre: string
  cargo: string
  email: string
  telefono: string
}

interface BancoInfo {
  nombre: string
  tipoCuenta: string
  numeroCuenta: string
  titular: string
}

interface InfoFiscal {
  regimenFiscal: string
  condicionIVA: string
}

interface DatosGeneralesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  datos: {
    razonSocial: string
    rut: string
    tipoProveedor: string
    estado: "Activo" | "Inactivo" | "Pendiente"
    contacto: ContactoInfo
    banco: BancoInfo
    fiscal: InfoFiscal
  }
  onSave: (datos: any) => void
}

export function EditarDatosModal({ open, onOpenChange, datos, onSave }: DatosGeneralesModalProps) {
  const [formData, setFormData] = useState(datos)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [section, field] = name.split(".")
      setFormData({
        ...formData,
        [section]: {
          ...formData[section as keyof typeof formData],
          [field]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSelectChange = (value: string, name: string) => {
    if (name.includes(".")) {
      const [section, field] = name.split(".")
      setFormData({
        ...formData,
        [section]: {
          ...formData[section as keyof typeof formData],
          [field]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    toast({
      title: "Datos actualizados",
      description: "Los datos del proveedor han sido actualizados correctamente.",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Datos Generales</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            {/* Datos básicos */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Información Básica</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="razonSocial">Razón Social</Label>
                  <Input id="razonSocial" name="razonSocial" value={formData.razonSocial} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rut">CUIT/CUIL</Label>
                  <Input id="rut" name="rut" value={formData.rut} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipoProveedor">Tipo de Proveedor</Label>
                  <Select
                    value={formData.tipoProveedor}
                    onValueChange={(value) => handleSelectChange(value, "tipoProveedor")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Industrial">Industrial</SelectItem>
                      <SelectItem value="Servicios">Servicios</SelectItem>
                      <SelectItem value="Comercial">Comercial</SelectItem>
                      <SelectItem value="Tecnología">Tecnología</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Select
                    value={formData.estado}
                    onValueChange={(value) =>
                      handleSelectChange(value as "Activo" | "Inactivo" | "Pendiente", "estado")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="Inactivo">Inactivo</SelectItem>
                      <SelectItem value="Pendiente">Pendiente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Información de contacto */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Información de Contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contacto.nombre">Nombre de Contacto</Label>
                  <Input
                    id="contacto.nombre"
                    name="contacto.nombre"
                    value={formData.contacto.nombre}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contacto.cargo">Cargo</Label>
                  <Input
                    id="contacto.cargo"
                    name="contacto.cargo"
                    value={formData.contacto.cargo}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contacto.email">Email</Label>
                  <Input
                    id="contacto.email"
                    name="contacto.email"
                    type="email"
                    value={formData.contacto.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contacto.telefono">Teléfono</Label>
                  <Input
                    id="contacto.telefono"
                    name="contacto.telefono"
                    value={formData.contacto.telefono}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Información bancaria */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Información Bancaria</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="banco.nombre">Banco</Label>
                  <Input id="banco.nombre" name="banco.nombre" value={formData.banco.nombre} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="banco.tipoCuenta">Tipo de Cuenta</Label>
                  <Select
                    value={formData.banco.tipoCuenta}
                    onValueChange={(value) => handleSelectChange(value, "banco.tipoCuenta")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Corriente">Corriente</SelectItem>
                      <SelectItem value="Ahorro">Ahorro</SelectItem>
                      <SelectItem value="Sueldo">Sueldo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="banco.numeroCuenta">Número de Cuenta</Label>
                  <Input
                    id="banco.numeroCuenta"
                    name="banco.numeroCuenta"
                    value={formData.banco.numeroCuenta}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="banco.titular">Titular</Label>
                  <Input
                    id="banco.titular"
                    name="banco.titular"
                    value={formData.banco.titular}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Información fiscal */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Información Fiscal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fiscal.regimenFiscal">Régimen Fiscal</Label>
                  <Select
                    value={formData.fiscal.regimenFiscal}
                    onValueChange={(value) => handleSelectChange(value, "fiscal.regimenFiscal")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar régimen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Simplificado">Simplificado</SelectItem>
                      <SelectItem value="Especial">Especial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fiscal.condicionIVA">Condición IVA</Label>
                  <Select
                    value={formData.fiscal.condicionIVA}
                    onValueChange={(value) => handleSelectChange(value, "fiscal.condicionIVA")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar condición" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Responsable Inscripto">Responsable Inscripto</SelectItem>
                      <SelectItem value="Monotributista">Monotributista</SelectItem>
                      <SelectItem value="Exento">Exento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar Cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
