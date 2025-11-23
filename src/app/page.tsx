'use client';

import { useEffect, useState, useMemo } from 'react';
import { usePosts } from '@/lib/store/postStore';
import { PostCard } from '@/components/posts/PostCard';
import { PostSkeleton } from '@/components/posts/PostSkeleton';
import { SearchFilter } from '@/components/posts/SearchFilter';

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
    <div className="space-y-8 pb-10">
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
          Latest Stories
        </h1>
        <p className="text-muted-foreground text-lg">
          Discover the latest insights and thoughts from our community.
        </p>
      </div>

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
