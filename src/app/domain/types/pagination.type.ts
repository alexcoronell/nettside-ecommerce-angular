export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filterBy?: Record<string, string>;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
