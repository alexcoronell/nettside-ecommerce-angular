import {
  Component,
  OnInit,
  signal,
  output,
  inject,
  ChangeDetectionStrategy,
  computed,
} from '@angular/core';
import { form, required, min, submit, readonly, validate } from '@angular/forms/signals';
import { Router, ActivatedRoute } from '@angular/router';

/* Components */
import { Input } from '@shared/components/ui/input/input';
import { Checkbox } from '@shared/components/ui/checkbox/checkbox';
import { AdminFormButtons } from '@shared/components/ui/admin-form-buttons/admin-form-buttons';

/* Models */
import { Discount } from '@domain/models';

/* DTOs */
import { CreateDiscountDto, UpdateDiscountDto } from '@infrastructure/http/dtos';

/* Stores */
import { DiscountAdminStore } from '../../store/discount-admin-store';
import { AdminFormNotificationStore } from '@shared/stores/admin-form-notification-store';

/* Types */
import { StatusForm } from '@shared/types';

interface DiscountModel {
  name: string;
  description: string;
  type: string;
  value: number;
  startDate: Date;
  endDate: Date;
  minimumOrderAmount: number;
  minimumProductsCount: number;
  usageLimit: number;
  usageLimitPerUser: number;
  active: boolean;
}

@Component({
  selector: 'app-discount-form',
  imports: [Input, Checkbox, AdminFormButtons],
  templateUrl: './discount-form.html',
  styleUrl: './discount-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscountForm implements OnInit {
  private readonly discountAdminStore = inject(DiscountAdminStore);
  private readonly adminFormNotificationStore = inject(AdminFormNotificationStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  discountId = signal<number | null>(null);
  discount = signal<Discount | null>(null);
  statusForm = signal<StatusForm>('create');
  title = signal<string>('Create Discount');
  isLoading = signal<boolean>(false);
  toggleIsActive = output<boolean>();
  discountModel = signal<DiscountModel>({
    name: '',
    description: '',
    type: '',
    value: 0,
    startDate: new Date(),
    endDate: new Date(),
    minimumOrderAmount: 0,
    minimumProductsCount: 0,
    usageLimit: 0,
    usageLimitPerUser: 0,
    active: false,
  });
  readonly formIsReadonly = computed(() => this.statusForm() === 'detail');

  discountForm = form(this.discountModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is required' });
    required(schemaPath.description, { message: 'Description is required' });
    required(schemaPath.type, { message: 'Type is required' });
    required(schemaPath.value, { message: 'Value is required' });
    required(schemaPath.startDate, { message: 'Start date is required' });
    validate(schemaPath.startDate, ({ value }) => {
      const date = new Date(value());
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      if (date < now) {
        return { kind: 'pastDate', message: 'Start date cannot be in the past' };
      }
      return null;
    });
    required(schemaPath.endDate, { message: 'End date is required' });
    validate(schemaPath.endDate, ({ value }) => {
      const endDate = new Date(value());
      const startDate = new Date(this.discountModel().startDate);
      if (endDate < startDate) {
        return { kind: 'invalidRange', message: 'End date cannot be before start date' };
      }
      return null;
    });
    required(schemaPath.minimumOrderAmount, { message: 'Minimum order amount is required' });
    min(schemaPath.minimumOrderAmount, 1, {
      message: 'Minimum order amount must be greater than 0',
    });
    required(schemaPath.usageLimit, { message: 'Usage limit is required' });
    min(schemaPath.usageLimit, 1, { message: 'Usage limit must be greater than 0' });
    required(schemaPath.usageLimitPerUser, { message: 'Usage limit per user is required' });
    min(schemaPath.usageLimitPerUser, 1, {
      message: 'Usage limit per user must be greater than 0',
    });
    readonly(schemaPath.name, () => this.statusForm() === 'detail');
    readonly(schemaPath.description, () => this.statusForm() === 'detail');
    readonly(schemaPath.type, () => this.statusForm() === 'detail');
    readonly(schemaPath.value, () => this.statusForm() === 'detail');
    readonly(schemaPath.startDate, () => this.statusForm() === 'detail');
    readonly(schemaPath.endDate, () => this.statusForm() === 'detail');
    readonly(schemaPath.minimumOrderAmount, () => this.statusForm() === 'detail');
    readonly(schemaPath.minimumProductsCount, () => this.statusForm() === 'detail');
    readonly(schemaPath.usageLimit, () => this.statusForm() === 'detail');
    readonly(schemaPath.usageLimitPerUser, () => this.statusForm() === 'detail');
    readonly(schemaPath.active, () => this.statusForm() === 'detail');
  });

  onCreate() {
    const discount: CreateDiscountDto = this.discountModel() as unknown as CreateDiscountDto;
    this.discountAdminStore.createItem(discount).subscribe({
      next: () => {
        this.adminFormNotificationStore.show('Discount created successfully', 'success');
      },
      error: (error) => {
        this.isLoading.set(false);
        this.adminFormNotificationStore.show('Error creating discount', 'error');
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
    const discount: UpdateDiscountDto = this.discountModel() as UpdateDiscountDto;
    const discountId = this.discountId();
    if (!discountId) return;
    this.discountAdminStore.updateItem(discountId, discount).subscribe({
      next: () => {
        this.adminFormNotificationStore.show('Discount updated successfully', 'success');
      },
      error: (error) => {
        this.isLoading.set(false);
        this.adminFormNotificationStore.show('Error updating discount', 'error');
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
    void submit(this.discountForm, () => {
      this.isLoading.set(true);
      if (this.statusForm() === 'create') {
        this.onCreate();
      } else {
        this.onUpdate();
      }
      return Promise.resolve();
    });
  }

  onToggleIsActive() {
    this.discountModel.update((discount) => ({ ...discount, active: !discount.active }));
  }

  onResetModel() {
    this.discountModel.set({
      name: '',
      description: '',
      type: '',
      value: 0,
      startDate: new Date(),
      endDate: new Date(),
      minimumOrderAmount: 0,
      minimumProductsCount: 0,
      usageLimit: 0,
      usageLimitPerUser: 0,
      active: false,
    });
  }

  onComplete() {
    setTimeout(() => {
      this.isLoading.set(false);
      this.onResetModel();
      void this.router.navigate(['/admin/discounts']);
      setTimeout(() => {
        this.adminFormNotificationStore.hide();
      }, 2000);
    });
  }

  setData() {
    const data = this.discount() as DiscountModel;
    this.discountModel.set({
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    });
  }

  loadDiscount(id: number) {
    this.discountAdminStore.getItem(id).subscribe({
      next: (response) => {
        this.discount.set(response.data);
        this.setData();
        const data: DiscountModel = { ...response.data };
        this.discountModel.set({
          ...data,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
        });
        this.statusForm.set('detail');
      },
      error: (error) => {
        this.adminFormNotificationStore.show('Error loading discount', 'error');
        console.error(error);
        setTimeout(() => {
          this.adminFormNotificationStore.hide();
        }, 3000);
      },
    });
  }

  onEdit() {
    this.statusForm.set('edit');
    this.title.set('Edit Discount');
  }

  onCancel() {
    this.setData();
    this.statusForm.set('detail');
    this.title.set('Detail Discount');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.discountId.set(Number(id));
      this.title.set('Detail Discount');
      this.loadDiscount(Number(id));
    } else {
      this.title.set('Create Discount');
    }
  }
}
