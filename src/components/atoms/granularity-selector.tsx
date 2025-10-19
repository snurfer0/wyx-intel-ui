import React from 'react';

interface GranularitySelectorProps<T extends string> {
    options: Array<{ value: T; label: string }>;
    selected: T;
    onSelect: (value: T) => void;
}

export function GranularitySelector<T extends string>({
    options,
    selected,
    onSelect,
}: GranularitySelectorProps<T>): React.JSX.Element {
    return (
        <div className="flex gap-1">
            {options.map(option => (
                <button
                    key={option.value}
                    onClick={(): void => onSelect(option.value)}
                    className={`px-2 py-1 text-xs font-mono font-medium transition-all cursor-pointer ${
                        selected === option.value
                            ? 'text-emerald-400'
                            : 'text-gray-600 hover:text-gray-400'
                    }`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}
