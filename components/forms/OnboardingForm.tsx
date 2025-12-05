'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormValues } from './schema';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import FormSection from './FormSection';
import PersonList from './PersonList';
import FileUpload from './FileUpload';
import { AddressSearch } from './AddressSearch';
import { DatePicker } from '@/components/ui/date-picker';
import { useTranslations } from 'next-intl';
import jsPDF from 'jspdf';
import { MandatoryLabel } from '@/components/ui/mandatory-label';

export default function OnboardingForm() {
    const t = useTranslations('onboardingForm');

    const [files, setFiles] = useState<{ [key: string]: File[] }>({});

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            entityType: undefined,
            // Natural Person
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            street: "",
            houseNumber: "",
            zipCode: "",
            city: "",
            country: "",
            dateOfBirth: "",
            nationality: "",
            idDocumentType: undefined,
            // AML profile fields (optional)
            amlProfile: {
                profession: "",
                estimatedIncome: "",
                estimatedWealth: "",
                estimatedLiabilities: "",
                originOfAssets: {
                    category: undefined,
                    amount: "",
                    currency: "",
                    description: "",
                },
                relationshipPurpose: {
                    type: undefined,
                    otherDetails: ""
                },
                plannedTransactionVolume: "",
                thirdPartyRelations: {
                    type: undefined,
                    otherDetails: ""
                },
            },
            specialClarifications: "",

            // Legal Entity - Opener
            openerFirstName: "",
            openerLastName: "",
            openerDateOfBirth: "",
            openerNationality: "",
            openerFunction: "",
            openerStreet: "",
            openerHouseNumber: "",
            openerZipCode: "",
            openerCity: "",
            openerCountry: "",
            detailedBusinessActivity: {
                type: undefined,
                otherDetails: ""
            },
            sourceOfFunds: {
                type: undefined,
                otherDetails: ""
            },
            isOpenerAuthorizedSignatory: undefined,
            authorizedSignatory1: { fullName: "", dateOfBirth: "", nationality: "" },
            authorizedSignatory2: { fullName: "", dateOfBirth: "", nationality: "" },

            // Legal Entity - Company
            companyName: "",
            domicileStreet: "",
            domicileHouseNumber: "",
            domicileZipCode: "",
            domicileCity: "",
            domicileCountry: "",
            legalEntityType: undefined,

            // Operative Company
            hasOwnersMoreThan25Percent: undefined,
            managingDirectors: [],
            ownersMoreThan25Percent: [],

            // Foundation
            foundationType: undefined,
            isFoundationRevocable: undefined,
            founder: { fullName: "", street: "", houseNumber: "", zipCode: "", city: "", country: "", dateOfBirth: "", nationality: "" },
            isFounderDeceased: undefined,
            foundationBoardMembers: [],
            foundationBeneficiaries: [],
            foundationBeneficiariesFixedClaim: undefined,
            nominationRights: [],

            // Trust
            trustType: undefined,
            isTrustRevocable: undefined,
            settlor: { fullName: "", street: "", houseNumber: "", zipCode: "", city: "", country: "", dateOfBirth: "", nationality: "" },
            isSettlorDeceased: undefined,
            trustee: { fullName: "", street: "", houseNumber: "", zipCode: "", city: "", country: "", dateOfBirth: "", nationality: "" },
            protector: { fullName: "", street: "", houseNumber: "", zipCode: "", city: "", country: "", dateOfBirth: "", nationality: "" },
            trustBeneficiaries: [],
            trustBeneficiariesFixedClaim: undefined,

            // Common Lists
            economicBeneficiaries: [],
        },
    });

    const entityType = form.watch('entityType');
    const legalEntityType = form.watch('legalEntityType');


    const handleFileChange = (fieldName: string, newFiles: File[]) => {
        setFiles(prev => ({ ...prev, [fieldName]: newFiles }));
    };

    const generatePDF = (data: FormValues): jsPDF => {
        const doc = new jsPDF();
        let y = 20;

        doc.setFontSize(20);
        doc.text("Client On-boarding Data", 20, y);
        y += 15;

        doc.setFontSize(12);

        const addLine = (label: string, value: string | undefined) => {
            if (value) {
                doc.text(`${label}: ${value}`, 20, y);
                y += 10;
                if (y > 280) {
                    doc.addPage();
                    y = 20;
                }
            }
        };

        const addSectionHeader = (title: string) => {
            y += 5;
            doc.setFontSize(14);
            doc.text(title, 20, y);
            y += 10;
            doc.setFontSize(12);
        };

        const addPersonDetails = (label: string, person: any) => {
            if (person && person.fullName) {
                addSectionHeader(label);
                addLine("Name", person.fullName);
                const address = `${person.street || ''}, ${person.houseNumber || ''}, ${person.zipCode || ''} ${person.city || ''}, ${person.country || ''}`;
                addLine("Address", address);
                addLine("DOB", person.dateOfBirth);
                addLine("Nationality", person.nationality);
            }
        };

        const addPersonList = (title: string, list: any[] | undefined) => {
            if (list && list.length > 0) {
                addSectionHeader(title);
                list.forEach((person, index) => {
                    addLine(`#${index + 1} Name`, person.fullName);
                    const address = `${person.street || ''}, ${person.houseNumber || ''}, ${person.zipCode || ''} ${person.city || ''}, ${person.country || ''}`;
                    addLine(`   Address`, address);
                    addLine(`   DOB`, person.dateOfBirth);
                    addLine(`   Nationality`, person.nationality);
                    y += 5;
                });
            }
        };

        addLine("Entity Type", data.entityType === 'natural_person' ? 'Natural Person' : 'Legal Entity');

        if (data.entityType === 'natural_person') {
            addSectionHeader("Personal Information");
            addLine("First Name", data.firstName);
            addLine("Last Name", data.lastName);
            addLine("Date of Birth", data.dateOfBirth);
            addLine("Nationality", data.nationality);
            addLine("Email", data.email);
            addLine("Phone", data.phone);
            addLine("Address", `${data.street}, ${data.zipCode} ${data.city}, ${data.country}`);
        } else {
            // Opener Details
            addSectionHeader("Opener Details");
            addLine("First Name", data.openerFirstName);
            addLine("Last Name", data.openerLastName);
            addLine("Function", data.openerFunction);
            addLine("Date of Birth", data.openerDateOfBirth);
            addLine("Nationality", data.openerNationality);
            addLine("Address", `${data.openerStreet || ''}, ${data.openerHouseNumber || ''}, ${data.openerZipCode || ''} ${data.openerCity || ''}, ${data.openerCountry || ''}`);
            addLine("Detailed Business Activity", data.detailedBusinessActivity?.type === 'other' ? data.detailedBusinessActivity.otherDetails : data.detailedBusinessActivity?.type);
            addLine("Source of Funds", data.sourceOfFunds?.type === 'other' ? data.sourceOfFunds.otherDetails : data.sourceOfFunds?.type);
            addLine("Authorized Signatory", data.isOpenerAuthorizedSignatory);

            if (data.isOpenerAuthorizedSignatory === 'no') {
                if (data.authorizedSignatory1?.fullName) {
                    addSectionHeader("Authorized Signatory 1");
                    addLine("Name", data.authorizedSignatory1.fullName);
                    addLine("DOB", data.authorizedSignatory1.dateOfBirth);
                    addLine("Nationality", data.authorizedSignatory1.nationality);
                }
                if (data.authorizedSignatory2?.fullName) {
                    addSectionHeader("Authorized Signatory 2");
                    addLine("Name", data.authorizedSignatory2.fullName);
                    addLine("DOB", data.authorizedSignatory2.dateOfBirth);
                    addLine("Nationality", data.authorizedSignatory2.nationality);
                }
            }

            // Company Info
            addSectionHeader("Company Information");
            addLine("Company Name", data.companyName);
            addLine("Domicile Address", `${data.domicileStreet || ''}, ${data.domicileHouseNumber || ''}, ${data.domicileZipCode || ''} ${data.domicileCity || ''}, ${data.domicileCountry || ''}`);

            const typeLabel = data.legalEntityType === 'operative_company' ? 'Operative Company' :
                data.legalEntityType === 'domiciliary_company' ? 'Domiciliary Company' :
                    data.legalEntityType === 'foundation' ? 'Foundation' :
                        data.legalEntityType === 'trust' ? 'Trust' : data.legalEntityType;
            addLine("Legal Entity Type", typeLabel);

            if (data.legalEntityType === 'operative_company' || data.legalEntityType === 'domiciliary_company') {
                if (data.legalEntityType === 'operative_company') {
                    addLine("Has Owners > 25%", data.hasOwnersMoreThan25Percent);
                    if (data.hasOwnersMoreThan25Percent === 'yes') {
                        addPersonList("Owners > 25%", data.ownersMoreThan25Percent);
                    } else if (data.hasOwnersMoreThan25Percent === 'no') {
                        addPersonList("Managing Directors", data.managingDirectors);
                    }
                } else {
                    // Domiciliary Company always shows Managing Directors? 
                    // The requirement was specifically for Operative Company logic.
                    // But Domiciliary usually has directors too.
                    // Let's assume Domiciliary shows Managing Directors always as per previous logic, 
                    // or maybe it follows the same logic?
                    // The prompt said "Operative Company Logic".
                    // For Domiciliary, the previous code showed Managing Directors.
                    addPersonList("Managing Directors", data.managingDirectors);
                }
            } else if (data.legalEntityType === 'foundation') {
                addSectionHeader("Foundation Details");
                addLine("Type", data.foundationType);
                addLine("Revocable", data.isFoundationRevocable);
                addPersonDetails("Founder", data.founder);
                addLine("Is Founder Deceased", data.isFounderDeceased);
                addPersonList("Foundation Board Members", data.foundationBoardMembers);
                addPersonList("Foundation Beneficiaries", data.foundationBeneficiaries);
                addLine("Beneficiaries Fixed Claim", data.foundationBeneficiariesFixedClaim);
                addPersonList("Nomination Rights", data.nominationRights);
            } else if (data.legalEntityType === 'trust') {
                addSectionHeader("Trust Details");
                addLine("Type", data.trustType);
                addLine("Revocable", data.isTrustRevocable);
                addPersonDetails("Settlor", data.settlor);
                addLine("Is Settlor Deceased", data.isSettlorDeceased);
                addPersonDetails("Trustee", data.trustee);
                addPersonDetails("Protector", data.protector);
                addPersonList("Trust Beneficiaries", data.trustBeneficiaries);
                addLine("Beneficiaries Fixed Claim", data.trustBeneficiariesFixedClaim);
            }

            // Economic Beneficiaries (Common)
            addPersonList("Economic Beneficiaries", data.economicBeneficiaries);
        }

        // List attached files
        y += 5;
        doc.setFontSize(14);
        doc.text("Attached Files", 20, y);
        y += 10;
        doc.setFontSize(12);
        Object.entries(files).forEach(([key, fileList]) => {
            if (fileList.length > 0) {
                addLine(key, fileList.map(f => f.name).join(', '));
            }
        });

        return doc;
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);
    const [passportError, setPassportError] = useState<string | null>(null);

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);
        setSubmitStatus(null);
        setPassportError(null);

        try {
            // Manual validation for files
            if (data.entityType === 'natural_person') {
                if (!files.passport || files.passport.length === 0) {
                    setPassportError(t('messages.passportRequired'));
                    setIsSubmitting(false);
                    // Scroll to top or to the error
                    const element = document.getElementById('passport-upload');
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                    return;
                }
            }

            const formData = new FormData();

            // Generate PDF Blob
            const doc = generatePDF(data);
            const pdfBlob = doc.output('blob');
            formData.append('generated_pdf', pdfBlob, 'client_onboarding_data.pdf');

            // Append all form fields
            (Object.entries(data) as [string, any][]).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    if (Array.isArray(value)) {
                        formData.append(key, JSON.stringify(value));
                    } else {
                        formData.append(key, String(value));
                    }
                }
            });

            // Append files
            Object.entries(files).forEach(([key, fileList]) => {
                fileList.forEach(file => {
                    formData.append(key, file);
                });
            });

            const response = await fetch('/api/submit-application', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Submission failed');
            }

            setSubmitStatus({ success: true, message: t('messages.success') });

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (error: any) {
            console.error("Submission error:", error);
            setSubmitStatus({ success: false, message: error.message || t('messages.error') });
        } finally {
            setIsSubmitting(false);
        }
    };

    const onError = (errors: any) => {
        console.error("Form Validation Errors:", errors);
    };

    if (submitStatus?.success) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{t('messages.successTitle')}</h2>
                <p className="text-lg text-gray-600 max-w-md">
                    {t('messages.successDescription')}
                </p>
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8">

                {/* Entity Type Selection */}
                <FormSection title={t('sections.entityType')}>
                    <FormField
                        control={form.control}
                        name="entityType"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="natural_person" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {t('options.naturalPerson')}
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="legal_entity" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {t('options.legalEntity')}
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </FormSection>

                {/* Natural Person Fields */}
                {entityType === 'natural_person' && (
                    <FormSection title={t('sections.personalInfo')}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel><MandatoryLabel>{t('fields.firstName')}</MandatoryLabel></FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel><MandatoryLabel>{t('fields.lastName')}</MandatoryLabel></FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dateOfBirth"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel><MandatoryLabel>{t('fields.dateOfBirth')}</MandatoryLabel></FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                value={field.value}
                                                onChange={field.onChange}
                                                name={field.name}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="nationality"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel><MandatoryLabel>{t('fields.nationality')}</MandatoryLabel></FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel><MandatoryLabel>{t('fields.email')}</MandatoryLabel></FormLabel>
                                        <FormControl><Input {...field} type="email" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('fields.phone')}</FormLabel>
                                        <FormControl><Input {...field} type="tel" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="md:col-span-2 space-y-4">
                                <AddressSearch
                                    label={t('fields.address')}
                                    onSelect={(address) => {
                                        form.setValue('street', address.street);
                                        form.setValue('houseNumber', address.houseNumber);
                                        form.setValue('zipCode', address.zipCode);
                                        form.setValue('city', address.city);
                                        form.setValue('country', address.country);
                                    }}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField control={form.control} name="street" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.street')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name="houseNumber" render={({ field }) => (<FormItem><FormLabel>{t('fields.houseNumber')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name="zipCode" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.zipCode')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name="city" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.city')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name="country" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel><MandatoryLabel>{t('fields.country')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="idDocumentType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel><MandatoryLabel>{t('fields.idDocumentType')}</MandatoryLabel></FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t('placeholders.selectType')} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="passport">{t('options.passport')}</SelectItem>
                                                <SelectItem value="id">{t('options.id')}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="mt-6 flex items-center gap-2" id="passport-upload">
                            <div className="flex flex-col">
                                <FormLabel className="mb-0 whitespace-nowrap"><MandatoryLabel>{t('buttons.uploadPassport')}</MandatoryLabel></FormLabel>
                                <span className="text-xs text-muted-foreground">
                                    {form.watch('idDocumentType') === 'id' && t('fields.idCardHint')}
                                </span>
                            </div>
                            <FileUpload
                                label={null}
                                multiple={true}
                                onChange={(files) => {
                                    handleFileChange('passport', files);
                                    if (files.length > 0) setPassportError(null);
                                }}
                                errorMessage={passportError}
                            />
                        </div>

                        <FormSection title={t('sections.amlProfile')}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="amlProfile.profession"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><MandatoryLabel>{t('fields.profession')}</MandatoryLabel></FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="amlProfile.estimatedIncome"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><MandatoryLabel>{t('fields.estimatedIncome')}</MandatoryLabel></FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="amlProfile.estimatedWealth"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><MandatoryLabel>{t('fields.estimatedWealth')}</MandatoryLabel></FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="amlProfile.estimatedLiabilities"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><MandatoryLabel>{t('fields.estimatedLiabilities')}</MandatoryLabel></FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mt-4 space-y-4">
                                <h4 className="text-sm font-medium">{t('fields.originOfAssets')}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="amlProfile.originOfAssets.category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><MandatoryLabel>{t('fields.originOfAssetsCategory')}</MandatoryLabel></FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder={t('placeholders.selectOption')} />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="salary_employment">{t('options.salaryEmployment')}</SelectItem>
                                                        <SelectItem value="savings">{t('options.savings')}</SelectItem>
                                                        <SelectItem value="investment_capital_gains">{t('options.investmentCapitalGains')}</SelectItem>
                                                        <SelectItem value="real_estate_sale">{t('options.realEstateSale')}</SelectItem>
                                                        <SelectItem value="company_sale">{t('options.companySale')}</SelectItem>
                                                        <SelectItem value="inheritance_gift">{t('options.inheritanceGift')}</SelectItem>
                                                        <SelectItem value="loan">{t('options.loan')}</SelectItem>
                                                        <SelectItem value="lottery_gambling">{t('options.lotteryGambling')}</SelectItem>
                                                        <SelectItem value="other">{t('options.other')}</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {form.watch('amlProfile.originOfAssets.category') === 'other' && (
                                        <FormField
                                            control={form.control}
                                            name="amlProfile.originOfAssets.otherExplanation"
                                            render={({ field }) => (
                                                <FormItem className="md:col-span-2">
                                                    <FormLabel><MandatoryLabel>{t('fields.pleaseSpecify')}</MandatoryLabel></FormLabel>
                                                    <FormControl><Input {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}
                                    <FormField
                                        control={form.control}
                                        name="amlProfile.originOfAssets.amount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><MandatoryLabel>{t('fields.originOfAssetsAmount')}</MandatoryLabel></FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="amlProfile.originOfAssets.currency"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><MandatoryLabel>{t('fields.originOfAssetsCurrency')}</MandatoryLabel></FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="amlProfile.originOfAssets.description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><MandatoryLabel>{t('fields.originOfAssetsDescription')}</MandatoryLabel></FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="mt-4 grid grid-cols-1 gap-6">
                                <FormField
                                    control={form.control}
                                    name="amlProfile.relationshipPurpose.type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><MandatoryLabel>{t('fields.relationshipPurpose')}</MandatoryLabel></FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={t('placeholders.selectOption')} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="wealth_preservation">{t('options.wealthPreservation')}</SelectItem>
                                                    <SelectItem value="capital_appreciation">{t('options.capitalAppreciation')}</SelectItem>
                                                    <SelectItem value="income_generation">{t('options.incomeGeneration')}</SelectItem>
                                                    <SelectItem value="diversification">{t('options.diversification')}</SelectItem>
                                                    <SelectItem value="transactional_banking">{t('options.transactionalBanking')}</SelectItem>
                                                    <SelectItem value="asset_management">{t('options.assetManagement')}</SelectItem>
                                                    <SelectItem value="other">{t('options.other')}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>{t('fields.relationshipPurposeDescription')}</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {form.watch('amlProfile.relationshipPurpose.type') === 'other' && (
                                    <FormField
                                        control={form.control}
                                        name="amlProfile.relationshipPurpose.otherDetails"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><MandatoryLabel>{t('fields.pleaseSpecify')}</MandatoryLabel></FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                                <FormField
                                    control={form.control}
                                    name="amlProfile.plannedTransactionVolume"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><MandatoryLabel>{t('fields.plannedTransactionVolume')}</MandatoryLabel></FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="amlProfile.thirdPartyRelations.type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><MandatoryLabel>{t('fields.thirdPartyRelations')}</MandatoryLabel></FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={t('placeholders.selectOption')} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="no_beneficial_owner">{t('options.noBeneficialOwner')}</SelectItem>
                                                    <SelectItem value="advisor_attorney">{t('options.advisorAttorney')}</SelectItem>
                                                    <SelectItem value="family_member">{t('options.familyMember')}</SelectItem>
                                                    <SelectItem value="business_partner">{t('options.businessPartner')}</SelectItem>
                                                    <SelectItem value="trustee">{t('options.trustee')}</SelectItem>
                                                    <SelectItem value="other">{t('options.other')}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>{t('fields.thirdPartyRelationsDescription')}</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {form.watch('amlProfile.thirdPartyRelations.type') === 'other' && (
                                    <FormField
                                        control={form.control}
                                        name="amlProfile.thirdPartyRelations.otherDetails"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><MandatoryLabel>{t('fields.pleaseSpecify')}</MandatoryLabel></FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </div>
                        </FormSection>

                        <FormSection title={t('sections.specialClarifications')}>
                            <FormField
                                control={form.control}
                                name="specialClarifications"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('fields.specialClarifications')}</FormLabel>
                                        <FormControl>
                                            <textarea
                                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </FormSection>

                    </FormSection>
                )}

                {/* Legal Entity Fields */}
                {entityType === 'legal_entity' && (
                    <>
                        {/* Opener Details */}
                        <FormSection title={t('sections.openerDetails')}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="openerFirstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><MandatoryLabel>{t('fields.openerFirstName')}</MandatoryLabel></FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="openerLastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><MandatoryLabel>{t('fields.openerLastName')}</MandatoryLabel></FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="openerFunction"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><MandatoryLabel>{t('fields.openerFunction')}</MandatoryLabel></FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="openerDateOfBirth"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><MandatoryLabel>{t('fields.openerDateOfBirth')}</MandatoryLabel></FormLabel>
                                            <FormControl>
                                                <DatePicker
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    name={field.name}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="openerNationality"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><MandatoryLabel>{t('fields.openerNationality')}</MandatoryLabel></FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="md:col-span-2 space-y-4">
                                    <AddressSearch
                                        label={t('fields.openerAddress')}
                                        onSelect={(address) => {
                                            form.setValue('openerStreet', address.street);
                                            form.setValue('openerHouseNumber', address.houseNumber);
                                            form.setValue('openerZipCode', address.zipCode);
                                            form.setValue('openerCity', address.city);
                                            form.setValue('openerCountry', address.country);
                                        }}
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField control={form.control} name="openerStreet" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.street')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="openerHouseNumber" render={({ field }) => (<FormItem><FormLabel>{t('fields.houseNumber')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="openerZipCode" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.zipCode')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="openerCity" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.city')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="openerCountry" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel><MandatoryLabel>{t('fields.country')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-2" id="passport-upload">
                                <div className="flex flex-col">
                                    <FormLabel className="mb-0 whitespace-nowrap"><MandatoryLabel>{t('buttons.uploadPassport')}</MandatoryLabel></FormLabel>

                                </div>
                                <FileUpload
                                    label={null}
                                    multiple={true}
                                    onChange={(files) => {
                                        handleFileChange('passport', files);
                                        if (files.length > 0) setPassportError(null);
                                    }}
                                    errorMessage={passportError}
                                />
                            </div>

                            <div className="mt-6">
                                <FormField
                                    control={form.control}
                                    name="isOpenerAuthorizedSignatory"
                                    render={({ field }) => (
                                        <FormItem className="mb-6">
                                            <FormLabel><MandatoryLabel>{t('fields.isOpenerAuthorizedSignatory')}</MandatoryLabel></FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={t('placeholders.selectOption')} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="yes">{t('options.yes')}</SelectItem>
                                                    <SelectItem value="no">{t('options.no')}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {form.watch('isOpenerAuthorizedSignatory') === 'yes' && (
                                    <div className="space-y-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <FormField
                                            control={form.control}
                                            name="hasSecondSignatory"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t('fields.hasSecondSignatory')}</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder={t('placeholders.selectOption')} />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="yes">{t('options.yes')}</SelectItem>
                                                            <SelectItem value="no">{t('options.no')}</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {form.watch('hasSecondSignatory') === 'yes' && (
                                            <div className="mt-4">
                                                <h4 className="font-medium mb-4">{t('fields.authorizedSignatory2')}</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <FormField control={form.control} name="authorizedSignatory2.fullName" render={({ field }) => (<FormItem><FormLabel>{t('fields.fullName')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                    <FormField control={form.control} name="authorizedSignatory2.dateOfBirth" render={({ field }) => (<FormItem><FormLabel>{t('fields.dateOfBirth')}</FormLabel><FormControl><Input {...field} type="date" /></FormControl><FormMessage /></FormItem>)} />
                                                    <FormField control={form.control} name="authorizedSignatory2.nationality" render={({ field }) => (<FormItem><FormLabel>{t('fields.nationality')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {form.watch('isOpenerAuthorizedSignatory') === 'no' && (
                                    <div className="space-y-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <FormField
                                            control={form.control}
                                            name="numberOfSignatories"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t('fields.numberOfSignatories')}</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder={t('placeholders.selectOption')} />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="1">1</SelectItem>
                                                            <SelectItem value="2">2</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {(form.watch('numberOfSignatories') === '1' || form.watch('numberOfSignatories') === '2') && (
                                            <div className="mt-4">
                                                <h4 className="font-medium mb-4">{t('fields.authorizedSignatory1')}</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <FormField control={form.control} name="authorizedSignatory1.fullName" render={({ field }) => (<FormItem><FormLabel>{t('fields.fullName')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                    <FormField control={form.control} name="authorizedSignatory1.dateOfBirth" render={({ field }) => (<FormItem><FormLabel>{t('fields.dateOfBirth')}</FormLabel><FormControl><Input {...field} type="date" /></FormControl><FormMessage /></FormItem>)} />
                                                    <FormField control={form.control} name="authorizedSignatory1.nationality" render={({ field }) => (<FormItem><FormLabel>{t('fields.nationality')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                </div>
                                            </div>
                                        )}

                                        {form.watch('numberOfSignatories') === '2' && (
                                            <div className="mt-4">
                                                <h4 className="font-medium mb-4">{t('fields.authorizedSignatory2')}</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <FormField control={form.control} name="authorizedSignatory2.fullName" render={({ field }) => (<FormItem><FormLabel>{t('fields.fullName')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                    <FormField control={form.control} name="authorizedSignatory2.dateOfBirth" render={({ field }) => (<FormItem><FormLabel>{t('fields.dateOfBirth')}</FormLabel><FormControl><Input {...field} type="date" /></FormControl><FormMessage /></FormItem>)} />
                                                    <FormField control={form.control} name="authorizedSignatory2.nationality" render={({ field }) => (<FormItem><FormLabel>{t('fields.nationality')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </FormSection>

                        <FormSection title={t('sections.companyInfo')}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="companyName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><MandatoryLabel>{t('fields.companyName')}</MandatoryLabel></FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="md:col-span-2 space-y-4">
                                    <AddressSearch
                                        label={t('fields.domicileAddress')}
                                        onSelect={(address) => {
                                            form.setValue('domicileStreet', address.street);
                                            form.setValue('domicileHouseNumber', address.houseNumber);
                                            form.setValue('domicileZipCode', address.zipCode);
                                            form.setValue('domicileCity', address.city);
                                            form.setValue('domicileCountry', address.country);
                                        }}
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField control={form.control} name="domicileStreet" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.street')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="domicileHouseNumber" render={({ field }) => (<FormItem><FormLabel>{t('fields.houseNumber')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="domicileZipCode" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.zipCode')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="domicileCity" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.city')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="domicileCountry" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel><MandatoryLabel>{t('fields.country')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <FileUpload
                                    label={t('buttons.uploadCommercialRegister')}
                                    onChange={(files) => handleFileChange('commercialRegister', files)}
                                />
                            </div>
                        </FormSection>

                        <FormSection title={t('sections.legalEntityType')}>
                            <FormField
                                control={form.control}
                                name="legalEntityType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel><MandatoryLabel>{t('fields.legalEntityType')}</MandatoryLabel></FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t('placeholders.selectType')} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="operative_company">{t('options.operativeCompany')}</SelectItem>
                                                <SelectItem value="domiciliary_company">{t('options.domiciliaryCompany')}</SelectItem>
                                                <SelectItem value="foundation">{t('options.foundation')}</SelectItem>
                                                <SelectItem value="trust">{t('options.trust')}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                                <FormField
                                    control={form.control}
                                    name="detailedBusinessActivity.type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><MandatoryLabel>{t('fields.detailedBusinessActivity')}</MandatoryLabel></FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={t('placeholders.selectBusinessActivity')} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="financial_services">{t('options.financialServices')}</SelectItem>
                                                    <SelectItem value="real_estate_construction">{t('options.realEstateConstruction')}</SelectItem>
                                                    <SelectItem value="technology_software">{t('options.technologySoftware')}</SelectItem>
                                                    <SelectItem value="manufacturing_industrial">{t('options.manufacturingIndustrial')}</SelectItem>
                                                    <SelectItem value="trade_commerce">{t('options.tradeCommerce')}</SelectItem>
                                                    <SelectItem value="energy_mining">{t('options.energyMining')}</SelectItem>
                                                    <SelectItem value="healthcare_pharma">{t('options.healthcarePharma')}</SelectItem>
                                                    <SelectItem value="transport_logistics">{t('options.transportLogistics')}</SelectItem>
                                                    <SelectItem value="tourism_hospitality">{t('options.tourismHospitality')}</SelectItem>
                                                    <SelectItem value="public_sector">{t('options.publicSector')}</SelectItem>
                                                    <SelectItem value="professional_services">{t('options.professionalServices')}</SelectItem>
                                                    <SelectItem value="gaming_gambling">{t('options.gamingGambling')}</SelectItem>
                                                    <SelectItem value="crypto_virtual_assets">{t('options.cryptoVirtualAssets')}</SelectItem>
                                                    <SelectItem value="other">{t('options.other')}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {form.watch('detailedBusinessActivity.type') === 'other' && (
                                    <FormField
                                        control={form.control}
                                        name="detailedBusinessActivity.otherDetails"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><MandatoryLabel>{t('fields.pleaseSpecify')}</MandatoryLabel></FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}

                                <FormField
                                    control={form.control}
                                    name="sourceOfFunds.type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><MandatoryLabel>{t('fields.sourceOfFunds')}</MandatoryLabel></FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={t('placeholders.selectSourceOfFunds')} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="business_profits">{t('options.businessProfits')}</SelectItem>
                                                    <SelectItem value="investment">{t('options.investment')}</SelectItem>
                                                    <SelectItem value="loan">{t('options.loan')}</SelectItem>
                                                    <SelectItem value="equity">{t('options.equity')}</SelectItem>
                                                    <SelectItem value="other">{t('options.other')}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {form.watch('sourceOfFunds.type') === 'other' && (
                                    <FormField
                                        control={form.control}
                                        name="sourceOfFunds.otherDetails"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><MandatoryLabel>{t('fields.pleaseSpecify')}</MandatoryLabel></FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </div>
                        </FormSection>

                        {/* Operative Company Specifics */}
                        {legalEntityType === 'operative_company' && (
                            <FormSection title={t('sections.operativeDetails')}>
                                <FormField
                                    control={form.control}
                                    name="hasOwnersMoreThan25Percent"
                                    render={({ field }) => (
                                        <FormItem className="mb-6">
                                            <FormLabel>{t('fields.hasOwnersMoreThan25Percent')}</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={t('placeholders.selectOption')} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="yes">{t('options.yes')}</SelectItem>
                                                    <SelectItem value="no">{t('options.no')}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {form.watch('hasOwnersMoreThan25Percent') === 'yes' ? (
                                    <div className="mb-8">
                                        <PersonList
                                            name="ownersMoreThan25Percent"
                                            label={t('labels.ownersList')}
                                            addButtonLabel={t('buttons.addPerson')}
                                        />
                                    </div>
                                ) : form.watch('hasOwnersMoreThan25Percent') === 'no' ? (
                                    <div className="mb-8">
                                        <PersonList
                                            name="managingDirectors"
                                            label={t('labels.managingDirectorsList')}
                                            addButtonLabel={t('buttons.addPerson')}
                                        />
                                    </div>
                                ) : null}
                            </FormSection>
                        )}

                        {/* Foundation Specifics */}
                        {legalEntityType === 'foundation' && (
                            <FormSection title={t('sections.foundationDetails')}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <FormField
                                        control={form.control}
                                        name="foundationType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><MandatoryLabel>{t('fields.foundationType')}</MandatoryLabel></FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder={t('placeholders.selectOption')} />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="discretionary">{t('options.discretionary')}</SelectItem>
                                                        <SelectItem value="non_discretionary">{t('options.nonDiscretionary')}</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="isFoundationRevocable"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('fields.isFoundationRevocable')}</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder={t('placeholders.selectOption')} />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="yes">{t('options.yes')}</SelectItem>
                                                        <SelectItem value="no">{t('options.no')}</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Founder Details */}
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <h4 className="text-md font-medium text-gray-900 mb-4">{t('labels.founder')}</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField control={form.control} name="founder.fullName" render={({ field }) => (<FormItem><FormLabel>{t('fields.fullName')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="founder.dateOfBirth" render={({ field }) => (<FormItem><FormLabel>{t('fields.dateOfBirth')}</FormLabel><FormControl><Input {...field} type="date" /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="founder.nationality" render={({ field }) => (<FormItem><FormLabel>{t('fields.nationality')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <div className="md:col-span-2 space-y-4">
                                            <AddressSearch
                                                label={t('fields.address')}
                                                onSelect={(address) => {
                                                    form.setValue('founder.street', address.street);
                                                    form.setValue('founder.houseNumber', address.houseNumber);
                                                    form.setValue('founder.zipCode', address.zipCode);
                                                    form.setValue('founder.city', address.city);
                                                    form.setValue('founder.country', address.country);
                                                }}
                                            />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FormField control={form.control} name="founder.street" render={({ field }) => (<FormItem><FormLabel>{t('fields.street')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                <FormField control={form.control} name="founder.houseNumber" render={({ field }) => (<FormItem><FormLabel>{t('fields.houseNumber')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                <FormField control={form.control} name="founder.zipCode" render={({ field }) => (<FormItem><FormLabel>{t('fields.zipCode')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                <FormField control={form.control} name="founder.city" render={({ field }) => (<FormItem><FormLabel>{t('fields.city')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                <FormField control={form.control} name="founder.country" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>{t('fields.country')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <FormField
                                            control={form.control}
                                            name="isFounderDeceased"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t('fields.isFounderDeceased')}</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder={t('placeholders.selectOption')} />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="yes">{t('options.yes')}</SelectItem>
                                                            <SelectItem value="no">{t('options.no')}</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <PersonList name="foundationBoardMembers" label={t('labels.foundationBoardMembersList')} addButtonLabel={t('buttons.addPerson')} />

                                    <div>
                                        <PersonList name="foundationBeneficiaries" label={t('labels.foundationBeneficiariesList')} addButtonLabel={t('buttons.addPerson')} />
                                        <div className="mt-4">
                                            <FormField
                                                control={form.control}
                                                name="foundationBeneficiariesFixedClaim"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>{t('fields.foundationBeneficiariesFixedClaim')}</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder={t('placeholders.selectOption')} />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="yes">{t('options.yes')}</SelectItem>
                                                                <SelectItem value="no">{t('options.no')}</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <PersonList name="nominationRights" label={t('labels.nominationRightsList')} addButtonLabel={t('buttons.addPerson')} />
                                </div>
                            </FormSection>
                        )}

                        {/* Trust Specifics */}
                        {legalEntityType === 'trust' && (
                            <FormSection title={t('sections.trustDetails')}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <FormField
                                        control={form.control}
                                        name="trustType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('fields.trustType')}</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder={t('placeholders.selectOption')} />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="discretionary">{t('options.discretionary')}</SelectItem>
                                                        <SelectItem value="non_discretionary">{t('options.nonDiscretionary')}</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="isTrustRevocable"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('fields.isTrustRevocable')}</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder={t('placeholders.selectOption')} />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="yes">{t('options.yes')}</SelectItem>
                                                        <SelectItem value="no">{t('options.no')}</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Settlor Details */}
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <h4 className="text-md font-medium text-gray-900 mb-4">{t('labels.settlor')}</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField control={form.control} name="settlor.fullName" render={({ field }) => (<FormItem><FormLabel>{t('fields.fullName')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="settlor.dateOfBirth" render={({ field }) => (<FormItem><FormLabel>{t('fields.dateOfBirth')}</FormLabel><FormControl><Input {...field} type="date" /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="settlor.nationality" render={({ field }) => (<FormItem><FormLabel>{t('fields.nationality')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <div className="md:col-span-2 space-y-4">
                                            <AddressSearch
                                                label={t('fields.address')}
                                                onSelect={(address) => {
                                                    form.setValue('settlor.street', address.street);
                                                    form.setValue('settlor.houseNumber', address.houseNumber);
                                                    form.setValue('settlor.zipCode', address.zipCode);
                                                    form.setValue('settlor.city', address.city);
                                                    form.setValue('settlor.country', address.country);
                                                }}
                                            />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FormField control={form.control} name="settlor.street" render={({ field }) => (<FormItem><FormLabel>{t('fields.street')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                <FormField control={form.control} name="settlor.houseNumber" render={({ field }) => (<FormItem><FormLabel>{t('fields.houseNumber')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                <FormField control={form.control} name="settlor.zipCode" render={({ field }) => (<FormItem><FormLabel>{t('fields.zipCode')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                <FormField control={form.control} name="settlor.city" render={({ field }) => (<FormItem><FormLabel>{t('fields.city')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                <FormField control={form.control} name="settlor.country" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>{t('fields.country')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <FormField
                                            control={form.control}
                                            name="isSettlorDeceased"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t('fields.isSettlorDeceased')}</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder={t('placeholders.selectOption')} />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="yes">{t('options.yes')}</SelectItem>
                                                            <SelectItem value="no">{t('options.no')}</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Trustee Details */}
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <h4 className="text-md font-medium text-gray-900 mb-4">{t('labels.trustee')}</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField control={form.control} name="trustee.fullName" render={({ field }) => (<FormItem><FormLabel>{t('fields.fullName')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="trustee.dateOfBirth" render={({ field }) => (<FormItem><FormLabel>{t('fields.dateOfBirth')}</FormLabel><FormControl><Input {...field} type="date" /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="trustee.nationality" render={({ field }) => (<FormItem><FormLabel>{t('fields.nationality')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <div className="md:col-span-2 space-y-4">
                                            <AddressSearch
                                                label={t('fields.address')}
                                                onSelect={(address) => {
                                                    form.setValue('trustee.street', address.street);
                                                    form.setValue('trustee.houseNumber', address.houseNumber);
                                                    form.setValue('trustee.zipCode', address.zipCode);
                                                    form.setValue('trustee.city', address.city);
                                                    form.setValue('trustee.country', address.country);
                                                }}
                                            />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FormField control={form.control} name="trustee.street" render={({ field }) => (<FormItem><FormLabel>{t('fields.street')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                <FormField control={form.control} name="trustee.houseNumber" render={({ field }) => (<FormItem><FormLabel>{t('fields.houseNumber')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                <FormField control={form.control} name="trustee.zipCode" render={({ field }) => (<FormItem><FormLabel>{t('fields.zipCode')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                <FormField control={form.control} name="trustee.city" render={({ field }) => (<FormItem><FormLabel>{t('fields.city')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                <FormField control={form.control} name="trustee.country" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>{t('fields.country')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Protector Details */}
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <h4 className="text-md font-medium text-gray-900 mb-4">{t('labels.protector')}</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField control={form.control} name="protector.fullName" render={({ field }) => (<FormItem><FormLabel>{t('fields.fullName')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="protector.dateOfBirth" render={({ field }) => (<FormItem><FormLabel>{t('fields.dateOfBirth')}</FormLabel><FormControl><Input {...field} type="date" /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="protector.nationality" render={({ field }) => (<FormItem><FormLabel>{t('fields.nationality')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <div className="md:col-span-2 space-y-4">
                                            <AddressSearch
                                                label={t('fields.address')}
                                                onSelect={(address) => {
                                                    form.setValue('protector.street', address.street);
                                                    form.setValue('protector.houseNumber', address.houseNumber);
                                                    form.setValue('protector.zipCode', address.zipCode);
                                                    form.setValue('protector.city', address.city);
                                                    form.setValue('protector.country', address.country);
                                                }}
                                            />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FormField control={form.control} name="protector.street" render={({ field }) => (<FormItem><FormLabel>{t('fields.street')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                <FormField control={form.control} name="protector.houseNumber" render={({ field }) => (<FormItem><FormLabel>{t('fields.houseNumber')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                <FormField control={form.control} name="protector.zipCode" render={({ field }) => (<FormItem><FormLabel>{t('fields.zipCode')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                <FormField control={form.control} name="protector.city" render={({ field }) => (<FormItem><FormLabel>{t('fields.city')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                                <FormField control={form.control} name="protector.country" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>{t('fields.country')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <PersonList name="trustBeneficiaries" label={t('labels.trustBeneficiariesList')} addButtonLabel={t('buttons.addPerson')} />
                                    <div className="mt-4">
                                        <FormField
                                            control={form.control}
                                            name="trustBeneficiariesFixedClaim"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t('fields.trustBeneficiariesFixedClaim')}</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder={t('placeholders.selectOption')} />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="yes">{t('options.yes')}</SelectItem>
                                                            <SelectItem value="no">{t('options.no')}</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </FormSection>
                        )}

                        {/* Economic Beneficiary - Only for Domiciliary Company */}
                        {legalEntityType === 'domiciliary_company' && (
                            <FormSection title={t('sections.economicBeneficiaries')}>
                                <PersonList
                                    name="economicBeneficiaries"
                                    label={t('labels.economicBeneficiariesList')}
                                    addButtonLabel={t('buttons.addPerson')}
                                />
                            </FormSection>
                        )}
                    </>
                )}

                <div className="pt-6 border-t border-gray-200">
                    {submitStatus && (
                        <div className={`mb-4 p-4 rounded-md ${submitStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                            {submitStatus.message}
                        </div>
                    )}
                    <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                        {isSubmitting ? t('buttons.submitting') : t('buttons.submitApplication')}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
