import { Component, OnInit, signal, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { form, required, submit, readonly } from '@angular/forms/signals';
import { Router, ActivatedRoute } from '@angular/router';

/* Components */
import { Input } from '@shared/components/ui/input/input';
import { InputFile } from '@shared/components/ui/input-file/input-file';
import { AdminFormButtons } from '@shared/components/ui/admin-form-buttons/admin-form-buttons';

/* Models */
import { Brand } from '@domain/models';

/* DTOs */
import { CreateBrandDto, UpdateBrandDto } from '@infrastructure/http/dtos';

/* Stores */
import { BrandAdminStore } from '../../store/brand-admin-store';
import { AdminFormNotificationStore } from '@shared/stores/admin-form-notification-store';

/* Types */
import { StatusForm } from '@shared/types';

interface BrandModel {
  name: string;
  logo: File;
}

@Component({
  selector: 'app-brand-form',
  imports: [Input, InputFile, AdminFormButtons],
  templateUrl: './brand-form.html',
  styleUrl: './brand-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandForm implements OnInit {
  private readonly brandAdminStore = inject(BrandAdminStore);
  private readonly adminFormNotificationStore = inject(AdminFormNotificationStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  brandId = signal<number | null>(null);
  brand = signal<Brand | null>(null);
  statusForm = signal<StatusForm>('create');

  title = signal<string>('Create User');
  isLoading = signal<boolean>(false);
  toggleIsActive = output<boolean>();
  brandModel = signal<BrandModel>({
    name: '',
    logo: new File([], ''),
  });

  brandForm = form(this.brandModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is required' });
    readonly(schemaPath.name, () => this.statusForm() === 'detail');
    readonly(schemaPath.logo, () => this.statusForm() === 'detail');
  });

  onCreate() {
    const brand: CreateBrandDto = this.brandModel();
    this.brandAdminStore.createBrand(brand).subscribe({
      next: () => {
        this.adminFormNotificationStore.show('Brand created successfully', 'success');
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
        this.onComplete();
      },
    });
  }

  onUpdate() {
    const brand: UpdateBrandDto = this.brandModel() as UpdateBrandDto;
    const brandId = this.brandId();
    if (!brandId) return;
    this.brandAdminStore.updateBrand(brandId, brand).subscribe({
      next: () => {
        this.adminFormNotificationStore.show('User updated successfully', 'success');
      },
      error: (error) => {
        this.isLoading.set(false);
        this.adminFormNotificationStore.show('Error updating user', 'error');
        console.error(error);
        setTimeout(() => {
          this.adminFormNotificationStore.hide();
        }, 3000);
      },
      complete: () => {
        this.onComplete();
      },
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    void submit(this.brandForm, () => {
      this.isLoading.set(true);
      if (this.statusForm() === 'create') {
        this.onCreate();
      } else {
        this.onUpdate();
      }
      return Promise.resolve();
    });
  }

  onResetModel() {
    this.brandModel.set({
      name: '',
      logo: new File([], ''),
    });
  }

  onComplete() {
    setTimeout(() => {
      this.isLoading.set(false);
      this.onResetModel();
      void this.router.navigate(['/admin/brands']);
      setTimeout(() => {
        this.adminFormNotificationStore.hide();
      }, 2000);
    });
  }

  loadBrand(id: number) {
    this.brandAdminStore.getBrand(id).subscribe({
      next: (response) => {
        this.brand.set(response.data);
        this.brandModel.set(response.data as unknown as BrandModel);
        this.statusForm.set('detail');
      },
      error: (error) => {
        this.adminFormNotificationStore.show('Error loading brand', 'error');
        console.error(error);
        setTimeout(() => {
          this.adminFormNotificationStore.hide();
        }, 3000);
      },
    });
  }

  onEdit() {
    this.statusForm.set('edit');
    this.title.set('Edit User');
  }

  onCancel() {
    this.brandModel.set(this.brand() as unknown as BrandModel);
    this.statusForm.set('detail');
    this.title.set('Detail Brand');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.brandId.set(Number(id));
      this.title.set('Detail Brand');
      this.loadBrand(Number(id));
    }
  }
}
