export interface Task {
  id: string;
  content: string;
  createdAt: number;
}

export type SortOrder = 'newest' | 'oldest';