
"use client";

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTranslations } from 'next-intl';
import { getFormSchema, FormValues } from './schema';
import FormSection from './FormSection';
import NaturalPersonSection from './onboarding/NaturalPersonSection';
import LegalEntitySection from './onboarding/LegalEntitySection';
import { generateOnboardingPDF } from '@/lib/pdf-generator';
import { MandatoryLabel } from '@/components/ui/mandatory-label';

export default function OnboardingForm() {
    const t = useTranslations('onboardingForm');
    const formSchema = useMemo(() => getFormSchema(t), [t]);

    // Lifted file state - could be moved to context if needed, but fine here for now
    const [files, setFiles] = useState<{ [key: string]: File[] }>({});
    const [submitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

    // External error states for manual file validation
    const [passportError, setPassportError] = useState<string | null>(null);
    const [commercialRegisterError, setCommercialRegisterError] = useState<string | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            entityType: undefined,
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            nationality: '',
            email: '',
            phone: '',
            street: '',
            houseNumber: '',
            zipCode: '',
            city: '',
            country: '',
            idDocumentType: undefined,

            // Opener defaults
            openerFirstName: '',
            openerLastName: '',
            openerFunction: '',
            openerDateOfBirth: '',
            openerNationality: '',
            openerStreet: '',
            openerHouseNumber: '',
            openerZipCode: '',
            openerCity: '',
            openerCountry: '',
            isOpenerAuthorizedSignatory: undefined,
            hasSecondSignatory: undefined,
            numberOfSignatories: undefined,

            // Company defaults
            companyName: '',
            commercialRegisterNumber: '',

            dateOfIncorporation: '',
            domicileStreet: '',
            domicileHouseNumber: '',
            domicileZipCode: '',
            domicileCity: '',
            domicileCountry: '',
            legalEntityType: undefined,

            // Specifics
            hasOwnersMoreThan25Percent: undefined,
            ownersMoreThan25Percent: [],
            managingDirectors: [],
            economicBeneficiaries: [],
            foundationBoardMembers: [],
            foundationBeneficiaries: [],
            nominationRights: [],
            trustBeneficiaries: [],

            detailedBusinessActivity: { type: undefined, otherDetails: '' },
            sourceOfFunds: { type: undefined, otherDetails: '' },

            foundationType: undefined,
            isFoundationRevocable: undefined,
            isFounderDeceased: undefined,
            foundationBeneficiariesFixedClaim: undefined,

            trustType: undefined,
            isTrustRevocable: undefined,
            isSettlorDeceased: undefined,
            trustBeneficiariesFixedClaim: undefined,



            // AML Profile defaults
            amlProfile: {
                profession: '',
                estimatedIncome: undefined,
                estimatedWealth: undefined,
                estimatedLiabilities: undefined,
                originOfAssets: { category: undefined, otherExplanation: '' },
                relationshipPurpose: { type: undefined, otherDetails: '' },
                thirdPartyRelations: { type: undefined, otherDetails: '' },
            }
        },
        mode: "onBlur", // Validate on blur for better UX
    });

    const entityType = form.watch('entityType');

    const handleFileChange = (fieldName: string, newFiles: File[]) => {
        setFiles(prev => ({ ...prev, [fieldName]: newFiles }));
        // Clear errors if files are added
        if (fieldName === 'passport' && newFiles.length > 0) setPassportError(null);
        if (fieldName === 'commercialRegister' && newFiles.length > 0) setCommercialRegisterError(null);
    };

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);
        setSubmitStatus(null);
        setPassportError(null);
        setCommercialRegisterError(null);

        try {
            // 1. Manual File Validation
            let hasError = false;

            // Passport is always required (Natural Person OR Opener for Legal Entity)
            if (!files.passport || files.passport.length === 0) {
                setPassportError(t('messages.passport_required'));
                const element = document.getElementById('passport-upload');
                if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                hasError = true;
            }

            // Commercial Register required for Legal Entity
            if (data.entityType === 'legal_entity' && (!files.commercialRegister || files.commercialRegister.length === 0)) {
                setCommercialRegisterError(t('messages.commercial_register_required'));
                const element = document.getElementById('commercial-register-upload');
                if (element && !hasError) element.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Only scroll if not already scrolled to passport
                hasError = true;
            }

            if (hasError) {
                setIsSubmitting(false);
                return;
            }

            // 2. Prepare Data
            const formData = new FormData();

            // 3. Generate PDF
            const doc = generateOnboardingPDF(data, files);
            const pdfBlob = doc.output('blob');
            formData.append('generated_pdf', pdfBlob, 'client_onboarding_data.pdf');

            // 4. Append Form Fields
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    if (typeof value === 'object' && key !== 'dateOfBirth' && key !== 'dateOfIncorporation') { // exclude Date objects if they are just strings in schema, but here they seem to be strings. Arrays need JSON.stringify
                        formData.append(key, JSON.stringify(value));
                    } else {
                        formData.append(key, String(value));
                    }
                }
            });

            // 5. Append Files
            Object.entries(files).forEach(([key, fileList]) => {
                fileList.forEach(file => {
                    formData.append(key, file);
                });
            });

            // 6. API Submission
            const response = await fetch('/api/submit-application', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Submission failed');
            }

            setSubmitStatus({ success: true, message: t('messages.success') });
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Optional: Reset form?
            // form.reset(); 
            // setFiles({});

        } catch (error) {
            console.error("Submission error:", error);
            setSubmitStatus({
                success: false,
                message: error instanceof Error ? error.message : t('messages.error')
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const onError = (errors: any) => {
        console.log("Form errors:", errors);
        const firstError = Object.keys(errors)[0];

        if (firstError) {
            const element = document.querySelector(`[name = "${firstError}"]`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };

    if (submitStatus?.success) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-2xl mx-auto animate-in fade-in zoom-in duration-500">
                <div className="rounded-full bg-green-100 p-3 mb-6">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
                    {t('messages.success_title')}
                </h2>
                <p className="text-lg text-gray-600 max-w-md mx-auto">
                    {t('messages.success_description')}
                </p>
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8">
                <div className="space-y-6">


                    <FormSection title={t('sections.entity_type')}>
                        <FormField
                            control={form.control}
                            name="entityType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel><MandatoryLabel>{t('fields.entity_type')}</MandatoryLabel></FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('placeholders.select_type')} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="natural_person">{t('options.natural_person')}</SelectItem>
                                            <SelectItem value="legal_entity">{t('options.legal_entity')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </FormSection>

                    {entityType === 'natural_person' && (
                        <NaturalPersonSection
                            onFileChange={handleFileChange}
                            files={files}
                            passportError={passportError}
                        />
                    )}

                    {entityType === 'legal_entity' && (
                        <LegalEntitySection
                            onFileChange={handleFileChange}
                            files={files}
                            passportError={passportError}
                            commercialRegisterError={commercialRegisterError}
                        />
                    )}

                    <div className="pt-6 border-t border-gray-200">
                        {submitStatus && !submitStatus.success && (
                            <div className="mb-4 p-4 rounded-md bg-red-50 text-red-800">
                                {submitStatus.message}
                            </div>
                        )}
                        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={submitting}>
                            {submitting ? t('buttons.submitting') : t('buttons.submit_application')}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}
