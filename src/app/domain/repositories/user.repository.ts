import { BaseRepository } from '@domain/shared/base.repository';
import { User } from '@domain/models';
import { CreateUserDto } from '@infrastructure/http/dtos/user.dto';

export abstract class UserRepository extends BaseRepository<User, CreateUserDto> {}
