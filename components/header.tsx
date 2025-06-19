"use client"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
  Search,
  LogOut,
  HelpCircle,
  Building,
  Users,
  Bell,
  Settings,
  ShoppingCart,
  Shield,
  Newspaper,
  UserCheck,
  Star,
  ClipboardList,
  Calculator,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

type HeaderProps = {
  currentUser: string
  onUserTypeChange: (userType: string) => void
}

export default function Header({ currentUser, onUserTypeChange }: HeaderProps) {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true)
  const [isCalificarModalOpen, setIsCalificarModalOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [selectedProveedor, setSelectedProveedor] = useState<any>(null)
  const [calificacion, setCalificacion] = useState(0)
  const [comentario, setComentario] = useState("")

  // Efecto para detectar el scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  // Datos de usuario simulados
  const userData = {
    name: "Mariano Hernández",
    email: "mariano@plp.com",
  }

  // Función para abrir el modal de calificación desde la notificación
  const handleCalificarFromNotification = (proveedor: any) => {
    // Primero cerramos el dropdown de notificaciones para evitar superposición
    setIsNotificationsOpen(false)

    // Luego establecemos los datos y abrimos el modal
    setTimeout(() => {
      setSelectedProveedor(proveedor)
      setCalificacion(0)
      setComentario("")
      setIsCalificarModalOpen(true)
      setHasUnreadNotifications(false)
    }, 100) // Pequeño retraso para asegurar que el dropdown se cierre primero
  }

  // Función para guardar la calificación
  const handleGuardarCalificacion = () => {
    // Aquí iría la lógica para guardar la calificación en la base de datos
    console.log("Calificación guardada:", {
      proveedorId: selectedProveedor?.id,
      calificacion,
      comentario,
    })

    // Cerrar el modal y limpiar estados
    setIsCalificarModalOpen(false)
    setSelectedProveedor(null)

    // Alerta de confirmación
    alert("Calificación guardada correctamente")
  }

  // Función para cerrar el modal correctamente
  const handleCloseModal = () => {
    setIsCalificarModalOpen(false)
    setSelectedProveedor(null)
  }

  // Notificaciones según el tipo de usuario
  const getNotifications = () => {
    switch (currentUser) {
      case "Proveedor":
        return [
          {
            id: 1,
            title: "Nueva orden de compra recibida",
            message: "Has recibido una nueva orden de compra #ORD-2023-456",
            date: "18/04",
            image: "/organized-desk.png",
          },
          {
            id: 2,
            title: "Factura aprobada",
            message: "Tu factura #FAC-2023-789 ha sido aprobada para pago",
            date: "03/04",
            image: "/business-invoice-details.png",
          },
          {
            id: 3,
            title: "Licitación actualizada",
            message: "La licitación #LIC-2023-123 ha sido actualizada con nuevos requisitos",
            date: "01/04",
            image: "/gentle-care.png",
          },
        ]
      case "Cliente":
        return [
          {
            id: 1,
            title: "Entrega programada",
            message: "Tu pedido #PED-2023-456 será entregado mañana",
            date: "18/04",
            image: "/diverse-delivery-network.png",
          },
          {
            id: 2,
            title: "Factura recibida",
            message: "Has recibido una nueva factura por $15,000",
            date: "03/04",
            image: "/business-invoice-details.png",
          },
          {
            id: 3,
            title: "Visita confirmada",
            message: "La visita del proveedor ha sido confirmada para el 05/05",
            date: "01/04",
            image: "/open-planner.png",
          },
        ]
      case "Empleado - Prensa":
        return [
          {
            id: 1,
            title: "Nuevo artículo para revisar",
            message: "Tienes un nuevo artículo pendiente de revisión y publicación",
            date: "18/04",
            image: "/reading-the-news.png",
          },
          {
            id: 2,
            title: "Evento programado",
            message: "Hay un evento de prensa programado para mañana a las 10:00",
            date: "03/04",
            image: "/colorful-calendar-reminders.png",
          },
          {
            id: 3,
            title: "Solicitud de entrevista",
            message: "Un proveedor ha solicitado una entrevista para el boletín mensual",
            date: "01/04",
            image: "/professional-interview-setup.png",
          },
        ]
      case "Empleado - Compras":
        return [
          {
            id: 1,
            title: "Solicitud de calificación de proveedor",
            message: "Se te ha asignado calificar al proveedor Suministros Industriales S.A.",
            date: "18/04",
            image: "/global-supply-network.png",
            action: () =>
              handleCalificarFromNotification({
                id: 1,
                nombre: "Suministros Industriales S.A.",
                cuit: "30-12345678-9",
                categoria: "Materiales",
                subcategoria: "Construcción",
                estado: "Activo",
              }),
            actionType: "calificar",
          },
          {
            id: 2,
            title: "Solicitud de aprobación",
            message: "Tienes una solicitud de aprobación pendiente #SOL-2023-456",
            date: "15/04",
            image: "/green-light-stamp.png",
          },
          {
            id: 3,
            title: "Nuevo proveedor registrado",
            message: "Un nuevo proveedor se ha registrado y requiere verificación",
            date: "03/04",
            image: "/global-supply-network.png",
          },
          {
            id: 4,
            title: "Recordatorio de reunión",
            message: "Tienes una reunión programada con el departamento de compras",
            date: "01/04",
            image: "/diverse-team-meeting.png",
          },
        ]
      case "Empleado - Contable":
        return [
          {
            id: 1,
            title: "Facturas pendientes de revisión",
            message: "Tienes 5 facturas pendientes de revisión y aprobación",
            date: "18/04",
            image: "/business-invoice-details.png",
          },
          {
            id: 2,
            title: "Cierre contable mensual",
            message: "El cierre contable del mes debe completarse en 3 días",
            date: "15/04",
            image: "/organized-desk.png",
          },
          {
            id: 3,
            title: "Nuevo proveedor para validar",
            message: "Se ha registrado un nuevo proveedor que requiere validación fiscal",
            date: "03/04",
            image: "/global-supply-network.png",
          },
        ]
      case "Empleado":
      case "Empleado - Facturación":
      case "Empleado - Seguridad":
      case "Empleado - Guardia":
      case "Empleado - Tesorería":
        return [
          {
            id: 1,
            title: "Solicitud de aprobación",
            message: "Tienes una solicitud de aprobación pendiente #SOL-2023-456",
            date: "18/04",
            image: "/green-light-stamp.png",
          },
          {
            id: 2,
            title: "Nuevo proveedor registrado",
            message: "Un nuevo proveedor se ha registrado y requiere verificación",
            date: "03/04",
            image: "/global-supply-network.png",
          },
          {
            id: 3,
            title: "Recordatorio de reunión",
            message: "Tienes una reunión programada con el departamento de compras",
            date: "01/04",
            image: "/diverse-team-meeting.png",
          },
        ]
      default: // Usuario Básico
        return [
          {
            id: 1,
            title: "Necesitas actualizar tu información personal!",
            message: "Hay datos pendientes de completar en tu perfil de usuario.",
            date: "18/04",
            image: "/diverse-online-profiles.png",
          },
          {
            id: 2,
            title: "Tienes una invitación pendiente de aceptación!",
            message: "Has recibido una invitación para formar parte de una nueva entidad.",
            date: "03/04",
            image: "/elegant-invitation.png",
          },
          {
            id: 3,
            title: "La visita Laboral con Mariano Murguiondo ha sido rechazada.",
            message:
              "Tu solicitud de visita programada para el 05/05 ha sido rechazada. Contacta para más información.",
            date: "01/04",
            image: "/crossed-out-dates.png",
          },
        ]
    }
  }

  const handleUserTypeChange = (userType: string) => {
    onUserTypeChange(userType)
  }

  const handleEmployeeTypeChange = (employeeType: string) => {
    const userType = `Empleado - ${employeeType}`
    onUserTypeChange(userType)
  }

  const handleNotificationClick = () => {
    setHasUnreadNotifications(false)
  }

  return (
    <header
      className={cn(
        "bg-plp-darkest text-white border-b border-plp-dark shadow-header fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "h-12" : "h-16",
      )}
    >
      <div
        className={cn("container mx-auto flex items-center justify-between px-4 h-full transition-all duration-300")}
      >
        <div className="flex items-center">
          <Link href="/" className="mr-6">
            <Image
              src="/images/plp-logo-white.png"
              alt="PLP Logo"
              width={100}
              height={10}
              priority
              className={cn("transition-all duration-300 ml-11", scrolled ? "py-1 w-[80px]" : "py-2 w-[100px]")}
            />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {/* Searchbar con color interno más claro */}
          <div className={cn("relative transition-all duration-300", scrolled ? "w-56" : "w-64")}>
            <div className="flex items-center bg-plp-medium/80 rounded-md overflow-hidden">
              <Search
                className={cn(
                  "absolute left-2 text-white/70 transition-all duration-300",
                  scrolled ? "top-2 h-3.5 w-3.5" : "top-2.5 h-4 w-4",
                )}
              />
              <Input
                type="search"
                placeholder="Buscar..."
                className={cn(
                  "bg-transparent border-0 text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300",
                  scrolled ? "h-8 pl-7 text-sm" : "h-10 pl-8 text-base",
                )}
              />
            </div>
          </div>

          {/* Icono de notificaciones con dropdown */}
          <DropdownMenu open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "relative p-0 text-white hover:bg-plp-dark hover:text-white transition-all duration-300",
                  scrolled ? "h-8 w-8" : "h-10 w-10",
                )}
                aria-label="Notificaciones"
                onClick={handleNotificationClick}
              >
                <Bell className={cn("transition-all duration-300", scrolled ? "h-4 w-4" : "h-5 w-5")} />
                {hasUnreadNotifications && (
                  <span className="absolute top-0 right-0 flex h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[400px] p-0 bg-white text-gray-800 border border-gray-200 shadow-lg z-50"
              sideOffset={5}
            >
              {/* Encabezado de notificaciones */}
              <div className="flex items-center justify-between p-3 border-b border-gray-200">
                <h3 className="font-medium text-gray-800">Notificaciones</h3>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4 text-gray-500" />
                  <span className="sr-only">Configuración</span>
                </Button>
              </div>

              {/* Lista de notificaciones */}
              <div className="max-h-[400px] overflow-y-auto">
                {getNotifications().map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${notification.actionType === "calificar" ? "bg-blue-50" : ""}`}
                    onClick={notification.action ? notification.action : undefined}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <Image
                          src={notification.image || "/placeholder.svg"}
                          alt=""
                          width={48}
                          height={48}
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {notification.title}
                            {notification.actionType === "calificar" && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                <Star className="h-3 w-3 mr-1" />
                                Calificar
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500">{notification.date}</p>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pie de notificaciones */}
              <div className="p-3 text-center border-t border-gray-200">
                <Button variant="ghost" className="text-sm text-plp-dark hover:text-plp-darkest">
                  Ver todas las notificaciones
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Botón de usuario con icono de imagen */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "flex items-center gap-2 text-white hover:bg-plp-dark hover:text-white transition-all duration-300",
                  scrolled ? "h-8 text-sm" : "h-10 text-base",
                )}
              >
                <span>{currentUser}</span>
                <Avatar
                  className={cn(
                    "border-2 border-white/20 transition-all duration-300",
                    scrolled ? "h-7 w-7" : "h-8 w-8",
                  )}
                >
                  <AvatarFallback className="bg-plp-light text-white text-sm">
                    {currentUser.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            {/* Menú desplegable con color más claro y z-index alto para aparecer por encima */}
            <DropdownMenuContent
              align="end"
              className="w-56 bg-white text-gray-800 border border-gray-200 shadow-custom z-50"
              sideOffset={5}
            >
              {/* Información del usuario */}
              <div className="px-3 py-2 border-b border-gray-200">
                <p className="font-medium text-gray-800">{userData.name}</p>
                <p className="text-xs text-gray-500">{userData.email}</p>
              </div>

              <DropdownMenuLabel className="text-gray-600 font-medium">Cambiar tipo de usuario</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-200" />
              <DropdownMenuItem
                onClick={() => handleUserTypeChange("Usuario Básico")}
                className="hover:bg-gray-100 focus:bg-gray-100 text-gray-700"
              >
                <Users className="mr-2 h-4 w-4 text-plp-dark" />
                <span>Usuario básico</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleUserTypeChange("Proveedor")}
                className="hover:bg-gray-100 focus:bg-gray-100 text-gray-700"
              >
                <Building className="mr-2 h-4 w-4 text-plp-dark" />
                <span>Proveedor</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleUserTypeChange("Cliente")}
                className="hover:bg-gray-100 focus:bg-gray-100 text-gray-700"
              >
                <Users className="mr-2 h-4 w-4 text-plp-dark" />
                <span>Cliente</span>
              </DropdownMenuItem>

              {/* Submenú para tipos de empleado */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="hover:bg-gray-100 focus:bg-gray-100 text-gray-700">
                  <Users className="mr-2 h-4 w-4 text-plp-dark" />
                  <span>Empleado</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="bg-white border border-gray-200 shadow-lg min-w-[180px]">
                    <DropdownMenuItem
                      onClick={() => handleEmployeeTypeChange("Compras")}
                      className="hover:bg-gray-100 focus:bg-gray-100 text-gray-700"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4 text-plp-dark" />
                      <span>Compras</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleEmployeeTypeChange("Seguridad")}
                      className="hover:bg-gray-100 focus:bg-gray-100 text-gray-700"
                    >
                      <Shield className="mr-2 h-4 w-4 text-plp-dark" />
                      <span>Seguridad</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleEmployeeTypeChange("Prensa")}
                      className="hover:bg-gray-100 focus:bg-gray-100 text-gray-700"
                    >
                      <Newspaper className="mr-2 h-4 w-4 text-plp-dark" />
                      <span>Prensa</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleEmployeeTypeChange("Guardia")}
                      className="hover:bg-gray-100 focus:bg-gray-100 text-gray-700"
                    >
                      <UserCheck className="mr-2 h-4 w-4 text-plp-dark" />
                      <span>Guardia (garita)</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleEmployeeTypeChange("Contable")}
                      className="hover:bg-gray-100 focus:bg-gray-100 text-gray-700"
                    >
                      <Calculator className="mr-2 h-4 w-4 text-plp-dark" />
                      <span>Contable</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleEmployeeTypeChange("RRHH")}
                      className="hover:bg-gray-100 focus:bg-gray-100 text-gray-700"
                    >
                      <Users className="mr-2 h-4 w-4 text-plp-dark" />
                      <span>RRHH</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleEmployeeTypeChange("Gerente")}
                      className="hover:bg-gray-100 focus:bg-gray-100 text-gray-700"
                    >
                      <Users className="mr-2 h-4 w-4 text-plp-dark" />
                      <span>Superior Jerárquico</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleEmployeeTypeChange("Mesa de Entradas")}
                      className="hover:bg-gray-100 focus:bg-gray-100 text-gray-700"
                    >
                      <ClipboardList className="mr-2 h-4 w-4 text-plp-dark" />
                      <span>Mesa de Entradas</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              <DropdownMenuSeparator className="bg-gray-200" />
              <DropdownMenuItem
                onClick={() => router.push("/usuario-basico/gestion/mis-entidades")}
                className="hover:bg-gray-100 focus:bg-gray-100 text-gray-700"
              >
                <Building className="mr-2 h-4 w-4 text-plp-dark" />
                <span>Mis entidades</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-100 focus:bg-gray-100 text-gray-700">
                <HelpCircle className="mr-2 h-4 w-4 text-plp-dark" />
                <span>Ayuda</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-200" />
              <DropdownMenuItem className="hover:bg-gray-100 focus:bg-gray-100 text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Modal para calificar proveedor desde notificación */}
      <Dialog open={isCalificarModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Calificar Proveedor</DialogTitle>
            <DialogDescription>
              {selectedProveedor?.nombre} - {selectedProveedor?.cuit}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="mb-4">
              <Label htmlFor="calificacion" className="block mb-2">
                Calificación
              </Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setCalificacion(star)} className="focus:outline-none">
                    <svg
                      className={`w-8 h-8 ${star <= calificacion ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="comentario" className="block mb-2">
                Comentario (opcional)
              </Label>
              <textarea
                id="comentario"
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
                placeholder="Ingrese un comentario sobre el proveedor..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button className="bg-plp-dark hover:bg-plp-medium" onClick={handleGuardarCalificacion}>
              Guardar calificación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  )
}
