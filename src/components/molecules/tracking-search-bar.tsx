'use client';

import { Terminal, X } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
    const inputRef = useRef<HTMLInputElement>(null);

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

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent): void => {
            // Focus search on "/" key press
            if (e.key === '/' && document.activeElement !== inputRef.current) {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="w-full max-w-2xl">
            <div className="relative">
                <Terminal className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500" />
                <Input
                    ref={inputRef}
                    type="text"
                    placeholder="$ search query..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={(e): void => {
                        // Prevent blur unless user explicitly clicks elsewhere
                        if (e.relatedTarget === null) {
                            e.target.focus();
                        }
                    }}
                    disabled={isLoading}
                    className="pl-10 pr-10 bg-black border-emerald-500/20 text-emerald-400 placeholder:text-gray-600 font-mono focus:border-emerald-500/40"
                />
                {inputValue && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClear}
                        disabled={isLoading}
                        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0 text-emerald-500 hover:bg-emerald-500/10"
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Clear search</span>
                    </Button>
                )}
            </div>
        </div>
    );
}
