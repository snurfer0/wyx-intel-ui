import React from 'react';

interface EntitySelectorProps<T extends string> {
    options: Array<{ value: T; label: string }>;
    selected: T;
    onSelect: (value: T) => void;
}

export function EntitySelector<T extends string>({
    options,
    selected,
    onSelect,
}: EntitySelectorProps<T>): React.JSX.Element {
    return (
        <div className="flex gap-2">
            {options.map(option => (
                <button
                    key={option.value}
                    onClick={(): void => onSelect(option.value)}
                    className={`px-3 py-1 text-xs font-mono font-medium transition-all cursor-pointer ${
                        selected === option.value
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-zinc-900 text-gray-500 border border-zinc-800 hover:border-zinc-700 hover:text-gray-400'
                    }`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}
