'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';

interface DatePickerProps {
    value?: string;
    onChange: (date: string) => void;
    placeholder?: string;
    id?: string;
    name?: string;
}

export function DatePicker({ value, onChange, placeholder, id, name }: DatePickerProps) {
    return (
        <Input
            type="date"
            id={id}
            name={name}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full"
        />
    );
}
