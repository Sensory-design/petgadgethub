import { Suspense } from "react";

import { InternalLoginForm } from "./InternalLoginForm";

export default function InternalLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-md px-4 py-16 text-sm text-[var(--color-muted)] sm:px-6">
          Loading...
        </div>
      }
    >
      <InternalLoginForm />
    </Suspense>
  );
}
