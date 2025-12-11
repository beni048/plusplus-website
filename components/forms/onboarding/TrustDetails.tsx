import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MandatoryLabel } from '@/components/ui/mandatory-label';
import { AddressSearch } from '../AddressSearch';
import PersonList from '../PersonList';
import FormSection from '../FormSection';
import { useTranslations } from 'next-intl';

export default function TrustDetails() {
    const { control, setValue } = useFormContext();
    const t = useTranslations('onboardingForm');

    return (
        <FormSection title={t('sections.trust_details')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FormField
                    control={control}
                    name="trustType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel><MandatoryLabel>{t('fields.trust_type')}</MandatoryLabel></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('placeholders.select_option')} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="discretionary">{t('options.discretionary')}</SelectItem>
                                    <SelectItem value="non_discretionary">{t('options.non_discretionary')}</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="isTrustRevocable"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel><MandatoryLabel>{t('fields.is_trust_revocable')}</MandatoryLabel></FormLabel>
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
            </div>

            {/* Settlor Details */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-md font-medium text-gray-900 mb-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"><MandatoryLabel>{t('labels.settlor')}</MandatoryLabel></h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={control} name="settlor.fullName" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.full_name')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={control} name="settlor.dateOfBirth" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.date_of_birth')}</MandatoryLabel></FormLabel><FormControl><Input {...field} type="date" /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={control} name="settlor.nationality" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.nationality')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <div className="md:col-span-2 space-y-4">
                        <AddressSearch
                            label={t('fields.address')}
                            onSelect={(address) => {
                                setValue('settlor.street', address.street);
                                setValue('settlor.houseNumber', address.houseNumber);
                                setValue('settlor.zipCode', address.zipCode);
                                setValue('settlor.city', address.city);
                                setValue('settlor.country', address.country);
                            }}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={control} name="settlor.street" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.street')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="settlor.houseNumber" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.house_number')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="settlor.zipCode" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.zip_code')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="settlor.city" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.city')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="settlor.country" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel><MandatoryLabel>{t('fields.country')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <FormField
                        control={control}
                        name="isSettlorDeceased"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><MandatoryLabel>{t('fields.is_settlor_deceased')}</MandatoryLabel></FormLabel>
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
                </div>
            </div>

            {/* Trustee Details */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-md font-medium text-gray-900 mb-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"><MandatoryLabel>{t('labels.trustee')}</MandatoryLabel></h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={control} name="trustee.fullName" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.full_name')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={control} name="trustee.dateOfBirth" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.date_of_birth')}</MandatoryLabel></FormLabel><FormControl><Input {...field} type="date" /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={control} name="trustee.nationality" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.nationality')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <div className="md:col-span-2 space-y-4">
                        <AddressSearch
                            label={t('fields.address')}
                            onSelect={(address) => {
                                setValue('trustee.street', address.street);
                                setValue('trustee.houseNumber', address.houseNumber);
                                setValue('trustee.zipCode', address.zipCode);
                                setValue('trustee.city', address.city);
                                setValue('trustee.country', address.country);
                            }}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={control} name="trustee.street" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.street')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="trustee.houseNumber" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.house_number')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="trustee.zipCode" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.zip_code')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="trustee.city" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.city')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="trustee.country" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel><MandatoryLabel>{t('fields.country')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Protector Details */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-md font-medium text-gray-900 mb-4">{t('labels.protector')}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={control} name="protector.fullName" render={({ field }) => (<FormItem><FormLabel>{t('fields.full_name')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={control} name="protector.dateOfBirth" render={({ field }) => (<FormItem><FormLabel>{t('fields.date_of_birth')}</FormLabel><FormControl><Input {...field} type="date" /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={control} name="protector.nationality" render={({ field }) => (<FormItem><FormLabel>{t('fields.nationality')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <div className="md:col-span-2 space-y-4">
                        <AddressSearch
                            label={t('fields.address')}
                            onSelect={(address) => {
                                setValue('protector.street', address.street);
                                setValue('protector.houseNumber', address.houseNumber);
                                setValue('protector.zipCode', address.zipCode);
                                setValue('protector.city', address.city);
                                setValue('protector.country', address.country);
                            }}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={control} name="protector.street" render={({ field }) => (<FormItem><FormLabel>{t('fields.street')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="protector.houseNumber" render={({ field }) => (<FormItem><FormLabel>{t('fields.house_number')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="protector.zipCode" render={({ field }) => (<FormItem><FormLabel>{t('fields.zip_code')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="protector.city" render={({ field }) => (<FormItem><FormLabel>{t('fields.city')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="protector.country" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>{t('fields.country')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <PersonList name="trustBeneficiaries" label={t('labels.trust_beneficiaries_list')} addButtonLabel={t('buttons.add_person')} />
                <div className="mt-4">
                    <FormField
                        control={control}
                        name="trustBeneficiariesFixedClaim"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><MandatoryLabel>{t('fields.trust_beneficiaries_fixed_claim')}</MandatoryLabel></FormLabel>
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
                </div>
            </div>
        </FormSection>
    );
}
