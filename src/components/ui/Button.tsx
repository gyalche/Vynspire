import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-95",
    {
        variants: {
            variant: {
                default: "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-[0_20px_45px_rgba(79,70,229,0.45)] hover:shadow-[0_25px_55px_rgba(79,70,229,0.55)]",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive-hover shadow-[0_15px_35px_rgba(248,113,113,0.35)]",
                outline: "border border-border/60 bg-transparent text-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-[0_15px_35px_rgba(14,165,233,0.35)]",
                ghost: "text-muted-foreground hover:text-foreground hover:bg-foreground/10 dark:hover:bg-white/10",
                link: "text-primary underline-offset-4 hover:underline",
                glass: "border border-white/20 bg-white/10 text-white shadow-[0_20px_45px_rgba(59,130,246,0.25)] hover:bg-white/20 dark:border-white/10 dark:bg-white/5",
            },
            size: {
                default: "h-11 px-6",
                sm: "h-9 rounded-full px-4 text-xs",
                lg: "h-12 rounded-full px-8 text-base",
                icon: "h-10 w-10 rounded-full",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
    isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, isLoading, children, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
