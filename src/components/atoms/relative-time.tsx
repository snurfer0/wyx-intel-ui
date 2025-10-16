'use client';

import React from 'react';
import { formatRelativeTime } from '@/utils/date-formatting';

interface RelativeTimeProps {
    date: string;
    className?: string;
}

export function RelativeTime({
    date,
    className,
}: RelativeTimeProps): React.JSX.Element {
    return <span className={className}>{formatRelativeTime(date)}</span>;
}
