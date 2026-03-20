import { LoginDto } from './auth.dto';

export interface RegistrationDto extends LoginDto {
  name: string;
}
