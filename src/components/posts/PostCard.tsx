import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
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
            <Card className="h-full flex flex-col overflow-hidden group transition-all duration-300">
                <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/20">
                            {post.category}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock size={12} />
                                {readingTime} min read
                            </span>
                        </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                        {post.excerpt}
                    </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t border-border pt-4 mt-auto">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                            {post.author.charAt(0)}
                        </div>
                        {post.author}
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
