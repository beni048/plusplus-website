import React from 'react';

interface FormSectionProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}

export default function FormSection({ title, description, children, className = '' }: FormSectionProps) {
    return (
        <div className={`mb-8 ${className}`}>
            <div className="mb-4 border-b border-gray-100 pb-2">
                <h3 className="text-xl font-primary font-medium text-black">{title}</h3>
                {description && (
                    <p className="text-sm text-neutral-dark mt-1 font-secondary">{description}</p>
                )}
            </div>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
}
