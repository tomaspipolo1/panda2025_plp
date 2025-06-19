"use client"

export default function NuevoProveedorClientPage() {
  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Nuevo Proveedor</h1>
        <p className="text-gray-500 mt-2">Complete el formulario para registrar un nuevo proveedor</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Aquí iría el formulario para crear un nuevo proveedor */}
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="razonSocial" className="block text-sm font-medium text-gray-700 mb-1">
                Razón Social *
              </label>
              <input
                type="text"
                id="razonSocial"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
                placeholder="Ingrese la razón social"
                required
              />
            </div>
            <div>
              <label htmlFor="cuit" className="block text-sm font-medium text-gray-700 mb-1">
                CUIT *
              </label>
              <input
                type="text"
                id="cuit"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
                placeholder="XX-XXXXXXXX-X"
                required
              />
            </div>
            <div>
              <label htmlFor="nombreContacto" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de Contacto *
              </label>
              <input
                type="text"
                id="nombreContacto"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
                placeholder="Ingrese el nombre de contacto"
                required
              />
            </div>
            <div>
              <label htmlFor="emailContacto" className="block text-sm font-medium text-gray-700 mb-1">
                Email de Contacto *
              </label>
              <input
                type="email"
                id="emailContacto"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
                placeholder="ejemplo@empresa.com"
                required
              />
            </div>
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                id="telefono"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
                placeholder="Ingrese el teléfono"
              />
            </div>
            <div>
              <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-1">
                Dirección *
              </label>
              <input
                type="text"
                id="direccion"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
                placeholder="Ingrese la dirección"
                required
              />
            </div>
            <div>
              <label htmlFor="localidad" className="block text-sm font-medium text-gray-700 mb-1">
                Localidad *
              </label>
              <input
                type="text"
                id="localidad"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
                placeholder="Ingrese la localidad"
                required
              />
            </div>
            <div>
              <label htmlFor="provincia" className="block text-sm font-medium text-gray-700 mb-1">
                Provincia *
              </label>
              <select
                id="provincia"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
                required
              >
                <option value="">Seleccione una provincia</option>
                <option value="Buenos Aires">Buenos Aires</option>
                <option value="CABA">Ciudad Autónoma de Buenos Aires</option>
                <option value="Catamarca">Catamarca</option>
                <option value="Chaco">Chaco</option>
                <option value="Chubut">Chubut</option>
                <option value="Córdoba">Córdoba</option>
                <option value="Corrientes">Corrientes</option>
                <option value="Entre Ríos">Entre Ríos</option>
                <option value="Formosa">Formosa</option>
                <option value="Jujuy">Jujuy</option>
                <option value="La Pampa">La Pampa</option>
                <option value="La Rioja">La Rioja</option>
                <option value="Mendoza">Mendoza</option>
                <option value="Misiones">Misiones</option>
                <option value="Neuquén">Neuquén</option>
                <option value="Río Negro">Río Negro</option>
                <option value="Salta">Salta</option>
                <option value="San Juan">San Juan</option>
                <option value="San Luis">San Luis</option>
                <option value="Santa Cruz">Santa Cruz</option>
                <option value="Santa Fe">Santa Fe</option>
                <option value="Santiago del Estero">Santiago del Estero</option>
                <option value="Tierra del Fuego">Tierra del Fuego</option>
                <option value="Tucumán">Tucumán</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={() => window.history.back()}
            >
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-plp-primary text-white rounded-md hover:bg-plp-dark">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
