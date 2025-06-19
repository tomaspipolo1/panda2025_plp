"use client"

import { useState } from "react"
import DatosGeneralesClienteForm from "./datos-generales-cliente-form"
import DireccionesForm from "../proveedores/direcciones-form" // Reutilizamos el componente de direcciones
import InformacionComercialClienteForm from "./informacion-comercial-cliente-form"
import { GuardarBorradorModal } from "../proveedores/guardar-borrador-modal"

export default function AltaClienteForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({})
  const [showBorradorModal, setShowBorradorModal] = useState(false)

  const handleNext = () => {
    setStep(step + 1)
  }

  const handlePrevious = () => {
    setStep(step - 1)
  }

  const handleSaveData = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleSubmit = () => {
    console.log("Formulario completo:", formData)
    alert("Cliente creado correctamente")
  }

  const handleSaveDraft = () => {
    // Crear objeto con los datos actuales del formulario
    const borrador = {
      tipo: "cliente",
      estado: "Borrador",
      fechaCreacion: new Date().toISOString(),
      datos: formData,
      paso: step,
    }

    // Guardar en localStorage
    const borradores = JSON.parse(localStorage.getItem("borradores") || "[]")
    borradores.push(borrador)
    localStorage.setItem("borradores", JSON.stringify(borradores))

    // Mostrar modal de confirmación
    setShowBorradorModal(true)
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
        {step === 1 && <DatosGeneralesClienteForm onSave={handleSaveData} onNext={handleNext} />}
        {step === 2 && (
          <DireccionesForm
            onSave={handleSaveData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSaveDraft={handleSaveDraft}
          />
        )}
        {step === 3 && (
          <InformacionComercialClienteForm
            onSave={handleSaveData}
            onSubmit={handleSubmit}
            onPrevious={handlePrevious}
            onSaveDraft={handleSaveDraft}
          />
        )}
      </div>

      {/* Modal de confirmación de guardado de borrador */}
      <GuardarBorradorModal isOpen={showBorradorModal} onClose={() => setShowBorradorModal(false)} />
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
