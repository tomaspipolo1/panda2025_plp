"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronDown, Download, Eye, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Documento {
  id: string
  fecha: string
  numero: string
  cliente: string
  concepto: string
  monto: number
  estado: string
}

interface TablaDocumentosProps {
  documentos: Documento[]
  tipo: "facturas" | "notasCredito" | "notasDebito"
  onVerDetalle?: (documento: Documento) => void
  onDescargarPDF?: (documento: Documento) => void
  onAnular?: (documento: Documento) => void
}

export function TablaDocumentos({
  documentos,
  tipo,
  onVerDetalle = () => {},
  onDescargarPDF = () => {},
  onAnular = () => {},
}: TablaDocumentosProps) {
  const formatMonto = (monto: number) => {
    return `$ ${monto.toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Ingresada":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Ingresada</Badge>
      case "En Proceso":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En Proceso</Badge>
      case "Paga":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paga</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Número</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Concepto</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documentos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                  No se encontraron documentos
                </TableCell>
              </TableRow>
            ) : (
              documentos.map((documento) => (
                <TableRow key={documento.id}>
                  <TableCell>{documento.fecha}</TableCell>
                  <TableCell>{documento.numero}</TableCell>
                  <TableCell>{documento.cliente}</TableCell>
                  <TableCell>{documento.concepto}</TableCell>
                  <TableCell>{formatMonto(documento.monto)}</TableCell>
                  <TableCell>{getEstadoBadge(documento.estado)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onVerDetalle(documento)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDescargarPDF(documento)}>
                          <Download className="mr-2 h-4 w-4" />
                          Descargar PDF
                        </DropdownMenuItem>
                        {documento.estado !== "Anulada" && (
                          <DropdownMenuItem onClick={() => onAnular(documento)}>
                            <XCircle className="mr-2 h-4 w-4" />
                            Anular
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500">
          Mostrando {documentos.length} de {documentos.length} registros
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Anterior
          </Button>
          <Button variant="outline" size="sm" className="bg-[#0a2472] text-white">
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
