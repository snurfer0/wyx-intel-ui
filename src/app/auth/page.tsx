'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/stores/auth.store';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

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
        <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">
                        WYX Intel
                    </CardTitle>
                    <CardDescription>
                        Enter your API key to continue
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(e): void => {
                            void handleSubmit(e);
                        }}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="API Key"
                                value={apiKey}
                                onChange={(e): void =>
                                    setApiKey(e.target.value)
                                }
                                disabled={isLoading}
                                className="font-mono"
                                autoFocus
                            />
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Verifying...' : 'Continue'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
