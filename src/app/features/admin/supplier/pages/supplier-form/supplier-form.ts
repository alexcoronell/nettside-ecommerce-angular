import {
  Component,
  OnInit,
  signal,
  inject,
  ChangeDetectionStrategy,
  computed,
} from '@angular/core';
import { form, required, submit, readonly } from '@angular/forms/signals';
import { Router, ActivatedRoute } from '@angular/router';

/* Components */
import { AdminFormButtons } from '@shared/components/ui/admin-form-buttons/admin-form-buttons';
import { Input } from '@shared/components/ui/input/input';
import { TextArea } from '@shared/components/ui/text-area/text-area';

/* Models */
import { Supplier } from '@domain/models';

/* DTOs */
import { CreateSupplierDto, UpdateSupplierDto } from '@infrastructure/http/dtos';

/* Stores */
import { SupplierAdminStore } from '../../store/supplier-admin-store';
import { AdminFormNotificationStore } from '@shared/stores/admin-form-notification-store';

/* Types */
import { StatusForm } from '@shared/types';

interface SupplierModel {
  name: string;
  contactName: string;
  phoneNumber: string;
  email: string;
  website: string | null;
  state: string | null;
  city: string | null;
  county: string | null;
  streetAddress: string | null;
  postalCode: string | null;
  notes: string;
}

@Component({
  selector: 'app-supplier-form',
  imports: [AdminFormButtons, Input, TextArea],
  templateUrl: './supplier-form.html',
  styleUrl: './supplier-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierForm implements OnInit {
  private readonly supplierAdminStore = inject(SupplierAdminStore);
  private readonly adminFormNotificationStore = inject(AdminFormNotificationStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  supplierId = signal<number | null>(null);
  supplier = signal<Supplier | null>(null);
  statusForm = signal<StatusForm>('create');
  title = signal<string>('Create Supplier');
  isLoading = signal<boolean>(false);

  supplierModel = signal<SupplierModel>({
    name: '',
    contactName: '',
    phoneNumber: '',
    email: '',
    website: '',
    state: '',
    city: '',
    county: '',
    streetAddress: '',
    postalCode: '',
    notes: '',
  });
  readonly formIsReadonly = computed(() => this.statusForm() === 'detail');

  supplierForm = form(this.supplierModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is required' });
    required(schemaPath.contactName, { message: 'Contact name is required' });
    required(schemaPath.phoneNumber, { message: 'Phone number is required' });
    required(schemaPath.email, { message: 'Email is required' });
    readonly(schemaPath.name, () => this.formIsReadonly());
    readonly(schemaPath.contactName, () => this.formIsReadonly());
    readonly(schemaPath.phoneNumber, () => this.formIsReadonly());
    readonly(schemaPath.email, () => this.formIsReadonly());
    readonly(schemaPath.website, () => this.formIsReadonly());
    readonly(schemaPath.state, () => this.formIsReadonly());
    readonly(schemaPath.city, () => this.formIsReadonly());
    readonly(schemaPath.county, () => this.formIsReadonly());
    readonly(schemaPath.streetAddress, () => this.formIsReadonly());
    readonly(schemaPath.postalCode, () => this.formIsReadonly());
    readonly(schemaPath.notes, () => this.formIsReadonly());
  });

  onCreate() {
    const supplier: CreateSupplierDto = this.supplierModel() as unknown as CreateSupplierDto;
    this.supplierAdminStore.createItem(supplier).subscribe({
      next: () => {
        this.adminFormNotificationStore.show('Supplier created successfully', 'success');
      },
      error: (error) => {
        this.isLoading.set(false);
        this.adminFormNotificationStore.show('Error creating supplier', 'error');
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
    const supplier: UpdateSupplierDto = this.supplierModel() as UpdateSupplierDto;
    const supplierId = this.supplierId();
    if (!supplierId) return;
    this.supplierAdminStore.updateItem(supplierId, supplier).subscribe({
      next: () => {
        this.adminFormNotificationStore.show('Supplier updated successfully', 'success');
      },
      error: (error) => {
        this.isLoading.set(false);
        this.adminFormNotificationStore.show('Error updating supplier', 'error');
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
    void submit(this.supplierForm, () => {
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
    this.supplierModel.set({
      name: '',
      contactName: '',
      phoneNumber: '',
      email: '',
      website: '',
      state: '',
      city: '',
      county: '',
      streetAddress: '',
      postalCode: '',
      notes: '',
    });
  }

  onComplete() {
    setTimeout(() => {
      this.isLoading.set(false);
      this.onResetModel();
      void this.router.navigate(['/admin/suppliers']);
      setTimeout(() => {
        this.adminFormNotificationStore.hide();
      }, 2000);
    });
  }

  setData() {
    const data = this.supplier();
    if (!data) return;
    this.supplierModel.set({
      name: data.name,
      contactName: data.contactName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      website: data.website ?? '',
      state: data.state ?? '',
      city: data.city ?? '',
      county: data.county ?? '',
      streetAddress: data.streetAddress ?? '',
      postalCode: data.postalCode ?? '',
      notes: data.notes ?? '',
    });
  }

  loadSupplier(id: number) {
    this.supplierAdminStore.getItem(id).subscribe({
      next: (response) => {
        this.supplier.set(response.data);
        this.setData();
        this.statusForm.set('detail');
      },
      error: (error) => {
        this.adminFormNotificationStore.show('Error loading supplier', 'error');
        console.error(error);
        setTimeout(() => {
          this.adminFormNotificationStore.hide();
        }, 3000);
      },
    });
  }

  onEdit() {
    this.statusForm.set('edit');
    this.title.set('Edit Supplier');
  }

  onCancel() {
    this.setData();
    this.statusForm.set('detail');
    this.title.set('Detail Supplier');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.supplierId.set(Number(id));
      this.title.set('Detail Supplier');
      this.loadSupplier(Number(id));
    } else {
      this.title.set('Create Supplier');
    }
  }
}
