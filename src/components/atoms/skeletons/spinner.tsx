import React from 'react';
import { cn } from '@/lib/utils';

interface SpinnerProps {
    className?: string;
}

export function Spinner({ className }: SpinnerProps): React.JSX.Element {
    return (
        <div
            className={cn(
                'animate-spin rounded-full border-2 border-current border-t-transparent h-4 w-4',
                className,
            )}
        />
    );
}
