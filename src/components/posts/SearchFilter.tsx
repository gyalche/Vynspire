'use client';

import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

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
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
        >
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    placeholder="Search stories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10 bg-input border-border focus:bg-accent/10 transition-colors"
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
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                <Button
                    variant={selectedCategory === 'All' ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory('All')}
                    className="whitespace-nowrap"
                >
                    All
                </Button>
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'outline'}
                        onClick={() => setSelectedCategory(category)}
                        className="whitespace-nowrap"
                    >
                        {category}
                    </Button>
                ))}
            </div>
        </motion.div>
    );
}
