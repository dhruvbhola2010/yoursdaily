import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-light tracking-wide ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/30 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-primary/30 text-primary hover:border-primary/60 hover:bg-primary/5",
        destructive:
          "border border-destructive/30 text-destructive hover:border-destructive/60 hover:bg-destructive/5",
        outline:
          "border border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
        secondary:
          "border border-border text-foreground hover:bg-secondary",
        ghost:
          "text-muted-foreground hover:text-foreground",
        link:
          "text-primary underline-offset-4 hover:underline",
        clay:
          "border border-primary/30 text-primary hover:border-primary/60 hover:bg-primary/5",
        clayPink:
          "border border-primary/30 text-primary hover:border-primary/60 hover:bg-primary/5",
        clayOutline:
          "border border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
      },
      size: {
        default: "h-11 px-6 py-2 text-sm",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-sm",
        xl: "h-14 px-10 text-sm",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
