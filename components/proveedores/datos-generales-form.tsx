"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Info, Calendar, Plus, Minus, Save } from "lucide-react"
import { CategoriaComercial } from "./categoria-comercial"
import { GuardarBorradorModal } from "./guardar-borrador-modal"

interface DatosGeneralesFormProps {
  onSave: (data: any) => void
  onNext: () => void
  onSaveDraft: () => void
  initialData?: any
}

interface DocumentoArchivo {
  id: string
  nombre: string
  archivo: File | null
  fechaEmision: string
}

export default function DatosGeneralesForm({ onSave, onNext, onSaveDraft, initialData = {} }: DatosGeneralesFormProps) {
  const [formData, setFormData] = useState({
    naturalezaOrganizacion: "",
    tipoSocietario: "",
    razonSocial: "",
    cuitCuil: "",
    nombreFantasia: "",
    regimenTributario: "",
    ultimaActividad: "",
    categoriasComerciales: [] as {
      categoria: string
      subcategoria: string
    }[],
    // Nuevos campos para documentos
    documentos: {
      constanciaARCA: {
        archivo: null as File | null,
        fechaEmision: "",
        fechaVencimiento: "",
      },
      contratoEstatuto: {
        archivo: null as File | null,
        fechaEmision: "",
      },
      constanciaARBA: {
        archivo: null as File | null,
        fechaEmision: "",
      },
      declaracionPatrimonial: {
        archivo: null as File | null,
        fechaEmision: "",
      },
      convenioMultilateral: false,
      constanciaINAES: {
        archivo: null as File | null,
        fechaEmision: "",
      },
      reglamentoINAES: {
        archivo: null as File | null,
        fechaEmision: "",
      },
    },
    referenciasFinancieras: [] as DocumentoArchivo[],
    balancesAprobados: [] as DocumentoArchivo[],
    ...initialData,
  })

  // Estado para el modal de borrador guardado
  const [showBorradorModal, setShowBorradorModal] = useState(false)

  // Inicializar con una referencia y un balance
  useEffect(() => {
    if (formData.referenciasFinancieras.length === 0) {
      handleMultipleFileAdd("referenciasFinancieras")
    }
    if (formData.balancesAprobados.length === 0) {
      handleMultipleFileAdd("balancesAprobados")
    }
  }, [])

  // Estado para controlar qué calendario está abierto
  const [openCalendar, setOpenCalendar] = useState<string | null>(null)

  // Referencias para los calendarios
  const calendarRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Cerrar el calendario cuando se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        openCalendar &&
        calendarRefs.current[openCalendar] &&
        !calendarRefs.current[openCalendar]?.contains(event.target as Node)
      ) {
        setOpenCalendar(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openCalendar])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // Si cambia la naturaleza de la organización, actualizar automáticamente el tipo societario
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    if (name === "convenioMultilateral") {
      setFormData((prev) => ({
        ...prev,
        documentos: {
          ...prev.documentos,
          convenioMultilateral: checked,
        },
      }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    const file = e.target.files?.[0] || null

    setFormData((prev) => ({
      ...prev,
      documentos: {
        ...prev.documentos,
        [docType]: {
          ...prev.documentos[docType as keyof typeof prev.documentos],
          archivo: file,
        },
      },
    }))
  }

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    docType: string,
    dateType: "fechaEmision" | "fechaVencimiento",
  ) => {
    const { value } = e.target

    setFormData((prev) => ({
      ...prev,
      documentos: {
        ...prev.documentos,
        [docType]: {
          ...prev.documentos[docType as keyof typeof prev.documentos],
          [dateType]: value,
        },
      },
    }))
  }

  const handleDateSelect = (date: Date, docType: string, dateType: "fechaEmision" | "fechaVencimiento") => {
    const formattedDate = date.toISOString().split("T")[0]

    setFormData((prev) => ({
      ...prev,
      documentos: {
        ...prev.documentos,
        [docType]: {
          ...prev.documentos[docType as keyof typeof prev.documentos],
          [dateType]: formattedDate,
        },
      },
    }))

    setOpenCalendar(null)
  }

  const handleMultipleFileAdd = (tipo: "referenciasFinancieras" | "balancesAprobados") => {
    const newDoc: DocumentoArchivo = {
      id: Date.now().toString(),
      nombre: "",
      archivo: null,
      fechaEmision: "",
    }

    setFormData((prev) => ({
      ...prev,
      [tipo]: [...prev[tipo], newDoc],
    }))
  }

  const handleMultipleFileRemove = (tipo: "referenciasFinancieras" | "balancesAprobados", id: string) => {
    setFormData((prev) => ({
      ...prev,
      [tipo]: prev[tipo].filter((doc) => doc.id !== id),
    }))
  }

  const handleMultipleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    tipo: "referenciasFinancieras" | "balancesAprobados",
    id: string,
  ) => {
    const file = e.target.files?.[0] || null

    setFormData((prev) => ({
      ...prev,
      [tipo]: prev[tipo].map((doc) => (doc.id === id ? { ...doc, archivo: file, nombre: file?.name || "" } : doc)),
    }))
  }

  const handleMultipleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    tipo: "referenciasFinancieras" | "balancesAprobados",
    id: string,
  ) => {
    const { value } = e.target

    setFormData((prev) => ({
      ...prev,
      [tipo]: prev[tipo].map((doc) => (doc.id === id ? { ...doc, fechaEmision: value } : doc)),
    }))
  }

  const handleMultipleDateSelect = (date: Date, tipo: "referenciasFinancieras" | "balancesAprobados", id: string) => {
    const formattedDate = date.toISOString().split("T")[0]

    setFormData((prev) => ({
      ...prev,
      [tipo]: prev[tipo].map((doc) => (doc.id === id ? { ...doc, fechaEmision: formattedDate } : doc)),
    }))

    setOpenCalendar(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onNext()
  }

  const handleSaveDraftClick = () => {
    onSave(formData)
    onSaveDraft()
    setShowBorradorModal(true)
  }

  const handleCategoriasChange = (categorias: { categoria: string; subcategoria: string }[]) => {
    setFormData((prev) => ({
      ...prev,
      categoriasComerciales: categorias,
    }))
  }

  // Componente de calendario
  const DatePicker = ({
    id,
    value,
    onChange,
    onSelect,
  }: {
    id: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSelect: (date: Date) => void
  }) => {
    const today = new Date()
    const [viewDate, setViewDate] = useState(value ? new Date(value) : today)
    const [currentMonth, setCurrentMonth] = useState(viewDate.getMonth())
    const [currentYear, setCurrentYear] = useState(viewDate.getFullYear())

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

    const days = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    const handlePrevMonth = () => {
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    }

    const handleNextMonth = () => {
      if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    }

    const handleDayClick = (day: number) => {
      const selectedDate = new Date(currentYear, currentMonth, day)
      onSelect(selectedDate)
    }

    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ]

    return (
      <div className="relative w-full">
        <div className="flex items-center">
          <input
            type="text"
            id={id}
            value={value ? value.split("-").reverse().join("/") : ""}
            onChange={onChange}
            placeholder="DD/MM/AAAA"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
          />
          <button
            type="button"
            className="absolute right-2 text-gray-400 hover:text-gray-600"
            onClick={() => setOpenCalendar(openCalendar === id ? null : id)}
          >
            <Calendar size={18} />
          </button>
        </div>

        {openCalendar === id && (
          <div
            ref={(el) => (calendarRefs.current[id] = el)}
            className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-2 w-64"
          >
            <div className="flex justify-between items-center mb-2">
              <button type="button" onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded-full">
                &lt;
              </button>
              <div className="font-medium">
                {monthNames[currentMonth]} {currentYear}
              </div>
              <button type="button" onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded-full">
                &gt;
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              <div className="font-medium">D</div>
              <div className="font-medium">L</div>
              <div className="font-medium">M</div>
              <div className="font-medium">M</div>
              <div className="font-medium">J</div>
              <div className="font-medium">V</div>
              <div className="font-medium">S</div>

              {days.map((day, index) => (
                <div key={index}>
                  {day ? (
                    <button
                      type="button"
                      onClick={() => handleDayClick(day)}
                      className={`w-8 h-8 rounded-full hover:bg-gray-100 ${
                        value &&
                        new Date(value).getDate() === day &&
                        new Date(value).getMonth() === currentMonth &&
                        new Date(value).getFullYear() === currentYear
                          ? "bg-plp-primary text-white hover:bg-plp-dark"
                          : ""
                      }`}
                    >
                      {day}
                    </button>
                  ) : (
                    <div className="w-8 h-8"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
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
            {formData.naturalezaOrganizacion === "Persona Física / SH" && (
              <option value="Persona Física">Persona Física</option>
            )}
            {formData.naturalezaOrganizacion === "Persona Jurídica" && (
              <>
                <option value="SA">SA</option>
                <option value="SRL">SRL</option>
                <option value="SAS">SAS</option>
              </>
            )}
            {formData.naturalezaOrganizacion === "Cooperativa" && <option value="Cooperativa">Cooperativa</option>}
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
          <label htmlFor="cuitCuil" className="block text-sm font-medium text-gray-700 mb-1">
            CUIT/CUIL <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="cuitCuil"
            name="cuitCuil"
            value={formData.cuitCuil}
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
            <option value="Nuevo Proveedor">Nuevo Proveedor</option>
            <option value="1 a 3 años">1 a 3 años</option>
            <option value="3 a 5 años">3 a 5 años</option>
            <option value="Mayor a 5 años">Mayor a 5 años</option>
          </select>
        </div>
      </div>

      {/* Categoría Comercial y Convenio Multilateral en dos columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-8">
        {/* Categoría Comercial */}
        <div>
          <div className="flex items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Categoría Comercial</span>
            <div
              className="ml-1 text-gray-400 cursor-help"
              title="Seleccione las categorías comerciales que aplican a su empresa"
            >
              <Info size={16} />
            </div>
          </div>
          <CategoriaComercial categorias={formData.categoriasComerciales} onChange={handleCategoriasChange} />
        </div>

        {/* Convenio Multilateral */}
        <div className="flex items-center mt-8">
          <input
            type="checkbox"
            id="convenioMultilateral"
            name="convenioMultilateral"
            checked={formData.documentos.convenioMultilateral}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-plp-primary focus:ring-plp-primary border-gray-300 rounded"
          />
          <label htmlFor="convenioMultilateral" className="ml-2 text-sm font-medium text-gray-700">
            Convenio Multilateral
          </label>
          <div
            className="ml-1 text-gray-400 cursor-help"
            title="Acuerdo para evitar la doble imposición entre jurisdicciones"
          >
            <Info size={16} />
          </div>
        </div>
      </div>

      {/* Sección de documentos */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Documentación</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Constancia Inscripción ARCA */}
          <div>
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Constancia Inscripción ARCA</span>
            </div>
            <div className="flex gap-2 mb-2">
              <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer bg-white hover:bg-gray-50 w-24">
                <span className="text-sm text-gray-600">Browse...</span>
                <input type="file" className="hidden" onChange={(e) => handleFileChange(e, "constanciaARCA")} />
              </label>
              <input
                type="text"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 bg-gray-100 text-gray-500"
                placeholder="Ningún archivo seleccionado"
                readOnly
                value={formData.documentos.constanciaARCA.archivo?.name || ""}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Fecha Emisión</label>
                <DatePicker
                  id="constanciaARCA-emision"
                  value={formData.documentos.constanciaARCA.fechaEmision}
                  onChange={(e) => handleDateChange(e, "constanciaARCA", "fechaEmision")}
                  onSelect={(date) => handleDateSelect(date, "constanciaARCA", "fechaEmision")}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Fecha Venc.</label>
                <DatePicker
                  id="constanciaARCA-vencimiento"
                  value={formData.documentos.constanciaARCA.fechaVencimiento}
                  onChange={(e) => handleDateChange(e, "constanciaARCA", "fechaVencimiento")}
                  onSelect={(date) => handleDateSelect(date, "constanciaARCA", "fechaVencimiento")}
                />
              </div>
            </div>
          </div>

          {/* Contrato/Estatuto Social */}
          <div>
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Contrato/Estatuto Social</span>
              <div
                className="ml-1 text-gray-400 cursor-help"
                title="Documento legal que establece la estructura y reglas de la organización"
              >
                <Info size={16} />
              </div>
            </div>
            <div className="flex gap-2 mb-2">
              <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer bg-white hover:bg-gray-50 w-24">
                <span className="text-sm text-gray-600">Browse...</span>
                <input type="file" className="hidden" onChange={(e) => handleFileChange(e, "contratoEstatuto")} />
              </label>
              <input
                type="text"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 bg-gray-100 text-gray-500"
                placeholder="Ningún archivo seleccionado"
                readOnly
                value={formData.documentos.contratoEstatuto.archivo?.name || ""}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Fecha Emisión</label>
              <DatePicker
                id="contratoEstatuto-emision"
                value={formData.documentos.contratoEstatuto.fechaEmision}
                onChange={(e) => handleDateChange(e, "contratoEstatuto", "fechaEmision")}
                onSelect={(date) => handleDateSelect(date, "contratoEstatuto", "fechaEmision")}
              />
            </div>
          </div>

          {/* Constancia Inscripción ARBA */}
          <div>
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Constancia Inscripción ARBA</span>
            </div>
            <div className="flex gap-2 mb-2">
              <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer bg-white hover:bg-gray-50 w-24">
                <span className="text-sm text-gray-600">Browse...</span>
                <input type="file" className="hidden" onChange={(e) => handleFileChange(e, "constanciaARBA")} />
              </label>
              <input
                type="text"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 bg-gray-100 text-gray-500"
                placeholder="Ningún archivo seleccionado"
                readOnly
                value={formData.documentos.constanciaARBA.archivo?.name || ""}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Fecha Emisión</label>
              <DatePicker
                id="constanciaARBA-emision"
                value={formData.documentos.constanciaARBA.fechaEmision}
                onChange={(e) => handleDateChange(e, "constanciaARBA", "fechaEmision")}
                onSelect={(date) => handleDateSelect(date, "constanciaARBA", "fechaEmision")}
              />
            </div>
          </div>

          {/* Declaración Patrimonial y Cdro. Endeudamiento */}
          <div>
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Declaración Patrimonial y Cdro. Endeudamiento</span>
              <div
                className="ml-1 text-gray-400 cursor-help"
                title="Documento que detalla los activos, pasivos y nivel de endeudamiento"
              >
                <Info size={16} />
              </div>
            </div>
            <div className="flex gap-2 mb-2">
              <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer bg-white hover:bg-gray-50 w-24">
                <span className="text-sm text-gray-600">Browse...</span>
                <input type="file" className="hidden" onChange={(e) => handleFileChange(e, "declaracionPatrimonial")} />
              </label>
              <input
                type="text"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 bg-gray-100 text-gray-500"
                placeholder="Ningún archivo seleccionado"
                readOnly
                value={formData.documentos.declaracionPatrimonial.archivo?.name || ""}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Fecha Emisión</label>
              <DatePicker
                id="declaracionPatrimonial-emision"
                value={formData.documentos.declaracionPatrimonial.fechaEmision}
                onChange={(e) => handleDateChange(e, "declaracionPatrimonial", "fechaEmision")}
                onSelect={(date) => handleDateSelect(date, "declaracionPatrimonial", "fechaEmision")}
              />
            </div>
          </div>

          {/* Constancia Inscripción INAES */}
          <div>
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Constancia Inscripción INAES</span>
            </div>
            <div className="flex gap-2 mb-2">
              <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer bg-white hover:bg-gray-50 w-24">
                <span className="text-sm text-gray-600">Browse...</span>
                <input type="file" className="hidden" onChange={(e) => handleFileChange(e, "constanciaINAES")} />
              </label>
              <input
                type="text"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 bg-gray-100 text-gray-500"
                placeholder="Ningún archivo seleccionado"
                readOnly
                value={formData.documentos.constanciaINAES.archivo?.name || ""}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Fecha Emisión</label>
              <DatePicker
                id="constanciaINAES-emision"
                value={formData.documentos.constanciaINAES.fechaEmision}
                onChange={(e) => handleDateChange(e, "constanciaINAES", "fechaEmision")}
                onSelect={(date) => handleDateSelect(date, "constanciaINAES", "fechaEmision")}
              />
            </div>
          </div>

          {/* Reglamento Interno INAES */}
          <div>
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Reglamento Interno INAES</span>
              <div className="ml-1 text-gray-400 cursor-help" title="Normativa interna aprobada por INAES">
                <Info size={16} />
              </div>
            </div>
            <div className="flex gap-2 mb-2">
              <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer bg-white hover:bg-gray-50 w-24">
                <span className="text-sm text-gray-600">Browse...</span>
                <input type="file" className="hidden" onChange={(e) => handleFileChange(e, "reglamentoINAES")} />
              </label>
              <input
                type="text"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 bg-gray-100 text-gray-500"
                placeholder="Ningún archivo seleccionado"
                readOnly
                value={formData.documentos.reglamentoINAES.archivo?.name || ""}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Fecha Emisión</label>
              <DatePicker
                id="reglamentoINAES-emision"
                value={formData.documentos.reglamentoINAES.fechaEmision}
                onChange={(e) => handleDateChange(e, "reglamentoINAES", "fechaEmision")}
                onSelect={(date) => handleDateSelect(date, "reglamentoINAES", "fechaEmision")}
              />
            </div>
          </div>
        </div>

        {/* Referencias Financieras y Balances Aprobados en dos columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-6">
          {/* Referencias Financieras y/o Comerciales */}
          <div>
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Referencias Financieras y/o Comerciales</span>
              <div
                className="ml-1 text-gray-400 cursor-help"
                title="Documentos que acreditan relaciones comerciales o financieras con otras entidades"
              >
                <Info size={16} />
              </div>
            </div>

            {formData.referenciasFinancieras.map((doc, index) => (
              <div key={doc.id} className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Referencia {index + 1}</span>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleMultipleFileRemove("referenciasFinancieras", doc.id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <Minus size={16} />
                    </button>
                  )}
                </div>
                <div className="flex gap-2 mb-2">
                  <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer bg-white hover:bg-gray-50 w-24">
                    <span className="text-sm text-gray-600">Browse...</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleMultipleFileChange(e, "referenciasFinancieras", doc.id)}
                    />
                  </label>
                  <input
                    type="text"
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 bg-gray-100 text-gray-500"
                    placeholder="Ningún archivo seleccionado"
                    readOnly
                    value={doc.nombre || ""}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Fecha Emisión</label>
                  <DatePicker
                    id={`referencia-${doc.id}-emision`}
                    value={doc.fechaEmision}
                    onChange={(e) => handleMultipleDateChange(e, "referenciasFinancieras", doc.id)}
                    onSelect={(date) => handleMultipleDateSelect(date, "referenciasFinancieras", doc.id)}
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => handleMultipleFileAdd("referenciasFinancieras")}
              className="flex items-center text-plp-primary hover:text-plp-dark"
            >
              <Plus size={16} className="mr-1" />
              <span className="text-sm">Agregar referencia</span>
            </button>
          </div>

          {/* Balances Aprobados */}
          <div>
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Balances Aprobados</span>
              <div
                className="ml-1 text-gray-400 cursor-help"
                title="Estados financieros aprobados por la entidad correspondiente"
              >
                <Info size={16} />
              </div>
            </div>

            {formData.balancesAprobados.map((doc, index) => (
              <div key={doc.id} className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Balance {index + 1}</span>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleMultipleFileRemove("balancesAprobados", doc.id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <Minus size={16} />
                    </button>
                  )}
                </div>
                <div className="flex gap-2 mb-2">
                  <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer bg-white hover:bg-gray-50 w-24">
                    <span className="text-sm text-gray-600">Browse...</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleMultipleFileChange(e, "balancesAprobados", doc.id)}
                    />
                  </label>
                  <input
                    type="text"
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 bg-gray-100 text-gray-500"
                    placeholder="Ningún archivo seleccionado"
                    readOnly
                    value={doc.nombre || ""}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Fecha Emisión</label>
                  <DatePicker
                    id={`balance-${doc.id}-emision`}
                    value={doc.fechaEmision}
                    onChange={(e) => handleMultipleDateChange(e, "balancesAprobados", doc.id)}
                    onSelect={(date) => handleMultipleDateSelect(date, "balancesAprobados", doc.id)}
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => handleMultipleFileAdd("balancesAprobados")}
              className="flex items-center text-plp-primary hover:text-plp-dark"
            >
              <Plus size={16} className="mr-1" />
              <span className="text-sm">Agregar balance</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between space-x-4 pt-6">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          onClick={() => window.history.back()}
        >
          Cancelar
        </button>
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={handleSaveDraftClick}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            Guardar Borrador
          </button>
          <button type="submit" className="px-4 py-2 bg-[#002169] text-white rounded-md hover:bg-blue-900 font-medium">
            Siguiente
          </button>
        </div>
      </div>

      {/* Modal de borrador guardado */}
      <GuardarBorradorModal isOpen={showBorradorModal} onClose={() => setShowBorradorModal(false)} />
    </form>
  )
}
