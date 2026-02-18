"use client";

import { ErrorScreen } from "@/components/ErrorScreen";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorScreen
      code="500"
      title="Something went wrong"
      message="An unexpected error occurred. The page may have broken during rendering."
      onRetry={reset}
    />
  );
}
