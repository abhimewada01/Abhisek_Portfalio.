import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-[10px] font-semibold cursor-pointer transition-[background-color,border-color,transform,color] duration-200 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "h-11 bg-[#FAFAFA] px-6 text-[15px] font-semibold text-[#09090B] hover:bg-[#E4E4E7] hover:-translate-y-px",
        destructive:
          "h-11 bg-[#EF4444] px-6 text-[15px] font-semibold text-[#FAFAFA] hover:bg-[#EF4444]/90",
        outline:
          "group h-10 border border-[#2E2E35] bg-transparent px-6 text-[14px] font-medium text-[#FAFAFA] hover:border-[#8B5CF6] hover:bg-[rgba(139,92,246,0.06)]",
        secondary:
          "h-10 bg-[#18181B] px-6 text-[14px] font-medium text-[#FAFAFA] hover:bg-[#1C1C22]",
        ghost:
          "h-10 bg-transparent px-3 text-[14px] font-medium text-[#FAFAFA] hover:bg-[#18181B]",
        link: "h-auto rounded-none px-0 text-[14px] font-medium text-[#FAFAFA] underline-offset-4 hover:underline",
      },
      size: {
        default: "",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-11 px-6 text-[15px]",
        icon: "size-10 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & { asChild?: boolean }>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
