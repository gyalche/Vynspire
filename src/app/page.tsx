'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { usePosts } from '@/lib/store/postStore';
import { PostCard } from '@/components/posts/PostCard';
import { PostSkeleton } from '@/components/posts/PostSkeleton';
import { SearchFilter } from '@/components/posts/SearchFilter';
import { Button } from '@/components/ui/Button';

export default function Home() {
  const { posts, isLoading, fetchPosts } = usePosts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const categories = useMemo(() => {
    const cats = new Set(posts.map((p) => p.category));
    return Array.from(cats);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <div className="space-y-10 pb-12">
      <section className="relative overflow-hidden rounded-[2rem] glass border border-border/40 px-6 sm:px-10 py-12 shadow-[0_35px_80px_rgba(15,23,42,0.25)]">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
        <div className="relative grid gap-10 lg:grid-cols-[3fr,2fr]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.65em] text-primary/80">Curated stories daily</p>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-secondary">
              Latest Stories
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Discover fresh perspectives, trending ideas, and thoughtful essays from writers across the globe.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/register">
                <Button size="lg">Join the community</Button>
              </Link>
              <Link href="/create">
                <Button variant="outline" size="lg">
                  Start writing
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="surface-card rounded-2xl p-6 flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Weekly reads</span>
              <span className="text-4xl font-bold text-foreground">12.4k</span>
              <span className="text-sm text-muted-foreground">
                +18% this week
              </span>
            </div>
            <div className="surface-card rounded-2xl p-6 flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Active writers</span>
              <span className="text-4xl font-bold text-foreground">340</span>
              <span className="text-sm text-muted-foreground">
                Sharing thoughtful insights
              </span>
            </div>
            <div className="surface-card rounded-2xl p-6 flex flex-col gap-2 col-span-2">
              <span className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Trending topics</span>
              <div className="flex flex-wrap gap-2">
                {['Design', 'Technology', 'Wellness', 'Leadership', 'Culture'].map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-primary/10 text-primary"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-muted-foreground">
              No stories found matching your criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
