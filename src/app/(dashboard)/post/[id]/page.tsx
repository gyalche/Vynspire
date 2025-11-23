'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/store/authStore';
import { usePosts } from '@/lib/store/postStore';
import { Button } from '@/components/ui/Button';
import { Loader2, Calendar, User, ArrowLeft, Trash2, Edit } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PostDetailPage({ params }: { params: { id: string } }) {
    const { user } = useAuth();
    const { currentPost, fetchPostById, deletePost, isLoading } = usePosts();
    const router = useRouter();

    useEffect(() => {
        fetchPostById(params.id);
    }, [params.id, fetchPostById]);

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this post?')) {
            await deletePost(params.id);
            router.push('/');
        }
    };

    if (isLoading || !currentPost) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto pb-20"
        >
            <Link href="/">
                <Button variant="ghost" className="mb-6 pl-0 hover:pl-2 transition-all text-gray-400 hover:text-white">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                </Button>
            </Link>

            <article className="prose prose-invert prose-lg max-w-none">
                <div className="mb-8 border-b border-white/10 pb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/20 text-primary border border-primary/20">
                            {currentPost.category}
                        </span>
                    </div>

                    <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 leading-tight">
                        {currentPost.title}
                    </h1>

                    <div className="flex items-center justify-between text-gray-400 text-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                                    {currentPost.author.charAt(0)}
                                </div>
                                {currentPost.author}
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                {currentPost.date}
                            </div>
                        </div>

                        {user && (
                            <div className="flex gap-2">
                                <Link href={`/edit/${currentPost.id}`}>
                                    <Button variant="outline" size="sm">
                                        <Edit size={14} className="mr-2" /> Edit
                                    </Button>
                                </Link>
                                <Button variant="destructive" size="sm" onClick={handleDelete}>
                                    <Trash2 size={14} className="mr-2" /> Delete
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="text-gray-300 leading-loose whitespace-pre-wrap">
                    {currentPost.content}
                </div>
            </article>
        </motion.div>
    );
}
