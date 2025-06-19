"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, Calendar, ArrowRight } from "lucide-react"

export default function MiBuzonPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Mi Buzón</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Mail className="h-5 w-5 mr-2 text-blue-600" />
              Solicitudes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Gestione las solicitudes que requieren su aprobación o revisión personal.
            </p>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-gray-500">Pendientes de revisión</div>
              </div>
              <Link href="/empleado-compras/gestion/mi-buzon/solicitudes">
                <Button variant="outline" className="flex items-center">
                  Ver solicitudes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Calendar className="h-5 w-5 mr-2 text-green-600" />
              Visitas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Revise y apruebe las solicitudes de visitas que requieren su autorización.
            </p>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-gray-500">Pendientes de aprobación</div>
              </div>
              <Link href="/empleado-compras/gestion/mi-buzon/visitas">
                <Button variant="outline" className="flex items-center">
                  Ver visitas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
