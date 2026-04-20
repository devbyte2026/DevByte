import { cn } from "@/lib/cn";
import { ReactNode } from "react";

export interface SectionWrapperProps
  extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  background?: "default" | "muted" | "dark" | "gradient";
  children: ReactNode;
}

export function SectionWrapper({
  className,
  id,
  background = "default",
  children,
  ...props
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      aria-label={id}
      className={cn(
        "py-16 md:py-24 px-4 md:px-8",
        {
          "bg-surface": background === "default",
          "bg-surface-muted": background === "muted",
          "bg-primary text-text-inverted": background === "dark",
          "bg-gradient-to-br from-primary to-primary-dark text-text-inverted":
            background === "gradient",
        },
        className
      )}
      {...props}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}
