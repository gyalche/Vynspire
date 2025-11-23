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
        <div className="max-w-4xl mx-auto pb-12 space-y-8">
            <section className="glass rounded-3xl border border-border/40 p-8 shadow-[0_35px_80px_rgba(15,23,42,0.15)]">
                <p className="text-xs uppercase tracking-[0.65em] text-primary/80 mb-3">Polish & refine</p>
                <h1 className="text-4xl font-bold text-foreground mb-4">Update your story</h1>
                <p className="text-muted-foreground max-w-2xl">
                    Make final tweaks, iterate on feedback, and keep your readers up to date with new ideas.
                </p>
            </section>
            <Card className="glass border border-border/40 bg-card/85">
                <CardHeader className="border-b border-border/40">
                    <CardTitle className="text-2xl font-semibold text-foreground">
                        Story details
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
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
