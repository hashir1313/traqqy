"use client";

import { ErrorState } from "../_components/errors/error-state";

// biome-ignore lint/suspicious/noShadowRestrictedNames: Next.js error boundary convention
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return <ErrorState message={error.message} onRetry={reset} />;
}
