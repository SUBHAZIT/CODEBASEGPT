import { create } from "zustand";
import type { RepoMeta, OverviewData, FileTreeNode } from "@/lib/mock-data";

interface RepoFile {
  path: string;
  content: string;
  size: number;
}

interface RepoStore {
  repoId: string | null;
  meta: RepoMeta | null;
  overview: OverviewData | null;
  fileTree: FileTreeNode[];
  fileContents: RepoFile[];
  repoContext: string;
  githubToken: string | null;
  isIndexing: boolean;
  indexingStage: number;
  indexingMessage: string;

  setRepoData: (data: {
    repoId: string;
    meta: RepoMeta;
    fileTree: FileTreeNode[];
    fileContents: RepoFile[];
    repoContext: string;
    githubToken?: string;
  }) => void;
  setOverview: (overview: OverviewData) => void;
  setIndexing: (isIndexing: boolean, stage?: number, message?: string) => void;
  upsertFileContent: (file: RepoFile) => void;
  reset: () => void;
}

export const useRepoStore = create<RepoStore>((set) => ({
  repoId: null,
  meta: null,
  overview: null,
  fileTree: [],
  fileContents: [],
  repoContext: "",
  githubToken: null,
  isIndexing: false,
  indexingStage: 0,
  indexingMessage: "",

  setRepoData: (data) =>
    set({
      repoId: data.repoId,
      meta: data.meta,
      fileTree: data.fileTree,
      fileContents: data.fileContents,
      repoContext: data.repoContext,
      githubToken: data.githubToken || null,
    }),

  setOverview: (overview) => set({ overview }),

  setIndexing: (isIndexing, stage = 0, message = "") =>
    set({ isIndexing, indexingStage: stage, indexingMessage: message }),

  upsertFileContent: (file) =>
    set((state) => {
      const idx = state.fileContents.findIndex((f) => f.path === file.path);
      if (idx === -1) return { fileContents: [...state.fileContents, file] };
      const next = [...state.fileContents];
      next[idx] = { ...next[idx], ...file };
      return { fileContents: next };
    }),

  reset: () =>
    set({
      repoId: null,
      meta: null,
      overview: null,
      fileTree: [],
      fileContents: [],
      repoContext: "",
      githubToken: null,
      isIndexing: false,
      indexingStage: 0,
      indexingMessage: "",
    }),
}));
