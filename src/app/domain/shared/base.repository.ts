import { PaginationParams, PaginatedResult } from '@domain/types';

export abstract class BaseRepository<T, Dto> {
  abstract count(): Promise<number>;
  abstract getAll(filters?: unknown, pagination?: PaginationParams): Promise<PaginatedResult<T>>;
  abstract getById(id: number): Promise<T>;
  abstract create(entity: Dto): Promise<T>;
  abstract update(entity: Partial<Dto>): Promise<T>;
  abstract delete(id: number): Promise<void>;
}
