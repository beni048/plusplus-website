export function NewsSkeleton({ count = 3 }: { count?: number }) {
    return (
        <div className="space-y-12">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="border-b border-gray-100 pb-12 last:border-0 flex flex-col md:flex-row gap-10 items-start">
                    {/* Image Skeleton */}
                    <div className="relative w-full md:w-72 md:h-56 flex-shrink-0 bg-gray-100 animate-pulse rounded-2xl"></div>

                    {/* Content Skeleton */}
                    <div className="flex-1 w-full py-1 space-y-4">
                        <div className="flex items-center space-x-3 text-sm">
                            <div className="h-4 w-24 bg-gray-100 animate-pulse rounded"></div>
                            <div className="h-4 w-4 bg-gray-100 animate-pulse rounded-full"></div>
                            <div className="h-4 w-24 bg-gray-100 animate-pulse rounded"></div>
                        </div>

                        <div className="h-10 w-3/4 bg-gray-100 animate-pulse rounded"></div>
                        <div className="space-y-2">
                            <div className="h-6 w-full bg-gray-100 animate-pulse rounded"></div>
                            <div className="h-6 w-5/6 bg-gray-100 animate-pulse rounded"></div>
                            <div className="h-6 w-4/6 bg-gray-100 animate-pulse rounded"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
