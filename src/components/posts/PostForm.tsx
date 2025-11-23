'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Save, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface PostFormProps {
    initialData?: {
        title: string;
        excerpt: string;
        content: string;
        category: string;
    };
    onSubmit: (data: any) => Promise<void>;
    isLoading: boolean;
    buttonText: string;
}

export function PostForm({ initialData, onSubmit, isLoading, buttonText }: PostFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: '',
    });
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    const generateAIContent = () => {
        const baseTitle = formData.title || 'Your Story';
        const baseCategory = formData.category || 'General';

        return [
            `## ${baseTitle}`,
            '',
            `*Category: ${baseCategory}*`,
            '',
            `In today's rapidly evolving ${baseCategory.toLowerCase()} landscape, "${baseTitle}" stands out as a compelling narrative that explores the nuances of innovation, human stories, and the impact of thoughtful design.`,
            '',
            `1. **Context matters** – unpack the current trends shaping ${baseCategory.toLowerCase()} with tangible examples.`,
            `2. **Personal perspective** – weave in anecdotes or insights that only you can provide.`,
            `3. **Actionable takeaways** – end each section with a clear learning or question for readers.`,
            '',
            `> Keep the tone conversational and purposeful. Celebrate wins, acknowledge challenges, and invite readers to reflect.`,
            '',
            `Wrap up by summarizing why "${baseTitle}" should matter right now and what readers can do with the insight.`,
        ].join('\n');
    };

    const handleGenerateContent = async () => {
        if (!formData.title || !formData.category) {
            toast.error('Add a title and category first so the AI knows what to write about.');
            return;
        }

        setIsGenerating(true);
        await new Promise((resolve) => setTimeout(resolve, 900));
        const aiDraft = generateAIContent();
        setFormData((prev) => ({ ...prev, content: aiDraft }));
        setIsGenerating(false);
        toast.success('AI draft generated. Make it yours!');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Title</label>
                    <Input
                        name="title"
                        placeholder="Enter post title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="text-lg font-semibold"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Category</label>
                        <Input
                            name="category"
                            placeholder="e.g. Technology"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Excerpt</label>
                        <Input
                            name="excerpt"
                            placeholder="Short description"
                            value={formData.excerpt}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Content</label>
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                        <span>Use the AI helper for a structured starting point.</span>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleGenerateContent}
                            isLoading={isGenerating}
                            disabled={isGenerating}
                            className="gap-2"
                        >
                            <Sparkles size={14} />
                            Generate with AI
                        </Button>
                    </div>
                    <textarea
                        name="content"
                        placeholder="Write your story..."
                        value={formData.content}
                        onChange={handleChange}
                        required
                        className="flex min-h-[300px] w-full rounded-md border border-border bg-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 focus:bg-accent/10 resize-y"
                    />
                </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-4">
                <Link href="/">
                    <Button type="button" variant="ghost">
                        Cancel
                    </Button>
                </Link>
                <Button type="submit" isLoading={isLoading} className="min-w-[120px]">
                    <Save size={16} className="mr-2" />
                    {buttonText}
                </Button>
            </div>
        </form>
    );
}
