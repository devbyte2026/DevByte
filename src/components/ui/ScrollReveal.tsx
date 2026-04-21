"use client";

import { useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: 0 | 100 | 200 | 300 | 400;
  direction?: "up" | "left" | "right" | "scale";
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const directionClasses = {
    up: "translate-y-[30px] translate-y-0 opacity-0 opacity-100",
    left: "-translate-x-[30px] translate-x-0 opacity-0 opacity-100",
    right: "translate-x-[30px] translate-x-0 opacity-0 opacity-100",
    scale: "scale-90 scale-100 opacity-0 opacity-100",
  };

  const delayClass = delay === 100 ? "delay-100" : delay === 200 ? "delay-200" : delay === 300 ? "delay-300" : delay === 400 ? "delay-400" : "";

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        directionClasses[direction],
        delayClass,
        className
      )}
    >
      {children}
    </div>
  );
}
