"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"

export default function DatosPersonalesPage() {
  const [formData, setFormData] = useState({
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan.perez@plp.gob.ar",
    telefono: "+54 9 221 555-1234",
    direccion: "Calle 7 n° 1234, La Plata",
    biografia:
      "Contador público con más de 10 años de experiencia en el sector público. Especializado en gestión financiera y contabilidad gubernamental.",
  })

  const formDataLaboral = {
    gerencia: "Gerencia de Administración",
    departamento: "CONTABLE",
    cargo: "PROFESIONAL SENIOR",
    superiorJerarquico: "Isabel García (Jefe de Departamento)",
    fechaIngreso: "15/05/2013",
    antiguedad: "10 años, 1 mes",
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Datos actualizados",
      description: "Tus datos personales han sido actualizados correctamente.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold tracking-tight">Datos Personales</h3>
        <p className="text-muted-foreground">Actualiza tu información personal y cómo te contactamos.</p>
      </div>
      <Separator />
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>Esta información será visible para otros usuarios del sistema.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido</Label>
                <Input id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Input id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="biografia">Biografía</Label>
              <Textarea id="biografia" name="biografia" value={formData.biografia} onChange={handleChange} rows={4} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Guardar Cambios</Button>
          </CardFooter>
        </Card>
      </form>
      <form onSubmit={handleSubmit}>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Información Laboral</CardTitle>
            <CardDescription>Datos sobre tu posición y relación laboral en la organización.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="gerencia">Gerencia</Label>
                <Input id="gerencia" name="gerencia" value={formDataLaboral.gerencia} readOnly className="bg-gray-50" />
                <p className="text-xs text-gray-500 italic">Requiere solicitud para modificar</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="departamento">Departamento</Label>
                <Input
                  id="departamento"
                  name="departamento"
                  value={formDataLaboral.departamento}
                  readOnly
                  className="bg-gray-50"
                />
                <p className="text-xs text-gray-500 italic">Requiere solicitud para modificar</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cargo">Cargo</Label>
                <Input id="cargo" name="cargo" value={formDataLaboral.cargo} readOnly className="bg-gray-50" />
                <p className="text-xs text-gray-500 italic">Requiere solicitud para modificar</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="superiorJerarquico">Superior Jerárquico</Label>
                <Input
                  id="superiorJerarquico"
                  name="superiorJerarquico"
                  value={formDataLaboral.superiorJerarquico}
                  readOnly
                  className="bg-gray-50"
                />
                <p className="text-xs text-gray-500 italic">Requiere solicitud para modificar</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fechaIngreso">Fecha de Ingreso</Label>
                <Input
                  id="fechaIngreso"
                  name="fechaIngreso"
                  value={formDataLaboral.fechaIngreso}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="antiguedad">Antigüedad</Label>
                <Input
                  id="antiguedad"
                  name="antiguedad"
                  value={formDataLaboral.antiguedad}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
