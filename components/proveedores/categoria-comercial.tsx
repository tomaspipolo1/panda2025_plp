"use client"

import { useState } from "react"
import { PlusCircle, MinusCircle, Info } from "lucide-react"

// Datos de ejemplo para categorías y subcategorías
const CATEGORIAS_COMERCIALES = [
  {
    nombre: "Tecnología y Equipamiento",
    subcategorias: [
      "Hardware para empresas (servidores, PC, etc.)",
      "Software y licencias",
      "Equipos de comunicación",
      "Servicios de TI",
    ],
  },
  {
    nombre: "Industria y Manufactura",
    subcategorias: [
      "Equipos de automatización",
      "Maquinaria industrial",
      "Herramientas y accesorios",
      "Materiales de construcción",
    ],
  },
  {
    nombre: "Servicios Profesionales",
    subcategorias: ["Consultoría", "Servicios legales", "Servicios contables", "Capacitación"],
  },
  {
    nombre: "Logística y Transporte",
    subcategorias: ["Transporte terrestre", "Transporte marítimo", "Almacenamiento", "Servicios aduaneros"],
  },
]

interface CategoriaComercialProps {
  categorias: {
    categoria: string
    subcategoria: string
  }[]
  onChange: (categorias: { categoria: string; subcategoria: string }[]) => void
}

export function CategoriaComercial({ categorias, onChange }: CategoriaComercialProps) {
  const [selectedCategoria, setSelectedCategoria] = useState("")
  const [selectedSubcategoria, setSelectedSubcategoria] = useState("")

  const handleAddCategoria = () => {
    if (selectedCategoria && selectedSubcategoria) {
      const nuevaCategoria = {
        categoria: selectedCategoria,
        subcategoria: selectedSubcategoria,
      }

      // Verificar que no exista ya la misma combinación
      const yaExiste = categorias.some(
        (cat) => cat.categoria === selectedCategoria && cat.subcategoria === selectedSubcategoria,
      )

      if (!yaExiste) {
        onChange([...categorias, nuevaCategoria])
        // Resetear selección de subcategoría pero mantener la categoría
        setSelectedSubcategoria("")
      }
    }
  }

  const handleRemoveCategoria = (index: number) => {
    const nuevasCategorias = [...categorias]
    nuevasCategorias.splice(index, 1)
    onChange(nuevasCategorias)
  }

  // Obtener las subcategorías disponibles para la categoría seleccionada
  const subcategoriasDisponibles =
    CATEGORIAS_COMERCIALES.find((cat) => cat.nombre === selectedCategoria)?.subcategorias || []

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <h3 className="text-md font-medium text-gray-700">Categoría Comercial</h3>
        <div className="ml-1 cursor-pointer group relative">
          <Info size={16} className="text-gray-400" />
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-64 p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10">
            Seleccione las categorías comerciales que mejor describan su actividad. Puede agregar múltiples categorías.
          </div>
        </div>
      </div>

      <div className="flex items-end space-x-2">
        <div className="flex-1">
          <select
            value={selectedCategoria}
            onChange={(e) => {
              setSelectedCategoria(e.target.value)
              setSelectedSubcategoria("")
            }}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
          >
            <option value="">Seleccione una categoría</option>
            {CATEGORIAS_COMERCIALES.map((cat) => (
              <option key={cat.nombre} value={cat.nombre}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={handleAddCategoria}
          disabled={!selectedCategoria || !selectedSubcategoria}
          className="p-2 rounded-full text-plp-primary hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent z-20 relative"
        >
          <PlusCircle size={24} />
        </button>
      </div>

      {selectedCategoria && (
        <div className="ml-4 mt-2">
          <select
            value={selectedSubcategoria}
            onChange={(e) => setSelectedSubcategoria(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
          >
            <option value="">Seleccione una subcategoría</option>
            {subcategoriasDisponibles.map((subcat) => (
              <option key={subcat} value={subcat}>
                {subcat}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Lista de categorías seleccionadas */}
      <div className="mt-4 space-y-3">
        {categorias.map((cat, index) => (
          <div key={index} className="flex flex-col">
            <div className="flex items-center justify-between">
              <span className="font-medium">{cat.categoria}</span>
              <button
                type="button"
                onClick={() => handleRemoveCategoria(index)}
                className="p-1 rounded-full text-red-500 hover:bg-gray-100"
              >
                <MinusCircle size={20} />
              </button>
            </div>
            <div className="ml-4 mt-1 flex items-center">
              <span className="text-sm text-gray-600">{cat.subcategoria}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
