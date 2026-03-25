import { User } from '@domain/models';

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  data: User;
  statusCode: number;
  message: string;
}
