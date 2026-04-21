import { cn } from "@/lib/cn";
import { ReactNode } from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "featured" | "glass";
  children: ReactNode;
}

export function Card({
  className,
  variant = "default",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-6 transition-all duration-200",
        {
          "bg-[var(--color-card)] border border-[var(--color-border)] shadow-sm hover:shadow-md":
            variant === "default",
          "bg-[var(--color-primary)] text-[var(--color-text-inverted)] shadow-lg scale-[1.02]":
            variant === "featured",
          "bg-white/80 backdrop-blur-sm border border-[var(--color-border)] shadow-sm":
            variant === "glass",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-xl font-semibold font-display text-[var(--color-text-primary)]", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-[var(--color-text-muted)] mt-2", className)} {...props}>
      {children}
    </p>
  );
}