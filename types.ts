export interface Task {
  id: string;
  content: string;
  createdAt: number;
  color: string;
  rotation: number;
}

export type SortOrder = 'newest' | 'oldest';