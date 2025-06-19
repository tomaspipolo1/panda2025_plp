"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarIcon, FileEdit, Upload } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useState } from "react"

export default function DatosPersonalesEmpleadoCompras() {
  const [date, setDate] = useState<Date | undefined>(new Date(1980, 4, 15))
  const [isEditing, setIsEditing] = useState(false)

  const datosLaborales = {
    gerencia: "Gerencia de Administración",
    departamento: "COMPRAS Y ABASTECIMIENTO",
    cargo: "PROFESIONAL MEDIO",
    superiorJerarquico: "Andrés Moreno (Jefe de Departamento)",
    fechaIngreso: "10/04/2018",
    antiguedad: "5 años, 2 meses",
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-[#002a5b] mb-2">Datos Personales</h1>
      <p className="text-gray-600 mb-6">Información personal y de contacto del usuario</p>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#002a5b]">Información del Usuario</h2>
          {!isEditing && (
            <Button variant="default" className="bg-[#002a5b] hover:bg-[#00397e]" onClick={() => setIsEditing(true)}>
              <FileEdit className="mr-2 h-4 w-4" /> Editar
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="h-48 w-48 rounded-full overflow-hidden mb-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EVU9GehPyuD5GBqZU3luu3IoA9YrlK.png"
                alt="Foto de perfil"
                className="h-full w-full object-cover"
              />
            </div>
            <Button variant="outline" className="w-full mb-2">
              <Upload className="mr-2 h-4 w-4" /> Cambiar foto
            </Button>
            <p className="text-xs text-gray-500 text-center">
              Formatos permitidos: JPG, PNG.
              <br />
              Tamaño máximo: 5MB
            </p>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-[#002a5b] mb-4">Información Personal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <Input
                    value="Carlos"
                    readOnly={!isEditing}
                    className={cn(
                      "bg-white",
                      !isEditing && "border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0",
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                  <Input
                    value="Martínez"
                    readOnly={!isEditing}
                    className={cn(
                      "bg-white",
                      !isEditing && "border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0",
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
                  <Input
                    value="28456789"
                    readOnly={true}
                    disabled={true}
                    className="bg-gray-100 border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  {isEditing && (
                    <div className="text-xs text-gray-500 mt-1 italic">Requiere solicitud para modificar</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CUIL</label>
                  <Input
                    value="20-28456789-3"
                    readOnly={true}
                    disabled={true}
                    className="bg-gray-100 border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  {isEditing && (
                    <div className="text-xs text-gray-500 mt-1 italic">Requiere solicitud para modificar</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Legajo</label>
                  <Input
                    value="LEG-9210"
                    readOnly={!isEditing}
                    className={cn(
                      "bg-white",
                      !isEditing && "border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0",
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento</label>
                  {isEditing ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "dd/MM/yyyy", { locale: es }) : <span>Seleccionar fecha</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          locale={es}
                          footer={
                            <div className="flex justify-between px-4 py-2 border-t">
                              <Button variant="ghost" size="sm" onClick={() => setDate(undefined)}>
                                Borrar
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => setDate(new Date())}>
                                Hoy
                              </Button>
                            </div>
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <Input
                      value="15/05/1980"
                      readOnly
                      className="bg-white border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-[#002a5b] mb-4">Información de Contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono Fijo</label>
                  <Input
                    value="01147896543"
                    readOnly={!isEditing}
                    className={cn(
                      "bg-white",
                      !isEditing && "border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0",
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Celular</label>
                  <Input
                    value="1165897412"
                    readOnly={!isEditing}
                    className={cn(
                      "bg-white",
                      !isEditing && "border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0",
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Principal</label>
                  <Input
                    value="carlos.martinez@plp.gob.ar"
                    readOnly={!isEditing}
                    className={cn(
                      "bg-white",
                      !isEditing && "border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0",
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Alternativo</label>
                  <Input
                    placeholder={isEditing ? "Ingrese un email alternativo (opcional)" : "No especificado"}
                    readOnly={!isEditing}
                    className={cn(
                      "bg-white",
                      !isEditing && "border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0",
                    )}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-[#002a5b] mb-4">Información Laboral</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gerencia</label>
                  <Input
                    value={datosLaborales.gerencia}
                    readOnly={true}
                    disabled={true}
                    className="bg-gray-100 border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  {isEditing && (
                    <div className="text-xs text-gray-500 mt-1 italic">Requiere solicitud para modificar</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                  <Input
                    value={datosLaborales.departamento}
                    readOnly={true}
                    disabled={true}
                    className="bg-gray-100 border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  {isEditing && (
                    <div className="text-xs text-gray-500 mt-1 italic">Requiere solicitud para modificar</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                  <Input
                    value={datosLaborales.cargo}
                    readOnly={true}
                    disabled={true}
                    className="bg-gray-100 border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  {isEditing && (
                    <div className="text-xs text-gray-500 mt-1 italic">Requiere solicitud para modificar</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Superior Jerárquico</label>
                  <Input
                    value={datosLaborales.superiorJerarquico}
                    readOnly={true}
                    disabled={true}
                    className="bg-gray-100 border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  {isEditing && (
                    <div className="text-xs text-gray-500 mt-1 italic">Requiere solicitud para modificar</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Ingreso</label>
                  <Input
                    value={datosLaborales.fechaIngreso}
                    readOnly={true}
                    disabled={true}
                    className="bg-gray-100 border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Antigüedad</label>
                  <Input
                    value={datosLaborales.antiguedad}
                    readOnly={true}
                    className="bg-white border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end mt-8 space-x-4">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
            <Button className="bg-[#002a5b] hover:bg-[#00397e]" onClick={() => setIsEditing(false)}>
              Guardar Cambios
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
