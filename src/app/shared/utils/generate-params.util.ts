import { PaginationParams } from '@domain/types';

export const generateQueryParams = (
  paginationParams?: PaginationParams | (() => PaginationParams)
): string => {
  const params = typeof paginationParams === 'function' ? paginationParams() : paginationParams;
  const queryParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== null) {
        queryParams.append(key, String(value));
      }
    });
  }
  return queryParams.toString();
};
