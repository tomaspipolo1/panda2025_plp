"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Clock, Plus, ChevronDown, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface FormularioNuevaVisitaEmpleadoComprasProps {
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function FormularioNuevaVisitaEmpleadoCompras({
  onSubmit,
  onCancel,
}: FormularioNuevaVisitaEmpleadoComprasProps) {
  const [fechaDesde, setFechaDesde] = useState<Date | undefined>(undefined)
  const [fechaHasta, setFechaHasta] = useState<Date | undefined>(undefined)
  const [horaDesde, setHoraDesde] = useState<string>("00:00")
  const [horaHasta, setHoraHasta] = useState<string>("00:00")
  const [tipoVisita, setTipoVisita] = useState<string>("Laboral")
  const [personaVisitada, setPersonaVisitada] = useState<string>("")
  const [showPersonaVisitada, setShowPersonaVisitada] = useState<boolean>(true)
  const [personas, setPersonas] = useState<Array<{ nombre: string; documento: string; empresa: string }>>([])
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
  const [empresaPersona, setEmpresaPersona] = useState("")

  const [tipoVehiculo, setTipoVehiculo] = useState("Seleccionar tipo")
  const [patenteVehiculo, setPatenteVehiculo] = useState("")
  const [modeloVehiculo, setModeloVehiculo] = useState("")

  // Tipos de visita disponibles
  const tiposVisita = ["Laboral", "Guiada", "Evento", "Materiales", "Acceso a Obra", "Acceso a Muelle"]

  // Tipos de vehículo disponibles
  const tiposVehiculo = ["Automóvil", "Camioneta", "Camión", "Motocicleta", "Otro"]

  // Efecto para mostrar/ocultar el campo de persona visitada según el tipo de visita
  useEffect(() => {
    setShowPersonaVisitada(tipoVisita === "Laboral")
  }, [tipoVisita])

  const handleAddPersona = () => {
    if (nombrePersona.trim() === "" || documentoPersona.trim() === "") {
      alert("Por favor complete al menos el nombre y documento de la persona")
      return
    }

    setPersonas([...personas, { nombre: nombrePersona, documento: documentoPersona, empresa: empresaPersona }])

    // Limpiar el formulario
    setNombrePersona("")
    setDocumentoPersona("")
    setEmpresaPersona("")
  }

  const handleRemovePersona = (index: number) => {
    const newPersonas = [...personas]
    newPersonas.splice(index, 1)
    setPersonas(newPersonas)
  }

  const handleAddVehiculo = () => {
    if (tipoVehiculo === "Seleccionar tipo" || patenteVehiculo.trim() === "") {
      alert("Por favor seleccione un tipo de vehículo y complete la patente")
      return
    }

    setVehiculos([...vehiculos, { tipo: tipoVehiculo, patente: patenteVehiculo, modelo: modeloVehiculo }])

    // Limpiar el formulario
    setTipoVehiculo("Seleccionar tipo")
    setPatenteVehiculo("")
    setModeloVehiculo("")
  }

  const handleRemoveVehiculo = (index: number) => {
    const newVehiculos = [...vehiculos]
    newVehiculos.splice(index, 1)
    setVehiculos(newVehiculos)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica solo al enviar el formulario
    if (!fechaDesde || !fechaHasta) {
      alert("Por favor seleccione las fechas de inicio y fin")
      return
    }

    if (tipoVisita === "Laboral" && !personaVisitada) {
      alert("Por favor ingrese la persona a la que visita")
      return
    }

    if (personas.length === 0) {
      alert("Por favor agregue al menos una persona que asistirá")
      return
    }

    setIsSubmitting(true)

    // Datos a enviar
    const formData = {
      tipoVisita,
      fechaDesde,
      horaDesde,
      fechaHasta,
      horaHasta,
      personaVisitada: tipoVisita === "Laboral" ? personaVisitada : null,
      personas,
      vehiculos,
      observaciones,
    }

    // Simulamos una petición
    setTimeout(() => {
      onSubmit(formData)
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                <ul className="max-h-60 overflow-auto rounded-md py-1 text-base">
                  {tiposVisita.map((tipo) => (
                    <li
                      key={tipo}
                      className={`relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-blue-100 ${
                        tipoVisita === tipo ? "bg-blue-50" : ""
                      }`}
                      onClick={() => {
                        setTipoVisita(tipo)
                        setTipoVisitaOpen(false)
                      }}
                    >
                      {tipoVisita === tipo && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-1.5">
                          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                      <span className={`block truncate ${tipoVisita === tipo ? "font-medium pl-6" : "pl-2"}`}>
                        {tipo}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setFechaDesdeOpen(!fechaDesdeOpen)}
                className="w-full flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-left"
              >
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {fechaDesde ? (
                    format(fechaDesde, "dd/MM/yyyy", { locale: es })
                  ) : (
                    <span className="text-gray-400">dd/mm/aaaa</span>
                  )}
                </div>
              </button>
              {fechaDesdeOpen && (
                <div className="absolute z-10 mt-1 bg-white rounded-md shadow-lg p-4" style={{ width: "320px" }}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">abril de 2025</div>
                    <div className="flex space-x-1">
                      <button className="p-1">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                      <button className="p-1">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M6.1584 3.13514C5.95694 3.32401 5.94673 3.64042 6.13559 3.84188L9.565 7.49991L6.13559 11.1579C5.94673 11.3594 5.95694 11.6758 6.1584 11.8647C6.35986 12.0535 6.67627 12.0433 6.86514 11.8419L10.6151 7.84188C10.7954 7.64955 10.7954 7.35027 10.6151 7.15794L6.86514 3.15794C6.67627 2.95648 6.35986 2.94628 6.1584 3.13514Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center text-xs mb-2">
                    <div className="text-blue-600">D</div>
                    <div className="text-blue-600">L</div>
                    <div className="text-blue-600">M</div>
                    <div className="text-blue-600">M</div>
                    <div className="text-blue-600">J</div>
                    <div className="text-blue-600">V</div>
                    <div className="text-blue-600">S</div>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center text-sm">
                    {Array.from({ length: 35 }, (_, i) => {
                      // Ejemplo simplificado - en una implementación real, calcularías los días correctamente
                      const day = i - 2 // Ajuste para que el 1 caiga en la posición correcta
                      const isCurrentMonth = day > 0 && day <= 30
                      const isSelected = day === 24

                      return (
                        <button
                          key={i}
                          type="button"
                          className={`w-9 h-9 flex items-center justify-center rounded-full ${
                            isSelected
                              ? "bg-blue-500 text-white"
                              : isCurrentMonth
                                ? "hover:bg-blue-100"
                                : "text-gray-400"
                          }`}
                          onClick={() => {
                            if (isCurrentMonth) {
                              const newDate = new Date(2025, 3, day) // abril es 3 (0-indexed)
                              setFechaDesde(newDate)
                              setFechaDesdeOpen(false)
                            }
                          }}
                        >
                          {isCurrentMonth ? day : day <= 0 ? 31 + day : day - 30}
                        </button>
                      )
                    })}
                  </div>
                  <div className="flex justify-between mt-2 pt-2 border-t">
                    <button
                      type="button"
                      className="text-blue-500 text-sm"
                      onClick={() => {
                        setFechaDesde(undefined)
                        setFechaDesdeOpen(false)
                      }}
                    >
                      Borrar
                    </button>
                    <button
                      type="button"
                      className="text-blue-500 text-sm"
                      onClick={() => {
                        setFechaDesde(new Date())
                        setFechaDesdeOpen(false)
                      }}
                    >
                      Hoy
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setHoraDesdeOpen(!horaDesdeOpen)}
                className="w-full flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-left"
              >
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  {horaDesde}
                </div>
              </button>
              {horaDesdeOpen && (
                <div className="absolute z-10 mt-1 bg-white rounded-md shadow-lg">
                  <div className="grid grid-cols-2 divide-x">
                    {/* Horas */}
                    <div
                      className="max-h-[200px] overflow-y-auto"
                      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                      <style jsx>{`
                        div::-webkit-scrollbar {
                          display: none;
                        }
                      `}</style>
                      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                        <div
                          key={`hour-${hour}`}
                          className={`px-3 py-2 text-center cursor-pointer hover:bg-blue-50 ${
                            horaDesde.startsWith(hour.toString().padStart(2, "0")) ? "bg-blue-500 text-white" : ""
                          }`}
                          onClick={() => {
                            const currentMinute = horaDesde.split(":")[1] || "00"
                            setHoraDesde(`${hour.toString().padStart(2, "0")}:${currentMinute}`)
                            setHoraDesdeOpen(false)
                          }}
                        >
                          {hour.toString().padStart(2, "0")}
                        </div>
                      ))}
                    </div>
                    {/* Minutos */}
                    <div
                      className="max-h-[200px] overflow-y-auto"
                      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                      <style jsx>{`
                        div::-webkit-scrollbar {
                          display: none;
                        }
                      `}</style>
                      {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                        <div
                          key={`minute-${minute}`}
                          className={`px-3 py-2 text-center cursor-pointer hover:bg-blue-50 ${
                            horaDesde.endsWith(minute.toString().padStart(2, "0")) ? "bg-blue-500 text-white" : ""
                          }`}
                          onClick={() => {
                            const currentHour = horaDesde.split(":")[0] || "00"
                            setHoraDesde(`${currentHour}:${minute.toString().padStart(2, "0")}`)
                            setHoraDesdeOpen(false)
                          }}
                        >
                          {minute.toString().padStart(2, "0")}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setFechaHastaOpen(!fechaHastaOpen)}
                className="w-full flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-left"
              >
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {fechaHasta ? (
                    format(fechaHasta, "dd/MM/yyyy", { locale: es })
                  ) : (
                    <span className="text-gray-400">dd/mm/aaaa</span>
                  )}
                </div>
              </button>
              {fechaHastaOpen && (
                <div className="absolute z-10 mt-1 bg-white rounded-md shadow-lg p-4" style={{ width: "320px" }}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">abril de 2025</div>
                    <div className="flex space-x-1">
                      <button className="p-1">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                      <button className="p-1">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M6.1584 3.13514C5.95694 3.32401 5.94673 3.64042 6.13559 3.84188L9.565 7.49991L6.13559 11.1579C5.94673 11.3594 5.95694 11.6758 6.1584 11.8647C6.35986 12.0535 6.67627 12.0433 6.86514 11.8419L10.6151 7.84188C10.7954 7.64955 10.7954 7.35027 10.6151 7.15794L6.86514 3.15794C6.67627 2.95648 6.35986 2.94628 6.1584 3.13514Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center text-xs mb-2">
                    <div className="text-blue-600">D</div>
                    <div className="text-blue-600">L</div>
                    <div className="text-blue-600">M</div>
                    <div className="text-blue-600">M</div>
                    <div className="text-blue-600">J</div>
                    <div className="text-blue-600">V</div>
                    <div className="text-blue-600">S</div>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center text-sm">
                    {Array.from({ length: 35 }, (_, i) => {
                      // Ejemplo simplificado - en una implementación real, calcularías los días correctamente
                      const day = i - 2 // Ajuste para que el 1 caiga en la posición correcta
                      const isCurrentMonth = day > 0 && day <= 30
                      const isSelected = day === 24

                      return (
                        <button
                          key={i}
                          type="button"
                          className={`w-9 h-9 flex items-center justify-center rounded-full ${
                            isSelected
                              ? "bg-blue-500 text-white"
                              : isCurrentMonth
                                ? "hover:bg-blue-100"
                                : "text-gray-400"
                          }`}
                          onClick={() => {
                            if (isCurrentMonth) {
                              const newDate = new Date(2025, 3, day) // abril es 3 (0-indexed)
                              setFechaHasta(newDate)
                              setFechaHastaOpen(false)
                            }
                          }}
                        >
                          {isCurrentMonth ? day : day <= 0 ? 31 + day : day - 30}
                        </button>
                      )
                    })}
                  </div>
                  <div className="flex justify-between mt-2 pt-2 border-t">
                    <button
                      type="button"
                      className="text-blue-500 text-sm"
                      onClick={() => {
                        setFechaHasta(undefined)
                        setFechaHastaOpen(false)
                      }}
                    >
                      Borrar
                    </button>
                    <button
                      type="button"
                      className="text-blue-500 text-sm"
                      onClick={() => {
                        setFechaHasta(new Date())
                        setFechaHastaOpen(false)
                      }}
                    >
                      Hoy
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setHoraHastaOpen(!horaHastaOpen)}
                className="w-full flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-left"
              >
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  {horaHasta}
                </div>
              </button>
              {horaHastaOpen && (
                <div className="absolute z-10 mt-1 bg-white rounded-md shadow-lg">
                  <div className="grid grid-cols-2 divide-x">
                    {/* Horas */}
                    <div
                      className="max-h-[200px] overflow-y-auto"
                      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                      <style jsx>{`
                        div::-webkit-scrollbar {
                          display: none;
                        }
                      `}</style>
                      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                        <div
                          key={`hour-${hour}`}
                          className={`px-3 py-2 text-center cursor-pointer hover:bg-blue-50 ${
                            horaHasta.startsWith(hour.toString().padStart(2, "0")) ? "bg-blue-500 text-white" : ""
                          }`}
                          onClick={() => {
                            const currentMinute = horaHasta.split(":")[1] || "00"
                            setHoraHasta(`${hour.toString().padStart(2, "0")}:${currentMinute}`)
                            setHoraHastaOpen(false)
                          }}
                        >
                          {hour.toString().padStart(2, "0")}
                        </div>
                      ))}
                    </div>
                    {/* Minutos */}
                    <div
                      className="max-h-[200px] overflow-y-auto"
                      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                      <style jsx>{`
                        div::-webkit-scrollbar {
                          display: none;
                        }
                      `}</style>
                      {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                        <div
                          key={`minute-${minute}`}
                          className={`px-3 py-2 text-center cursor-pointer hover:bg-blue-50 ${
                            horaHasta.endsWith(minute.toString().padStart(2, "0")) ? "bg-blue-500 text-white" : ""
                          }`}
                          onClick={() => {
                            const currentHour = horaHasta.split(":")[0] || "00"
                            setHoraHasta(`${currentHour}:${minute.toString().padStart(2, "0")}`)
                            setHoraHastaOpen(false)
                          }}
                        >
                          {minute.toString().padStart(2, "0")}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showPersonaVisitada && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Persona a la que visita</label>
          <Input
            value={personaVisitada}
            onChange={(e) => setPersonaVisitada(e.target.value)}
            placeholder="Nombre completo"
            className="w-full"
          />
        </div>
      )}

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Personas que asistirán</h2>
          <Button type="button" variant="outline" onClick={handleAddPersona} className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Persona
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <Input
              value={nombrePersona}
              onChange={(e) => setNombrePersona(e.target.value)}
              placeholder="Nombre completo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Documento</label>
            <Input
              value={documentoPersona}
              onChange={(e) => setDocumentoPersona(e.target.value)}
              placeholder="Número de documento"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
            <Input
              value={empresaPersona}
              onChange={(e) => setEmpresaPersona(e.target.value)}
              placeholder="Nombre de la empresa"
            />
          </div>
        </div>

        {personas.length > 0 && (
          <div className="mt-4 border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nombre
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Documento
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Empresa
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {personas.map((persona, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{persona.nombre}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{persona.documento}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{persona.empresa}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        type="button"
                        onClick={() => handleRemovePersona(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Vehículos</h2>
          <Button type="button" variant="outline" onClick={handleAddVehiculo} className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Vehículo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select
              value={tipoVehiculo}
              onChange={(e) => setTipoVehiculo(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
            >
              <option value="Seleccionar tipo" disabled>
                Seleccionar tipo
              </option>
              {tiposVehiculo.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patente</label>
            <Input
              value={patenteVehiculo}
              onChange={(e) => setPatenteVehiculo(e.target.value)}
              placeholder="Patente del vehículo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
            <Input
              value={modeloVehiculo}
              onChange={(e) => setModeloVehiculo(e.target.value)}
              placeholder="Modelo del vehículo"
            />
          </div>
        </div>

        {vehiculos.length > 0 && (
          <div className="mt-4 border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tipo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Patente
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Modelo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vehiculos.map((vehiculo, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehiculo.tipo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehiculo.patente}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehiculo.modelo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        type="button"
                        onClick={() => handleRemoveVehiculo(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
        <Textarea
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          placeholder="Ingrese cualquier información adicional relevante para la visita..."
          rows={5}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-black text-white hover:bg-gray-800">
          {isSubmitting ? "Procesando..." : "Enviar Solicitud"}
        </Button>
      </div>
    </form>
  )
}
