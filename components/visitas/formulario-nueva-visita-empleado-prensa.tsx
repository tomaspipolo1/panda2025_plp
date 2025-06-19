"use client"

import type React from "react"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Persona {
  id: string
  nombre: string
  documento: string
}

interface FormularioNuevaVisitaEmpleadoPrensaProps {
  personas: Persona[]
  onSubmit: (data: any) => void
  submitted: boolean
  errors: any
}

const FormularioNuevaVisitaEmpleadoPrensa: React.FC<FormularioNuevaVisitaEmpleadoPrensaProps> = ({
  personas,
  onSubmit,
  submitted,
  errors,
}) => {
  const [nombre, setNombre] = useState<string>("")
  const [apellido, setApellido] = useState<string>("")
  const [dni, setDni] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [telefono, setTelefono] = useState<string>("")
  const [empresa, setEmpresa] = useState<string>("")
  const [motivoVisita, setMotivoVisita] = useState<string>("")
  const [fechaVisita, setFechaVisita] = useState<Date | null>(null)
  const [horaVisita, setHoraVisita] = useState<string>("")
  const [sectorVisita, setSectorVisita] = useState<string>("")
  const [tipoVisita, setTipoVisita] = useState<string>("")
  const [observaciones, setObservaciones] = useState<string>("")

  // Para Visita Guiada
  const [coordinadorVisita, setCoordinadorVisita] = useState<string>("")

  // Para Visita de tipo Evento
  const [nombreEvento, setNombreEvento] = useState<string>("")
  const [descripcionEvento, setDescripcionEvento] = useState<string>("")

  const tiposVisita = ["Laboral", "Visita Guiada", "Visita de tipo Evento"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = {
      nombre,
      apellido,
      dni,
      email,
      telefono,
      empresa,
      motivoVisita,
      fechaVisita,
      horaVisita,
      sectorVisita,
      tipoVisita,
      observaciones,
      coordinadorVisita,
      nombreEvento,
      descripcionEvento,
    }

    onSubmit(formData)
  }

  // Validar formulario
  const validateForm = () => {
    const newErrors: any = {}

    if (!nombre) newErrors.nombre = "El nombre es obligatorio"
    if (!apellido) newErrors.apellido = "El apellido es obligatorio"
    if (!dni) newErrors.dni = "El DNI es obligatorio"
    if (!email) newErrors.email = "El email es obligatorio"
    if (!telefono) newErrors.telefono = "El teléfono es obligatorio"
    if (!empresa) newErrors.empresa = "La empresa es obligatoria"
    if (!motivoVisita) newErrors.motivoVisita = "El motivo de la visita es obligatorio"
    if (!fechaVisita) newErrors.fechaVisita = "La fecha de la visita es obligatoria"
    if (!horaVisita) newErrors.horaVisita = "La hora de la visita es obligatoria"
    if (!sectorVisita) newErrors.sectorVisita = "El sector de la visita es obligatorio"
    if (!tipoVisita) newErrors.tipoVisita = "El tipo de visita es obligatorio"

    // Validar coordinador de visita (solo para Visita Guiada)
    if (tipoVisita === "Visita Guiada" && !coordinadorVisita) {
      newErrors.coordinadorVisita = "Debe seleccionar un coordinador para la visita guiada"
    }

    return newErrors
  }

  // Función para eliminar persona
  const eliminarPersona = (id: string) => {
    const personaEliminada = personas.find((p) => p.id === id)
    //setPersonas(personas.filter((persona) => persona.id !== id))

    // Si la persona eliminada era el coordinador, resetear la selección
    if (personaEliminada && coordinadorVisita === id) {
      setCoordinadorVisita("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nombre" className="text-sm font-medium text-gray-700 mb-1 block">
              Nombre
            </Label>
            <Input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingrese el nombre"
              className={`w-full ${submitted && errors.nombre ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            {submitted && errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
          </div>
          <div>
            <Label htmlFor="apellido" className="text-sm font-medium text-gray-700 mb-1 block">
              Apellido
            </Label>
            <Input
              type="text"
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              placeholder="Ingrese el apellido"
              className={`w-full ${submitted && errors.apellido ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            {submitted && errors.apellido && <p className="text-red-500 text-xs mt-1">{errors.apellido}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dni" className="text-sm font-medium text-gray-700 mb-1 block">
              DNI
            </Label>
            <Input
              type="text"
              id="dni"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              placeholder="Ingrese el DNI"
              className={`w-full ${submitted && errors.dni ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            {submitted && errors.dni && <p className="text-red-500 text-xs mt-1">{errors.dni}</p>}
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese el email"
              className={`w-full ${submitted && errors.email ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            {submitted && errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="telefono" className="text-sm font-medium text-gray-700 mb-1 block">
              Teléfono
            </Label>
            <Input
              type="tel"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Ingrese el teléfono"
              className={`w-full ${submitted && errors.telefono ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            {submitted && errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
          </div>
          <div>
            <Label htmlFor="empresa" className="text-sm font-medium text-gray-700 mb-1 block">
              Empresa
            </Label>
            <Input
              type="text"
              id="empresa"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              placeholder="Ingrese la empresa"
              className={`w-full ${submitted && errors.empresa ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            {submitted && errors.empresa && <p className="text-red-500 text-xs mt-1">{errors.empresa}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="motivoVisita" className="text-sm font-medium text-gray-700 mb-1 block">
              Motivo de la Visita
            </Label>
            <Input
              type="text"
              id="motivoVisita"
              value={motivoVisita}
              onChange={(e) => setMotivoVisita(e.target.value)}
              placeholder="Ingrese el motivo de la visita"
              className={`w-full ${submitted && errors.motivoVisita ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            {submitted && errors.motivoVisita && <p className="text-red-500 text-xs mt-1">{errors.motivoVisita}</p>}
          </div>
          <div>
            <Label htmlFor="sectorVisita" className="text-sm font-medium text-gray-700 mb-1 block">
              Sector de la Visita
            </Label>
            <Input
              type="text"
              id="sectorVisita"
              value={sectorVisita}
              onChange={(e) => setSectorVisita(e.target.value)}
              placeholder="Ingrese el sector de la visita"
              className={`w-full ${submitted && errors.sectorVisita ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            {submitted && errors.sectorVisita && <p className="text-red-500 text-xs mt-1">{errors.sectorVisita}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fechaVisita" className="text-sm font-medium text-gray-700 mb-1 block">
              Fecha de la Visita
            </Label>
            <Input
              type="date"
              id="fechaVisita"
              onChange={(e) => setFechaVisita(e.target.value as any)}
              className={`w-full ${submitted && errors.fechaVisita ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            {submitted && errors.fechaVisita && <p className="text-red-500 text-xs mt-1">{errors.fechaVisita}</p>}
          </div>
          <div>
            <Label htmlFor="horaVisita" className="text-sm font-medium text-gray-700 mb-1 block">
              Hora de la Visita
            </Label>
            <Input
              type="time"
              id="horaVisita"
              value={horaVisita}
              onChange={(e) => setHoraVisita(e.target.value)}
              className={`w-full ${submitted && errors.horaVisita ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            {submitted && errors.horaVisita && <p className="text-red-500 text-xs mt-1">{errors.horaVisita}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="tipoVisita" className="text-sm font-medium text-gray-700 mb-1 block">
            Tipo de Visita
          </Label>
          <Select value={tipoVisita} onValueChange={setTipoVisita}>
            <SelectTrigger
              id="tipoVisita"
              className={`w-full ${submitted && errors.tipoVisita ? "border-red-500 focus:ring-red-500" : ""}`}
            >
              <SelectValue placeholder="Seleccionar tipo de visita" />
            </SelectTrigger>
            <SelectContent>
              {tiposVisita.map((tipo) => (
                <SelectItem key={tipo} value={tipo}>
                  {tipo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {submitted && errors.tipoVisita && <p className="text-red-500 text-xs mt-1">{errors.tipoVisita}</p>}
        </div>

        <div>
          <Label htmlFor="observaciones" className="text-sm font-medium text-gray-700 mb-1 block">
            Observaciones
          </Label>
          <Textarea
            id="observaciones"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            placeholder="Ingrese las observaciones"
            rows={4}
          />
        </div>
      </div>

      {/* Campos para Visita Guiada */}
      {/* Sección de coordinador de visita (solo para Visita Guiada) */}
      {tipoVisita === "Visita Guiada" && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Coordinador de la Visita</h2>
          <div>
            <Label htmlFor="coordinadorVisita" className="text-sm font-medium text-gray-700 mb-1 block">
              Seleccionar Coordinador
            </Label>
            <Select value={coordinadorVisita} onValueChange={setCoordinadorVisita}>
              <SelectTrigger
                id="coordinadorVisita"
                className={`w-full ${submitted && errors.coordinadorVisita ? "border-red-500 focus:ring-red-500" : ""}`}
              >
                <SelectValue
                  placeholder={
                    personas.length === 0
                      ? "Primero agregue personas a la lista"
                      : "Seleccionar coordinador de la visita"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {personas.map((persona) => (
                  <SelectItem key={persona.id} value={persona.id}>
                    {persona.nombre} - {persona.documento}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {submitted && errors.coordinadorVisita && (
              <p className="text-red-500 text-xs mt-1">{errors.coordinadorVisita}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              El coordinador será el responsable de la visita guiada y debe estar incluido en la lista de personas que
              asistirán.
            </p>
          </div>
        </div>
      )}

      {/* Campos para Visita de tipo Evento */}
      {tipoVisita === "Visita de tipo Evento" && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="nombreEvento" className="text-sm font-medium text-gray-700 mb-1 block">
                Nombre del Evento
              </Label>
              <Input
                id="nombreEvento"
                value={nombreEvento}
                onChange={(e) => setNombreEvento(e.target.value)}
                placeholder="Nombre del evento"
                className={`w-full ${submitted && errors.nombreEvento ? "border-red-500 focus:ring-red-500" : ""}`}
              />
              {submitted && errors.nombreEvento && <p className="text-red-500 text-xs mt-1">{errors.nombreEvento}</p>}
            </div>
            <div>
              <Label htmlFor="descripcionEvento" className="text-sm font-medium text-gray-700 mb-1 block">
                Descripción del Evento
              </Label>
              <Textarea
                id="descripcionEvento"
                value={descripcionEvento}
                onChange={(e) => setDescripcionEvento(e.target.value)}
                placeholder="Descripción detallada del evento"
                rows={4}
              />
            </div>
          </div>
        </div>
      )}

      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Enviar
      </button>
    </form>
  )
}

export default FormularioNuevaVisitaEmpleadoPrensa
