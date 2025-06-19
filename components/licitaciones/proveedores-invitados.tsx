"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, Mail, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Proveedor {
  id: string
  razonSocial: string
  email: string
  personaContacto: string
}

// Simulación de proveedores registrados en el sistema
const proveedoresRegistrados = [
  { id: "1", razonSocial: "Constructora ABC", email: "contacto@constructoraabc.com", personaContacto: "Juan Pérez" },
  { id: "2", razonSocial: "Suministros XYZ", email: "info@suministrosxyz.com", personaContacto: "María López" },
  { id: "3", razonSocial: "TecnoServicios", email: "ventas@tecnoservicios.com", personaContacto: "Carlos Rodríguez" },
  { id: "4", razonSocial: "Logística Rápida", email: "contacto@logisticarapida.com", personaContacto: "Ana Martínez" },
  {
    id: "5",
    razonSocial: "Insumos Industriales",
    email: "ventas@insumosindustriales.com",
    personaContacto: "Roberto Sánchez",
  },
]

interface ProveedoresInvitadosProps {
  proveedores: Proveedor[]
  onAddProveedor: (proveedor: Omit<Proveedor, "id">) => void
  onRemoveProveedor: (id: string) => void
}

export function ProveedoresInvitados({ proveedores, onAddProveedor, onRemoveProveedor }: ProveedoresInvitadosProps) {
  const [nuevoProveedor, setNuevoProveedor] = useState({
    razonSocial: "",
    email: "",
    personaContacto: "",
  })
  const [showNoEncontradoModal, setShowNoEncontradoModal] = useState(false)
  const [enviandoInvitacion, setEnviandoInvitacion] = useState(false)
  const [invitacionEnviada, setInvitacionEnviada] = useState(false)

  const handleAddProveedor = () => {
    if (nuevoProveedor.email) {
      // Verificar si el proveedor existe en el sistema
      const proveedorExistente = proveedoresRegistrados.find(
        (p) => p.email.toLowerCase() === nuevoProveedor.email.toLowerCase(),
      )

      if (proveedorExistente) {
        // Si existe, usamos sus datos
        onAddProveedor({
          razonSocial: proveedorExistente.razonSocial,
          email: proveedorExistente.email,
          personaContacto: proveedorExistente.personaContacto,
        })

        // Limpiar el formulario
        setNuevoProveedor({
          razonSocial: "",
          email: "",
          personaContacto: "",
        })
      } else if (nuevoProveedor.razonSocial && nuevoProveedor.email && nuevoProveedor.personaContacto) {
        // Si no existe pero tenemos todos los datos, lo agregamos
        onAddProveedor(nuevoProveedor)

        // Limpiar el formulario
        setNuevoProveedor({
          razonSocial: "",
          email: "",
          personaContacto: "",
        })
      } else {
        // Si no existe y faltan datos, mostramos el modal
        setShowNoEncontradoModal(true)
      }
    }
  }

  const enviarInvitacion = () => {
    setShowNoEncontradoModal(false)
    setEnviandoInvitacion(true)

    // Simulamos el envío de la invitación (2 segundos)
    setTimeout(() => {
      setEnviandoInvitacion(false)
      setInvitacionEnviada(true)
    }, 2000)
  }

  return (
    <>
      <Card className="border rounded-md">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-base font-medium">Seleccionar proveedor existente</Label>
              </div>

              <Select
                onValueChange={(value) => {
                  const proveedor = proveedoresRegistrados.find((p) => p.id === value)
                  if (proveedor) {
                    setNuevoProveedor({
                      razonSocial: proveedor.razonSocial,
                      email: proveedor.email,
                      personaContacto: proveedor.personaContacto,
                    })
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un proveedor" />
                </SelectTrigger>
                <SelectContent>
                  {proveedoresRegistrados.map((proveedor) => (
                    <SelectItem key={proveedor.id} value={proveedor.id}>
                      {proveedor.razonSocial}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="mt-4">
                <Label className="text-base font-medium">O ingrese un nuevo proveedor</Label>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="razon-social">Razón Social</Label>
                  <Input
                    id="razon-social"
                    value={nuevoProveedor.razonSocial}
                    onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, razonSocial: e.target.value })}
                    placeholder="Ingrese la razón social"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-proveedor">Correo electrónico</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="email-proveedor"
                      type="email"
                      value={nuevoProveedor.email}
                      onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, email: e.target.value })}
                      placeholder="Ingrese el correo electrónico"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="persona-contacto">Persona Contacto</Label>
                  <Input
                    id="persona-contacto"
                    value={nuevoProveedor.personaContacto}
                    onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, personaContacto: e.target.value })}
                    placeholder="Ingrese la persona de contacto"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAddProveedor} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Agregar
              </Button>
            </div>

            {proveedores.length > 0 && (
              <div className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Razón Social</TableHead>
                      <TableHead>Correo electrónico</TableHead>
                      <TableHead>Persona Contacto</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {proveedores.map((proveedor) => (
                      <TableRow key={proveedor.id}>
                        <TableCell>{proveedor.razonSocial}</TableCell>
                        <TableCell>{proveedor.email}</TableCell>
                        <TableCell>{proveedor.personaContacto}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onRemoveProveedor(proveedor.id)}
                            className="h-8 w-8 text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal de proveedor no encontrado */}
      <Dialog open={showNoEncontradoModal} onOpenChange={setShowNoEncontradoModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              Proveedor no encontrado
            </DialogTitle>
            <DialogDescription>
              El proveedor con correo <span className="font-medium">{nuevoProveedor.email}</span> no está registrado en
              el sistema. Por favor complete todos los campos o envíe una invitación.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button type="button" variant="outline" onClick={() => setShowNoEncontradoModal(false)}>
              Cancelar
            </Button>
            <Button type="button" onClick={enviarInvitacion}>
              <Mail className="h-4 w-4 mr-2" />
              Enviar invitación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de enviando invitación */}
      <Dialog open={enviandoInvitacion} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md" hideCloseButton>
          <div className="flex flex-col items-center justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <h3 className="text-lg font-medium">Enviando invitación</h3>
            <p className="text-sm text-muted-foreground mt-2">Enviando correo a {nuevoProveedor.email}...</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de invitación enviada */}
      <Dialog open={invitacionEnviada} onOpenChange={setInvitacionEnviada}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invitación enviada</DialogTitle>
            <DialogDescription>
              Se ha enviado una invitación a <span className="font-medium">{nuevoProveedor.email}</span> exitosamente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" onClick={() => setInvitacionEnviada(false)}>
              Aceptar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
