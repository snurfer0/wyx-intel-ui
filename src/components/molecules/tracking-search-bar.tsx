'use client';

import { Terminal, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTracking } from '@/hooks/use.tracking';

export function TrackingSearchBar(): React.JSX.Element {
    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState('');
    const { searchItems } = useTracking();

    const debouncedSearch = useDebouncedCallback(
        (value: string) => void searchItems(value),
        500,
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setQuery(value);
        debouncedSearch(value);
    };

    const handleClear = (): void => {
        setQuery('');
        void searchItems('');
    };

    useEffect((): (() => void) => {
        const handleKeyDown = (e: KeyboardEvent): void => {
            // Focus search on "/" key press
            if (e.key === '/' && document.activeElement !== inputRef.current) {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return (): void => {
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
                    value={query}
                    onChange={handleChange}
                    className="pl-10 pr-10 bg-black border-emerald-500/20 text-emerald-400 placeholder:text-gray-600 font-mono focus:border-emerald-500/40"
                />
                {query && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClear}
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
