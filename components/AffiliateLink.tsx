import type { AnchorHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

/** Outbound Amazon links: sponsored + nofollow per FTC and common affiliate practice. */
export function AffiliateLink({ className, children, ...props }: Props) {
  return (
    <a
      {...props}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      className={cn("inline-flex items-center justify-center font-medium transition-colors", className)}
    >
      {children}
    </a>
  );
}
