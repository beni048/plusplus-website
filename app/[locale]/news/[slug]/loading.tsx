import { NewsLoader } from "@/components/NewsLoader";

export default function Loading() {
    return (
        <main className="min-h-screen bg-neutral-white pt-32 pb-24">
            <div className="container mx-auto px-4">
                <NewsLoader text="Loading Article..." />
            </div>
        </main>
    );
}
