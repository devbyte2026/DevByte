import { cn } from "@/lib/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "accent";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-300",
        {
          "bg-primary text-text-inverted hover:bg-primary/90": variant === "default",
          "border border-current text-text-muted bg-transparent hover:bg-gray-50":
            variant === "outline",
          "bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20": variant === "accent",
        },
        className
      )}
      {...props}
    />
  );
}
