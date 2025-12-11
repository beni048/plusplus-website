import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface FileUploadProps {
    label: React.ReactNode;
    onChange: (files: File[]) => void;
    accept?: string;
    multiple?: boolean;
    maxSizeMB?: number;
    errorMessage?: string | null;
    hint?: string;
}

export default function FileUpload({
    label,
    onChange,
    accept = "application/pdf,image/*",
    multiple = false,
    maxSizeMB = 5,
    errorMessage,
    hint
}: FileUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [internalError, setInternalError] = useState<string | null>(null);
    const t = useTranslations('onboardingForm');

    const error = errorMessage || internalError;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        // Validate size and type
        const validFiles = files.filter(file => {
            if (file.size > maxSizeMB * 1024 * 1024) {
                setInternalError(t('messages.file_too_large', { name: file.name, maxSize: maxSizeMB }));
                return false;
            }

            // Validate type based on extension (more reliable for user uploads than MIME sometimes)
            // accept prop format: ".pdf,.jpg,.jpeg,.png" or "image/*,application/pdf"
            if (accept) {
                const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
                const acceptTypes = accept.split(',').map(t => t.trim().toLowerCase());

                // Allow if wildcards or exact match
                const isValidType = acceptTypes.some(type => {
                    if (type.startsWith('.')) return type === fileExtension;
                    if (type.endsWith('/*')) {
                        const mainType = type.split('/')[0];
                        return file.type.startsWith(mainType + '/');
                    }
                    return file.type === type;
                });

                if (!isValidType) {
                    setInternalError(t('messages.file_type_not_allowed', { name: file.name, types: accept }));
                    return false;
                }
            }

            return true;
        });

        if (validFiles.length > 0) {
            setInternalError(null);
            const newFiles = multiple ? [...selectedFiles, ...validFiles] : validFiles;
            setSelectedFiles(newFiles);
            onChange(newFiles);
        }

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeFile = (index: number) => {
        const newFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(newFiles);
        onChange(newFiles);
    };

    return (
        <div className="w-full">
            <div className="flex items-center gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2"
                >
                    <Upload size={16} />
                    {label}
                </Button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>

            {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {selectedFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                    {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md text-sm border border-gray-100">
                            <div className="flex items-center gap-2 overflow-hidden">
                                <FileText size={14} className="text-neutral-dark flex-shrink-0" />
                                <span className="truncate text-neutral-dark">{file.name}</span>
                                <span className="text-gray-400 text-xs flex-shrink-0">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
