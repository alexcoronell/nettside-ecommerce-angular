import {
  Component,
  OnInit,
  signal,
  inject,
  ChangeDetectionStrategy,
  computed,
  effect,
} from '@angular/core';
import { form, required, submit, readonly, email } from '@angular/forms/signals';
import { Router, ActivatedRoute } from '@angular/router';

/* Components */
import { Input } from '@shared/components/ui/input/input';
import { AdminFormButtons } from '@shared/components/ui/admin-form-buttons/admin-form-buttons';
import { TextArea } from '@shared/components/ui/text-area/text-area';

/* DTOs */
import { UpdateStoreDetailDto } from '@infrastructure/http/dtos';

/* Stores */
import { StoreDetailAdminStore } from '../../store/store-detail-admin-store';
import { AdminFormNotificationStore } from '@shared/stores/admin-form-notification-store';

/* Types */
import { StatusForm } from '@shared/types';

interface StoreDetailModel {
  name: string;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  address: string;
  phone: string;
  email: string;
  legalInformation: string;
}

@Component({
  selector: 'app-store-detail',
  imports: [AdminFormButtons, Input, TextArea],
  templateUrl: './store-detail.html',
  styleUrl: './store-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreDetail implements OnInit {
  private readonly storeDetailAdminStore = inject(StoreDetailAdminStore);
  private readonly adminFormNotificationStore = inject(AdminFormNotificationStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  statusForm = signal<StatusForm>('detail');
  title = signal<string>('Store Detail');
  isLoading = signal<boolean>(false);
  storeDetailId = signal<number | null>(null);

  storeDetailModel = signal<StoreDetailModel>({
    name: '',
    country: '',
    state: '',
    city: '',
    neighborhood: '',
    address: '',
    phone: '',
    email: '',
    legalInformation: '',
  });

  readonly formIsReadonly = computed(() => this.statusForm() === 'detail');

  storeDetailForm = form(this.storeDetailModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is required' });
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Email is invalid' });
    required(schemaPath.address, { message: 'Address is required' });
    readonly(schemaPath.name, () => this.formIsReadonly());
    readonly(schemaPath.country, () => this.formIsReadonly());
    readonly(schemaPath.state, () => this.formIsReadonly());
    readonly(schemaPath.city, () => this.formIsReadonly());
    readonly(schemaPath.neighborhood, () => this.formIsReadonly());
    readonly(schemaPath.address, () => this.formIsReadonly());
    readonly(schemaPath.phone, () => this.formIsReadonly());
    readonly(schemaPath.email, () => this.formIsReadonly());
    readonly(schemaPath.legalInformation, () => this.formIsReadonly());
  });

  constructor() {
    effect(() => {
      const data = this.storeDetailAdminStore.data();
      this.setData(data);
    });
  }

  setData(data: StoreDetailModel) {
    this.storeDetailModel.set({
      name: data.name,
      country: data.country,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      address: data.address,
      phone: data.phone,
      email: data.email,
      legalInformation: data.legalInformation,
    });
  }

  onUpdate() {
    const dto: UpdateStoreDetailDto = this.storeDetailModel() as UpdateStoreDetailDto;
    const id = this.storeDetailId();

    if (!id) return;

    this.storeDetailAdminStore.updateItem(id, dto).subscribe({
      next: () => {
        this.adminFormNotificationStore.show('Store detail updated successfully', 'success');
        this.statusForm.set('detail');
        this.storeDetailAdminStore.reload();
      },
      error: (error) => {
        this.isLoading.set(false);
        this.adminFormNotificationStore.show('Error updating store detail', 'error');
        console.error(error);
        setTimeout(() => {
          this.adminFormNotificationStore.hide();
        }, 3000);
      },
      complete: () => {
        this.isLoading.set(false);
        setTimeout(() => {
          this.adminFormNotificationStore.hide();
        }, 2000);
      },
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    void submit(this.storeDetailForm, () => {
      this.isLoading.set(true);
      this.onUpdate();
      return Promise.resolve();
    });
  }

  onEdit() {
    this.statusForm.set('edit');
    this.title.set('Edit Store Detail');
  }

  onCancel() {
    const data = this.storeDetailAdminStore.data();
    this.setData(data);
    this.statusForm.set('detail');
    this.title.set('Store Detail');
  }

  ngOnInit(): void {
    this.storeDetailId.set(1);
  }
}
