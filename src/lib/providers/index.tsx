'use client';

import * as Sentry from '@sentry/nextjs';
import {
    MutationCache,
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import { toast } from 'sonner';
import { MonitoringProvider } from './monitoring.provider';

function Providers({ children }: React.PropsWithChildren): React.JSX.Element {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                throwOnError: false,
                retry: false,
                staleTime: 5 * 60 * 1000, // 5 minutes - data is fresh for 5 minutes
                gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache for 10 minutes
                refetchOnMount: false, // Only refetch if data is stale
            },
        },
        queryCache: new QueryCache({
            onError: (error): void => {
                if (isAxiosError(error)) {
                    const errorMessage =
                        (error.response?.data as { message?: string })
                            ?.message || 'Something went wrong';
                    toast.error(errorMessage);
                } else {
                    toast.error('Something went wrong');
                }

                if (process.env.NODE_ENV === 'production') {
                    Sentry.captureException(error);
                } else {
                    console.error(error);
                }
            },
        }),
        mutationCache: new MutationCache({
            onError: (error): void => {
                if (isAxiosError(error)) {
                    const errorMessage =
                        (error.response?.data as { message: string }).message ||
                        'Something went wrong';
                    toast.error(errorMessage);
                } else {
                    toast.error('Something went wrong');
                }

                console.error(error);
            },
        }),
    });

    return (
        <MonitoringProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </ThemeProvider>
        </MonitoringProvider>
    );
}

export default Providers;
