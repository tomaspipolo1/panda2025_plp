"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"

export default function Home() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState("Proveedor")

  const handleUserTypeChange = (userType: string) => {
    setCurrentUser(userType)

    // Redirigir a la página correspondiente según el tipo de usuario
    switch (userType) {
      case "Usuario Básico":
        router.push("/usuario-basico")
        break
      case "Proveedor":
        router.push("/proveedor")
        break
      case "Cliente":
        router.push("/cliente")
        break
      case "Empleado":
        router.push("/empleado")
        break
      default:
        router.push("/proveedor")
    }
  }

  // Redirigir a la página de proveedor por defecto al cargar
  useEffect(() => {
    router.push("/proveedor")
  }, [router])

  return (
    <div className="min-h-screen flex flex-col bg-plp-lightest">
      <Header currentUser={currentUser} onUserTypeChange={handleUserTypeChange} />
      <div className="flex flex-1">
        <Sidebar userType={currentUser} />
        <main className="flex-1">{/* El contenido se renderizará en las páginas específicas */}</main>
      </div>
    </div>
  )
}
