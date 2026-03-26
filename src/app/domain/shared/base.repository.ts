import { PaginationParams, PaginatedResult } from '@domain/types';
import { CountDto } from '@infrastructure/http/dtos';

export abstract class BaseRepository<T, CreateDto, UpdateDto> {
  abstract count(): Promise<CountDto>;
  abstract getAll(filters?: unknown, pagination?: PaginationParams): Promise<PaginatedResult<T>>;
  abstract getById(id: number): Promise<T>;
  abstract create(entity: CreateDto): Promise<T>;
  abstract update(id: number, entity: UpdateDto): Promise<T>;
  abstract delete(id: number): Promise<void>;
}
