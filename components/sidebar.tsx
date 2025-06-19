"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  User,
  Calendar,
  HelpCircle,
  ChevronDown,
  FileText,
  Truck,
  Building,
  Home,
  UserCircle,
  Shield,
  Briefcase,
  Receipt,
  FileSearch,
  ClipboardList,
  CalendarCheck,
  CalendarPlus,
  CreditCard,
  ShoppingCart,
  DollarSign,
  FileIcon as FileInvoice,
  Percent,
  ListChecks,
  FilePlus,
  ClipboardCheck,
  ClipboardPlus,
  Users,
  Store,
  ImageIcon,
  Newspaper,
  Clock,
  Eye,
  PlusCircle,
  BarChart,
  List,
  Mail,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

type SubSubModule = {
  name: string
  icon: React.ElementType
  href: string
}

type SubModule = {
  name: string
  icon: React.ElementType
  href: string
  subModules?: SubSubModule[]
}

type Module = {
  name: string
  icon: React.ElementType
  href?: string
  subModules?: SubModule[]
}

type UserModules = {
  [key: string]: Module[]
}

export default function Sidebar({ userType = "Proveedor" }: { userType?: string }) {
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const [activeSubModule, setActiveSubModule] = useState<string | null>(null)
  const [headerHeight, setHeaderHeight] = useState(64) // Altura inicial del header (16 * 4 = 64px)

  // Efecto para detectar el scroll y ajustar el sidebar según la altura del header
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

  const userModules: UserModules = {
    Proveedor: [
      {
        name: "Inicio",
        icon: Home,
        href: "/proveedor",
      },
      {
        name: "Perfil",
        icon: User,
        subModules: [
          { name: "Datos personales", icon: UserCircle, href: "/proveedor/perfil/datos-personales" },
          { name: "Seguridad", icon: Shield, href: "/proveedor/perfil/seguridad" },
        ],
      },
      {
        name: "Gestión",
        icon: Briefcase,
        subModules: [
          { name: "Entidad", icon: Building, href: "/proveedor/gestion/entidad" },
          {
            name: "Facturación",
            icon: Receipt,
            href: "/proveedor/gestion/facturacion",
            subModules: [
              {
                name: "Mi cuenta corriente",
                icon: CreditCard,
                href: "/proveedor/gestion/facturacion/cuenta-corriente",
              },
              { name: "Órdenes de compra", icon: ShoppingCart, href: "/proveedor/gestion/facturacion/ordenes-compra" },
              { name: "Órdenes de pago", icon: DollarSign, href: "/proveedor/gestion/facturacion/ordenes-pago" },
              { name: "Facturas", icon: FileInvoice, href: "/proveedor/gestion/facturacion/facturas" },
              { name: "Percepciones", icon: Percent, href: "/proveedor/gestion/facturacion/percepciones" },
            ],
          },
          {
            name: "Licitaciones",
            icon: FileSearch,
            href: "/proveedor/gestion/licitaciones",
            subModules: [
              { name: "Mis licitaciones", icon: ListChecks, href: "/proveedor/gestion/licitaciones/mis-licitaciones" },
              { name: "Nueva inscripción", icon: FilePlus, href: "/proveedor/gestion/licitaciones/nueva-inscripcion" },
            ],
          },
          {
            name: "Solicitudes",
            icon: ClipboardList,
            href: "/proveedor/gestion/solicitudes",
            subModules: [
              { name: "Mis solicitudes", icon: ClipboardCheck, href: "/proveedor/gestion/solicitudes/mis-solicitudes" },
              { name: "Nueva solicitud", icon: ClipboardPlus, href: "/proveedor/gestion/solicitudes/nueva-solicitud" },
            ],
          },
          {
            name: "Transporte",
            icon: Truck,
            href: "#",
            subModules: [
              { name: "Mis Vehículos", icon: Truck, href: "/proveedor/gestion/transporte/mis-transportes" },
              { name: "Mis Conductores", icon: Users, href: "/proveedor/gestion/transporte/mis-conductores" },
            ],
          },
          {
            name: "Mi Personal",
            icon: Users,
            href: "/proveedor/gestion/mi-personal",
          },
        ],
      },
      {
        name: "Visitas",
        icon: Calendar,
        subModules: [
          { name: "Mis visitas", icon: CalendarCheck, href: "/proveedor/visitas/mis-visitas" },
          { name: "Nueva visita", icon: CalendarPlus, href: "/proveedor/visitas/nueva-visita" },
        ],
      },
      {
        name: "Ayuda",
        icon: HelpCircle,
        href: "/proveedor/ayuda",
      },
    ],
    "Usuario Básico": [
      {
        name: "Inicio",
        icon: Home,
        href: "/usuario-basico",
      },
      {
        name: "Perfil",
        icon: User,
        subModules: [
          { name: "Datos personales", icon: UserCircle, href: "/usuario-basico/perfil/datos-personales" },
          { name: "Seguridad", icon: Shield, href: "/usuario-basico/perfil/seguridad" },
        ],
      },
      {
        name: "Gestión",
        icon: Briefcase,
        subModules: [
          { name: "Mis entidades", icon: Building, href: "/usuario-basico/gestion/mis-entidades" },
          {
            name: "Nueva entidad",
            icon: FilePlus,
            href: "#",
            subModules: [
              { name: "Nuevo Proveedor", icon: Store, href: "/usuario-basico/gestion/nueva-entidad/proveedor" },
              { name: "Nuevo Cliente", icon: Users, href: "/usuario-basico/gestion/nueva-entidad/cliente" },
            ],
          },
          {
            name: "Transporte",
            icon: Truck,
            href: "#",
            subModules: [
              { name: "Mis Vehículos", icon: Truck, href: "/usuario-basico/gestion/transporte/mis-transportes" },
              { name: "Mis Conductores", icon: Users, href: "/usuario-basico/gestion/transporte/mis-conductores" },
            ],
          },
        ],
      },
      {
        name: "Visitas",
        icon: Calendar,
        subModules: [
          { name: "Mis visitas", icon: CalendarCheck, href: "/usuario-basico/visitas/mis-visitas" },
          { name: "Nueva visita", icon: CalendarPlus, href: "/usuario-basico/visitas/nueva-visita" },
        ],
      },
      {
        name: "Ayuda",
        icon: HelpCircle,
        href: "/usuario-basico/ayuda",
      },
    ],
    Cliente: [
      {
        name: "Inicio",
        icon: Home,
        href: "/cliente",
      },
      {
        name: "Perfil",
        icon: User,
        subModules: [
          { name: "Datos personales", icon: UserCircle, href: "/cliente/perfil/datos-personales" },
          { name: "Seguridad", icon: Shield, href: "/cliente/perfil/seguridad" },
        ],
      },
      {
        name: "Gestión",
        icon: Briefcase,
        subModules: [
          { name: "Entidad", icon: Building, href: "/cliente/gestion/entidad" },
          {
            name: "Facturación",
            icon: Receipt,
            href: "/cliente/gestion/facturacion",
            subModules: [
              { name: "Mi cuenta corriente", icon: CreditCard, href: "/cliente/gestion/facturacion/cuenta-corriente" },
              { name: "Mis Facturas", icon: FileInvoice, href: "/cliente/gestion/facturacion/facturas" },
              { name: "Órdenes de Cobro", icon: DollarSign, href: "/cliente/gestion/facturacion/ordenes-cobro" },
              { name: "Retenciones", icon: Percent, href: "/cliente/gestion/facturacion/retenciones" },
            ],
          },
          {
            name: "Solicitudes",
            icon: ClipboardList,
            href: "/cliente/gestion/solicitudes",
            subModules: [
              { name: "Mis solicitudes", icon: ClipboardCheck, href: "/cliente/gestion/solicitudes/mis-solicitudes" },
              { name: "Nueva solicitud", icon: ClipboardPlus, href: "/cliente/gestion/solicitudes/nueva-solicitud" },
            ],
          },
          {
            name: "Transporte",
            icon: Truck,
            href: "#",
            subModules: [
              { name: "Mis Vehículos", icon: Truck, href: "/cliente/gestion/transporte/mis-transportes" },
              { name: "Mis Conductores", icon: Users, href: "/cliente/gestion/transporte/mis-conductores" },
            ],
          },
        ],
      },
      {
        name: "Visitas",
        icon: Calendar,
        subModules: [
          { name: "Mis visitas", icon: CalendarCheck, href: "/cliente/visitas/mis-visitas" },
          { name: "Nueva visita", icon: CalendarPlus, href: "/cliente/visitas/nueva-visita" },
        ],
      },
      {
        name: "Ayuda",
        icon: HelpCircle,
        href: "/cliente/ayuda",
      },
    ],
    Empleado: [
      {
        name: "Dashboard",
        icon: Home,
        href: "/empleado",
      },
      {
        name: "Entidades",
        icon: Building,
        href: "/empleado/entidades",
      },
      {
        name: "Logística",
        icon: Truck,
        href: "/empleado/logistica",
      },
      {
        name: "Reportes",
        icon: FileText,
        href: "/empleado/reportes",
      },
      {
        name: "Ayuda",
        icon: HelpCircle,
        href: "/empleado/ayuda",
      },
    ],
    "Empleado - Prensa": [
      {
        name: "Inicio",
        icon: Home,
        href: "/empleado-prensa",
      },
      {
        name: "Perfil",
        icon: User,
        subModules: [
          { name: "Datos personales", icon: UserCircle, href: "/empleado-prensa/perfil/datos-personales" },
          { name: "Seguridad", icon: Shield, href: "/empleado-prensa/perfil/seguridad" },
        ],
      },
      {
        name: "Gestión",
        icon: Briefcase,
        subModules: [
          { name: "Calendario", icon: Calendar, href: "/empleado-prensa/gestion/eventos/calendario" },
          {
            name: "Buzón Departamento",
            icon: Mail,
            href: "/empleado-prensa/gestion/buzon-departamento",
            subModules: [
              {
                name: "Solicitudes",
                icon: ClipboardList,
                href: "/empleado-prensa/gestion/buzon-departamento/solicitudes",
              },
              { name: "Visitas", icon: Calendar, href: "/empleado-prensa/gestion/buzon-departamento/visitas" },
            ],
          },
          {
            name: "Mi Buzón",
            icon: Mail,
            href: "/empleado-prensa/gestion/mi-buzon",
            subModules: [
              {
                name: "Solicitudes",
                icon: ClipboardList,
                href: "/empleado-prensa/gestion/mi-buzon/solicitudes",
              },
              { name: "Visitas", icon: Calendar, href: "/empleado-prensa/gestion/mi-buzon/visitas" },
            ],
          },
          {
            name: "Portal Empleado",
            icon: ClipboardList,
            href: "/empleado-prensa/gestion/solicitudes",
            subModules: [
              {
                name: "Mis Gestiones",
                icon: ClipboardCheck,
                href: "/empleado-prensa/gestion/solicitudes/mis-solicitudes",
              },
              {
                name: "Nueva Gestión",
                icon: ClipboardPlus,
                href: "/empleado-prensa/gestion/solicitudes/nueva-solicitud",
              },
            ],
          },
          {
            name: "Blog",
            icon: Newspaper,
            href: "/empleado-prensa/gestion/blog",
            subModules: [
              { name: "Mis post", icon: FileText, href: "/empleado-prensa/gestion/blog/mis-post" },
              { name: "Nuevo Post", icon: FilePlus, href: "/empleado-prensa/gestion/blog/nuevo-post" },
            ],
          },
          { name: "Documentación", icon: FileText, href: "/empleado-prensa/gestion/documentacion" },
          { name: "Galería de imágenes", icon: ImageIcon, href: "/empleado-prensa/gestion/galeria-imagenes" },
        ],
      },
      {
        name: "Visitas",
        icon: Calendar,
        subModules: [
          { name: "Mis visitas", icon: CalendarCheck, href: "/empleado-prensa/visitas/mis-visitas" },
          { name: "Nueva visita", icon: CalendarPlus, href: "/empleado-prensa/visitas/nueva-visita" },
        ],
      },
    ],
    "Empleado - Compras": [
      {
        name: "Inicio",
        icon: Home,
        href: "/empleado-compras",
      },
      {
        name: "Perfil",
        icon: User,
        subModules: [
          { name: "Datos personales", icon: UserCircle, href: "/empleado-compras/perfil/datos-personales" },
          { name: "Seguridad", icon: Shield, href: "/empleado-compras/perfil/seguridad" },
        ],
      },
      {
        name: "Gestión",
        icon: Briefcase,
        subModules: [
          {
            name: "Calendario",
            icon: Calendar,
            href: "/empleado-compras/gestion/eventos/calendario",
          },
          {
            name: "Buzón Departamento",
            icon: Mail,
            href: "/empleado-compras/gestion/buzon-departamento",
            subModules: [
              {
                name: "Solicitudes",
                icon: ClipboardList,
                href: "/empleado-compras/gestion/buzon-departamento/solicitudes",
              },
              { name: "Visitas", icon: Calendar, href: "/empleado-compras/gestion/buzon-departamento/visitas" },
            ],
          },
          {
            name: "Mi Buzón",
            icon: Mail,
            href: "/empleado-compras/gestion/mi-buzon",
            subModules: [
              {
                name: "Solicitudes",
                icon: ClipboardList,
                href: "/empleado-compras/gestion/mi-buzon/solicitudes",
              },
              { name: "Visitas", icon: Calendar, href: "/empleado-compras/gestion/mi-buzon/visitas" },
            ],
          },
          {
            name: "Portal Empleado",
            icon: ClipboardList,
            href: "/empleado-compras/gestion/solicitudes",
            subModules: [
              {
                name: "Mis Gestiones",
                icon: ClipboardCheck,
                href: "/empleado-compras/gestion/solicitudes/mis-solicitudes",
              },
              { name: "Nueva Gestión", icon: ClipboardPlus, href: "/empleado-compras/gestion/solicitudes/nueva" },
            ],
          },
          {
            name: "Licitaciones",
            icon: FileSearch,
            href: "/empleado-compras/gestion/licitaciones",
            subModules: [
              {
                name: "Listado Licitaciones",
                icon: ListChecks,
                href: "/empleado-compras/gestion/licitaciones/listado",
              },
              { name: "Nueva Licitación", icon: FilePlus, href: "/empleado-compras/gestion/licitaciones/nueva" },
              { name: "Estados de Licitación", icon: FileText, href: "/empleado-compras/gestion/licitaciones/estados" },
            ],
          },
          {
            name: "Proveedores",
            icon: Store,
            href: "/empleado-compras/gestion/proveedores",
            subModules: [
              { name: "Listado Proveedores", icon: Users, href: "/empleado-compras/gestion/proveedores/listado" },
            ],
          },
          {
            name: "Reportes",
            icon: BarChart,
            href: "/empleado-compras/gestion/reportes",
            subModules: [
              {
                name: "Facturas proveedores",
                icon: FileInvoice,
                href: "/empleado-compras/gestion/reportes/facturas-proveedores",
              },
              {
                name: "Órdenes de compra",
                icon: ShoppingCart,
                href: "/empleado-compras/gestion/reportes/ordenes-compra",
              },
            ],
          },
        ],
      },
      {
        name: "Visitas",
        icon: Calendar,
        subModules: [
          { name: "Mis visitas", icon: CalendarCheck, href: "/empleado-compras/visitas/mis-visitas" },
          { name: "Nueva visita", icon: CalendarPlus, href: "/empleado-compras/visitas/nueva-visita" },
        ],
      },
    ],
    "Empleado - Seguridad": [
      {
        name: "Inicio",
        icon: Home,
        href: "/empleado-seguridad",
      },
      {
        name: "Perfil",
        icon: User,
        subModules: [
          { name: "Datos personales", icon: UserCircle, href: "/empleado-seguridad/perfil/datos-personales" },
          { name: "Seguridad", icon: Shield, href: "/empleado-seguridad/perfil/seguridad" },
        ],
      },
      {
        name: "Gestión",
        icon: Briefcase,
        subModules: [
          { name: "Calendario", icon: Calendar, href: "/empleado-seguridad/gestion/eventos/calendario" },
          {
            name: "Buzón Departamento",
            icon: Mail,
            href: "/empleado-seguridad/gestion/buzon-departamento",
            subModules: [
              {
                name: "Solicitudes",
                icon: ClipboardList,
                href: "/empleado-seguridad/gestion/buzon-departamento/solicitudes",
              },
              { name: "Visitas", icon: Calendar, href: "/empleado-seguridad/gestion/buzon-departamento/visitas" },
            ],
          },
          {
            name: "Mi Buzón",
            icon: Mail,
            href: "/empleado-seguridad/gestion/mi-buzon",
            subModules: [
              {
                name: "Solicitudes",
                icon: ClipboardList,
                href: "/empleado-seguridad/gestion/mi-buzon/solicitudes",
              },
              { name: "Visitas", icon: Calendar, href: "/empleado-seguridad/gestion/mi-buzon/visitas" },
            ],
          },
          {
            name: "Portal Empleado",
            icon: ClipboardList,
            href: "/empleado-seguridad/gestion/solicitudes",
            subModules: [
              {
                name: "Mis Gestiones",
                icon: ClipboardCheck,
                href: "/empleado-seguridad/gestion/solicitudes/mis-solicitudes",
              },
              {
                name: "Nueva Gestión",
                icon: ClipboardPlus,
                href: "/empleado-seguridad/gestion/solicitudes/nueva-solicitud",
              },
            ],
          },
        ],
      },
      {
        name: "Visitas",
        icon: Calendar,
        subModules: [
          { name: "Pendientes", icon: Clock, href: "/empleado-seguridad/visitas/pendientes" },
          { name: "Solicitudes", icon: ClipboardCheck, href: "/empleado-seguridad/visitas/solicitudes" },
          { name: "Nueva visita", icon: CalendarPlus, href: "/empleado-seguridad/visitas/nueva-visita" },
          {
            name: "Transporte Cargas",
            icon: Truck,
            href: "/empleado-seguridad/visitas/camiones",
            subModules: [
              { name: "Pendientes", icon: Clock, href: "/empleado-seguridad/visitas/camiones/pendientes" },
              { name: "Todos", icon: List, href: "/empleado-seguridad/visitas/camiones/todos" },
            ],
          },
        ],
      },
      {
        name: "Ayuda",
        icon: HelpCircle,
        href: "/empleado-seguridad/ayuda",
      },
    ],
    "Empleado - Guardia": [
      {
        name: "Visita",
        icon: Eye,
        href: "/empleado-guardia/visita",
      },
      {
        name: "Nueva visita",
        icon: PlusCircle,
        href: "/empleado-guardia/nueva-visita",
      },
    ],
    "Empleado - Mesa de Entradas": [
      {
        name: "Inicio",
        icon: Home,
        href: "/empleado-mesa-entradas",
      },
      {
        name: "Perfil",
        icon: User,
        subModules: [
          { name: "Datos personales", icon: UserCircle, href: "/empleado-mesa-entradas/perfil/datos-personales" },
          { name: "Seguridad", icon: Shield, href: "/empleado-mesa-entradas/perfil/seguridad" },
        ],
      },
      {
        name: "Gestión",
        icon: Briefcase,
        subModules: [
          { name: "Calendario", icon: Calendar, href: "/empleado-mesa-entradas/gestion/eventos/calendario" },
          {
            name: "Buzón Departamento",
            icon: Mail,
            href: "/empleado-mesa-entradas/gestion/buzon-departamento",
            subModules: [
              {
                name: "Solicitudes",
                icon: ClipboardList,
                href: "/empleado-mesa-entradas/gestion/buzon-departamento/solicitudes",
              },
              { name: "Visitas", icon: Calendar, href: "/empleado-mesa-entradas/gestion/buzon-departamento/visitas" },
            ],
          },
          {
            name: "Mi Buzón",
            icon: Mail,
            href: "/empleado-mesa-entradas/gestion/mi-buzon",
            subModules: [
              {
                name: "Solicitudes",
                icon: ClipboardList,
                href: "/empleado-mesa-entradas/gestion/mi-buzon/solicitudes",
              },
              { name: "Visitas", icon: Calendar, href: "/empleado-mesa-entradas/gestion/mi-buzon/visitas" },
            ],
          },
          { name: "Facturas", icon: FileInvoice, href: "/empleado-mesa-entradas/gestion/facturas" },
          { name: "Expedientes", icon: FileText, href: "/empleado-mesa-entradas/gestion/expedientes" },
          { name: "Licitaciones", icon: FileSearch, href: "/empleado-mesa-entradas/gestion/licitaciones" },
        ],
      },
      {
        name: "Visitas",
        icon: Calendar,
        subModules: [
          { name: "Mis visitas", icon: CalendarCheck, href: "/empleado-mesa-entradas/visitas/mis-visitas" },
          { name: "Nueva visita", icon: CalendarPlus, href: "/empleado-mesa-entradas/visitas/nueva-visita" },
        ],
      },
    ],
    "Empleado - Gerente": [
      {
        name: "Inicio",
        icon: Home,
        href: "/empleado-gerente",
      },
      {
        name: "Perfil",
        icon: User,
        subModules: [
          { name: "Datos personales", icon: UserCircle, href: "/empleado-gerente/perfil/datos-personales" },
          { name: "Seguridad", icon: Shield, href: "/empleado-gerente/perfil/seguridad" },
        ],
      },
      {
        name: "Gestión",
        icon: Briefcase,
        subModules: [
          { name: "Calendario", icon: Calendar, href: "/empleado-gerente/gestion/eventos/calendario" },
          {
            name: "Buzón Departamento",
            icon: Mail,
            href: "/empleado-gerente/gestion/buzon-departamento",
            subModules: [
              {
                name: "Solicitudes",
                icon: ClipboardList,
                href: "/empleado-gerente/gestion/buzon-departamento/solicitudes",
              },
              { name: "Visitas", icon: Calendar, href: "/empleado-gerente/gestion/buzon-departamento/visitas" },
            ],
          },
          {
            name: "Mi Buzón",
            icon: Mail,
            href: "/empleado-gerente/gestion/mi-buzon",
            subModules: [
              {
                name: "Solicitudes",
                icon: ClipboardList,
                href: "/empleado-gerente/gestion/mi-buzon/solicitudes",
              },
              { name: "Visitas", icon: Calendar, href: "/empleado-gerente/gestion/mi-buzon/visitas" },
            ],
          },
          {
            name: "Portal Empleado",
            icon: ClipboardList,
            href: "/empleado-gerente/gestion/solicitudes",
            subModules: [
              {
                name: "Mis Gestiones",
                icon: ClipboardCheck,
                href: "/empleado-gerente/gestion/solicitudes/mis-solicitudes",
              },
              {
                name: "Gestiones recibidas",
                icon: Eye,
                href: "/empleado-gerente/gestion/solicitudes/solicitudes-recibidas",
              },
              {
                name: "Nueva Gestión",
                icon: ClipboardPlus,
                href: "/empleado-gerente/gestion/solicitudes/nueva-solicitud",
              },
            ],
          },
          { name: "Reportes", icon: BarChart, href: "/empleado-gerente/gestion/reportes" },
        ],
      },
      {
        name: "Visitas",
        icon: Calendar,
        subModules: [
          { name: "Mis visitas", icon: CalendarCheck, href: "/empleado-gerente/visitas/mis-visitas" },
          { name: "Nueva visita", icon: CalendarPlus, href: "/empleado-gerente/visitas/nueva-visita" },
        ],
      },
    ],
    "Empleado - Contable": [
      {
        name: "Inicio",
        icon: Home,
        href: "/empleado-contable",
      },
      {
        name: "Perfil",
        icon: User,
        subModules: [
          { name: "Datos personales", icon: UserCircle, href: "/empleado-contable/perfil/datos-personales" },
          { name: "Seguridad", icon: Shield, href: "/empleado-contable/perfil/seguridad" },
        ],
      },
      {
        name: "Gestión",
        icon: Briefcase,
        subModules: [
          {
            name: "Calendario",
            icon: Calendar,
            href: "/empleado-contable/gestion/eventos/calendario",
          },
          {
            name: "Buzón Departamento",
            icon: Mail,
            href: "/empleado-contable/gestion/buzon-departamento",
            subModules: [
              {
                name: "Solicitudes",
                icon: ClipboardList,
                href: "/empleado-contable/gestion/buzon-departamento/solicitudes",
              },
              { name: "Visitas", icon: Calendar, href: "/empleado-contable/gestion/buzon-departamento/visitas" },
            ],
          },
          {
            name: "Mi Buzón",
            icon: Mail,
            href: "/empleado-contable/gestion/mi-buzon",
            subModules: [
              {
                name: "Solicitudes",
                icon: ClipboardList,
                href: "/empleado-contable/gestion/mi-buzon/solicitudes",
              },
              { name: "Visitas", icon: Calendar, href: "/empleado-contable/gestion/mi-buzon/visitas" },
            ],
          },
          {
            name: "Portal Empleado",
            icon: ClipboardList,
            href: "/empleado-contable/gestion/solicitudes",
            subModules: [
              {
                name: "Mis Gestiones",
                icon: ClipboardCheck,
                href: "/empleado-contable/gestion/solicitudes/mis-solicitudes",
              },
              {
                name: "Nueva Gestión",
                icon: ClipboardPlus,
                href: "/empleado-contable/gestion/solicitudes/nueva-solicitud",
              },
            ],
          },
          {
            name: "Proveedores",
            icon: Store,
            href: "/empleado-contable/gestion/proveedores",
            subModules: [
              { name: "Listado Proveedores", icon: Users, href: "/empleado-contable/gestion/proveedores/listado" },
              { name: "Pendientes", icon: Clock, href: "/empleado-contable/gestion/proveedores/pendientes" },
              { name: "Nuevo Proveedor", icon: FilePlus, href: "/empleado-contable/gestion/proveedores/nuevo" },
            ],
          },
          {
            name: "Clientes",
            icon: Users,
            href: "/empleado-contable/gestion/clientes",
            subModules: [
              { name: "Listado Clientes", icon: Users, href: "/empleado-contable/gestion/clientes/listado" },
              { name: "Pendientes", icon: Clock, href: "/empleado-contable/gestion/clientes/pendientes" },
              { name: "Nuevo Cliente", icon: FilePlus, href: "/empleado-contable/gestion/clientes/nuevo" },
            ],
          },
        ],
      },
      {
        name: "Visitas",
        icon: Calendar,
        subModules: [
          { name: "Mis visitas", icon: CalendarCheck, href: "/empleado-contable/visitas/mis-visitas" },
          { name: "Nueva visita", icon: CalendarPlus, href: "/empleado-contable/visitas/nueva-visita" },
        ],
      },
    ],
    "Empleado - RRHH": [
      {
        name: "Inicio",
        icon: Home,
        href: "/empleado-rrhh",
      },
      {
        name: "Perfil",
        icon: User,
        subModules: [
          { name: "Datos personales", icon: UserCircle, href: "/empleado-rrhh/perfil/datos-personales" },
          { name: "Seguridad", icon: Shield, href: "/empleado-rrhh/perfil/seguridad" },
        ],
      },
      {
        name: "Gestión",
        icon: Briefcase,
        subModules: [
          { name: "Calendario", icon: Calendar, href: "/empleado-rrhh/gestion/eventos/calendario" },
          {
            name: "Buzón Departamento",
            icon: Mail,
            href: "/empleado-rrhh/gestion/buzon-departamento",
            subModules: [
              {
                name: "Solicitudes",
                icon: ClipboardList,
                href: "/empleado-rrhh/gestion/buzon-departamento/solicitudes",
              },
              { name: "Visitas", icon: Calendar, href: "/empleado-rrhh/gestion/buzon-departamento/visitas" },
            ],
          },
          {
            name: "Mi Buzón",
            icon: Mail,
            href: "/empleado-rrhh/gestion/mi-buzon",
            subModules: [
              {
                name: "Solicitudes",
                icon: ClipboardList,
                href: "/empleado-rrhh/gestion/mi-buzon/solicitudes",
              },
              { name: "Visitas", icon: Calendar, href: "/empleado-rrhh/gestion/mi-buzon/visitas" },
            ],
          },
          {
            name: "Portal Empleado",
            icon: ClipboardList,
            href: "/empleado-rrhh/gestion/solicitudes",
            subModules: [
              {
                name: "Mis Gestiones",
                icon: ClipboardCheck,
                href: "/empleado-rrhh/gestion/solicitudes/mis-solicitudes",
              },
              {
                name: "Nueva Gestión",
                icon: ClipboardPlus,
                href: "/empleado-rrhh/gestion/solicitudes/nueva-solicitud",
              },
            ],
          },
          {
            name: "Empleados",
            icon: Users,
            href: "/empleado-rrhh/gestion/empleados",
            subModules: [
              { name: "Alta empleado", icon: FilePlus, href: "/empleado-rrhh/gestion/empleados/alta" },
              { name: "Listado empleados", icon: List, href: "/empleado-rrhh/gestion/empleados/listado" },
              { name: "Licencias Activas", icon: Clock, href: "/empleado-rrhh/gestion/empleados/licencias-activas" },
            ],
          },
          {
            name: "Organigrama",
            icon: Building,
            href: "/empleado-rrhh/gestion/organigrama",
            subModules: [
              { name: "Gerencias", icon: Building, href: "/empleado-rrhh/gestion/organigrama/gerencias" },
              { name: "Departamentos", icon: Users, href: "/empleado-rrhh/gestion/organigrama/departamentos" },
              { name: "Cargos", icon: UserCircle, href: "/empleado-rrhh/gestion/organigrama/cargos" },
              { name: "Jerarquias", icon: List, href: "/empleado-rrhh/gestion/organigrama/jerarquias" },
            ],
          },
        ],
      },
      {
        name: "Visitas",
        icon: Calendar,
        subModules: [
          { name: "Mis visitas", icon: CalendarCheck, href: "/empleado-rrhh/visitas/mis-visitas" },
          { name: "Nueva visita", icon: CalendarPlus, href: "/empleado-rrhh/visitas/nueva-visita" },
        ],
      },
    ],
  }

  const modules = userModules[userType] || userModules["Proveedor"]

  const toggleModule = (moduleName: string) => {
    if (activeModule === moduleName) {
      setActiveModule(null)
      setActiveSubModule(null) // Cerrar también el submódulo activo
    } else {
      setActiveModule(moduleName)
    }
  }

  const toggleSubModule = (subModuleName: string) => {
    if (activeSubModule === subModuleName) {
      setActiveSubModule(null)
    } else {
      setActiveSubModule(subModuleName)
    }
  }

  // Estilo especial para el sidebar cuando es empleado-guardia (optimizado para tablet)
  const isGuardia = userType === "Empleado - Guardia"

  return (
    <aside
      className={cn(
        "w-64 bg-plp-dark text-white border-r border-plp-medium shadow-sidebar fixed z-40",
        isGuardia && "w-72", // Sidebar más ancho para tablet
      )}
      style={{
        top: `${headerHeight}px`,
        height: `calc(100vh - ${headerHeight}px)`,
        transition: "top 0.3s ease, height 0.3s ease",
      }}
    >
      <div className="h-full overflow-y-auto scrollbar-hide p-4">
        <nav className={cn("space-y-1", isGuardia && "space-y-4")}>
          {modules.map((module) => (
            <div key={module.name}>
              {module.subModules ? (
                <Collapsible
                  open={activeModule === module.name}
                  onOpenChange={() => toggleModule(module.name)}
                  className="w-full"
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-md hover:bg-plp-medium text-left">
                    <div className="flex items-center">
                      <module.icon className={cn("h-5 w-5 mr-3 text-plp-light", isGuardia && "h-6 w-6 mr-4")} />
                      <span className={cn(isGuardia && "text-lg")}>{module.name}</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200 text-plp-light",
                        activeModule === module.name ? "transform rotate-180" : "",
                        isGuardia && "h-5 w-5",
                      )}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-10 space-y-1 mt-1">
                    {module.subModules.map((subModule) => (
                      <div key={subModule.name}>
                        {subModule.subModules ? (
                          <Collapsible
                            open={activeSubModule === subModule.name}
                            onOpenChange={() => toggleSubModule(subModule.name)}
                            className="w-full"
                          >
                            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-md hover:bg-plp-medium text-left text-gray-200">
                              <div className="flex items-center">
                                <subModule.icon className="h-4 w-4 mr-2 text-plp-light" />
                                <span>{subModule.name}</span>
                              </div>
                              <ChevronDown
                                className={cn(
                                  "h-3 w-3 transition-transform duration-200 text-plp-light",
                                  activeSubModule === subModule.name ? "transform rotate-180" : "",
                                )}
                              />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="pl-6 space-y-1 mt-1">
                              {subModule.subModules.map((subSubModule) => (
                                <Link
                                  key={subSubModule.name}
                                  href={subSubModule.href}
                                  className="flex items-center p-2 rounded-md hover:bg-plp-medium text-gray-300"
                                >
                                  <subSubModule.icon className="h-3.5 w-3.5 mr-2 text-plp-light" />
                                  <span className="text-sm">{subSubModule.name}</span>
                                </Link>
                              ))}
                            </CollapsibleContent>
                          </Collapsible>
                        ) : (
                          <Link
                            href={subModule.href}
                            className="flex items-center p-2 rounded-md hover:bg-plp-medium text-gray-200"
                          >
                            <subModule.icon className="h-4 w-4 mr-2 text-plp-light" />
                            <span>{subModule.name}</span>
                          </Link>
                        )}
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link
                  href={module.href || "#"}
                  className={cn("flex items-center p-2 rounded-md hover:bg-plp-medium", isGuardia && "p-4 text-lg")}
                >
                  <module.icon className={cn("h-5 w-5 mr-3 text-plp-light", isGuardia && "h-7 w-7 mr-4")} />
                  <span>{module.name}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
}
