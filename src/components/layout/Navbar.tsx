'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/store/authStore';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { PenSquare, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const closeMobile = () => setIsMobileOpen(false);

    const handleLogout = () => {
        logout();
        router.push('/login');
        closeMobile();
    };

    const AuthActions = (
        <>
            {user ? (
                <>
                    <Link href="/create" className="hidden sm:block">
                        <Button variant="outline" size="sm" className="gap-2">
                            <PenSquare size={16} />
                            Write
                        </Button>
                    </Link>
                    <Link
                        href="/profile"
                        onClick={closeMobile}
                        className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-border/40 bg-white/90 text-sm font-medium text-foreground shadow-inner transition hover:border-primary/50 hover:shadow-[0_12px_35px_rgba(79,70,229,0.25)] dark:bg-white/10 dark:text-white"
                        aria-label="View profile"
                    >
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary via-secondary to-secondary/90 text-foreground dark:text-white flex items-center justify-center font-semibold ring-2 ring-white/70 dark:ring-white/20 shadow-[0_10px_25px_rgba(79,70,229,0.5)] overflow-hidden">
                            {user.avatarUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={user.avatarUrl} alt={`${user.name} avatar`} className="w-full h-full object-cover" />
                            ) : (
                                user.name.charAt(0)
                            )}
                        </div>
                        <div className="hidden sm:flex flex-col leading-tight">
                            <span className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                                Signed in
                            </span>
                            <span>{user.name}</span>
                        </div>
                    </Link>
                    <Button variant="destructive" size="sm" onClick={handleLogout} className="w-full sm:w-auto">
                        <LogOut size={18} />
                    </Button>
                </>
            ) : (
                <>
                    <Link href="/login" onClick={closeMobile}>
                        <Button variant="ghost" size="sm" className="px-4 text-foreground w-full">
                            Login
                        </Button>
                    </Link>
                    <Link href="/register" onClick={closeMobile}>
                        <Button size="sm" className="px-5 w-full">
                            Get Started
                        </Button>
                    </Link>
                </>
            )}
        </>
    );

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="fixed top-0 left-0 right-0 z-50"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative mt-3 rounded-full glass border border-border/40 px-4 sm:px-6 py-2.5 shadow-[0_20px_60px_rgba(15,23,42,0.35)]">
                        <div className="absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/"
                                    className="text-2xl font-black tracking-tight text-foreground drop-shadow-[0_6px_20px_rgba(79,70,229,0.3)] dark:text-white"
                                >
                                    Vynspire
                                </Link>
                                <span className="hidden md:inline-flex text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
                                    Stories crafted daily
                                </span>
                            </div>
                            <div className="hidden sm:flex items-center gap-3 text-foreground">
                                <ThemeToggle />
                                {AuthActions}
                            </div>
                            <div className="flex items-center gap-3 sm:hidden">
                                <ThemeToggle />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full border border-border/40"
                                    onClick={() => setIsMobileOpen(true)}
                                    aria-label="Open navigation"
                                >
                                    <Menu />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 sm:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="absolute inset-0 bg-black/40 backdrop-blur" onClick={closeMobile} />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                            className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-background shadow-2xl p-6 flex flex-col gap-6"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold">Menu</span>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full border border-border/40"
                                    aria-label="Close navigation"
                                    onClick={closeMobile}
                                >
                                    <X />
                                </Button>
                            </div>

                            <div className="space-y-4">
                                {user && (
                                    <Link href="/create" onClick={closeMobile}>
                                        <Button className="w-full gap-2">
                                            <PenSquare size={16} />
                                            Write a story
                                        </Button>
                                    </Link>
                                )}
                                <div className="flex flex-col gap-3">{AuthActions}</div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
