'use client';

import * as Sentry from '@sentry/nextjs';
import NextError from 'next/error';
import { JSX, useEffect } from 'react';

export default function GlobalError({
    error,
}: {
    error: Error & { digest?: string };
}): JSX.Element {
    useEffect(() => {
        Sentry.captureException(error);
    }, [error]);

    return (
        <html>
            <body>
                <NextError statusCode={0} />
            </body>
        </html>
    );
}
