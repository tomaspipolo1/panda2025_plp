import { Skeleton } from "@/components/ui/skeleton"

export default function MiBuzonSolicitudesLoading() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <Skeleton className="h-6 w-24 mr-4" />
        <Skeleton className="h-8 w-64" />
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        {/* Barra de herramientas */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-full sm:w-40" />
          </div>
        </div>

        <div className="border-b border-gray-200">
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="p-4 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-4 border-b border-gray-100">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-3 w-10" />
              </div>

              <div className="mb-2">
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-3 w-32" />
              </div>

              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-16" />
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-3 w-6" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
