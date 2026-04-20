import { cn } from "@/lib/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "accent";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        {
          "bg-primary text-text-inverted": variant === "default",
          "border border-current text-text-muted bg-transparent":
            variant === "outline",
          "bg-accent/10 text-accent-dark": variant === "accent",
        },
        className
      )}
      {...props}
    />
  );
}
