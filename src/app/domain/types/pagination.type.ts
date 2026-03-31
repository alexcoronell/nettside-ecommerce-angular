interface PaginatedResultMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  search?: string | null;
  filterBy?: Record<string, string> | null;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginatedResultMeta;
}
