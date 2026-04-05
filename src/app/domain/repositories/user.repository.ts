import { BaseRepository } from '@domain/shared/base.repository';
import { UserResponseDto, CreateUserDto, UpdateUserDto } from '@infrastructure/http/dtos';

export abstract class UserRepository extends BaseRepository<
  UserResponseDto,
  CreateUserDto,
  UpdateUserDto
> {}
