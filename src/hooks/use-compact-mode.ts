import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function useCompactMode() {
  const [searchParams] = useSearchParams();
  return useMemo(() => searchParams.get("mode") === "compact", [searchParams]);
}
