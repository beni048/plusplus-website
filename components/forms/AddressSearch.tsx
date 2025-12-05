import React, { useState } from 'react';
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslations, useLocale } from 'next-intl';



interface AddressSearchProps {
    onSelect: (address: { street: string; houseNumber: string; zipCode: string; city: string; country: string }) => void;
    label?: string;
}

export function AddressSearch({ onSelect, label }: AddressSearchProps) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const t = useTranslations('applicationForm');
    const locale = useLocale();

    // Debounce search
    React.useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length < 3) {
                setResults([]);
                return;
            }

            setLoading(true);
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5&accept-language=${locale}`, {
                    headers: {
                        'User-Agent': 'ProsperaClientOnboarding/1.0'
                    }
                });
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error("Failed to fetch addresses", error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div className="flex flex-col space-y-2">
            {label && <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</label>}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        <span className="truncate text-left">
                            {value
                                ? value
                                : t('placeholders.searchAddress')}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                    <Command shouldFilter={false}>
                        <CommandInput
                            placeholder={t('placeholders.searchAddress')}
                            value={query}
                            onValueChange={setQuery}
                        />
                        <CommandList>
                            {loading && <CommandItem disabled>Loading...</CommandItem>}
                            {!loading && results.length === 0 && <CommandEmpty>{t('messages.noAddressFound')}</CommandEmpty>}
                            <CommandGroup>
                                {results.map((address) => (
                                    <CommandItem
                                        key={address.place_id}
                                        value={address.display_name}
                                        onSelect={() => {
                                            setValue(address.display_name);
                                            onSelect({
                                                street: address.address.road || "",
                                                houseNumber: address.address.house_number || "",
                                                zipCode: address.address.postcode || "",
                                                city: address.address.city || address.address.town || address.address.village || "",
                                                country: address.address.country || ""
                                            });
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === address.display_name ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {address.display_name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
