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
        <div className="max-w-4xl mx-auto pb-12 space-y-8">
            <section className="glass rounded-3xl border border-border/40 p-8 shadow-[0_35px_80px_rgba(15,23,42,0.15)]">
                <p className="text-xs uppercase tracking-[0.65em] text-primary/80 mb-3">Write mode</p>
                <h1 className="text-4xl font-bold text-foreground mb-4">Craft your next story</h1>
                <p className="text-muted-foreground max-w-2xl">
                    Share thoughtful takes, product ideas, or deep dives with the Vynspire community. Polished tools and
                    distraction-free writing keep you focused on the narrative.
                </p>
            </section>
            <Card className="glass border border-border/40 bg-card/85">
                <CardHeader className="border-b border-border/40">
                    <CardTitle className="text-2xl font-semibold text-foreground">
                        Story details
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
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
