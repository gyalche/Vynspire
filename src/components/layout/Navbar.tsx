'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/store/authStore';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { PenSquare, LogOut, User } from 'lucide-react';
import { motion } from 'framer-motion';

export function Navbar() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 glass border-b border-border"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Vynspire
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <ThemeToggle />
                        {user ? (
                            <>
                                <Link href="/create">
                                    <Button variant="ghost" className="gap-2">
                                        <PenSquare size={18} />
                                        Write
                                    </Button>
                                </Link>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                                    <User size={16} className="text-primary" />
                                    <span className="text-sm font-medium">{user.name}</span>
                                </div>
                                <Button variant="destructive" size="sm" onClick={handleLogout}>
                                    <LogOut size={18} />
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost">Login</Button>
                                </Link>
                                <Link href="/register">
                                    <Button>Get Started</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
