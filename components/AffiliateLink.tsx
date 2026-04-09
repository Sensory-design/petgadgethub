import type { AnchorHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "rel"> & {
  href: string;
};

/** Outbound Amazon links: sponsored + nofollow per FTC and common affiliate practice. */
export function AffiliateLink({ className, children, href, ...props }: Props) {
  return (
    <a
      href={href}
      {...props}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      className={cn("inline-flex items-center justify-center font-medium transition-colors", className)}
    >
      {children}
    </a>
  );
}
