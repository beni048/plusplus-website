
export default function Loading() {
    return (
        <div className="min-h-screen bg-neutral-light pt-32">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto text-center mb-16">
                    <div className="h-12 w-1/3 bg-gray-200 animate-pulse mx-auto mb-6 rounded"></div>
                    <div className="h-6 w-1/2 bg-gray-200 animate-pulse mx-auto rounded"></div>
                </div>
                <div className="max-w-4xl mx-auto space-y-12">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="border-b border-gray-100 pb-12">
                            <div className="h-4 w-1/4 bg-gray-200 animate-pulse mb-4 rounded"></div>
                            <div className="h-8 w-3/4 bg-gray-200 animate-pulse mb-4 rounded"></div>
                            <div className="h-24 w-full bg-gray-200 animate-pulse rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
