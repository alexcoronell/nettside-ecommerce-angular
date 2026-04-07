import { PaginationParams } from '@domain/types';

export const generateQueryParams = (
  paginationParams?: PaginationParams | (() => PaginationParams)
): string => {
  const params = typeof paginationParams === 'function' ? paginationParams() : paginationParams;

  if (!params) return '';

  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;

    if (Array.isArray(value)) {
      value.forEach((item) => {
        queryParams.append(key, String(item));
      });
    } else if (typeof value === 'object' && value !== null) {
      queryParams.append(key, JSON.stringify(value));
    } else {
      queryParams.append(key, String(value));
    }
  });

  return queryParams.toString();
};
