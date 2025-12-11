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

export default function FoundationDetails() {
    const { control, setValue } = useFormContext();
    const t = useTranslations('onboardingForm');

    return (
        <FormSection title={t('sections.foundation_details')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FormField
                    control={control}
                    name="foundationType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel><MandatoryLabel>{t('fields.foundation_type')}</MandatoryLabel></FormLabel>
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
                    name="isFoundationRevocable"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel><MandatoryLabel>{t('fields.is_foundation_revocable')}</MandatoryLabel></FormLabel>
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

            {/* Founder Details */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-md font-medium text-gray-900 mb-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"><MandatoryLabel>{t('labels.founder')}</MandatoryLabel></h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={control} name="founder.fullName" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.full_name')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={control} name="founder.dateOfBirth" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.date_of_birth')}</MandatoryLabel></FormLabel><FormControl><Input {...field} type="date" /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={control} name="founder.nationality" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.nationality')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <div className="md:col-span-2 space-y-4">
                        <AddressSearch
                            label={t('fields.address')}
                            onSelect={(address) => {
                                setValue('founder.street', address.street);
                                setValue('founder.houseNumber', address.houseNumber);
                                setValue('founder.zipCode', address.zipCode);
                                setValue('founder.city', address.city);
                                setValue('founder.country', address.country);
                            }}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={control} name="founder.street" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.street')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="founder.houseNumber" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.house_number')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="founder.zipCode" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.zip_code')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="founder.city" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.city')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="founder.country" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel><MandatoryLabel>{t('fields.country')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <FormField
                        control={control}
                        name="isFounderDeceased"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><MandatoryLabel>{t('fields.is_founder_deceased')}</MandatoryLabel></FormLabel>
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

            <div className="space-y-8">
                <PersonList name="foundationBoardMembers" label={t('labels.foundation_board_members_list')} addButtonLabel={t('buttons.add_person')} />

                <div>
                    <PersonList name="foundationBeneficiaries" label={t('labels.foundation_beneficiaries_list')} addButtonLabel={t('buttons.add_person')} />
                    <div className="mt-4">
                        <FormField
                            control={control}
                            name="foundationBeneficiariesFixedClaim"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel><MandatoryLabel>{t('fields.foundation_beneficiaries_fixed_claim')}</MandatoryLabel></FormLabel>
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

                <PersonList name="nominationRights" label={t('labels.nomination_rights_list')} addButtonLabel={t('buttons.add_person')} />
            </div>
        </FormSection>
    );
}
