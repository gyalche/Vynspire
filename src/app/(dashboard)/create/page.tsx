'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/store/authStore';
import { usePosts } from '@/lib/store/postStore';
import { PostForm } from '@/components/posts/PostForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { toast } from 'sonner';

export default function CreatePostPage() {
    const { isAuthenticated } = useAuth();
    const { createPost, isLoading } = usePosts();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    const handleSubmit = async (data: any) => {
        try {
            await createPost(data);
            toast.success('Story published successfully!');
            router.push('/');
        } catch (error) {
            toast.error('Failed to publish story');
        }
    };

    if (!isAuthenticated) return null;

    return (
        <div className="max-w-3xl mx-auto pb-10">
            <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Create New Story
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <PostForm
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        buttonText="Publish Story"
                    />
                </CardContent>
            </Card>
        </div>
    );
}
