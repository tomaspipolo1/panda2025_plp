"use client"

import type React from "react"
import { useState } from "react"
import { Upload, Info } from "lucide-react"

interface InformacionComercialClienteFormProps {
  onSave: (data: any) => void
  onSubmit: () => void
  onPrevious: () => void
  onSaveDraft?: () => void
}

export default function InformacionComercialClienteForm({
  onSave,
  onSubmit,
  onPrevious,
  onSaveDraft,
}: InformacionComercialClienteFormProps) {
  const [formData, setFormData] = useState({
    nombreContacto: "",
    cargoContacto: "",
    telefonoContacto: "",
    emailContacto: "",
    sitioWeb: "",
    cuentaBancaria: "",
    cbu: "",
    alias: "",
    banco: "",
    cartaPresentacion: null as File | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: e.target.files![0],
      }))
    }
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmitForm} className="space-y-6">
      <h3 className="text-lg font-medium text-gray-700 mb-4">Información de Contacto</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <label htmlFor="nombreContacto" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del Contacto <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nombreContacto"
            name="nombreContacto"
            value={formData.nombreContacto}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            placeholder="Ingrese el nombre del contacto"
            required
          />
        </div>

        <div>
          <label htmlFor="cargoContacto" className="block text-sm font-medium text-gray-700 mb-1">
            Cargo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="cargoContacto"
            name="cargoContacto"
            value={formData.cargoContacto}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            placeholder="Ingrese el cargo"
            required
          />
        </div>

        <div>
          <label htmlFor="telefonoContacto" className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="telefonoContacto"
            name="telefonoContacto"
            value={formData.telefonoContacto}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            placeholder="Ingrese el teléfono"
            required
          />
        </div>

        <div>
          <label htmlFor="emailContacto" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="emailContacto"
            name="emailContacto"
            value={formData.emailContacto}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            placeholder="Ingrese el email"
            required
          />
        </div>

        <div>
          <label htmlFor="sitioWeb" className="block text-sm font-medium text-gray-700 mb-1">
            Sitio Web
          </label>
          <input
            type="url"
            id="sitioWeb"
            name="sitioWeb"
            value={formData.sitioWeb}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            placeholder="Ingrese el sitio web"
          />
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-700 mb-4 mt-8">Documentación</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <div className="flex items-center mb-1">
            <label htmlFor="cartaPresentacion" className="block text-sm font-medium text-gray-700">
              Carta de Presentación
            </label>
            <div className="relative ml-2 group">
              <Info className="h-4 w-4 text-gray-500" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                Documento formal que presenta a la empresa y sus intenciones comerciales
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <label
              htmlFor="cartaPresentacion"
              className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
            >
              <Upload className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">
                {formData.cartaPresentacion ? formData.cartaPresentacion.name : "Seleccionar archivo"}
              </span>
              <input
                type="file"
                id="cartaPresentacion"
                onChange={(e) => handleFileChange(e, "cartaPresentacion")}
                className="hidden"
                accept=".pdf,.doc,.docx"
              />
            </label>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-700 mb-4 mt-8">Información Bancaria</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <label htmlFor="cuentaBancaria" className="block text-sm font-medium text-gray-700 mb-1">
            Número de Cuenta <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="cuentaBancaria"
            name="cuentaBancaria"
            value={formData.cuentaBancaria}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            placeholder="Ingrese el número de cuenta"
            required
          />
        </div>

        <div>
          <label htmlFor="banco" className="block text-sm font-medium text-gray-700 mb-1">
            Banco <span className="text-red-500">*</span>
          </label>
          <select
            id="banco"
            name="banco"
            value={formData.banco}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            required
          >
            <option value="">Seleccione un banco</option>
            <option value="Banco Nación">Banco Nación</option>
            <option value="Banco Provincia">Banco Provincia</option>
            <option value="Banco Ciudad">Banco Ciudad</option>
            <option value="Banco Santander">Banco Santander</option>
            <option value="Banco Galicia">Banco Galicia</option>
            <option value="Banco BBVA">Banco BBVA</option>
            <option value="Banco HSBC">Banco HSBC</option>
            <option value="Banco Macro">Banco Macro</option>
            <option value="Banco Credicoop">Banco Credicoop</option>
          </select>
        </div>

        <div>
          <label htmlFor="cbu" className="block text-sm font-medium text-gray-700 mb-1">
            CBU <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="cbu"
            name="cbu"
            value={formData.cbu}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            placeholder="Ingrese el CBU"
            required
          />
        </div>

        <div>
          <label htmlFor="alias" className="block text-sm font-medium text-gray-700 mb-1">
            Alias
          </label>
          <input
            type="text"
            id="alias"
            name="alias"
            value={formData.alias}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            placeholder="Ingrese el alias"
          />
        </div>
      </div>

      <div className="flex justify-between space-x-4 pt-6">
        <button
          type="button"
          onClick={onPrevious}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Anterior
        </button>
        <div className="flex space-x-4">
          {onSaveDraft && (
            <button
              type="button"
              onClick={onSaveDraft}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Guardar Borrador
            </button>
          )}
          <button type="submit" className="px-4 py-2 bg-[#002169] text-white rounded-md hover:bg-blue-900 font-medium">
            Guardar
          </button>
        </div>
      </div>
    </form>
  )
}
