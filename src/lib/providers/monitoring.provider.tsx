'use client';

import * as Sentry from '@sentry/nextjs';
import {
    createContext,
    JSX,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';

interface MonitoringContextType {
    isInitialized: boolean;
}

const MonitoringContext = createContext<MonitoringContextType>({
    isInitialized: false,
});

interface MonitoringProviderProps {
    children: ReactNode;
}

export const MonitoringProvider = ({
    children,
}: MonitoringProviderProps): JSX.Element => {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initializeMonitoring = async (): Promise<void> => {
            try {
                // Set up global error handling with Sentry
                window.addEventListener('error', event => {
                    Sentry.captureException(event.error, {
                        extra: {
                            filename: event.filename,
                            lineno: event.lineno,
                            colno: event.colno,
                        },
                    });
                });

                window.addEventListener('unhandledrejection', event => {
                    Sentry.captureException(event.reason, {
                        extra: {
                            type: 'unhandled_promise_rejection',
                        },
                    });
                });

                setIsInitialized(true);
            } catch (error) {
                console.error(
                    'Failed to initialize monitoring services',
                    error,
                );
                Sentry.captureException(error);
            }
        };

        void initializeMonitoring();
    }, []);

    const value: MonitoringContextType = {
        isInitialized,
    };

    return (
        <MonitoringContext.Provider value={value}>
            {children}
        </MonitoringContext.Provider>
    );
};

export const useMonitoring = (): MonitoringContextType => {
    const context = useContext(MonitoringContext);
    if (!context) {
        throw new Error(
            'useMonitoring must be used within a MonitoringProvider',
        );
    }
    return context;
};

// Enhanced hooks with built-in functionality
export const useAnalytics = (): {
    track: (eventName: string, properties?: Record<string, unknown>) => void;
    identify: (userId: string, properties?: Record<string, unknown>) => void;
    reset: () => void;
    setUserProperties: (properties: Record<string, unknown>) => void;
    isReady: boolean;
} => {
    const track = (
        eventName: string,
        properties?: Record<string, unknown>,
    ): void => {
        // Track events with Sentry breadcrumbs
        Sentry.addBreadcrumb({
            message: eventName,
            data: properties,
            level: 'info',
        });
    };

    const identify = (
        userId: string,
        properties?: Record<string, unknown>,
    ): void => {
        // Identify user with Sentry
        Sentry.setUser({
            id: userId,
            ...properties,
        });
    };

    const reset = (): void => {
        // Reset user context in Sentry
        Sentry.setUser(null);
    };

    const setUserProperties = (properties: Record<string, unknown>): void => {
        // Set user properties in Sentry
        Sentry.setUser(properties);
    };

    return {
        track,
        identify,
        reset,
        setUserProperties,
        isReady: true, // Always ready since we only use Sentry now
    };
};

export const useLogger = (): {
    info: (message: string, context?: Record<string, unknown>) => void;
    warn: (message: string, context?: Record<string, unknown>) => void;
    error: (
        message: string,
        error?: Error,
        context?: Record<string, unknown>,
    ) => void;
    debug: (message: string, context?: Record<string, unknown>) => void;
    isReady: boolean;
} => {
    const log = (
        level: 'info' | 'warn' | 'error' | 'debug',
        message: string,
        context?: Record<string, unknown>,
    ): void => {
        const logData = {
            timestamp: new Date().toISOString(),
            pathname:
                typeof window !== 'undefined' ? window.location.pathname : '',
            userAgent:
                typeof navigator !== 'undefined' ? navigator.userAgent : '',
            ...context,
        };

        // Use console logging as fallback
        const consoleMethod = console[level] || console.log;
        consoleMethod(`[${level.toUpperCase()}] ${message}`, logData);
    };

    const info = (message: string, context?: Record<string, unknown>): void => {
        log('info', message, context);
    };

    const warn = (message: string, context?: Record<string, unknown>): void => {
        log('warn', message, context);
    };

    const error = (
        message: string,
        error?: Error,
        context?: Record<string, unknown>,
    ): void => {
        const errorContext = {
            ...context,
            ...(error && {
                error: {
                    name: error.name,
                    message: error.message,
                    stack: error.stack,
                },
            }),
        };
        log('error', message, errorContext);

        // Also send to Sentry
        if (error) {
            Sentry.captureException(error, {
                extra: errorContext,
            });
        } else {
            Sentry.captureMessage(message, 'error');
        }
    };

    const debug = (
        message: string,
        context?: Record<string, unknown>,
    ): void => {
        if (process.env.NODE_ENV === 'development') {
            log('debug', message, context);
        }
    };

    return {
        info,
        warn,
        error,
        debug,
        isReady: true, // Always ready since we're using console
    };
};
