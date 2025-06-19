"use client"

import { useState } from "react"
import { Calendar, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function DatosPersonalesPage() {
  const [modoEdicion, setModoEdicion] = useState(false)

  // Datos de ejemplo del usuario
  const datosUsuario = {
    nombre: "María",
    apellido: "González",
    dni: "28456789",
    cuil: "20-28456789-3",
    fechaNacimiento: "15/05/1980",
    telefonoFijo: "01147896543",
    celular: "1165897412",
    emailPrincipal: "maria.gonzalez@empresa.com",
    emailAlternativo: "",
    legajo: "LEG-9210",
  }

  // Datos laborales
  const datosLaborales = {
    gerencia: "Gerencia de Administración",
    departamento: "MESA DE ENTRADAS Y ARCHIVO",
    cargo: "COORDINADOR",
    superiorJerarquico: "Mónica Silva (Jefe de Departamento)",
    fechaIngreso: "20/07/2016",
    antiguedad: "6 años, 11 meses",
  }

  const handleToggleEdicion = () => {
    setModoEdicion(!modoEdicion)
  }

  const handleCancelar = () => {
    setModoEdicion(false)
  }

  const handleGuardarCambios = () => {
    // Aquí iría la lógica para guardar cambios
    setModoEdicion(false)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-plp-dark">Datos Personales</h1>
      <p className="text-gray-600">Información personal y de contacto del usuario</p>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-plp-darkest">Información del Usuario</h2>
          {!modoEdicion && (
            <Button
              onClick={handleToggleEdicion}
              className="bg-[#002060] hover:bg-[#001845] text-white flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-file-text"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" x2="8" y1="13" y2="13" />
                <line x1="16" x2="8" y1="17" y2="17" />
                <line x1="10" x2="8" y1="9" y2="9" />
              </svg>
              Editar
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Columna de foto de perfil */}
          <div className="flex flex-col items-center space-y-3">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-gray-200">
              <Image src="/confident-leader.png" alt="Foto de perfil" fill className="object-cover" />
              {modoEdicion && (
                <button className="absolute top-1 right-1 bg-red-500 rounded-full p-1 text-white">
                  <X size={16} />
                </button>
              )}
            </div>

            {modoEdicion && (
              <>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Upload size={16} />
                  Cambiar foto
                </Button>
                <p className="text-xs text-gray-500">
                  Formatos permitidos: JPG, PNG.
                  <br />
                  Tamaño máximo: 5MB
                </p>
              </>
            )}
          </div>

          {/* Columna de información personal */}
          <div className="md:col-span-3 space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-plp-dark mb-4">Información Personal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  {modoEdicion ? (
                    <Input defaultValue={datosUsuario.nombre} />
                  ) : (
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded">{datosUsuario.nombre}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                  {modoEdicion ? (
                    <Input defaultValue={datosUsuario.apellido} />
                  ) : (
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded">{datosUsuario.apellido}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
                  {modoEdicion ? (
                    <div className="relative">
                      <Input defaultValue={datosUsuario.dni} disabled className="bg-gray-100" />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <span className="text-xs text-gray-500 italic">Requiere solicitud</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded">{datosUsuario.dni}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CUIL</label>
                  {modoEdicion ? (
                    <div className="relative">
                      <Input defaultValue={datosUsuario.cuil} disabled className="bg-gray-100" />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <span className="text-xs text-gray-500 italic">Requiere solicitud</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded">{datosUsuario.cuil}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Legajo</label>
                  {modoEdicion ? (
                    <Input defaultValue={datosUsuario.legajo} />
                  ) : (
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded">{datosUsuario.legajo}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento</label>
                  {modoEdicion ? (
                    <div className="relative">
                      <Input defaultValue={datosUsuario.fechaNacimiento} />
                      <Calendar
                        size={18}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  ) : (
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded">{datosUsuario.fechaNacimiento}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-plp-dark mb-4">Información de Contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono Fijo</label>
                  {modoEdicion ? (
                    <Input defaultValue={datosUsuario.telefonoFijo} />
                  ) : (
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded">{datosUsuario.telefonoFijo}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Celular</label>
                  {modoEdicion ? (
                    <Input defaultValue={datosUsuario.celular} />
                  ) : (
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded">{datosUsuario.celular}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Principal</label>
                  {modoEdicion ? (
                    <Input defaultValue={datosUsuario.emailPrincipal} />
                  ) : (
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded">{datosUsuario.emailPrincipal}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Alternativo</label>
                  {modoEdicion ? (
                    <Input
                      defaultValue={datosUsuario.emailAlternativo}
                      placeholder="Ingrese un email alternativo (opcional)"
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded">
                      {datosUsuario.emailAlternativo || "No especificado"}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-plp-dark mb-4">Información Laboral</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gerencia</label>
                  {modoEdicion ? (
                    <div className="relative">
                      <Input defaultValue={datosLaborales.gerencia} disabled className="bg-gray-100" />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <span className="text-xs text-gray-500 italic">Requiere solicitud</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded">{datosLaborales.gerencia}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                  {modoEdicion ? (
                    <div className="relative">
                      <Input defaultValue={datosLaborales.departamento} disabled className="bg-gray-100" />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <span className="text-xs text-gray-500 italic">Requiere solicitud</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded">{datosLaborales.departamento}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                  {modoEdicion ? (
                    <div className="relative">
                      <Input defaultValue={datosLaborales.cargo} disabled className="bg-gray-100" />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <span className="text-xs text-gray-500 italic">Requiere solicitud</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded">{datosLaborales.cargo}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Superior Jerárquico</label>
                  {modoEdicion ? (
                    <div className="relative">
                      <Input defaultValue={datosLaborales.superiorJerarquico} disabled className="bg-gray-100" />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <span className="text-xs text-gray-500 italic">Requiere solicitud</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded">
                      {datosLaborales.superiorJerarquico}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Ingreso</label>
                  {modoEdicion ? (
                    <div className="relative">
                      <Input defaultValue={datosLaborales.fechaIngreso} disabled className="bg-gray-100" />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <span className="text-xs text-gray-500 italic">Requiere solicitud</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded">{datosLaborales.fechaIngreso}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Antigüedad</label>
                  <div className="p-2 bg-gray-50 border border-gray-200 rounded">{datosLaborales.antiguedad}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {modoEdicion && (
          <div className="flex justify-end gap-4 mt-8">
            <Button type="button" variant="outline" onClick={handleCancelar} className="flex items-center gap-2">
              <X size={16} />
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleGuardarCambios}
              className="bg-[#002060] hover:bg-[#001845] text-white flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-save"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              Guardar Cambios
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
