"use client"

import { useState } from "react"
import { DatosGenerales } from "@/components/entidad/datos-generales"
import { Direcciones } from "@/components/entidad/direcciones"
import { Documentos } from "@/components/entidad/documentos"
import { EditarDatosModal } from "@/components/entidad/editar-datos-modal"
import { AgregarDireccionModal } from "@/components/entidad/agregar-direccion-modal"
import { SubirDocumentoModal } from "@/components/entidad/subir-documento-modal"
import { VerDocumentoModal } from "@/components/entidad/ver-documento-modal"
import { useToast } from "@/components/ui/use-toast"

// Datos de ejemplo completos
const datosEjemplo = {
  razonSocial: "Suministros Industriales S.A.",
  rut: "20.345.678-9",
  tipoProveedor: "Industrial",
  estado: "Activo" as const,
  contacto: {
    nombre: "Juan Pérez",
    cargo: "Gerente Comercial",
    email: "juan.perez@suministros.com",
    telefono: "+56 2 2345 6789",
  },
  banco: {
    nombre: "Banco Nacional",
    tipoCuenta: "Corriente",
    numeroCuenta: "0012345678",
    titular: "Suministros Industriales S.A.",
  },
  fiscal: {
    regimenFiscal: "General",
    condicionIVA: "Responsable Inscripto",
  },
}

const direccionesEjemplo = [
  {
    tipo: "Principal",
    nombre: "Oficina Central",
    calle: "Av. Libertador 1234, Piso 5, Oficina 501",
    ciudad: "Ciudad Autónoma de Buenos Aires",
    codigoPostal: "C1123AAB",
    pais: "Argentina",
  },
  {
    tipo: "Secundaria",
    nombre: "Centro de Distribución",
    calle: "Ruta Provincial 6, Km 5.5",
    adicional: "Parque Industrial Norte",
    ciudad: "Córdoba",
    codigoPostal: "X5000",
    pais: "Argentina",
  },
  {
    tipo: "Sucursal",
    nombre: "Sucursal Rosario",
    calle: "Av. Corrientes 2345",
    ciudad: "Rosario",
    codigoPostal: "S2000",
    pais: "Argentina",
  },
]

const documentosEjemplo = [
  {
    nombre: "Constancia de CUIT",
    tipo: "PDF",
    tamano: "245 KB",
    fechaActualizacion: "15/03/2023",
    fechaVencimiento: "15/03/2024",
  },
  {
    nombre: "Certificado Bancario",
    tipo: "PDF",
    tamano: "198 KB",
    fechaActualizacion: "10/02/2023",
    fechaVencimiento: "10/02/2024",
  },
  {
    nombre: "Estatuto Social",
    tipo: "PDF",
    tamano: "1.2 MB",
    fechaActualizacion: "05/01/2023",
    // No tiene fecha de vencimiento
  },
  {
    nombre: "Poder del Representante Legal",
    tipo: "PDF",
    tamano: "876 KB",
    fechaActualizacion: "20/12/2022",
    fechaVencimiento: "20/12/2023",
  },
]

export default function EntidadPage() {
  const { toast } = useToast()
  const [datos, setDatos] = useState(datosEjemplo)
  const [direcciones, setDirecciones] = useState(direccionesEjemplo)
  const [documentos, setDocumentos] = useState(documentosEjemplo)

  // Estados para los modales
  const [editarDatosModalOpen, setEditarDatosModalOpen] = useState(false)
  const [agregarDireccionModalOpen, setAgregarDireccionModalOpen] = useState(false)
  const [editarDireccionModalOpen, setEditarDireccionModalOpen] = useState(false)
  const [direccionSeleccionada, setDireccionSeleccionada] = useState<any>(null)
  const [subirDocumentoModalOpen, setSubirDocumentoModalOpen] = useState(false)
  const [editarDocumentoModalOpen, setEditarDocumentoModalOpen] = useState(false)
  const [verDocumentoModalOpen, setVerDocumentoModalOpen] = useState(false)
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState<any>(null)

  const handleEditDatos = () => {
    setEditarDatosModalOpen(true)
  }

  const handleSaveDatos = (nuevosDatos: any) => {
    setDatos(nuevosDatos)
    toast({
      title: "Datos actualizados",
      description: "Los datos generales han sido actualizados correctamente.",
    })
  }

  const handleAddDireccion = () => {
    setAgregarDireccionModalOpen(true)
  }

  const handleEditDireccion = (direccion: any) => {
    setDireccionSeleccionada(direccion)
    setEditarDireccionModalOpen(true)
  }

  const handleSaveDireccion = (nuevaDireccion: any) => {
    if (direccionSeleccionada) {
      // Editar dirección existente
      setDirecciones(direcciones.map((dir) => (dir === direccionSeleccionada ? nuevaDireccion : dir)))
    } else {
      // Agregar nueva dirección
      setDirecciones([...direcciones, nuevaDireccion])
    }
    setDireccionSeleccionada(null)
  }

  const handleUploadDocumento = () => {
    setSubirDocumentoModalOpen(true)
  }

  const handleViewDocumento = (documento: any) => {
    setDocumentoSeleccionado(documento)
    setVerDocumentoModalOpen(true)
  }

  const handleEditDocumento = (documento: any) => {
    setDocumentoSeleccionado(documento)
    setEditarDocumentoModalOpen(true)
  }

  const handleSaveDocumento = (nuevoDocumento: any) => {
    if (documentoSeleccionado) {
      // Editar documento existente
      setDocumentos(documentos.map((doc) => (doc === documentoSeleccionado ? nuevoDocumento : doc)))
    } else {
      // Agregar nuevo documento
      setDocumentos([...documentos, nuevoDocumento])
    }
    setDocumentoSeleccionado(null)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-plp-darkest">Entidad</h1>

      <DatosGenerales
        razonSocial={datos.razonSocial}
        rut={datos.rut}
        tipoProveedor={datos.tipoProveedor}
        estado={datos.estado}
        contacto={datos.contacto}
        banco={datos.banco}
        fiscal={datos.fiscal}
        onEdit={handleEditDatos}
      />

      <Direcciones direcciones={direcciones} onAdd={handleAddDireccion} onEdit={handleEditDireccion} />

      <Documentos
        documentos={documentos}
        onUpload={handleUploadDocumento}
        onView={handleViewDocumento}
        onEdit={handleEditDocumento}
      />

      {/* Modales */}
      <EditarDatosModal
        open={editarDatosModalOpen}
        onOpenChange={setEditarDatosModalOpen}
        datos={datos}
        onSave={handleSaveDatos}
      />

      <AgregarDireccionModal
        open={agregarDireccionModalOpen}
        onOpenChange={setAgregarDireccionModalOpen}
        onSave={handleSaveDireccion}
      />

      <AgregarDireccionModal
        open={editarDireccionModalOpen}
        onOpenChange={setEditarDireccionModalOpen}
        direccion={direccionSeleccionada}
        onSave={handleSaveDireccion}
        isEditing={true}
      />

      <SubirDocumentoModal
        open={subirDocumentoModalOpen}
        onOpenChange={setSubirDocumentoModalOpen}
        onSave={handleSaveDocumento}
      />

      <SubirDocumentoModal
        open={editarDocumentoModalOpen}
        onOpenChange={setEditarDocumentoModalOpen}
        documento={documentoSeleccionado}
        onSave={handleSaveDocumento}
        isEditing={true}
      />

      {documentoSeleccionado && (
        <VerDocumentoModal
          open={verDocumentoModalOpen}
          onOpenChange={setVerDocumentoModalOpen}
          documento={documentoSeleccionado}
        />
      )}
    </div>
  )
}
