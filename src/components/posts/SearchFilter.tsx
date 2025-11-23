'use client';

import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SearchFilterProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    categories: string[];
}

export function SearchFilter({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
}: SearchFilterProps) {
    const categoryOptions = ['All', ...categories];

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-3xl border border-border/40 p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4 shadow-[0_25px_60px_rgba(15,23,42,0.15)]"
        >
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    placeholder="Search stories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-12 h-12 rounded-2xl border-none bg-white/80 shadow-inner shadow-primary/10 focus:bg-white/90 dark:bg-white/5 dark:shadow-black/40"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Clear search"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
                {categoryOptions.map((category) => {
                    const isActive = selectedCategory === category;
                    return (
                        <Button
                            key={category}
                            variant={isActive ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedCategory(category)}
                            aria-pressed={isActive}
                            className={cn(
                                'whitespace-nowrap rounded-full px-4 text-xs md:text-sm transition-all duration-200',
                                isActive
                                    ? 'shadow-[0_15px_35px_rgba(79,70,229,0.35)]'
                                    : 'text-muted-foreground border-border/60 bg-white/80 hover:text-foreground hover:border-border/80 dark:bg-white/10 dark:text-white/70'
                            )}
                        >
                            {category}
                        </Button>
                    );
                })}
            </div>
        </motion.div>
    );
}
