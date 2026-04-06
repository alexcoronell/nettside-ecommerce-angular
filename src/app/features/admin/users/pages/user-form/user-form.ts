import { Component, OnInit, signal, output, inject, ChangeDetectionStrategy } from '@angular/core';
import {
  form,
  required,
  email,
  minLength,
  submit,
  validate,
  readonly,
} from '@angular/forms/signals';
import { Router, ActivatedRoute } from '@angular/router';

/* Components */
import { Input } from '@shared/components/ui/input/input';
import { Select } from '@shared/components/ui/select/select';
import { Checkbox } from '@shared/components/ui/checkbox/checkbox';
import { AdminFormButtons } from '@shared/components/ui/admin-form-buttons/admin-form-buttons';

/* Domain */
import { UserRole } from '@domain/enums';

/* DTOs */
import { CreateUserDto, UserResponseDto } from '@infrastructure/http/dtos';

/* Stores */
import { UserAdminStore } from '../../store/user-admin.store';
import { AdminFormNotificationStore } from '@shared/stores/admin-form-notification-store';

/* Types */
import { StatusForm } from '@shared/types';

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
  imports: [Input, Select, Checkbox, AdminFormButtons],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserForm implements OnInit {
  private readonly userAdminStore = inject(UserAdminStore);
  private readonly adminFormNotificationStore = inject(AdminFormNotificationStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  userId = signal<number | null>(null);
  user = signal<UserResponseDto | null>(null);
  statusForm = signal<StatusForm>('create');

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
    validate(schemaPath.password, ({ value }) => {
      const password = value() || '';
      if (!this.userId() && !password) {
        return { kind: 'required', message: 'Password is required' };
      }
      if (password && password.length < 8) {
        return { kind: 'minLength', message: 'Password must be at least 8 characters long' };
      }
      return null;
    });
    readonly(schemaPath.firstname, () => this.statusForm() === 'detail');
    readonly(schemaPath.lastname, () => this.statusForm() === 'detail');
    readonly(schemaPath.email, () => this.statusForm() === 'detail');
    readonly(schemaPath.phoneNumber, () => this.statusForm() === 'detail');
    readonly(schemaPath.password, () => this.statusForm() === 'detail');
    readonly(schemaPath.role, () => this.statusForm() === 'detail');
    readonly(schemaPath.department, () => this.statusForm() === 'detail');
    readonly(schemaPath.city, () => this.statusForm() === 'detail');
    readonly(schemaPath.address, () => this.statusForm() === 'detail');
    readonly(schemaPath.neighborhood, () => this.statusForm() === 'detail');
    readonly(schemaPath.isActive, () => this.statusForm() === 'detail');
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
            setTimeout(() => {
              this.adminFormNotificationStore.hide();
            }, 2000);
          }, 1500);
        },
      });
      return Promise.resolve();
    });
  }

  onToggleIsActive() {
    this.userModel.update((user) => ({ ...user, isActive: !user.isActive }));
  }

  loadUser(id: number) {
    this.userAdminStore.loadUser(id).subscribe({
      next: (response) => {
        this.user.set(response.data);
        this.userModel.set(response.data as unknown as UserModel);
        this.statusForm.set('detail');
      },
      error: (error) => {
        this.adminFormNotificationStore.show('Error loading user', 'error');
        console.error(error);
        setTimeout(() => {
          this.adminFormNotificationStore.hide();
        }, 3000);
      },
    });
  }

  onEdit() {
    this.statusForm.set('edit');
  }

  onCancel() {
    this.userModel.set(this.user() as unknown as UserModel);
    this.statusForm.set('detail');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userId.set(Number(id));
      this.title.set('Detail User');
      this.loadUser(Number(id));
    }
  }
}
