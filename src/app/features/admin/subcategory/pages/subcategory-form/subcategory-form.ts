import {
  Component,
  OnInit,
  signal,
  output,
  inject,
  ChangeDetectionStrategy,
  computed,
} from '@angular/core';
import { form, required, submit, readonly } from '@angular/forms/signals';
import { Router, ActivatedRoute } from '@angular/router';

/* Components */
import { Input } from '@shared/components/ui/input/input';
import { Select } from '@shared/components/ui/select/select';
import { AdminFormButtons } from '@shared/components/ui/admin-form-buttons/admin-form-buttons';

/* Models */
import { Subcategory } from '@domain/models';

/* DTOs */
import { CreateSubcategoryDto, UpdateSubcategoryDto } from '@infrastructure/http/dtos';

/* Stores */
import { AdminFormNotificationStore } from '@shared/stores/admin-form-notification-store';
import { LookupsStore } from '@shared/stores/lookups-store';
import { SubcategoryAdminStore } from '../../store/subcategory-admin-store';

/* Types */
import { StatusForm } from '@shared/types';

interface SubcategoryModel {
  name: string;
  categoryId: number | null;
}

@Component({
  selector: 'app-subcategory-form',
  imports: [Input, Select, AdminFormButtons],
  templateUrl: './subcategory-form.html',
  styleUrl: './subcategory-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubcategoryForm implements OnInit {
  private readonly subcategoryAdminStore = inject(SubcategoryAdminStore);
  private readonly lookupsStore = inject(LookupsStore);
  private readonly adminFormNotificationStore = inject(AdminFormNotificationStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  subcategoryId = signal<number | null>(null);
  subcategory = signal<Subcategory | null>(null);
  statusForm = signal<StatusForm>('create');
  title = signal<string>('Create Subcategory');
  isLoading = signal<boolean>(false);
  toggleIsActive = output<boolean>();

  subcategoryModel = signal<SubcategoryModel>({
    name: '',
    categoryId: null,
  });

  readonly formIsReadonly = computed(() => this.statusForm() === 'detail');
  readonly categories = this.lookupsStore.categories;

  reloadCategories() {
    this.lookupsStore.categoriesResource.reload();
  }

  subcategoryForm = form(this.subcategoryModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is required' });
    required(schemaPath.categoryId, { message: 'Category is required' });
    readonly(schemaPath.name, () => this.statusForm() === 'detail');
    readonly(schemaPath.categoryId, () => this.statusForm() === 'detail');
  });

  onCreate() {
    const model = this.subcategoryModel();
    const dto: CreateSubcategoryDto = {
      name: model.name,
      category: Number(model.categoryId),
      slug: model.name.toLowerCase().replace(/\s+/g, '-'),
    };

    this.subcategoryAdminStore.createItem(dto).subscribe({
      next: () => {
        this.adminFormNotificationStore.show('Subcategory created successfully', 'success');
      },
      error: (error) => {
        this.isLoading.set(false);
        this.adminFormNotificationStore.show('Error creating subcategory', 'error');
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
    const subcategoryId = this.subcategoryId();
    if (!subcategoryId) return;

    const model = this.subcategoryModel();
    const dto: UpdateSubcategoryDto = {
      name: model.name,
      category: Number(model.categoryId),
      slug: model.name.toLowerCase().replace(/\s+/g, '-'),
    };

    this.subcategoryAdminStore.updateItem(subcategoryId, dto).subscribe({
      next: () => {
        this.adminFormNotificationStore.show('Subcategory updated successfully', 'success');
      },
      error: (error) => {
        this.isLoading.set(false);
        this.adminFormNotificationStore.show('Error updating subcategory', 'error');
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
    void submit(this.subcategoryForm, () => {
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
    this.subcategoryModel.set({
      name: '',
      categoryId: null,
    });
  }

  onComplete() {
    setTimeout(() => {
      this.isLoading.set(false);
      this.onResetModel();
      void this.router.navigate(['/admin/subcategories']);
      setTimeout(() => {
        this.adminFormNotificationStore.hide();
      }, 2000);
    }, 500);
  }

  loadSubcategory(id: number) {
    this.subcategoryAdminStore.getItem(id).subscribe({
      next: (response) => {
        const sub = response.data;
        this.subcategory.set(sub);
        this.subcategoryModel.set({
          name: sub.name,
          categoryId: sub.category.id,
        });
        this.statusForm.set('detail');
      },
      error: (error) => {
        this.adminFormNotificationStore.show('Error loading subcategory', 'error');
        console.error(error);
        setTimeout(() => {
          this.adminFormNotificationStore.hide();
        }, 3000);
      },
    });
  }

  onEdit() {
    this.statusForm.set('edit');
    this.title.set('Edit Subcategory');
  }

  onCancel() {
    const sub = this.subcategory();
    if (sub) {
      this.subcategoryModel.set({
        name: sub.name,
        categoryId: sub.category.id,
      });
      this.statusForm.set('detail');
      this.title.set('Detail Subcategory');
    } else {
      void this.router.navigate(['/admin/subcategories']);
    }
  }

  ngOnInit(): void {
    this.reloadCategories();
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.subcategoryId.set(Number(id));
      this.title.set('Detail Subcategory');
      this.loadSubcategory(Number(id));
    } else {
      this.title.set('Create Subcategory');
      this.statusForm.set('create');
    }
  }
}
