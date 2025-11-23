'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/store/authStore';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { PenSquare, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export function Navbar() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative mt-3 rounded-full glass border border-border/40 px-4 sm:px-6 py-2.5 shadow-[0_20px_60px_rgba(15,23,42,0.35)]">
                    <div className="absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-secondary drop-shadow-[0_6px_20px_rgba(79,70,229,0.35)]"
                            >
                                Vynspire
                            </Link>
                            <span className="hidden md:inline-flex text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
                                Stories crafted daily
                            </span>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 text-foreground">
                            <ThemeToggle />
                            {user ? (
                                <>
                                    <Link href="/create" className="hidden sm:block">
                                        <Button variant="outline" size="sm" className="gap-2">
                                            <PenSquare size={16} />
                                            Write
                                        </Button>
                                    </Link>
                                    <div className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-border/40 bg-white/90 text-sm font-medium text-foreground shadow-inner dark:bg-white/10 dark:text-white">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary via-secondary to-secondary/90 text-foreground dark:text-white flex items-center justify-center font-semibold ring-2 ring-white/70 dark:ring-white/20 shadow-[0_10px_25px_rgba(79,70,229,0.5)]">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div className="hidden sm:flex flex-col leading-tight">
                                            <span className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                                                Signed in
                                            </span>
                                            <span>{user.name}</span>
                                        </div>
                                    </div>
                                    <Button variant="destructive" size="sm" onClick={handleLogout}>
                                        <LogOut size={18} />
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button variant="ghost" size="sm" className="px-4 text-foreground">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button size="sm" className="px-5">
                                            Get Started
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
