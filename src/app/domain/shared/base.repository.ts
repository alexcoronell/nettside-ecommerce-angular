import { PaginationParams, PaginatedResult } from '@domain/types';

export abstract class BaseRepository<T, CreateDto, UpdateDto> {
  abstract count(): Promise<number>;
  abstract getAll(filters?: unknown, pagination?: PaginationParams): Promise<PaginatedResult<T>>;
  abstract getById(id: number): Promise<T>;
  abstract create(entity: CreateDto): Promise<T>;
  abstract update(entity: UpdateDto): Promise<T>;
  abstract delete(id: number): Promise<void>;
}
