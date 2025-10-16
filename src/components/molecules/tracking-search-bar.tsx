'use client';

import { Search, X } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TrackingSearchBarProps {
    onSearch: (query: string) => void;
    isLoading?: boolean;
}

export function TrackingSearchBar({
    onSearch,
    isLoading = false,
}: TrackingSearchBarProps): React.JSX.Element {
    const [inputValue, setInputValue] = useState('');

    const debouncedSearch = useDebouncedCallback((value: string) => {
        onSearch(value);
    }, 500);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setInputValue(value);
            debouncedSearch(value);
        },
        [debouncedSearch],
    );

    const handleClear = useCallback(() => {
        setInputValue('');
        onSearch('');
    }, [onSearch]);

    return (
        <div className="w-full max-w-2xl">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search tracking items..."
                    value={inputValue}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="pl-10 pr-10"
                />
                {inputValue && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClear}
                        disabled={isLoading}
                        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Clear search</span>
                    </Button>
                )}
            </div>
        </div>
    );
}
