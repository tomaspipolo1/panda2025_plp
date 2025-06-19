"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"

export default function UserPagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [headerHeight, setHeaderHeight] = useState(64) // Altura inicial del header (16 * 4 = 64px)

  // Determinar el tipo de usuario basado en la ruta actual
  const getUserTypeFromPath = (path: string) => {
    if (path.includes("/empleado-compras")) return "Empleado - Compras"
    if (path.includes("/empleado-prensa")) return "Empleado - Prensa"
    if (path.includes("/empleado-seguridad")) return "Empleado - Seguridad"
    if (path.includes("/empleado-guardia")) return "Empleado - Guardia"
    if (path.includes("/empleado-gerente")) return "Empleado - Gerente"
    if (path.includes("/empleado-contable")) return "Empleado - Contable"
    if (path.includes("/empleado-rrhh")) return "Empleado - RRHH"
    if (path.includes("/empleado-mesa-entradas")) return "Empleado - Mesa de Entradas"
    if (path.includes("/empleado")) return "Empleado"
    if (path.includes("/usuario-basico")) return "Usuario Básico"
    if (path.includes("/proveedor")) return "Proveedor"
    if (path.includes("/cliente")) return "Cliente"
    return "Proveedor" // Por defecto
  }

  const [currentUser, setCurrentUser] = useState(getUserTypeFromPath(pathname))

  // Actualizar el tipo de usuario cuando cambia la ruta
  useEffect(() => {
    setCurrentUser(getUserTypeFromPath(pathname))
  }, [pathname])

  // Efecto para detectar el scroll y ajustar el contenido principal
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setHeaderHeight(isScrolled ? 48 : 64) // 12 * 4 = 48px cuando está scrolleado, 16 * 4 = 64px cuando no
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

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
      case "Empleado - Prensa":
        router.push("/empleado-prensa")
        break
      case "Empleado - Compras":
        router.push("/empleado-compras")
        break
      case "Empleado - Seguridad":
        router.push("/empleado-seguridad")
        break
      case "Empleado - Guardia":
        router.push("/empleado-guardia")
        break
      case "Empleado - Gerente":
        router.push("/empleado-gerente")
        break
      case "Empleado - Contable":
        router.push("/empleado-contable")
        break
      case "Empleado - RRHH":
        router.push("/empleado-rrhh")
        break
      case "Empleado - Mesa de Entradas":
        router.push("/empleado-mesa-entradas")
        break
      default:
        router.push("/proveedor")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-plp-lightest">
      <Header currentUser={currentUser} onUserTypeChange={handleUserTypeChange} />
      <div className="flex flex-1">
        <Sidebar userType={currentUser} />
        <main
          className="flex-1 overflow-auto p-4"
          style={{
            marginTop: `${headerHeight}px`,
            marginLeft: "16rem", // 64 * 4 = 256px (ancho del sidebar)
            transition: "margin-top 0.3s ease",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
