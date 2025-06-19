import { Skeleton } from "@/components/ui/skeleton"

export default function MiBuzonVisitasLoading() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <Skeleton className="h-8 w-32 mr-4" />
        <Skeleton className="h-8 w-48" />
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-full lg:w-40" />
            <Skeleton className="h-10 w-full lg:w-48" />
            <Skeleton className="h-10 w-full lg:w-40" />
            <Skeleton className="h-10 w-full lg:w-32" />
          </div>
        </div>

        <div className="border-b border-gray-200">
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="p-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-4 border-b border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-4 w-4" />
                  <div>
                    <Skeleton className="h-5 w-48 mb-1" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <Skeleton className="h-4 w-16" />
              </div>

              <div className="mb-3">
                <Skeleton className="h-5 w-40 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
