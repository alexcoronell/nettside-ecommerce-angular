import { BaseRepository } from '@domain/shared/base.repository';
import { User } from '@domain/models';
import { CreateUserDto, UpdateUserDto } from '@infrastructure/http/dtos/user.dto';

export abstract class UserRepository extends BaseRepository<User, CreateUserDto, UpdateUserDto> { }
