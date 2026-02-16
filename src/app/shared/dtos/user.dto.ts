import { User } from '@models/index';

export type CreateUserDto = Omit<
  User,
  'id' | 'createdBy' | 'updatedBy' | 'deletedBy' | 'createdAt' | 'updatedAt' | 'isDeleted'
>;

export type UpdateUserDto = Partial<Omit<CreateUserDto, 'password'>>;

export type UpdatePasswordDto = Pick<User, 'password'>;

export type UserResponseDto = Omit<User, 'password'>;
