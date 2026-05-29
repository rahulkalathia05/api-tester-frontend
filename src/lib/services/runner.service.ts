import api from "@/lib/api";
import type { TestRun, TestResult, AiAnalysis, DiffResult, PaginatedResponse } from "@/types";

export const runnerService = {
  // Trigger a collection run — returns immediately with run_id
  runCollection: (collectionId: string, environmentId?: string, config?: object) =>
    api.post<TestRun>(`/collections/${collectionId}/run`, {
      environment_id: environmentId,
      config,
    }),

  // History
  listRuns: (workspaceId: string, page = 1, pageSize = 20) =>
    api.get<PaginatedResponse<TestRun>>(`/workspaces/${workspaceId}/runs`, {
      params: { page, page_size: pageSize },
    }),

  getRun: (runId: string) =>
    api.get<TestRun & { results: TestResult[] }>(`/runs/${runId}`),

  getResult: (resultId: string) =>
    api.get<TestResult>(`/results/${resultId}`),

  // AI analysis
  triggerAnalysis: (resultId: string) =>
    api.post<AiAnalysis>(`/results/${resultId}/analyze`),

  getAnalysis: (resultId: string) =>
    api.get<AiAnalysis>(`/results/${resultId}/analysis`),

  // Response diff between two runs
  diff: (runIdA: string, runIdB: string, requestId: string) =>
    api.post<DiffResult[]>(`/runs/diff`, {
      run_id_a: runIdA,
      run_id_b: runIdB,
      request_id: requestId,
    }),

  // SSE stream URL (used directly as an EventSource, not via axios)
  streamUrl: (runId: string) =>
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/runs/${runId}/stream`,
};
