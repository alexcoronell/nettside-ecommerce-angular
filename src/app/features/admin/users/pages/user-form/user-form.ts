import { Component, signal, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { form, required, email, minLength, submit } from '@angular/forms/signals';
import { Router } from '@angular/router';

/* Components */
import { Input } from '@shared/components/ui/input/input';
import { Select } from '@shared/components/ui/select/select';
import { Checkbox } from '@shared/components/ui/checkbox/checkbox';

/* Domain */
import { UserRole } from '@domain/enums';

/* DTOs */
import { CreateUserDto } from '@infrastructure/http/dtos';

/* Stores */
import { UserAdminStore } from '../../store/user-admin.store';
import { AdminFormNotificationStore } from '@shared/stores/admin-form-notification-store';

interface UserModel {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: UserRole;
  department: string;
  city: string;
  address: string;
  neighborhood: string;
  isActive: boolean;
}

@Component({
  selector: 'app-user-form',
  imports: [Input, Select, Checkbox],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserForm {
  private readonly userAdminStore = inject(UserAdminStore);
  private readonly adminFormNotificationStore = inject(AdminFormNotificationStore);
  private readonly router = inject(Router);

  title = signal<string>('Create User');
  isLoading = signal<boolean>(false);
  toggleIsActive = output<boolean>();
  userModel = signal<UserModel>({
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: UserRole.SELLER,
    department: '',
    city: '',
    address: '',
    neighborhood: '',
    isActive: true,
  });

  userRoles = signal<Record<string, string>[]>([
    { value: UserRole.ADMIN, label: 'Admin' },
    { value: UserRole.SELLER, label: 'Seller' },
    { value: UserRole.CUSTOMER, label: 'Customer' },
  ]);

  userForm = form(this.userModel, (schemaPath) => {
    required(schemaPath.firstname, { message: 'Firstname is required' });
    required(schemaPath.lastname, { message: 'Lastname is required' });
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Email is invalid' });
    required(schemaPath.phoneNumber, { message: 'Phone number is required' });
    minLength(schemaPath.phoneNumber, 10, {
      message: 'Phone number must be at least 10 digits long',
    });
    required(schemaPath.password, { message: 'Password is required' });
    minLength(schemaPath.password, 8, { message: 'Password must be at least 8 characters long' });
  });

  onSubmit(e: Event) {
    e.preventDefault();
    void submit(this.userForm, () => {
      this.isLoading.set(true);
      const user: CreateUserDto = this.userModel();
      this.userAdminStore.createUser(user).subscribe({
        next: () => {
          this.adminFormNotificationStore.show('User created successfully', 'success');
        },
        error: (error) => {
          this.isLoading.set(false);
          this.adminFormNotificationStore.show('Error creating user', 'error');
          console.error(error);
          setTimeout(() => {
            this.adminFormNotificationStore.hide();
          }, 3000);
        },
        complete: () => {
          setTimeout(() => {
            this.isLoading.set(false);
            this.adminFormNotificationStore.hide();
            this.userModel.set({
              firstname: '',
              lastname: '',
              email: '',
              phoneNumber: '',
              password: '',
              role: UserRole.SELLER,
              department: '',
              city: '',
              address: '',
              neighborhood: '',
              isActive: true,
            });
            void this.router.navigate(['/admin/users']);
          }, 3000);
        },
      });
      return Promise.resolve();
    });
  }

  onToggleIsActive() {
    this.userModel.update((user) => ({ ...user, isActive: !user.isActive }));
  }
}
