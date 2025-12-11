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
import { useTranslations } from 'next-intl';

interface NaturalPersonSectionProps {
    onFileChange: (fieldName: string, files: File[]) => void;
    files: { [key: string]: File[] };
    passportError?: string | null;
}

export default function NaturalPersonSection({ onFileChange, files, passportError }: NaturalPersonSectionProps) {
    const { control, setValue, watch } = useFormContext();
    const t = useTranslations('onboardingForm');

    return (
        <>
            <FormSection title={t('sections.personal_info')}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><MandatoryLabel>{t('fields.first_name')}</MandatoryLabel></FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><MandatoryLabel>{t('fields.last_name')}</MandatoryLabel></FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="dateOfBirth"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><MandatoryLabel>{t('fields.date_of_birth')}</MandatoryLabel></FormLabel>
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
                        control={control}
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
                        control={control}
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
                        control={control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><MandatoryLabel>{t('fields.phone')}</MandatoryLabel></FormLabel>
                                <FormControl><Input {...field} type="tel" /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="md:col-span-2 space-y-4">
                        <AddressSearch
                            label={t('fields.address')}
                            onSelect={(address) => {
                                setValue('street', address.street);
                                setValue('houseNumber', address.houseNumber);
                                setValue('zipCode', address.zipCode);
                                setValue('city', address.city);
                                setValue('country', address.country);
                            }}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={control} name="street" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.street')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="houseNumber" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.house_number')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="zipCode" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.zip_code')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="city" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.city')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="country" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel><MandatoryLabel>{t('fields.country')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                    </div>
                    <FormField
                        control={control}
                        name="idDocumentType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><MandatoryLabel>{t('fields.id_document_type')}</MandatoryLabel></FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder={t('placeholders.select_type')} />
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

                <div className="mt-6 flex flex-col gap-2 items-start" id="passport-upload">
                    <div className="flex flex-col">
                        <FormLabel className="mb-0 whitespace-nowrap"><MandatoryLabel>{t('buttons.upload_passport')}</MandatoryLabel></FormLabel>
                        <span className="text-xs text-muted-foreground">
                            {watch('idDocumentType') === 'id' && t('fields.id_card_hint')}
                        </span>
                    </div>
                    <FileUpload
                        label={null}
                        multiple={true}
                        accept=".pdf,.jpg,.jpeg,.png"
                        maxSizeMB={5}
                        onChange={(files) => {
                            onFileChange('passport', files);
                        }}
                        errorMessage={passportError}
                        hint={t('labels.file_hint')}
                    />
                </div>

                <FormSection title={t('sections.aml_profile')}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={control}
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
                            control={control}
                            name="amlProfile.estimatedIncome"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel><MandatoryLabel>{t('fields.estimated_income')}</MandatoryLabel></FormLabel>
                                    <FormControl><Input {...field} type="number" min="0" step="any" /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="amlProfile.estimatedWealth"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel><MandatoryLabel>{t('fields.estimated_wealth')}</MandatoryLabel></FormLabel>
                                    <FormControl><Input {...field} type="number" min="0" step="any" /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="amlProfile.estimatedLiabilities"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel><MandatoryLabel>{t('fields.estimated_liabilities')}</MandatoryLabel></FormLabel>
                                    <FormControl><Input {...field} type="number" min="0" step="any" /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-6">
                        <FormField
                            control={control}
                            name="amlProfile.originOfAssets.category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel><MandatoryLabel>{t('fields.origin_of_assets_label')}</MandatoryLabel></FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('placeholders.select_option')} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="salary_employment">{t('options.salary_employment')}</SelectItem>
                                            <SelectItem value="savings">{t('options.savings')}</SelectItem>
                                            <SelectItem value="investment_capital_gains">{t('options.investment_capital_gains')}</SelectItem>
                                            <SelectItem value="real_estate_sale">{t('options.real_estate_sale')}</SelectItem>
                                            <SelectItem value="company_sale">{t('options.company_sale')}</SelectItem>
                                            <SelectItem value="inheritance_gift">{t('options.inheritance_gift')}</SelectItem>
                                            <SelectItem value="loan">{t('options.loan')}</SelectItem>
                                            <SelectItem value="lottery_gambling">{t('options.lottery_gambling')}</SelectItem>
                                            <SelectItem value="other">{t('options.other')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {watch('amlProfile.originOfAssets.category') === 'other' && (
                            <FormField
                                control={control}
                                name="amlProfile.originOfAssets.otherExplanation"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel><MandatoryLabel>{t('fields.please_specify')}</MandatoryLabel></FormLabel>
                                        <FormControl><Textarea {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}



                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-6">
                        <FormField
                            control={control}
                            name="amlProfile.relationshipPurpose.type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel><MandatoryLabel>{t('fields.relationship_purpose')}</MandatoryLabel></FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('placeholders.select_option')} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="wealth_preservation">{t('options.wealth_preservation')}</SelectItem>
                                            <SelectItem value="capital_appreciation">{t('options.capital_appreciation')}</SelectItem>
                                            <SelectItem value="income_generation">{t('options.income_generation')}</SelectItem>
                                            <SelectItem value="diversification">{t('options.diversification')}</SelectItem>
                                            <SelectItem value="transactional_banking">{t('options.transactional_banking')}</SelectItem>
                                            <SelectItem value="asset_management">{t('options.asset_management')}</SelectItem>
                                            <SelectItem value="other">{t('options.other')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>{t('fields.relationship_purpose_description')}</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {watch('amlProfile.relationshipPurpose.type') === 'other' && (
                            <FormField
                                control={control}
                                name="amlProfile.relationshipPurpose.otherDetails"
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
                            name="amlProfile.plannedTransactionVolume"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel><MandatoryLabel>{t('fields.planned_transaction_volume')}</MandatoryLabel></FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="amlProfile.thirdPartyRelations.type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel><MandatoryLabel>{t('fields.third_party_relations')}</MandatoryLabel></FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('placeholders.select_option')} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="no_beneficial_owner">{t('options.no_beneficial_owner')}</SelectItem>
                                            <SelectItem value="advisor_attorney">{t('options.advisor_attorney')}</SelectItem>
                                            <SelectItem value="family_member">{t('options.family_member')}</SelectItem>
                                            <SelectItem value="business_partner">{t('options.business_partner')}</SelectItem>
                                            <SelectItem value="trustee">{t('options.trustee')}</SelectItem>
                                            <SelectItem value="other">{t('options.other')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>{t('fields.third_party_relations_description')}</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {watch('amlProfile.thirdPartyRelations.type') === 'other' && (
                            <FormField
                                control={control}
                                name="amlProfile.thirdPartyRelations.otherDetails"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel><MandatoryLabel>{t('fields.please_specify')}</MandatoryLabel></FormLabel>
                                        <FormControl><Textarea {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>
                </FormSection>

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
            </FormSection >
        </>
    );
}
