import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { form, required, email, minLength } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';

import { Input } from '@shared/components/ui/input/input';

import { LoginDto } from '@infrastructure/http/dtos';

import { AuthHttpRepository } from '@infrastructure/http/repositories/auth-http-repository';

@Component({
  selector: 'app-login',
  imports: [Input, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  loginModel = signal<LoginDto>({ email: '', password: '' });
  authRepository = inject(AuthHttpRepository);

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Email is invalid' });
    required(schemaPath.password, { message: 'Password is required' });
    minLength(schemaPath.password, 8, { message: 'Password must be at least 8 characters long' });
  });

  onSubmit(e: Event) {
    e.preventDefault();
    /* submit(this.loginForm, async () => {
      const credentials = await this.loginModel();
      console.log('Submitting:', credentials);
    }); */
  }
}
