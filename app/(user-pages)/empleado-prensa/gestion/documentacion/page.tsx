"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Folder, ChevronRight, ChevronDown, Plus, Search, ArrowLeft, FileIcon as FilePdf } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { SubirDocumentosModal } from "@/components/documentacion/subir-documentos-modal"

// Definición de tipos
type FileItem = {
  id: string
  name: string
  type: "pdf" | "doc" | "xls" | "other"
  size: string
  updatedAt: string
}

type FolderItem = {
  id: string
  name: string
  files: FileItem[]
  subfolders: FolderItem[]
  expanded?: boolean
}

export default function DocumentacionPage() {
  // Estado inicial con estructura de carpetas
  const [folders, setFolders] = useState<FolderItem[]>([
    {
      id: "1",
      name: "Certificación de Calidad",
      files: [],
      subfolders: [
        {
          id: "1-1",
          name: "Normas ISO",
          files: [
            {
              id: "f1",
              name: "ISO-9001-2023.pdf",
              type: "pdf",
              size: "2.4 MB",
              updatedAt: "15/03/2023",
            },
            {
              id: "f2",
              name: "Manual-Calidad.pdf",
              type: "pdf",
              size: "3.7 MB",
              updatedAt: "10/01/2023",
            },
          ],
          subfolders: [],
        },
      ],
      expanded: false,
    },
    {
      id: "2",
      name: "Tarifario",
      files: [],
      subfolders: [
        {
          id: "2-1",
          name: "Terrestre",
          files: [
            {
              id: "f3",
              name: "Tarifas-Nacionales-2023.pdf",
              type: "pdf",
              size: "1.8 MB",
              updatedAt: "05/02/2023",
            },
            {
              id: "f4",
              name: "Tarifas-Internacionales-2023.pdf",
              type: "pdf",
              size: "2.1 MB",
              updatedAt: "05/02/2023",
            },
          ],
          subfolders: [],
          expanded: false,
        },
        {
          id: "2-2",
          name: "Nautica",
          files: [
            {
              id: "f5",
              name: "Tarifas-Maritimas-2023.pdf",
              type: "pdf",
              size: "1.5 MB",
              updatedAt: "10/02/2023",
            },
          ],
          subfolders: [],
          expanded: false,
        },
      ],
      expanded: false,
    },
    {
      id: "3",
      name: "Manuales Operativos",
      files: [
        {
          id: "f6",
          name: "Manual-Procedimientos.pdf",
          type: "pdf",
          size: "4.2 MB",
          updatedAt: "20/01/2023",
        },
      ],
      subfolders: [],
      expanded: false,
    },
    {
      id: "4",
      name: "Presentaciones Corporativas",
      files: [
        {
          id: "f7",
          name: "Presentacion-Institucional.pdf",
          type: "pdf",
          size: "5.8 MB",
          updatedAt: "15/12/2022",
        },
      ],
      subfolders: [],
      expanded: false,
    },
    {
      id: "5",
      name: "Comunicados de Prensa",
      files: [],
      subfolders: [],
      expanded: false,
    },
  ])

  const [currentPath, setCurrentPath] = useState<string[]>([])
  const [selectedFolder, setSelectedFolder] = useState<FolderItem | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Función para expandir/colapsar carpetas
  const toggleFolder = (folderId: string) => {
    const updateFolders = (items: FolderItem[]): FolderItem[] => {
      return items.map((folder) => {
        if (folder.id === folderId) {
          return { ...folder, expanded: !folder.expanded }
        }

        if (folder.subfolders.length > 0) {
          return {
            ...folder,
            subfolders: updateFolders(folder.subfolders),
          }
        }

        return folder
      })
    }

    setFolders(updateFolders(folders))
  }

  // Función para navegar a una carpeta
  const navigateToFolder = (folder: FolderItem, path: string[]) => {
    setSelectedFolder(folder)
    setCurrentPath(path)
  }

  // Función para volver atrás en la navegación
  const goBack = () => {
    if (currentPath.length > 0) {
      const newPath = [...currentPath]
      newPath.pop()

      // Encontrar la carpeta correspondiente a la nueva ruta
      let targetFolder: FolderItem | null = null
      let tempFolders = folders

      for (const folderName of newPath) {
        const found = tempFolders.find((f) => f.name === folderName)
        if (found) {
          targetFolder = found
          tempFolders = found.subfolders
        }
      }

      setSelectedFolder(targetFolder)
      setCurrentPath(newPath)
    } else {
      setSelectedFolder(null)
      setCurrentPath([])
    }
  }

  // Renderizar carpeta con sus subcarpetas (vista de árbol)
  const renderFolderTree = (folder: FolderItem, depth = 0, parentPath: string[] = []) => {
    const currentPath = [...parentPath, folder.name]

    return (
      <div key={folder.id} className="select-none">
        <div
          className={`flex items-center py-1 px-2 rounded hover:bg-gray-100 cursor-pointer ${depth > 0 ? "ml-" + (depth * 4) : ""}`}
          onClick={() => toggleFolder(folder.id)}
        >
          {folder.expanded ? (
            <ChevronDown className="h-4 w-4 mr-1 text-gray-500" />
          ) : (
            <ChevronRight className="h-4 w-4 mr-1 text-gray-500" />
          )}
          <Folder className="h-5 w-5 mr-2 text-yellow-400" />
          <span
            className="text-sm"
            onClick={(e) => {
              e.stopPropagation()
              navigateToFolder(folder, currentPath)
            }}
          >
            {folder.name}
          </span>
        </div>

        {folder.expanded && (
          <div>{folder.subfolders.map((subfolder) => renderFolderTree(subfolder, depth + 1, currentPath))}</div>
        )}
      </div>
    )
  }

  // Renderizar contenido de la carpeta seleccionada
  const renderFolderContent = () => {
    if (!selectedFolder) return null

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={goBack} disabled={currentPath.length === 0}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Volver
          </Button>
          <span className="text-sm text-gray-500">{currentPath.join(" / ")}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {selectedFolder.subfolders.map((subfolder) => (
            <div
              key={subfolder.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigateToFolder(subfolder, [...currentPath, subfolder.name])}
            >
              <div className="flex flex-col items-center justify-center">
                <Folder className="h-16 w-16 text-yellow-400 mb-2" />
                <h3 className="font-medium text-center">{subfolder.name}</h3>
                <p className="text-xs text-gray-500">{subfolder.files.length} archivos</p>
              </div>
            </div>
          ))}

          {selectedFolder.files.map((file) => (
            <div key={file.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center justify-center">
                <FilePdf className="h-16 w-16 text-red-500 mb-2" />
                <h3 className="font-medium text-center text-sm">{file.name}</h3>
                <p className="text-xs text-gray-500">
                  {file.size} • {file.updatedAt}
                </p>
                <div className="mt-2">
                  <Button variant="outline" size="sm">
                    Ver documento
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Diálogo para crear nueva carpeta
  const NewFolderDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Nueva carpeta
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear nueva carpeta</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nombre de la carpeta</label>
            <Input placeholder="Ingrese el nombre de la carpeta" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Carpeta padre (opcional)</label>
            <select className="w-full border rounded-md px-3 py-2">
              <option value="">Carpeta raíz</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
              {/* Aquí se podrían agregar las subcarpetas de manera dinámica */}
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <DialogTrigger asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogTrigger>
            <Button>Crear carpeta</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Documentación</h1>
        <div className="flex space-x-2">
          <NewFolderDialog />
          <SubirDocumentosModal />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="flex flex-col md:flex-row md:items-start gap-6 p-6">
          {/* Panel izquierdo - Árbol de carpetas */}
          <div className="w-full md:w-1/4 border rounded-lg p-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar carpetas..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              {folders
                .filter((folder) => searchTerm === "" || folder.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((folder) => renderFolderTree(folder))}
            </div>
          </div>

          {/* Panel derecho - Contenido de la carpeta */}
          <div className="w-full md:w-3/4 border rounded-lg p-4">
            {selectedFolder ? (
              renderFolderContent()
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {folders.map((folder) => (
                  <div
                    key={folder.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => navigateToFolder(folder, [folder.name])}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Folder className="h-16 w-16 text-yellow-400 mb-2" />
                      <h3 className="font-medium text-center">{folder.name}</h3>
                      <p className="text-xs text-gray-500">
                        {folder.subfolders.length} subcarpetas • {folder.files.length} archivos
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
