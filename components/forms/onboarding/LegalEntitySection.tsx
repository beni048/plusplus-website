import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/ui/date-picker';
import { MandatoryLabel } from '@/components/ui/mandatory-label';
import { AddressSearch } from '../AddressSearch';
import FileUpload from '../FileUpload';
import FormSection from '../FormSection';
import PersonList from '../PersonList';
import OpenerDetails from './OpenerDetails';
import FoundationDetails from './FoundationDetails';
import TrustDetails from './TrustDetails';
import { useTranslations } from 'next-intl';

interface LegalEntitySectionProps {
    onFileChange: (fieldName: string, files: File[]) => void;
    files: { [key: string]: File[] };
    passportError?: string | null;
    commercialRegisterError?: string | null;
}

export default function LegalEntitySection({ onFileChange, files, passportError, commercialRegisterError }: LegalEntitySectionProps) {
    const { control, setValue, watch } = useFormContext();
    const t = useTranslations('onboardingForm');
    const legalEntityType = watch('legalEntityType');
    const hasOwnersMoreThan25Percent = watch('hasOwnersMoreThan25Percent');

    return (
        <>
            <OpenerDetails onFileChange={onFileChange} files={files} passportError={passportError} />

            <FormSection title={t('sections.company_info')}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={control}
                        name="companyName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><MandatoryLabel>{t('fields.company_name')}</MandatoryLabel></FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="commercialRegisterNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><MandatoryLabel>{t('fields.commercial_register_number')}</MandatoryLabel></FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="dateOfIncorporation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><MandatoryLabel>{t('fields.date_of_incorporation')}</MandatoryLabel></FormLabel>
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

                    <div className="md:col-span-2 space-y-4">
                        <AddressSearch
                            label={t('fields.domicile_address')}
                            onSelect={(address) => {
                                setValue('domicileStreet', address.street);
                                setValue('domicileHouseNumber', address.houseNumber);
                                setValue('domicileZipCode', address.zipCode);
                                setValue('domicileCity', address.city);
                                setValue('domicileCountry', address.country);
                            }}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={control} name="domicileStreet" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.street')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="domicileHouseNumber" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.house_number')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="domicileZipCode" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.zip_code')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="domicileCity" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.city')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="domicileCountry" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel><MandatoryLabel>{t('fields.country')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                    </div>

                    <div className="md:col-span-2 mt-4" id="commercial-register-upload">
                        <FormLabel className="mb-2 block"><MandatoryLabel>{t('buttons.upload_commercial_register')}</MandatoryLabel></FormLabel>
                        <FileUpload
                            label={null}
                            multiple={true}
                            accept=".pdf,.jpg,.jpeg,.png"
                            maxSizeMB={5}
                            onChange={(files) => {
                                onFileChange('commercialRegister', files);
                            }}
                            errorMessage={commercialRegisterError}
                            hint={t('labels.file_hint')}
                        />
                    </div>
                </div>
            </FormSection>

            <FormSection title={t('sections.legal_entity_type')}>
                <FormField
                    control={control}
                    name="legalEntityType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel><MandatoryLabel>{t('fields.legal_entity_type')}</MandatoryLabel></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('placeholders.select_type')} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="operative_company">{t('options.operative_company')}</SelectItem>
                                    <SelectItem value="domiciliary_company">{t('options.domiciliary_company')}</SelectItem>
                                    <SelectItem value="foundation">{t('options.foundation')}</SelectItem>
                                    <SelectItem value="trust">{t('options.trust')}</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </FormSection>

            {/* Dynamic Sections based on Legal Entity Type */}
            {(legalEntityType === 'operative_company' || legalEntityType === 'domiciliary_company') && (
                <FormSection title={t('sections.business_details')}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <FormField
                            control={control}
                            name="detailedBusinessActivity.type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel><MandatoryLabel>{t('fields.detailed_business_activity')}</MandatoryLabel></FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('placeholders.select_option')} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="trade">{t('options.trade')}</SelectItem>
                                            <SelectItem value="financial_services">{t('options.financial_services')}</SelectItem>
                                            <SelectItem value="real_estate">{t('options.real_estate')}</SelectItem>
                                            <SelectItem value="technology">{t('options.technology')}</SelectItem>
                                            <SelectItem value="consulting">{t('options.consulting')}</SelectItem>
                                            <SelectItem value="manufacturing">{t('options.manufacturing')}</SelectItem>
                                            <SelectItem value="holding">{t('options.holding')}</SelectItem>
                                            <SelectItem value="other">{t('options.other')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>{t('fields.detailed_business_activity_description')}</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {watch('detailedBusinessActivity.type') === 'other' && (
                            <FormField
                                control={control}
                                name="detailedBusinessActivity.otherDetails"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel><MandatoryLabel>{t('fields.please_specify')}</MandatoryLabel></FormLabel>
                                        <FormControl><Textarea {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <FormField
                            control={control}
                            name="sourceOfFunds.type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel><MandatoryLabel>{t('fields.source_of_funds')}</MandatoryLabel></FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('placeholders.select_option')} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="business_profit">{t('options.business_profit')}</SelectItem>
                                            <SelectItem value="capital_investment">{t('options.capital_investment')}</SelectItem>
                                            <SelectItem value="loan">{t('options.loan')}</SelectItem>
                                            <SelectItem value="real_estate_sale">{t('options.real_estate_sale')}</SelectItem>
                                            <SelectItem value="other">{t('options.other')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>{t('fields.source_of_funds_description')}</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {watch('sourceOfFunds.type') === 'other' && (
                            <FormField
                                control={control}
                                name="sourceOfFunds.otherDetails"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel><MandatoryLabel>{t('fields.please_specify')}</MandatoryLabel></FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>
                </FormSection>
            )}

            {legalEntityType === 'operative_company' && (
                <FormSection title={t('sections.ownership_structure')}>
                    <FormField
                        control={control}
                        name="hasOwnersMoreThan25Percent"
                        render={({ field }) => (
                            <FormItem className="mb-6">
                                <FormLabel><MandatoryLabel>{t('fields.has_owners_more_than_25_percent')}</MandatoryLabel></FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder={t('placeholders.select_option')} />
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

                    {hasOwnersMoreThan25Percent === 'yes' && (
                        <PersonList
                            name="ownersMoreThan25Percent"
                            label={t('labels.owners_list')}
                            description={t('descriptions.owners_list')}
                            addButtonLabel={t('buttons.add_person')}
                        />
                    )}

                    {hasOwnersMoreThan25Percent === 'no' && (
                        <PersonList
                            name="managingDirectors"
                            label={t('labels.managing_directors_list')}
                            description={t('descriptions.managing_directors_list')}
                            addButtonLabel={t('buttons.add_person')}
                        />
                    )}
                </FormSection>
            )}

            {legalEntityType === 'domiciliary_company' && (
                <FormSection title={t('sections.ownership_structure')}>
                    <PersonList
                        name="managingDirectors"
                        label={t('labels.managing_directors_list')}
                        addButtonLabel={t('buttons.add_person')}
                    />
                </FormSection>
            )}

            {legalEntityType === 'domiciliary_company' && (
                <FormSection title={t('sections.economic_beneficiaries')}>
                    <PersonList
                        name="economicBeneficiaries"
                        label={t('labels.economic_beneficiaries_list')}
                        addButtonLabel={t('buttons.add_person')}
                    />
                </FormSection>
            )}

            {legalEntityType === 'foundation' && <FoundationDetails />}
            {legalEntityType === 'trust' && <TrustDetails />}

            {(legalEntityType === 'operative_company' || legalEntityType === 'domiciliary_company' || legalEntityType === 'foundation' || legalEntityType === 'trust') && (
                <FormSection title={t('sections.special_clarifications')}>
                    <FormField
                        control={control}
                        name="specialClarifications"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('fields.special_clarifications')}</FormLabel>
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
            )}
        </>
    );
}
