"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, ChevronDown, Trash2 } from "lucide-react"
import { format } from "@/lib/utils"
import { es } from "date-fns/locale"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface FormularioNuevaVisitaProps {
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function FormularioNuevaVisita({ onSubmit, onCancel }: FormularioNuevaVisitaProps) {
  const [tipoVisita, setTipoVisita] = useState<string>("Laboral")
  const [destino, setDestino] = useState<string>("")
  const [personaVisitada, setPersonaVisitada] = useState<string>("")
  const [showPersonaVisitada, setShowPersonaVisitada] = useState<boolean>(true)
  const [personas, setPersonas] = useState<Array<{ nombre: string; documento: string; telefono: string }>>([])
  const [vehiculos, setVehiculos] = useState<Array<{ tipo: string; patente: string; modelo: string }>>([])
  const [observaciones, setObservaciones] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tipoVisitaOpen, setTipoVisitaOpen] = useState(false)

  // Estados para controlar la apertura de los popovers
  const [fechaDesdeOpen, setFechaDesdeOpen] = useState(false)
  const [fechaHastaOpen, setFechaHastaOpen] = useState(false)
  const [horaDesdeOpen, setHoraDesdeOpen] = useState(false)
  const [horaHastaOpen, setHoraHastaOpen] = useState(false)

  // Nuevos estados para el formulario de ingreso
  const [nombrePersona, setNombrePersona] = useState("")
  const [documentoPersona, setDocumentoPersona] = useState("")
  const [telefonoPersona, setTelefonoPersona] = useState("")

  const [tipoVehiculo, setTipoVehiculo] = useState("Seleccionar tipo")
  const [patenteVehiculo, setPatenteVehiculo] = useState("")
  const [modeloVehiculo, setModeloVehiculo] = useState("")

  const [transporteTerciarizado, setTransporteTerciarizado] = useState(false)

  // Tipos de visita disponibles
  const tiposVisita = ["Laboral", "Materiales", "Acceso a Obra", "Acceso a Muelle"]

  // Tipos de vehículo disponibles
  const tiposVehiculo = ["Auto", "Camioneta", "Camión", "Motocicleta", "Otro"]

  // Efecto para mostrar/ocultar el campo de persona visitada según el tipo de visita
  useEffect(() => {
    setShowPersonaVisitada(tipoVisita === "Laboral")
  }, [tipoVisita])

  const [fechaDesde, setFechaDesde] = useState<Date | undefined>(undefined)
  const [fechaHasta, setFechaHasta] = useState<Date | undefined>(undefined)
  const [horaDesde, setHoraDesde] = useState<Date | undefined>(undefined)
  const [horaHasta, setHoraHasta] = useState<Date | undefined>(undefined)

  const handleAddPersona = () => {
    if (nombrePersona && documentoPersona) {
      const nuevaPersona = {
        id: Date.now().toString(),
        nombre: nombrePersona,
        documento: documentoPersona,
        telefono: telefonoPersona,
      }
      setPersonas([...personas, nuevaPersona])

      // Limpiar campos
      setNombrePersona("")
      setDocumentoPersona("")
      setTelefonoPersona("")
    }
  }

  const handleRemovePersona = (index: number) => {
    const newPersonas = [...personas]
    newPersonas.splice(index, 1)
    setPersonas(newPersonas)
  }

  const handleAddVehiculo = () => {
    if (tipoVehiculo && patenteVehiculo && modeloVehiculo) {
      const nuevoVehiculo = {
        id: Date.now().toString(),
        tipo: tipoVehiculo,
        patente: patenteVehiculo,
        modelo: modeloVehiculo,
      }
      setVehiculos([...vehiculos, nuevoVehiculo])

      // Limpiar campos
      setTipoVehiculo("")
      setPatenteVehiculo("")
      setModeloVehiculo("")
    }
  }

  const handleRemoveVehiculo = (index: number) => {
    const newVehiculos = [...vehiculos]
    newVehiculos.splice(index, 1)
    setVehiculos(newVehiculos)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      tipoVisita,
      fechaDesde,
      horaDesde,
      fechaHasta,
      horaHasta,
      personaVisitada: tipoVisita === "Laboral" ? personaVisitada : null,
      personas,
      vehiculos,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo Visita</label>
          <div className="relative">
            <button
              type="button"
              className="w-full flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-left"
              onClick={() => setTipoVisitaOpen(!tipoVisitaOpen)}
            >
              <span>{tipoVisita}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </button>
            {tipoVisitaOpen && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-md z-10 mt-1">
                <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <input
                    type="checkbox"
                    checked={tipoVisita === "Laboral"}
                    onChange={() => setTipoVisita("Laboral")}
                    className="mr-2"
                  />
                  <span>Laboral</span>
                </div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <input
                    type="checkbox"
                    checked={tipoVisita === "Materiales"}
                    onChange={() => setTipoVisita("Materiales")}
                    className="mr-2"
                  />
                  <span>Materiales</span>
                </div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <input
                    type="checkbox"
                    checked={tipoVisita === "Acceso a Obra"}
                    onChange={() => setTipoVisita("Acceso a Obra")}
                    className="mr-2"
                  />
                  <span>Acceso a Obra</span>
                </div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <input
                    type="checkbox"
                    checked={tipoVisita === "Acceso a Muelle"}
                    onChange={() => setTipoVisita("Acceso a Muelle")}
                    className="mr-2"
                  />
                  <span>Acceso a Muelle</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Desde</label>
          <Input
            type="date"
            value={fechaDesde ? format(fechaDesde, "yyyy-MM-dd", { locale: es }) : ""}
            onChange={(e) => setFechaDesde(new Date(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Hasta</label>
          <Input
            type="date"
            value={fechaHasta ? format(fechaHasta, "yyyy-MM-dd", { locale: es }) : ""}
            onChange={(e) => setFechaHasta(new Date(e.target.value))}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="transporteTerciarizado"
          checked={transporteTerciarizado}
          onChange={(e) => setTransporteTerciarizado(e.target.checked)}
        />
        <Label htmlFor="transporteTerciarizado" className="font-medium text-gray-700">
          Transporte terciarizado
        </Label>
      </div>

      {showPersonaVisitada && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Persona a Visitar</label>
          <Input type="text" value={personaVisitada} onChange={(e) => setPersonaVisitada(e.target.value)} />
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-plp-darkest">Personas que asistirán</h3>
          <Button type="button" variant="outline" className="flex items-center" onClick={handleAddPersona}>
            <Plus className="h-4 w-4 mr-2" />
            Agregar Persona
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
            <Input type="text" value={nombrePersona} onChange={(e) => setNombrePersona(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
            <Input type="text" value={documentoPersona} onChange={(e) => setDocumentoPersona(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono (opcional)</label>
            <Input type="text" value={telefonoPersona} onChange={(e) => setTelefonoPersona(e.target.value)} />
          </div>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-left">Nombre completo</th>
              <th className="py-3 px-4 text-left">DNI</th>
              <th className="py-3 px-4 text-left">Teléfono</th>
              <th className="py-3 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {personas.map((persona, index) => (
              <tr key={persona.id}>
                <td className="py-4 px-4">{persona.nombre}</td>
                <td className="py-4 px-4">{persona.documento}</td>
                <td className="py-4 px-4">{persona.telefono || "-"}</td>
                <td className="py-4 px-4 text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemovePersona(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
        <Textarea
          placeholder="Ingrese cualquier información adicional relevante para la visita..."
          rows={5}
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Enviar Solicitud</Button>
      </div>
    </form>
  )
}
