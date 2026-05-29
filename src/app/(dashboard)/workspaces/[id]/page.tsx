"use client";

import { useParams } from "next/navigation";
import { useCollections } from "@/hooks/useCollections";
import { Header } from "@/components/layout/Header";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { Skeleton } from "@/components/ui/skeleton";
import { FolderOpen } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function WorkspacePage() {
  const { id } = useParams<{ id: string }>();
  const { activeWorkspace } = useWorkspaceStore();
  const { collections, loading } = useCollections(id);

  return (
    <>
      <Header
        title={activeWorkspace?.name ?? "Workspace"}
        description="API collections"
      />
      <div className="flex-1 overflow-auto p-6">
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-20" />)}
          </div>
        ) : collections.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center gap-3 text-center">
            <FolderOpen className="h-12 w-12 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">
              No collections yet. Create one to start adding requests.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((col) => (
              <Link key={col.id} href={`/workspaces/${id}/collections/${col.id}`}>
                <Card className="cursor-pointer transition-shadow hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base">{col.name}</CardTitle>
                      <Badge variant="secondary">
                        {col.requests?.length ?? 0} requests
                      </Badge>
                    </div>
                    {col.description && (
                      <CardDescription className="line-clamp-2">
                        {col.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
