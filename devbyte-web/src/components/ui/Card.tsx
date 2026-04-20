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
          "bg-surface border border-gray-100 shadow-sm hover:shadow-md":
            variant === "default",
          "bg-primary text-text-inverted shadow-lg scale-[1.02]":
            variant === "featured",
          "bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm":
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
      className={cn("text-xl font-semibold font-display", className)}
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
    <p className={cn("text-text-muted mt-2", className)} {...props}>
      {children}
    </p>
  );
}
