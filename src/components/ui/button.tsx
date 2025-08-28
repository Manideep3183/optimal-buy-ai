import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-primary-light text-primary-foreground hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
        destructive:
          "bg-gradient-to-r from-destructive to-red-600 text-destructive-foreground hover:from-red-600 hover:to-destructive shadow-lg hover:shadow-xl",
        outline:
          "border-2 border-input bg-background hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary-light/5 hover:border-primary/30 backdrop-blur-sm",
        secondary:
          "bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground hover:from-secondary/80 hover:to-secondary shadow-md hover:shadow-lg",
        ghost: "hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-light",
        hero: "bg-gradient-to-r from-primary to-primary-light text-primary-foreground shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border border-primary/20 backdrop-blur-sm glow-effect",
        success: "bg-gradient-to-r from-success to-green-600 text-success-foreground hover:from-green-600 hover:to-success shadow-lg hover:shadow-xl",
        warning: "bg-gradient-to-r from-warning to-orange-600 text-warning-foreground hover:from-orange-600 hover:to-warning shadow-lg hover:shadow-xl",
        premium: "bg-gradient-to-r from-primary via-primary-light to-primary text-primary-foreground shadow-2xl hover:shadow-primary/25 transform hover:-translate-y-1 border border-primary/30 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-12 rounded-xl px-8 text-base font-semibold",
        icon: "h-11 w-11",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
