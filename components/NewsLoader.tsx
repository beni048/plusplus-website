import { Loader2 } from "lucide-react";

export function NewsLoader({ text = "Loading News..." }: { text?: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <Loader2 className="h-10 w-10 text-accent-red animate-spin" />
            <p className="text-lg text-neutral-medium font-secondary tracking-wide animate-pulse">
                {text}
            </p>
        </div>
    );
}
