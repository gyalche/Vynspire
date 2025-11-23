'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/store/authStore';
import { usePosts } from '@/lib/store/postStore';
import { PostForm } from '@/components/posts/PostForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function EditPostPage({ params }: { params: { id: string } }) {
    const { isAuthenticated } = useAuth();
    const { currentPost, fetchPostById, updatePost, isLoading } = usePosts();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        fetchPostById(params.id);
    }, [isAuthenticated, params.id, fetchPostById, router]);

    const handleSubmit = async (data: any) => {
        try {
            await updatePost(params.id, data);
            toast.success('Story updated successfully!');
            router.push(`/post/${params.id}`);
        } catch (error) {
            toast.error('Failed to update story');
        }
    };

    if (!isAuthenticated) return null;

    if (isLoading && !currentPost) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto pb-10">
            <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Edit Story
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {currentPost && (
                        <PostForm
                            initialData={currentPost}
                            onSubmit={handleSubmit}
                            isLoading={isLoading}
                            buttonText="Update Story"
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
