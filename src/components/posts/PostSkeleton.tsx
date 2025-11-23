import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card"
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-muted", className)}
            {...props}
        />
    )
}

export function PostSkeleton() {
    return (
        <Card className="h-full flex flex-col overflow-hidden border-border bg-card">
            <CardHeader>
                <div className="flex justify-between items-start mb-2">
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-8 w-3/4 mt-2" />
            </CardHeader>
            <CardContent className="flex-grow space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-4 mt-auto">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-8 w-24" />
            </CardFooter>
        </Card>
    )
}
