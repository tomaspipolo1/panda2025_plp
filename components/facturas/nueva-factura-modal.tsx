"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Upload, Plus, ChevronUp, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface NuevaFacturaModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NuevaFacturaModal({ isOpen, onClose }: NuevaFacturaModalProps) {
  const [fechaEmision, setFechaEmision] = useState<Date | undefined>(undefined)
  const [fechaVencimiento, setFechaVencimiento] = useState<Date | undefined>(undefined)
  const [tipoComprobante, setTipoComprobante] = useState<string>("")
  const [letra, setLetra] = useState<string>("")
  const [archivo, setArchivo] = useState<File | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Estados para controlar la visualización de los calendarios
  const [showCalendarEmision, setShowCalendarEmision] = useState(false)
  const [showCalendarVencimiento, setShowCalendarVencimiento] = useState(false)

  // Estado para el mes actual del calendario
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Referencias para cerrar los calendarios al hacer clic fuera
  const calendarEmisionRef = useRef<HTMLDivElement>(null)
  const calendarVencimientoRef = useRef<HTMLDivElement>(null)

  // Días de la semana
  const weekDays = ["LU", "MA", "MI", "JU", "VI", "SA", "DO"]

  // Función para generar los días del mes
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    // Obtener el primer día del mes
    const firstDay = new Date(year, month, 1).getDay()
    // Ajustar para que la semana comience en lunes (0 = lunes, 6 = domingo)
    const firstDayAdjusted = firstDay === 0 ? 6 : firstDay - 1

    // Días del mes anterior para completar la primera semana
    const prevMonthDays = []
    const daysInPrevMonth = new Date(year, month, 0).getDate()
    for (let i = firstDayAdjusted - 1; i >= 0; i--) {
      prevMonthDays.push({
        day: daysInPrevMonth - i,
        month: "prev",
        date: new Date(year, month - 1, daysInPrevMonth - i),
      })
    }

    // Días del mes actual
    const currentMonthDays = []
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push({
        day: i,
        month: "current",
        date: new Date(year, month, i),
      })
    }

    // Días del mes siguiente para completar la última semana
    const nextMonthDays = []
    const totalDaysShown = 42 // 6 semanas * 7 días
    const remainingDays = totalDaysShown - (prevMonthDays.length + currentMonthDays.length)
    for (let i = 1; i <= remainingDays; i++) {
      nextMonthDays.push({
        day: i,
        month: "next",
        date: new Date(year, month + 1, i),
      })
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
  }

  // Función para navegar entre meses
  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth)
    if (direction === "prev") {
      newMonth.setMonth(newMonth.getMonth() - 1)
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1)
    }
    setCurrentMonth(newMonth)
  }

  // Función para seleccionar un día
  const selectDay = (date: Date, calendarType: "emision" | "vencimiento") => {
    if (calendarType === "emision") {
      setFechaEmision(date)
      setShowCalendarEmision(false)
    } else {
      setFechaVencimiento(date)
      setShowCalendarVencimiento(false)
    }
  }

  // Función para formatear el mes y año
  const formatMonthYear = (date: Date) => {
    return format(date, "MMMM yyyy", { locale: es })
  }

  // Efecto para cerrar los calendarios al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showCalendarEmision &&
        calendarEmisionRef.current &&
        !calendarEmisionRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('[data-calendar-trigger="emision"]')
      ) {
        setShowCalendarEmision(false)
      }

      if (
        showCalendarVencimiento &&
        calendarVencimientoRef.current &&
        !calendarVencimientoRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('[data-calendar-trigger="vencimiento"]')
      ) {
        setShowCalendarVencimiento(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showCalendarEmision, showCalendarVencimiento])

  // Función para verificar si un día está seleccionado
  const isDaySelected = (date: Date, selectedDate?: Date) => {
    if (!selectedDate) return false
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)

    // Validación manual
    const cuitValue = (document.getElementById("cuit") as HTMLInputElement)?.value
    const digitosValue = (document.getElementById("digitosVerificadores") as HTMLInputElement)?.value
    const numeroValue = (document.getElementById("numeroFactura") as HTMLInputElement)?.value
    const montoNetoValue = (document.getElementById("montoNeto") as HTMLInputElement)?.value
    const montoTotalValue = (document.getElementById("montoTotal") as HTMLInputElement)?.value

    if (
      !cuitValue ||
      !fechaEmision ||
      !fechaVencimiento ||
      !tipoComprobante ||
      (tipoComprobante === "factura" && !letra) ||
      !digitosValue ||
      !numeroValue ||
      !montoNetoValue ||
      !montoTotalValue ||
      !archivo
    ) {
      console.log("Faltan campos por completar")
      return
    }

    // Aquí iría la lógica para enviar los datos del formulario
    console.log("Formulario enviado")
    onClose()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArchivo(e.target.files[0])
    }
  }

  // Renderizar el calendario
  const renderCalendar = (type: "emision" | "vencimiento") => {
    const days = getDaysInMonth(currentMonth)
    const selectedDate = type === "emision" ? fechaEmision : fechaVencimiento

    // Clase de posicionamiento específica para el calendario de vencimiento
    const positionClass = type === "vencimiento" ? "right-auto left-[-80px]" : ""

    return (
      <div
        ref={type === "emision" ? calendarEmisionRef : calendarVencimientoRef}
        className={`absolute z-10 bg-white border rounded-md shadow-md mt-1 w-[280px] ${positionClass}`}
      >
        <div className="p-2 border-b">
          <div className="flex justify-between items-center">
            <div className="font-medium">{formatMonthYear(currentMonth)}</div>
            <div className="flex space-x-1">
              <button
                type="button"
                onClick={() => navigateMonth("prev")}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => navigateMonth("next")}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-2">
          <div className="grid grid-cols-7 gap-1 mb-1">
            {weekDays.map((day, index) => (
              <div key={index} className="text-center text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <button
                key={index}
                type="button"
                onClick={() => selectDay(day.date, type)}
                className={cn(
                  "h-7 w-7 text-center text-sm rounded-md",
                  day.month === "current" ? "text-gray-900" : "text-gray-400",
                  isDaySelected(day.date, selectedDate) && "bg-blue-600 text-white",
                  !isDaySelected(day.date, selectedDate) && "hover:bg-gray-100",
                )}
              >
                {day.day}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between p-2 border-t">
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline"
            onClick={() => {
              if (type === "emision") {
                setFechaEmision(undefined)
                setShowCalendarEmision(false)
              } else {
                setFechaVencimiento(undefined)
                setShowCalendarVencimiento(false)
              }
            }}
          >
            Borrar
          </button>
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline"
            onClick={() => {
              const today = new Date()
              if (type === "emision") {
                setFechaEmision(today)
                setShowCalendarEmision(false)
              } else {
                setFechaVencimiento(today)
                setShowCalendarVencimiento(false)
              }
            }}
          >
            Hoy
          </button>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-plp-600">Nueva Factura</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4" noValidate>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="cuit">CUIT</Label>
              <Input
                id="cuit"
                placeholder="XX-XXXXXXXX-X"
                className={cn(
                  "w-full",
                  formSubmitted && !(document.getElementById("cuit") as HTMLInputElement)?.value && "border-red-500",
                )}
              />
              {formSubmitted && !(document.getElementById("cuit") as HTMLInputElement)?.value && (
                <p className="text-red-500 text-sm">Este campo es requerido</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Fecha Emisión</Label>
                <div className="relative">
                  <div className="flex" data-calendar-trigger="emision">
                    <Input
                      value={fechaEmision ? format(fechaEmision, "dd/MM/yyyy") : ""}
                      placeholder="dd/mm/aaaa"
                      readOnly
                      className={cn("pl-3 pr-10", formSubmitted && !fechaEmision && "border-red-500")}
                      onClick={() => {
                        setShowCalendarEmision(!showCalendarEmision)
                        setShowCalendarVencimiento(false)
                        setCurrentMonth(fechaEmision || new Date())
                      }}
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      onClick={() => {
                        setShowCalendarEmision(!showCalendarEmision)
                        setShowCalendarVencimiento(false)
                        setCurrentMonth(fechaEmision || new Date())
                      }}
                    >
                      <CalendarIcon className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>

                  {showCalendarEmision && renderCalendar("emision")}
                </div>
                {formSubmitted && !fechaEmision && <p className="text-red-500 text-sm">Este campo es requerido</p>}
              </div>

              <div className="grid gap-2">
                <Label>Fecha Vencimiento</Label>
                <div className="relative">
                  <div className="flex" data-calendar-trigger="vencimiento">
                    <Input
                      value={fechaVencimiento ? format(fechaVencimiento, "dd/MM/yyyy") : ""}
                      placeholder="dd/mm/aaaa"
                      readOnly
                      className={cn("pl-3 pr-10", formSubmitted && !fechaVencimiento && "border-red-500")}
                      onClick={() => {
                        setShowCalendarVencimiento(!showCalendarVencimiento)
                        setShowCalendarEmision(false)
                        setCurrentMonth(fechaVencimiento || new Date())
                      }}
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      onClick={() => {
                        setShowCalendarVencimiento(!showCalendarVencimiento)
                        setShowCalendarEmision(false)
                        setCurrentMonth(fechaVencimiento || new Date())
                      }}
                    >
                      <CalendarIcon className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>

                  {showCalendarVencimiento && renderCalendar("vencimiento")}
                </div>
                {formSubmitted && !fechaVencimiento && <p className="text-red-500 text-sm">Este campo es requerido</p>}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tipoComprobante">Tipo Comprobante</Label>
              <Select onValueChange={setTipoComprobante} value={tipoComprobante}>
                <SelectTrigger className={cn("w-full", formSubmitted && !tipoComprobante && "border-red-500")}>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="factura">Factura</SelectItem>
                  <SelectItem value="ticket">Ticket</SelectItem>
                  <SelectItem value="recibo">Recibo</SelectItem>
                </SelectContent>
              </Select>
              {formSubmitted && !tipoComprobante && <p className="text-red-500 text-sm">Este campo es requerido</p>}
            </div>

            {tipoComprobante === "factura" && (
              <div className="grid gap-2">
                <Label htmlFor="letra">Letra</Label>
                <Select onValueChange={setLetra} value={letra}>
                  <SelectTrigger
                    className={cn(
                      "w-full",
                      formSubmitted && tipoComprobante === "factura" && !letra && "border-red-500",
                    )}
                  >
                    <SelectValue placeholder="Seleccionar letra" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                  </SelectContent>
                </Select>
                {formSubmitted && tipoComprobante === "factura" && !letra && (
                  <p className="text-red-500 text-sm">Este campo es requerido</p>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="digitosVerificadores">Punto de venta</Label>
                <Input
                  id="digitosVerificadores"
                  placeholder="0000"
                  className={cn(
                    "w-full",
                    formSubmitted &&
                      !(document.getElementById("digitosVerificadores") as HTMLInputElement)?.value &&
                      "border-red-500",
                  )}
                  maxLength={4}
                />
                {formSubmitted && !(document.getElementById("digitosVerificadores") as HTMLInputElement)?.value && (
                  <p className="text-red-500 text-sm">Este campo es requerido</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="numeroFactura">Número</Label>
                <Input
                  id="numeroFactura"
                  placeholder="00000000"
                  className={cn(
                    "w-full",
                    formSubmitted &&
                      !(document.getElementById("numeroFactura") as HTMLInputElement)?.value &&
                      "border-red-500",
                  )}
                  maxLength={8}
                />
                {formSubmitted && !(document.getElementById("numeroFactura") as HTMLInputElement)?.value && (
                  <p className="text-red-500 text-sm">Este campo es requerido</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="montoNeto">Monto Neto</Label>
                <Input
                  id="montoNeto"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={cn(
                    "w-full",
                    formSubmitted &&
                      !(document.getElementById("montoNeto") as HTMLInputElement)?.value &&
                      "border-red-500",
                  )}
                />
                {formSubmitted && !(document.getElementById("montoNeto") as HTMLInputElement)?.value && (
                  <p className="text-red-500 text-sm">Este campo es requerido</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="montoTotal">Monto Total</Label>
                <Input
                  id="montoTotal"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={cn(
                    "w-full",
                    formSubmitted &&
                      !(document.getElementById("montoTotal") as HTMLInputElement)?.value &&
                      "border-red-500",
                  )}
                />
                {formSubmitted && !(document.getElementById("montoTotal") as HTMLInputElement)?.value && (
                  <p className="text-red-500 text-sm">Este campo es requerido</p>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="archivo">Cargar archivo (PDF)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="archivo"
                  type="file"
                  accept=".pdf"
                  className={cn("w-full", formSubmitted && !archivo && "border-red-500")}
                  onChange={handleFileChange}
                />
              </div>
              {archivo && (
                <div className="text-sm text-green-600 flex items-center">
                  <Upload className="h-4 w-4 mr-1" />
                  {archivo.name}
                </div>
              )}
              {formSubmitted && !archivo && <p className="text-red-500 text-sm">Este campo es requerido</p>}
            </div>
          </div>
          <DialogFooter className="pt-4 flex justify-between">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#0a2472] hover:bg-[#061a54] text-white font-medium">
              <Plus className="h-4 w-4 mr-2" />
              Cargar Factura
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
