'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/store/authStore';
import { authApi } from '@/lib/api/mockApi';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const login = useAuth((state) => state.login);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const { user, token } = await authApi.register(email, password, name);
            login(user, token);
            toast.success('Account created successfully!');
            router.push('/');
        } catch (err: any) {
            setError(err.message || 'Failed to register');
            toast.error('Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="border-border bg-card/40 backdrop-blur-xl">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Create Account
                        </CardTitle>
                        <CardDescription className="text-center">
                            Join our community of writers and readers
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Full Name</label>
                                <Input
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Email</label>
                                <Input
                                    type="email"
                                    placeholder="user@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Password</label>
                                <PasswordInput
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && (
                                <div className="text-destructive text-sm text-center bg-destructive/10 p-2 rounded border border-destructive/20">
                                    {error}
                                </div>
                            )}
                            <Button type="submit" className="w-full" isLoading={isLoading}>
                                Sign Up
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
