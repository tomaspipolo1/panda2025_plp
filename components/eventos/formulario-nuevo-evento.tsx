"use client"

import type React from "react"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Participante {
  nombre: string
  email: string
}

interface FormData {
  titulo: string
  descripcion: string
  fechaInicio: Date
  horaInicio: string
  fechaFin?: Date
  horaFin?: string
  ubicacion: string
  participantes: Participante[]
  imagen?: string
  tipo: string
  estado: "pendiente" | "en_curso" | "finalizado"
}

interface FormularioNuevoEventoProps {
  eventoParaEditar?: FormData
  onSubmit: (data: FormData) => void
}

const FormularioNuevoEvento: React.FC<FormularioNuevoEventoProps> = ({ eventoParaEditar, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    titulo: eventoParaEditar?.titulo || "",
    descripcion: eventoParaEditar?.descripcion || "",
    fechaInicio: eventoParaEditar?.fechaInicio || new Date(),
    horaInicio: eventoParaEditar?.horaInicio || "09:00",
    fechaFin: eventoParaEditar?.fechaFin || new Date(),
    horaFin: eventoParaEditar?.horaFin || "10:00",
    ubicacion: eventoParaEditar?.ubicacion || "",
    participantes: eventoParaEditar?.participantes || [],
    imagen: eventoParaEditar?.imagen || "",
    tipo: eventoParaEditar?.tipo || "reunion_proveedor",
    estado: eventoParaEditar?.estado || "pendiente",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleDateChange = (name: string, date: Date | undefined) => {
    if (date) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: date,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <Label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
          Título del evento
        </Label>
        <Input
          type="text"
          id="titulo"
          name="titulo"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.titulo}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </Label>
        <Textarea
          id="descripcion"
          name="descripcion"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700 mb-1">
          Fecha de inicio
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !formData.fechaInicio && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.fechaInicio ? format(formData.fechaInicio, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formData.fechaInicio}
              onSelect={(date) => handleDateChange("fechaInicio", date)}
              disabled={false}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="mb-4">
        <Label htmlFor="horaInicio" className="block text-sm font-medium text-gray-700 mb-1">
          Hora de inicio
        </Label>
        <Input
          type="time"
          id="horaInicio"
          name="horaInicio"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.horaInicio}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="fechaFin" className="block text-sm font-medium text-gray-700 mb-1">
          Fecha de fin
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !formData.fechaFin && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.fechaFin ? format(formData.fechaFin, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formData.fechaFin}
              onSelect={(date) => handleDateChange("fechaFin", date)}
              disabled={false}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="mb-4">
        <Label htmlFor="horaFin" className="block text-sm font-medium text-gray-700 mb-1">
          Hora de fin
        </Label>
        <Input
          type="time"
          id="horaFin"
          name="horaFin"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.horaFin}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 mb-1">
          Ubicación
        </Label>
        <Input
          type="text"
          id="ubicacion"
          name="ubicacion"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.ubicacion}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
          Estado del evento
        </Label>
        <select
          id="estado"
          name="estado"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.estado || "pendiente"}
          onChange={handleChange}
          required
        >
          <option value="pendiente">Pendiente</option>
          <option value="en_curso">En Curso</option>
          <option value="finalizado">Finalizado</option>
        </select>
      </div>

      <div className="mb-4">
        <Label htmlFor="participantes" className="block text-sm font-medium text-gray-700 mb-1">
          Participantes
        </Label>
        {/* Aquí podrías agregar lógica para agregar y mostrar participantes */}
        <p>Funcionalidad de participantes en desarrollo...</p>
      </div>

      <div className="mb-4">
        <Label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de evento
        </Label>
        <Select
          onValueChange={(value) => setFormData((prevData) => ({ ...prevData, tipo: value }))}
          defaultValue={formData.tipo}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona un tipo de evento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="reunion_proveedor">Reunión con Proveedor</SelectItem>
            <SelectItem value="capacitacion_interna">Capacitación Interna</SelectItem>
            <SelectItem value="evento_marketing">Evento de Marketing</SelectItem>
            <SelectItem value="otro">Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-700">
        Guardar Evento
      </Button>
    </form>
  )
}

export default FormularioNuevoEvento
