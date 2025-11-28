'use client';

import { useEffect, useRef } from 'react';

export default function JotFormEmbed() {
    const containerRef = useRef<HTMLDivElement>(null);
    const loaded = useRef(false);

    useEffect(() => {
        if (loaded.current) return;
        loaded.current = true;

        const script = document.createElement('script');
        script.src = "https://form.jotform.com/jsform/253303657384056";
        script.type = "text/javascript";
        script.async = true;

        if (containerRef.current) {
            containerRef.current.appendChild(script);
        }

        return () => {
            // Cleanup is tricky because the script modifies the DOM outside of React's control.
            // We can try to clear the container, but if the user navigates away and back, 
            // we want a fresh start.
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
            loaded.current = false;
        };
    }, []);

    return (
        <div className="relative w-full">
            <div ref={containerRef} className="w-full min-h-[500px]" />
            {/* Overlay to hide JotForm branding */}
            <div className="absolute bottom-0 left-0 w-full h-[60px] bg-neutral-white z-10 pointer-events-none" />
        </div>
    );
}
