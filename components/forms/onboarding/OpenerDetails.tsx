import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { MandatoryLabel } from '@/components/ui/mandatory-label';
import { AddressSearch } from '../AddressSearch';
import FileUpload from '../FileUpload';
import FormSection from '../FormSection';
import { useTranslations } from 'next-intl';

interface OpenerDetailsProps {
    onFileChange: (fieldName: string, files: File[]) => void;
    files: { [key: string]: File[] };
    passportError?: string | null;
}

export default function OpenerDetails({ onFileChange, files, passportError }: OpenerDetailsProps) {
    const { control, setValue, watch } = useFormContext();
    const t = useTranslations('onboardingForm');

    return (
        <FormSection title={t('sections.opener_details')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={control}
                    name="openerFirstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel><MandatoryLabel>{t('fields.opener_first_name')}</MandatoryLabel></FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="openerLastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel><MandatoryLabel>{t('fields.opener_last_name')}</MandatoryLabel></FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="openerFunction"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel><MandatoryLabel>{t('fields.opener_function')}</MandatoryLabel></FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="openerDateOfBirth"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel><MandatoryLabel>{t('fields.opener_date_of_birth')}</MandatoryLabel></FormLabel>
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
                    name="openerNationality"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel><MandatoryLabel>{t('fields.opener_nationality')}</MandatoryLabel></FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="md:col-span-2 space-y-4">
                    <AddressSearch
                        label={t('fields.opener_address')}
                        onSelect={(address) => {
                            setValue('openerStreet', address.street);
                            setValue('openerHouseNumber', address.houseNumber);
                            setValue('openerZipCode', address.zipCode);
                            setValue('openerCity', address.city);
                            setValue('openerCountry', address.country);
                        }}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={control} name="openerStreet" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.street')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={control} name="openerHouseNumber" render={({ field }) => (<FormItem><FormLabel>{t('fields.house_number')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={control} name="openerZipCode" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.zip_code')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={control} name="openerCity" render={({ field }) => (<FormItem><FormLabel><MandatoryLabel>{t('fields.city')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={control} name="openerCountry" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel><MandatoryLabel>{t('fields.country')}</MandatoryLabel></FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                </div>
            </div>

            <div className="mt-6 flex flex-col gap-2 items-start" id="passport-upload">
                <div className="flex flex-col">
                    <FormLabel className="mb-0 whitespace-nowrap"><MandatoryLabel>{t('buttons.upload_passport')}</MandatoryLabel></FormLabel>

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

            <div className="mt-6">
                <FormField
                    control={control}
                    name="isOpenerAuthorizedSignatory"
                    render={({ field }) => (
                        <FormItem className="mb-6">
                            <FormLabel><MandatoryLabel>{t('fields.is_opener_authorized_signatory')}</MandatoryLabel></FormLabel>
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

                {watch('isOpenerAuthorizedSignatory') === 'yes' && (
                    <div className="space-y-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <FormField
                            control={control}
                            name="hasSecondSignatory"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('fields.has_second_signatory')}</FormLabel>
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

                        {watch('hasSecondSignatory') === 'yes' && (
                            <div className="mt-4">
                                <h4 className="font-medium mb-4">{t('fields.authorized_signatory_2')}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField control={control} name="authorizedSignatory2.fullName" render={({ field }) => (<FormItem><FormLabel>{t('fields.full_name')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={control} name="authorizedSignatory2.dateOfBirth" render={({ field }) => (<FormItem><FormLabel>{t('fields.date_of_birth')}</FormLabel><FormControl><Input {...field} type="date" /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={control} name="authorizedSignatory2.nationality" render={({ field }) => (<FormItem><FormLabel>{t('fields.nationality')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {watch('isOpenerAuthorizedSignatory') === 'no' && (
                    <div className="space-y-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <FormField
                            control={control}
                            name="numberOfSignatories"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('fields.number_of_signatories')}</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('placeholders.select_option')} />
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

                        {(watch('numberOfSignatories') === '1' || watch('numberOfSignatories') === '2') && (
                            <div className="mt-4">
                                <h4 className="font-medium mb-4">{t('fields.authorized_signatory_1')}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField control={control} name="authorizedSignatory1.fullName" render={({ field }) => (<FormItem><FormLabel>{t('fields.full_name')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={control} name="authorizedSignatory1.dateOfBirth" render={({ field }) => (<FormItem><FormLabel>{t('fields.date_of_birth')}</FormLabel><FormControl><Input {...field} type="date" /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={control} name="authorizedSignatory1.nationality" render={({ field }) => (<FormItem><FormLabel>{t('fields.nationality')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                </div>
                            </div>
                        )}

                        {watch('numberOfSignatories') === '2' && (
                            <div className="mt-4">
                                <h4 className="font-medium mb-4">{t('fields.authorized_signatory_2')}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField control={control} name="authorizedSignatory2.fullName" render={({ field }) => (<FormItem><FormLabel>{t('fields.full_name')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={control} name="authorizedSignatory2.dateOfBirth" render={({ field }) => (<FormItem><FormLabel>{t('fields.date_of_birth')}</FormLabel><FormControl><Input {...field} type="date" /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={control} name="authorizedSignatory2.nationality" render={({ field }) => (<FormItem><FormLabel>{t('fields.nationality')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </FormSection>
    );
}
