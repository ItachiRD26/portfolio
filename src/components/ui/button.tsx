import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonBaseStyles =
  "inline-flex items-center justify-center font-medium rounded-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";

const buttonVariants = {
  default: "bg-blue-500 text-white hover:bg-blue-600 active:scale-95",
  destructive: "bg-red-500 text-white hover:bg-red-600 active:scale-95",
  outline:
    "border border-gray-300 text-gray-700 hover:bg-gray-100 active:scale-95",
  secondary: "bg-gray-500 text-white hover:bg-gray-600 active:scale-95",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:scale-95",
  link: "text-blue-500 underline-offset-4 hover:underline",
};

const buttonSizes = {
  default: "px-4 py-2 text-sm",
  sm: "px-3 py-1 text-sm",
  lg: "px-6 py-3 text-lg",
  icon: "p-2",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonBaseStyles,
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
