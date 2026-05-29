import { useState, useEffect, useCallback } from "react";
import { collectionService } from "@/lib/services/collection.service";
import type { Collection } from "@/types";

export function useCollections(workspaceId: string | undefined) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!workspaceId) return;
    setLoading(true);
    setError(null);
    try {
      const { data } = await collectionService.list(workspaceId);
      setCollections(data);
    } catch {
      setError("Failed to load collections");
    } finally {
      setLoading(false);
    }
  }, [workspaceId]);

  useEffect(() => { load(); }, [load]);

  return { collections, loading, error, refetch: load, setCollections };
}
