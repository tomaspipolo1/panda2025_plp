"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DatosGeneralesForm from "./datos-generales-form"
import DireccionesForm from "./direcciones-form"
import InformacionComercialForm from "./informacion-comercial-form"

export default function AltaProveedorForm({ draftId }: { draftId?: string }) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)

  // Cargar datos del borrador si existe
  useEffect(() => {
    if (draftId) {
      const savedDrafts = JSON.parse(localStorage.getItem("proveedorDrafts") || "{}")
      const draftData = savedDrafts[draftId]

      if (draftData) {
        setFormData(draftData.data || {})
        // Si hay datos guardados para un paso específico, ir a ese paso
        if (draftData.lastStep) {
          setStep(draftData.lastStep)
        }
      }
    }
    setIsLoading(false)
  }, [draftId])

  const handleNext = () => {
    setStep(step + 1)
  }

  const handlePrevious = () => {
    setStep(step - 1)
  }

  const handleSaveData = (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }))
  }

  const handleSubmit = () => {
    console.log("Formulario completo:", formData)

    // Si hay un borrador, eliminarlo al finalizar
    if (draftId) {
      const savedDrafts = JSON.parse(localStorage.getItem("proveedorDrafts") || "{}")
      delete savedDrafts[draftId]
      localStorage.setItem("proveedorDrafts", JSON.stringify(savedDrafts))
    }

    alert("Proveedor creado correctamente")
    router.push("/usuario-basico/gestion/mis-entidades")
  }

  const handleSaveDraft = () => {
    // Generar un ID único para el borrador si no existe
    const draftKey = draftId || `draft_${Date.now()}`

    // Obtener borradores existentes
    const savedDrafts = JSON.parse(localStorage.getItem("proveedorDrafts") || "{}")

    // Guardar el borrador actual
    savedDrafts[draftKey] = {
      id: draftKey,
      data: formData,
      lastStep: step,
      timestamp: Date.now(),
      nombre: formData.razonSocial || "Proveedor sin nombre",
      cuit: formData.cuitCuil || "Sin CUIT",
      tipo: "Proveedor",
      estado: "Borrador",
    }

    localStorage.setItem("proveedorDrafts", JSON.stringify(savedDrafts))
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Cargando datos...</div>
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div className="w-full flex space-x-2">
            <StepButton step={1} currentStep={step} label="Datos Generales" onClick={() => step > 1 && setStep(1)} />
            <StepButton step={2} currentStep={step} label="Direcciones" onClick={() => step > 2 && setStep(2)} />
            <StepButton
              step={3}
              currentStep={step}
              label="Información Comercial"
              onClick={() => step > 3 && setStep(3)}
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        {step === 1 && (
          <DatosGeneralesForm
            onSave={handleSaveData}
            onNext={handleNext}
            onSaveDraft={handleSaveDraft}
            initialData={formData}
          />
        )}
        {step === 2 && (
          <DireccionesForm
            onSave={handleSaveData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSaveDraft={handleSaveDraft}
            initialData={formData}
          />
        )}
        {step === 3 && (
          <InformacionComercialForm
            onSave={handleSaveData}
            onSubmit={handleSubmit}
            onPrevious={handlePrevious}
            onSaveDraft={handleSaveDraft}
            initialData={formData}
          />
        )}
      </div>
    </div>
  )
}

interface StepButtonProps {
  step: number
  currentStep: number
  label: string
  onClick: () => void
}

function StepButton({ step, currentStep, label, onClick }: StepButtonProps) {
  const isActive = step === currentStep
  const isCompleted = step < currentStep

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={step > currentStep}
      className={`
        flex-1 py-3 px-4 text-center rounded-md border transition-all
        ${
          isActive
            ? "border-[#002169] bg-white text-[#002169] font-medium shadow-sm"
            : isCompleted
              ? "border-gray-200 bg-gray-50 text-gray-500 cursor-pointer hover:bg-gray-100"
              : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
        }
      `}
    >
      {label}
    </button>
  )
}
