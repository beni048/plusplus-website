import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Trash2, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { MandatoryLabel } from '@/components/ui/mandatory-label';
import { AddressSearch } from './AddressSearch';
import { DatePicker } from '@/components/ui/date-picker';

interface PersonListProps {
    name: string;
    label: string;
    description?: string;
    addButtonLabel?: string;
}

export default function PersonList({ name, label, description, addButtonLabel = "Add Person" }: PersonListProps) {
    const { control, setValue } = useFormContext();
    const isOwnersList = name === 'ownersMoreThan25Percent';
    const { fields, append, remove } = useFieldArray({
        control,
        name: name,
    });
    const t = useTranslations('onboardingForm');

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h4 className="text-lg font-medium text-gray-900">{label}</h4>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ fullName: '', dateOfBirth: '', nationality: '' })}
                    className="flex items-center gap-2" disabled={isOwnersList && fields.length >= 3}
                >
                    <Plus size={16} />
                    {addButtonLabel}
                </Button>
            </div>
            {description && <p className="text-sm text-gray-500">{description}</p>}

            <FormField
                control={control}
                name={name}
                render={() => <FormMessage />}
            />

            <div className="space-y-6">
                {fields.map((field, index) => (
                    <div key={field.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative">
                        <div className="absolute top-4 right-4">
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(index)}
                                className="text-gray-400 hover:text-red-500"
                            >
                                <Trash2 size={16} />
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                            <FormField
                                control={control}
                                name={`${name}.${index}.fullName`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel><MandatoryLabel>{t('fields.fullName')}</MandatoryLabel></FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="John Doe" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name={`${name}.${index}.dateOfBirth`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel><MandatoryLabel>{t('fields.dateOfBirth')}</MandatoryLabel></FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name={`${name}.${index}.nationality`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel><MandatoryLabel>{t('fields.nationality')}</MandatoryLabel></FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Swiss" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <AddressSearch
                                label={t('fields.address')}
                                onSelect={(address) => {
                                    setValue(`${name}.${index}.street`, address.street);
                                    setValue(`${name}.${index}.houseNumber`, address.houseNumber);
                                    setValue(`${name}.${index}.zipCode`, address.zipCode);
                                    setValue(`${name}.${index}.city`, address.city);
                                    setValue(`${name}.${index}.country`, address.country);
                                }}
                            />
                            <FormField
                                control={control}
                                name={`${name}.${index}.street`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel><MandatoryLabel>{t('fields.street')}</MandatoryLabel></FormLabel>
                                        <FormControl><Input {...field} value={field.value ?? ''} placeholder={t('placeholders.street')} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name={`${name}.${index}.houseNumber`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('fields.houseNumber')}</FormLabel>
                                        <FormControl><Input {...field} value={field.value ?? ''} placeholder={t('placeholders.houseNumber')} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name={`${name}.${index}.zipCode`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel><MandatoryLabel>{t('fields.zipCode')}</MandatoryLabel></FormLabel>
                                        <FormControl><Input {...field} value={field.value ?? ''} placeholder={t('placeholders.zipCode')} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name={`${name}.${index}.city`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel><MandatoryLabel>{t('fields.city')}</MandatoryLabel></FormLabel>
                                        <FormControl><Input {...field} value={field.value ?? ''} placeholder={t('placeholders.city')} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name={`${name}.${index}.country`}
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel><MandatoryLabel>{t('fields.country')}</MandatoryLabel></FormLabel>
                                        <FormControl><Input {...field} value={field.value ?? ''} placeholder={t('placeholders.country')} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                ))}

                {fields.length === 0 && (
                    <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-500">
                        {t('messages.noPeopleAdded', { label: addButtonLabel })}
                    </div>
                )}
                {isOwnersList && fields.length >= 3 && (
                    <p className="text-sm text-red-600 mt-2">{t('messages.maxThreeOwners')}</p>
                )}
            </div>
        </div>
    );
}
