"use client"

import type React from "react"
import { useState } from "react"
import { Info } from "lucide-react"
import DatePicker, { registerLocale } from "react-datepicker"
import { es } from "date-fns/locale"
import { GuardarBorradorModal } from "../proveedores/guardar-borrador-modal"
import "react-datepicker/dist/react-datepicker.css"

// Registrar el locale español
registerLocale("es", es)

interface DatosGeneralesClienteFormProps {
  onSave: (data: any) => void
  onNext: () => void
}

// Definición de tipos para los documentos
interface Documento {
  id: string
  nombre: string
  requiereFechaEmision: boolean
  requiereFechaVencimiento: boolean
  tieneInfo?: boolean
  infoTooltip?: string
  opcional?: boolean
  multiple?: boolean
}

// Documentos por tipo de cliente
const documentosPorTipoCliente: Record<string, Documento[][]> = {
  "Agencia Marítima": [
    [
      {
        id: "constancia_afip",
        nombre: "Constancia Inscripción AFIP",
        requiereFechaEmision: true,
        requiereFechaVencimiento: false,
      },
      {
        id: "estatuto",
        nombre: "Contrato/Estatuto Social",
        requiereFechaEmision: true,
        requiereFechaVencimiento: false,
        tieneInfo: true,
        infoTooltip: "Documento constitutivo de la empresa debidamente registrado",
      },
    ],
    [
      {
        id: "habilitacion_prefectura",
        nombre: "Habilitación Prefectura Naval",
        requiereFechaEmision: true,
        requiereFechaVencimiento: true,
        tieneInfo: true,
        infoTooltip: "Certificado de habilitación como agencia marítima emitido por Prefectura Naval Argentina",
      },
      {
        id: "poder_representante",
        nombre: "Poder del Representante Legal",
        requiereFechaEmision: true,
        requiereFechaVencimiento: false,
      },
    ],
    [
      {
        id: "seguro_responsabilidad",
        nombre: "Seguro de Responsabilidad Civil",
        requiereFechaEmision: true,
        requiereFechaVencimiento: true,
        tieneInfo: true,
        infoTooltip: "Póliza de seguro vigente que cubra operaciones en zona portuaria",
      },
      {
        id: "constancia_inscripcion_arca",
        nombre: "Constancia Inscripción ARCA",
        requiereFechaEmision: true,
        requiereFechaVencimiento: false,
      },
    ],
  ],
  "Empresa de Servicios Portuarios": [
    [
      {
        id: "constancia_inscripcion_arca",
        nombre: "Constancia Inscripción ARCA",
        requiereFechaEmision: true,
        requiereFechaVencimiento: true,
      },
      {
        id: "constancia_inscripcion_arba",
        nombre: "Constancia Inscripción ARBA",
        requiereFechaEmision: true,
        requiereFechaVencimiento: false,
      },
    ],
    [
      {
        id: "estatuto_social",
        nombre: "Contrato/Estatuto Social y Modificaciones",
        requiereFechaEmision: true,
        requiereFechaVencimiento: false,
        tieneInfo: true,
        infoTooltip: "Documento constitutivo de la empresa y sus modificaciones",
        multiple: true,
      },
      {
        id: "planes_pago",
        nombre: "Planes de Pago Vigente",
        requiereFechaEmision: true,
        requiereFechaVencimiento: true,
      },
    ],
    [
      {
        id: "actas_organo_directivo",
        nombre: "Actas Conformación Órgano Directivo",
        requiereFechaEmision: true,
        requiereFechaVencimiento: false,
      },
      {
        id: "sistema_cuentas_tributarias",
        nombre: "Sistema de Cuentas Tributarias",
        requiereFechaEmision: true,
        requiereFechaVencimiento: true,
      },
    ],
    [
      {
        id: "declaracion_patrimonial",
        nombre: "Declaración Patrimonial y Cdro. Endeudamiento",
        requiereFechaEmision: true,
        requiereFechaVencimiento: false,
        tieneInfo: true,
        infoTooltip: "Declaración jurada de situación patrimonial y cuadro de endeudamiento",
      },
      {
        id: "certificado_anotaciones",
        nombre: "Certificado Anotaciones Personales",
        requiereFechaEmision: true,
        requiereFechaVencimiento: false,
      },
    ],
    [
      {
        id: "designacion_seguridad",
        nombre: "Designación Responsable de Seguridad e Higiene",
        requiereFechaEmision: true,
        requiereFechaVencimiento: false,
      },
      {
        id: "informe_juicios",
        nombre: "Informe Juicios Universales",
        requiereFechaEmision: true,
        requiereFechaVencimiento: false,
      },
    ],
    [
      {
        id: "inscripcion_proveedor_abordo",
        nombre: "Inscripción como Proveedor de Abordo",
        requiereFechaEmision: true,
        requiereFechaVencimiento: false,
      },
      {
        id: "inscripcion_registro_pna",
        nombre: "Inscripción Registro de PNA",
        requiereFechaEmision: true,
        requiereFechaVencimiento: true,
      },
    ],
    [
      {
        id: "balances_aprobados",
        nombre: "Balances Aprobados",
        requiereFechaEmision: true,
        requiereFechaVencimiento: false,
        opcional: true,
        multiple: true,
      },
      {
        id: "referencias_comerciales",
        nombre: "Referencias Comerciales y/o Financieras",
        requiereFechaEmision: true,
        requiereFechaVencimiento: false,
        opcional: true,
        multiple: true,
      },
    ],
    [
      {
        id: "certificado_registro_habilitacion",
        nombre: "Certificado Registro y Habilitación Anual",
        requiereFechaEmision: true,
        requiereFechaVencimiento: true,
      },
      {
        id: "manual_contingencias",
        nombre: "Manual de Contingencias",
        requiereFechaEmision: true,
        requiereFechaVencimiento: false,
      },
    ],
    [
      {
        id: "certificado_secretaria_energia",
        nombre: "Certificado Inscripción a Secretaría de Energía",
        requiereFechaEmision: true,
        requiereFechaVencimiento: true,
      },
      {
        id: "seguro_responsabilidad_civil",
        nombre: "Seguro de Responsabilidad Civil",
        requiereFechaEmision: true,
        requiereFechaVencimiento: true,
      },
    ],
    [
      {
        id: "certificado_senasa",
        nombre: "Certificado Inscripción en SENASA",
        requiereFechaEmision: true,
        requiereFechaVencimiento: true,
      },
      {
        id: "seguro_art",
        nombre: "Seguro de Riesgos de Trabajo (ART)",
        requiereFechaEmision: true,
        requiereFechaVencimiento: true,
      },
    ],
  ],
  Permisionario: [
    [
      {
        id: "constancia_afip",
        nombre: "Constancia Inscripción AFIP",
        requiereFechaEmision: true,
        requiereFechaVencimiento: false,
      },
      {
        id: "permiso_uso",
        nombre: "Permiso de Uso",
        requiereFechaEmision: true,
        requiereFechaVencimiento: true,
        tieneInfo: true,
        infoTooltip: "Documento que acredita el permiso de uso otorgado por la autoridad portuaria",
      },
    ],
    [
      {
        id: "seguro_responsabilidad",
        nombre: "Seguro de Responsabilidad Civil",
        requiereFechaEmision: true,
        requiereFechaVencimiento: true,
      },
      {
        id: "dni_representante",
        nombre: "DNI Representante Legal",
        requiereFechaEmision: false,
        requiereFechaVencimiento: false,
      },
    ],
  ],
  Concesionario: [
    [
      {
        id: "constancia_afip",
        nombre: "Constancia Inscripción AFIP",
        requiereFechaEmision: true,
        requiereFechaVencimiento: false,
      },
      {
        id: "contrato_concesion",
        nombre: "Contrato de Concesión",
        requiereFechaEmision: true,
        requiereFechaVencimiento: true,
        tieneInfo: true,
        infoTooltip: "Contrato que establece los términos de la concesión otorgada",
      },
    ],
    [
      {
        id: "estatuto",
        nombre: "Contrato/Estatuto Social",
        requiereFechaEmision: true,
        requiereFechaVencimiento: false,
      },
      {
        id: "seguro_responsabilidad",
        nombre: "Seguro de Responsabilidad Civil",
        requiereFechaEmision: true,
        requiereFechaVencimiento: true,
      },
    ],
  ],
  Otros: [
    [
      {
        id: "constancia_afip",
        nombre: "Constancia Inscripción AFIP",
        requiereFechaEmision: true,
        requiereFechaVencimiento: false,
      },
      {
        id: "estatuto",
        nombre: "Contrato/Estatuto Social",
        requiereFechaEmision: true,
        requiereFechaVencimiento: false,
        opcional: true,
      },
    ],
    [
      {
        id: "dni_representante",
        nombre: "DNI Representante Legal",
        requiereFechaEmision: false,
        requiereFechaVencimiento: false,
      },
      {
        id: "documentacion_adicional",
        nombre: "Documentación Adicional",
        requiereFechaEmision: true,
        requiereFechaVencimiento: false,
        opcional: true,
        multiple: true,
        tieneInfo: true,
        infoTooltip: "Cualquier documentación adicional relevante para su categoría específica",
      },
    ],
  ],
}

