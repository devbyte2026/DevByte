"use client";

import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/cn";

interface OptimizedImageProps extends ImageProps {
  alt: string;
}

export function OptimizedImage({
  alt,
  className,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      alt={alt}
      className={cn("object-cover", className)}
      {...props}
    />
  );
}
