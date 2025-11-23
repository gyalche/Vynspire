import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card"
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-lg bg-foreground/5 dark:bg-white/5", className)}
            {...props}
        />
    )
}

export function PostSkeleton() {
    return (
        <Card className="h-full flex flex-col overflow-hidden border-border/40 bg-card/60">
            <CardHeader className="space-y-4">
                <div className="flex justify-between items-start mb-2">
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent className="flex-grow space-y-2">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-2/3 rounded-md" />
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-4 mt-auto gap-4">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <Skeleton className="h-4 w-24 rounded-md" />
                </div>
                <Skeleton className="h-10 w-24 rounded-full" />
            </CardFooter>
        </Card>
    )
}
