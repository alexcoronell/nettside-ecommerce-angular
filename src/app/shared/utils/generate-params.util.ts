import { PaginationParams } from '@domain/types';

export const generateQueryParams = (
  paginationParams?: PaginationParams | (() => PaginationParams)
): string => {
  const params = typeof paginationParams === 'function' ? paginationParams() : paginationParams;

  if (!params) return '';

  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;

    queryParams.append(key, String(value));
  });

  return queryParams.toString();
};
