'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { API_URL } from '@/config/constants';
import { useAuthStore } from '@/stores/auth.store';

export default function AuthPage(): React.JSX.Element {
    const [apiKey, setApiKey] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setApiKey: saveApiKey } = useAuthStore();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        if (!apiKey.trim()) {
            setError('Please enter an API key');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Verify the API key using the dedicated auth endpoint
            const response = await fetch(`${API_URL}/auth`, {
                method: 'GET',
                headers: {
                    'x-api-secret': apiKey,
                },
            });

            if (!response.ok) {
                throw new Error('Invalid API key');
            }

            const data = (await response.json()) as { status: string };

            if (data.status === 'ok') {
                // If successful, save the key and redirect
                saveApiKey(apiKey);
                router.push('/tracking');
            } else {
                throw new Error('Invalid API key');
            }
        } catch (err) {
            console.error('Authentication failed:', err);
            setError('Invalid API key. Please check and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
            {/* Subtle background gradient accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 pointer-events-none" />

            <div className="w-full max-w-sm relative">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-semibold tracking-tight mb-3">
                        WYX Intel
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Enter your API key to continue
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={(e): void => {
                        void handleSubmit(e);
                    }}
                    className="space-y-4"
                >
                    <div className="relative group">
                        <Input
                            type="text"
                            placeholder="API Key"
                            value={apiKey}
                            onChange={(e): void => setApiKey(e.target.value)}
                            disabled={isLoading}
                            className="font-mono h-14 px-4 bg-background border-2 border-border/40 hover:border-border/60 focus:border-green-500/60 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200 tracking-widest shadow-sm hover:shadow-md focus:shadow-lg focus:shadow-green-500/10"
                            style={
                                {
                                    WebkitTextSecurity: 'disc',
                                } as React.CSSProperties
                            }
                            autoFocus
                            autoComplete="off"
                            data-1p-ignore
                            data-lpignore="true"
                            data-form-type="other"
                        />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity duration-500" />
                    </div>

                    {error && (
                        <Alert
                            variant="destructive"
                            className="border-red-500/30 bg-red-500/5"
                        >
                            <AlertDescription className="text-sm">
                                {error}
                            </AlertDescription>
                        </Alert>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 bg-foreground text-background font-medium rounded-md hover:bg-foreground/90 active:bg-foreground/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md relative overflow-hidden group"
                    >
                        <span className="relative z-10">
                            {isLoading ? 'Verifying...' : 'Continue'}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/20 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                </form>

                {/* Footer hint */}
                <p className="text-center text-xs text-muted-foreground mt-6">
                    Secure authentication • API key stored locally
                </p>
            </div>
        </div>
    );
}
