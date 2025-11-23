import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface PostCardProps {
    post: {
        id: string;
        title: string;
        excerpt: string;
        content: string;
        author: string;
        date: string;
        category: string;
    };
    index: number;
}

export function PostCard({ post, index }: PostCardProps) {
    const readingTime = Math.ceil(post.content.split(' ').length / 200);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Card className="group h-full flex flex-col overflow-hidden border border-border/50 bg-gradient-to-b from-card/90 via-card/70 to-card/60">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/25 via-transparent to-secondary/25 pointer-events-none" />
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <CardHeader className="relative pb-4">
                    <div className="flex items-start justify-between mb-3">
                        <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/20">
                            {post.category}
                        </span>
                        <div className="flex flex-col items-end text-xs text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                                <Calendar size={12} />
                                {post.date}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock size={12} />
                                {readingTime} min read
                            </span>
                        </div>
                    </div>
                    <CardTitle className="text-2xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="relative flex-grow">
                    <p className="text-muted-foreground text-base line-clamp-3 leading-relaxed">
                        {post.excerpt}
                    </p>
                </CardContent>
                <CardFooter className="relative flex justify-between items-center border-t border-border/60 pt-4 mt-auto">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shadow-[0_8px_20px_rgba(79,70,229,0.35)]">
                            {post.author.charAt(0)}
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-xs uppercase tracking-wider text-muted-foreground">Author</span>
                            <span className="text-foreground">{post.author}</span>
                        </div>
                    </div>
                    <Link href={`/post/${post.id}`}>
                        <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary hover:bg-primary/10">
                            Read More <ArrowRight size={14} />
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