// Documentos adicionales para cooperativas
const documentosCooperativa: Documento[] = [
  {
    id: "constancia_inscripcion_inaes",
    nombre: "Constancia Inscripción INAES",
    requiereFechaEmision: true,
    requiereFechaVencimiento: false,
  },
  {
    id: "reglamento_inaes",
    nombre: "Reglamento INAES",
    requiereFechaEmision: true,
    requiereFechaVencimiento: false,
  },
  {
    id: "nomina_autoridades",
    nombre: "Nómina de Autoridades",
    requiereFechaEmision: true,
    requiereFechaVencimiento: false,
  },
  {
    id: "nomina_asociados",
    nombre: "Nómina de Asociados",
    requiereFechaEmision: true,
    requiereFechaVencimiento: false,
  },
]

export default function DatosGeneralesClienteForm({ onSave, onNext }: DatosGeneralesClienteFormProps) {
  const [formData, setFormData] = useState({
    naturalezaOrganizacion: "",
    tipoSocietario: "",
    razonSocial: "",
    cuit: "",
    nombreFantasia: "",
    regimenTributario: "",
    ultimaActividad: "",
    tipoCliente: "",
  })

  // Estado para los documentos cargados
  const [documentosCargados, setDocumentosCargados] = useState<Record<string, File | null>>({})

  // Estado para las fechas de los documentos
  const [fechasDocumentos, setFechasDocumentos] = useState<Record<string, { emision?: Date; vencimiento?: Date }>>({})

  // Estado para documentos múltiples
  const [documentosMultiples, setDocumentosMultiples] = useState<
    Record<string, { id: string; archivo: File | null; fechaEmision?: Date; fechaVencimiento?: Date }[]>
  >({})

  // Estado para controlar la visibilidad del modal de guardar borrador
  const [showBorradorModal, setShowBorradorModal] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // Si cambia la naturaleza de la organización, actualiza automáticamente el tipo societario
    if (name === "naturalezaOrganizacion") {
      let tipoSocietarioDefault = ""

      if (value === "Persona Física / SH") {
        tipoSocietarioDefault = "Persona Física"
      } else if (value === "Cooperativa") {
        tipoSocietarioDefault = "Cooperativa"
      }

      setFormData((prev) => ({
        ...prev,
        [name]: value,
        tipoSocietario: tipoSocietarioDefault,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, documentoId: string) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentosCargados((prev) => ({
        ...prev,
        [documentoId]: e.target.files![0],
      }))
    }
  }

  const handleFechaChange = (documentoId: string, tipo: "emision" | "vencimiento", fecha: Date | null) => {
    setFechasDocumentos((prev) => ({
      ...prev,
      [documentoId]: {
        ...prev[documentoId],
        [tipo]: fecha || undefined,
      },
    }))
  }

  const agregarDocumentoMultiple = (documentoId: string) => {
    setDocumentosMultiples((prev) => ({
      ...prev,
      [documentoId]: [
        ...(prev[documentoId] || []),
        {
          id: `${documentoId}_${Date.now()}`,
          archivo: null,
        },
      ],
    }))
  }

  const eliminarDocumentoMultiple = (documentoId: string, index: number) => {
    setDocumentosMultiples((prev) => ({
      ...prev,
      [documentoId]: prev[documentoId].filter((_, i) => i !== index),
    }))
  }

  const handleFileChangeMultiple = (e: React.ChangeEvent<HTMLInputElement>, documentoId: string, index: number) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentosMultiples((prev) => {
        const documentos = [...(prev[documentoId] || [])]
        documentos[index] = {
          ...documentos[index],
          archivo: e.target.files![0],
        }
        return {
          ...prev,
          [documentoId]: documentos,
        }
      })
    }
  }

  const handleFechaChangeMultiple = (
    documentoId: string,
    index: number,
    tipo: "fechaEmision" | "fechaVencimiento",
    fecha: Date | null,
  ) => {
    setDocumentosMultiples((prev) => {
      const documentos = [...(prev[documentoId] || [])]
      documentos[index] = {
        ...documentos[index],
        [tipo]: fecha || undefined,
      }
      return {
        ...prev,
        [documentoId]: documentos,
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Ya no verificamos documentos requeridos
    // Solo guardamos los datos del formulario y avanzamos al siguiente paso

    // Combinar datos del formulario con documentos cargados y fechas (si existen)
    const datosCompletos = {
      ...formData,
      documentos: documentosCargados,
      fechasDocumentos,
      documentosMultiples,
    }

    onSave(datosCompletos)
    onNext()
  }

  // Función para guardar el borrador
  const handleSaveDraft = () => {
    // Crear objeto con los datos actuales del formulario
    const borrador = {
      tipo: "cliente",
      estado: "Borrador",
      fechaCreacion: new Date().toISOString(),
      datos: {
        ...formData,
        fechasDocumentos,
      },
    }

    // Guardar en localStorage
    const borradores = JSON.parse(localStorage.getItem("borradores") || "[]")
    borradores.push(borrador)
    localStorage.setItem("borradores", JSON.stringify(borradores))

    // Mostrar modal de confirmación
    setShowBorradorModal(true)
  }

  // Obtener los documentos según el tipo de cliente seleccionado
  const documentosRequeridos = formData.tipoCliente ? documentosPorTipoCliente[formData.tipoCliente] || [] : []

  // Estilos personalizados para el DatePicker
  const datePickerStyles = `
    .react-datepicker {
      font-family: Arial, sans-serif;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .react-datepicker__header {
      background-color: #f8f9fa;
      border-bottom: 1px solid #e2e8f0;
      padding-top: 8px;
    }
    .react-datepicker__day--selected {
      background-color: #3b82f6;
      border-radius: 50%;
    }
    .react-datepicker__day:hover {
      background-color: #e2e8f0;
      border-radius: 50%;
    }
    .react-datepicker__day-name {
      color: #4a5568;
      margin: 0.166rem;
    }
    .react-datepicker__current-month {
      font-weight: bold;
      margin-bottom: 8px;
    }
    .react-datepicker__navigation {
      top: 10px;
    }
    .react-datepicker__day--keyboard-selected {
      background-color: #3b82f6;
      border-radius: 50%;
    }
    .react-datepicker__today-button {
      background-color: #f8f9fa;
      border-top: 1px solid #e2e8f0;
      padding: 5px 0;
      text-align: center;
      font-weight: bold;
    }
  `

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <style>{datePickerStyles}</style>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <label htmlFor="tipoCliente" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Cliente <span className="text-red-500">*</span>
          </label>
          <select
            id="tipoCliente"
            name="tipoCliente"
            value={formData.tipoCliente}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="Agencia Marítima">Agencia Marítima</option>
            <option value="Empresa de Servicios Portuarios">Empresa de Servicios Portuarios</option>
            <option value="Permisionario">Permisionario</option>
            <option value="Concesionario">Concesionario</option>
            <option value="Otros">Otros</option>
          </select>
        </div>

        <div>
          <label htmlFor="naturalezaOrganizacion" className="block text-sm font-medium text-gray-700 mb-1">
            Naturaleza de la Organización <span className="text-red-500">*</span>
          </label>
          <select
            id="naturalezaOrganizacion"
            name="naturalezaOrganizacion"
            value={formData.naturalezaOrganizacion}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="Persona Física / SH">Persona Física / SH</option>
            <option value="Persona Jurídica">Persona Jurídica</option>
            <option value="Cooperativa">Cooperativa</option>
          </select>
        </div>

        <div>
          <label htmlFor="tipoSocietario" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo Societario <span className="text-red-500">*</span>
          </label>
          <select
            id="tipoSocietario"
            name="tipoSocietario"
            value={formData.tipoSocietario}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            required
          >
            <option value="">Seleccione una opción</option>
            {formData.naturalezaOrganizacion === "Persona Física / SH" ? (
              <option value="Persona Física">Persona Física</option>
            ) : formData.naturalezaOrganizacion === "Persona Jurídica" ? (
              <>
                <option value="SA">SA</option>
                <option value="SRL">SRL</option>
                <option value="SAS">SAS</option>
                <option value="Sociedad de Hecho">Sociedad de Hecho</option>
                <option value="Sociedad Colectiva">Sociedad Colectiva</option>
                <option value="Sociedad en Comandita">Sociedad en Comandita</option>
              </>
            ) : formData.naturalezaOrganizacion === "Cooperativa" ? (
              <option value="Cooperativa">Cooperativa</option>
            ) : (
              <>
                <option value="SA">SA</option>
                <option value="SRL">SRL</option>
                <option value="SAS">SAS</option>
                <option value="Sociedad de Hecho">Sociedad de Hecho</option>
                <option value="Sociedad Colectiva">Sociedad Colectiva</option>
                <option value="Sociedad en Comandita">Sociedad en Comandita</option>
                <option value="Persona Física">Persona Física</option>
                <option value="Cooperativa">Cooperativa</option>
              </>
            )}
          </select>
        </div>

        <div>
          <label htmlFor="razonSocial" className="block text-sm font-medium text-gray-700 mb-1">
            Razón Social <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="razonSocial"
            name="razonSocial"
            value={formData.razonSocial}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            placeholder="Ingrese la razón social"
            required
          />
        </div>

        <div>
          <label htmlFor="cuit" className="block text-sm font-medium text-gray-700 mb-1">
            CUIT <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="cuit"
            name="cuit"
            value={formData.cuit}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            placeholder="XX-XXXXXXXX-X"
            required
          />
        </div>

        <div>
          <label htmlFor="nombreFantasia" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre Fantasía
          </label>
          <input
            type="text"
            id="nombreFantasia"
            name="nombreFantasia"
            value={formData.nombreFantasia}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            placeholder="Ingrese el nombre fantasía"
          />
        </div>

        <div>
          <label htmlFor="regimenTributario" className="block text-sm font-medium text-gray-700 mb-1">
            Régimen Tributario <span className="text-red-500">*</span>
          </label>
          <select
            id="regimenTributario"
            name="regimenTributario"
            value={formData.regimenTributario}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="Monotributo">Monotributo</option>
            <option value="Responsable Inscripto">Responsable Inscripto</option>
            <option value="Exento">Exento</option>
            <option value="No Categorizado">No Categorizado</option>
          </select>
        </div>

        <div>
          <label htmlFor="ultimaActividad" className="block text-sm font-medium text-gray-700 mb-1">
            Última actividad realizada en Puerto <span className="text-red-500">*</span>
          </label>
          <select
            id="ultimaActividad"
            name="ultimaActividad"
            value={formData.ultimaActividad}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="Nuevo Cliente">Nuevo Cliente</option>
            <option value="1 a 3 años">1 a 3 años</option>
            <option value="3 a 5 años">3 a 5 años</option>
            <option value="Mayor a 5 años">Mayor a 5 años</option>
          </select>
        </div>
      </div>

      {/* Sección de documentación - aparece solo cuando se selecciona un tipo de cliente */}
      {formData.tipoCliente && documentosRequeridos.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-plp-darkest mb-4">
            Documentación requerida para {formData.tipoCliente}
          </h3>

          {documentosRequeridos.map((filaDocs, filaIndex) => (
            <div key={filaIndex} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {filaDocs.map((documento) => (
                <div key={documento.id} className="space-y-2">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700">{documento.nombre}</span>
                    {documento.opcional && <span className="ml-2 text-sm text-gray-500">(Opcional)</span>}
                    {documento.tieneInfo && (
                      <div className="relative ml-1 group">
                        <Info className="h-4 w-4 text-gray-400" />
                        <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-white border border-gray-200 rounded p-2 shadow-lg z-10 w-64">
                          <p className="text-xs text-gray-600">{documento.infoTooltip}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {documento.multiple ? (
                    <div className="space-y-4">
                      {/* Documentos múltiples */}
                      {(documentosMultiples[documento.id] || []).map((doc, index) => (
                        <div key={doc.id} className="border border-gray-200 rounded-md p-3 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Documento {index + 1}</span>
                            <button
                              type="button"
                              onClick={() => eliminarDocumentoMultiple(documento.id, index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => document.getElementById(`file-${doc.id}`)?.click()}
                              className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-l-md text-gray-700 hover:bg-gray-200"
                            >
                              Browse...
                            </button>
                            <div className="flex-1 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 px-3 py-2 text-gray-500 overflow-hidden whitespace-nowrap text-ellipsis">
                              {doc.archivo?.name || "Ningún archivo seleccionado"}
                            </div>
                            <input
                              id={`file-${doc.id}`}
                              type="file"
                              className="hidden"
                              onChange={(e) => handleFileChangeMultiple(e, documento.id, index)}
                              accept=".pdf,.jpg,.jpeg,.png,.xlsx,.doc,.docx"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            {documento.requiereFechaEmision && (
                              <div>
                                <label htmlFor={`emision-${doc.id}`} className="block text-xs text-gray-500 mb-1">
                                  Fecha Emisión
                                </label>
                                <DatePicker
                                  id={`emision-${doc.id}`}
                                  selected={doc.fechaEmision}
                                  onChange={(date) =>
                                    handleFechaChangeMultiple(documento.id, index, "fechaEmision", date)
                                  }
                                  dateFormat="dd/MM/yyyy"
                                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
                                  placeholderText="dd/mm/aaaa"
                                  locale="es"
                                  showMonthDropdown
                                  showYearDropdown
                                  dropdownMode="select"
                                  todayButton="Hoy"
                                  isClearable
                                />
                              </div>
                            )}

                            {documento.requiereFechaVencimiento && (
                              <div>
                                <label htmlFor={`vencimiento-${doc.id}`} className="block text-xs text-gray-500 mb-1">
                                  Fecha Venc.
                                </label>
                                <DatePicker
                                  id={`vencimiento-${doc.id}`}
                                  selected={doc.fechaVencimiento}
                                  onChange={(date) =>
                                    handleFechaChangeMultiple(documento.id, index, "fechaVencimiento", date)
                                  }
                                  dateFormat="dd/MM/yyyy"
                                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
                                  placeholderText="dd/mm/aaaa"
                                  locale="es"
                                  showMonthDropdown
                                  showYearDropdown
                                  dropdownMode="select"
                                  todayButton="Hoy"
                                  isClearable
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => agregarDocumentoMultiple(documento.id)}
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Agregar {documento.nombre}
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Documentos simples */}
                      <div className="flex">
                        <button
                          type="button"
                          onClick={() => document.getElementById(`file-${documento.id}`)?.click()}
                          className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-l-md text-gray-700 hover:bg-gray-200"
                        >
                          Browse...
                        </button>
                        <div className="flex-1 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 px-3 py-2 text-gray-500 overflow-hidden whitespace-nowrap text-ellipsis">
                          {documentosCargados[documento.id]?.name || "Ningún archivo seleccionado"}
                        </div>
                        <input
                          id={`file-${documento.id}`}
                          type="file"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, documento.id)}
                          accept=".pdf,.jpg,.jpeg,.png,.xlsx,.doc,.docx"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {documento.requiereFechaEmision && (
                          <div>
                            <label htmlFor={`emision-${documento.id}`} className="block text-xs text-gray-500 mb-1">
                              Fecha Emisión
                            </label>
                            <DatePicker
                              id={`emision-${documento.id}`}
                              selected={fechasDocumentos[documento.id]?.emision}
                              onChange={(date) => handleFechaChange(documento.id, "emision", date)}
                              dateFormat="dd/MM/yyyy"
                              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
                              placeholderText="dd/mm/aaaa"
                              locale="es"
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              todayButton="Hoy"
                              isClearable
                            />
                          </div>
                        )}

                        {documento.requiereFechaVencimiento && (
                          <div>
                            <label htmlFor={`vencimiento-${documento.id}`} className="block text-xs text-gray-500 mb-1">
                              Fecha Venc.
                            </label>
                            <DatePicker
                              id={`vencimiento-${documento.id}`}
                              selected={fechasDocumentos[documento.id]?.vencimiento}
                              onChange={(date) => handleFechaChange(documento.id, "vencimiento", date)}
                              dateFormat="dd/MM/yyyy"
                              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
                              placeholderText="dd/mm/aaaa"
                              locale="es"
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              todayButton="Hoy"
                              isClearable
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* Documentos adicionales para cooperativas */}
          {formData.naturalezaOrganizacion === "Cooperativa" &&
            formData.tipoCliente === "Empresa de Servicios Portuarios" && (
              <>
                <h3 className="text-lg font-medium text-plp-darkest mb-4 mt-8">
                  Documentación adicional para Cooperativas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {documentosCooperativa.map((documento) => (
                    <div key={documento.id} className="space-y-2">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700">{documento.nombre}</span>
                        {documento.tieneInfo && (
                          <div className="relative ml-1 group">
                            <Info className="h-4 w-4 text-gray-400" />
                            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-white border border-gray-200 rounded p-2 shadow-lg z-10 w-64">
                              <p className="text-xs text-gray-600">{documento.infoTooltip}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex">
                        <button
                          type="button"
                          onClick={() => document.getElementById(`file-${documento.id}`)?.click()}
                          className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-l-md text-gray-700 hover:bg-gray-200"
                        >
                          Browse...
                        </button>
                        <div className="flex-1 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 px-3 py-2 text-gray-500 overflow-hidden whitespace-nowrap text-ellipsis">
                          {documentosCargados[documento.id]?.name || "Ningún archivo seleccionado"}
                        </div>
                        <input
                          id={`file-${documento.id}`}
                          type="file"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, documento.id)}
                          accept=".pdf,.jpg,.jpeg,.png,.xlsx,.doc,.docx"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {documento.requiereFechaEmision && (
                          <div>
                            <label htmlFor={`emision-${documento.id}`} className="block text-xs text-gray-500 mb-1">
                              Fecha Emisión
                            </label>
                            <DatePicker
                              id={`emision-${documento.id}`}
                              selected={fechasDocumentos[documento.id]?.emision}
                              onChange={(date) => handleFechaChange(documento.id, "emision", date)}
                              dateFormat="dd/MM/yyyy"
                              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
                              placeholderText="dd/mm/aaaa"
                              locale="es"
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              todayButton="Hoy"
                              isClearable
                            />
                          </div>
                        )}

                        {documento.requiereFechaVencimiento && (
                          <div>
                            <label htmlFor={`vencimiento-${documento.id}`} className="block text-xs text-gray-500 mb-1">
                              Fecha Venc.
                            </label>
                            <DatePicker
                              id={`vencimiento-${documento.id}`}
                              selected={fechasDocumentos[documento.id]?.vencimiento}
                              onChange={(date) => handleFechaChange(documento.id, "vencimiento", date)}
                              dateFormat="dd/MM/yyyy"
                              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
                              placeholderText="dd/mm/aaaa"
                              locale="es"
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              todayButton="Hoy"
                              isClearable
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
        </div>
      )}

      <div className="flex justify-between space-x-4 pt-6">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          onClick={() => window.history.back()}
        >
          Cancelar
        </button>
        <div className="flex space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center"
            onClick={handleSaveDraft}
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
          <button type="submit" className="px-4 py-2 bg-[#002169] text-white rounded-md hover:bg-blue-900 font-medium">
            Siguiente
          </button>
        </div>
      </div>

      {/* Modal de confirmación de guardado de borrador */}
      <GuardarBorradorModal isOpen={showBorradorModal} onClose={() => setShowBorradorModal(false)} />
    </form>
  )
}
