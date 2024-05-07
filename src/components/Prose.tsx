import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export const Prose = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLElement>) => {
  return (
    <div
      className={cn(
        "prose prose-stone dark:prose-invert prose-a:font-normal prose-a:text-foreground hover:prose-a:text-primary first:prose-p:mt-0 last:prose-p:mb-0 first:prose-ul:mt-0 last:prose-ul:mb-0 prose-li:m-0 prose-img:border prose-img:border-card prose-img:rounded-md prose-lead:text-lg/relaxed prose-pre:font-mono prose-pre:rounded-none prose-headings:font-semibold prose-headings:tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
