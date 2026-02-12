import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold tracking-wide ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.92]",
  {
    variants: {
      variant: {
        default:
          "rounded-[20px] bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] text-white shadow-clay-button hover:-translate-y-1 active:shadow-clay-pressed",
        destructive:
          "rounded-[20px] bg-destructive text-destructive-foreground shadow-clay-button hover:-translate-y-1",
        outline:
          "rounded-[20px] border-2 border-primary/20 bg-transparent text-primary hover:border-primary hover:bg-primary/5",
        secondary:
          "rounded-[20px] bg-white text-foreground shadow-clay-button hover:-translate-y-1",
        ghost:
          "rounded-[20px] text-foreground hover:bg-primary/10 hover:text-primary",
        link:
          "text-primary underline-offset-4 hover:underline",
        clay:
          "rounded-[20px] bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] text-white shadow-clay-button hover:-translate-y-1 hover:shadow-[16px_16px_32px_rgba(139,92,246,0.4),-10px_-10px_20px_rgba(255,255,255,0.5)] active:shadow-clay-pressed",
        clayPink:
          "rounded-[20px] bg-gradient-to-br from-[#F472B6] to-[#DB2777] text-white shadow-clay-button hover:-translate-y-1 active:shadow-clay-pressed",
        clayOutline:
          "rounded-[20px] border-2 border-primary/20 bg-white/60 backdrop-blur-xl text-primary shadow-clay-card hover:-translate-y-1 hover:border-primary/40",
      },
      size: {
        default: "h-14 px-6 py-2 text-sm",
        sm: "h-11 px-4 text-sm",
        lg: "h-16 px-10 text-base",
        xl: "h-[4.5rem] px-12 text-lg",
        icon: "h-11 w-11",
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
