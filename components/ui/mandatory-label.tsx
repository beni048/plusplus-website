import React from 'react';

export const MandatoryLabel = ({ children }: { children: React.ReactNode }) => (
    <span>
        {children}
        <span className="text-red-500 ml-1">*</span>
    </span>
);
