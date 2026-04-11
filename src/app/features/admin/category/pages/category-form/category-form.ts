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
import { AdminFormButtons } from '@shared/components/ui/admin-form-buttons/admin-form-buttons';

/* Models */
import { Category } from '@domain/models';

/* DTOs */
import { CreateCategoryDto, UpdateCategoryDto } from '@infrastructure/http/dtos';

/* Stores */
import { CategoryAdminStore } from '../../store/category-admin-store';
import { AdminFormNotificationStore } from '@shared/stores/admin-form-notification-store';

/* Types */
import { StatusForm } from '@shared/types';

interface CategoryModel {
  name: string;
}

@Component({
  selector: 'app-category-form',
  imports: [Input, AdminFormButtons],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryForm implements OnInit {
  private readonly categoryAdminStore = inject(CategoryAdminStore);
  private readonly adminFormNotificationStore = inject(AdminFormNotificationStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  categoryId = signal<number | null>(null);
  category = signal<Category | null>(null);
  statusForm = signal<StatusForm>('create');
  title = signal<string>('Create Category');
  isLoading = signal<boolean>(false);
  toggleIsActive = output<boolean>();
  categoryModel = signal<CategoryModel>({
    name: '',
  });
  readonly formIsReadonly = computed(() => this.statusForm() === 'detail');

  categoryForm = form(this.categoryModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is required' });
    readonly(schemaPath.name, () => this.statusForm() === 'detail');
  });

  onCreate() {
    const category: CreateCategoryDto = this.categoryModel() as CreateCategoryDto;
    this.categoryAdminStore.createItem(category).subscribe({
      next: () => {
        this.adminFormNotificationStore.show('Category created successfully', 'success');
      },
      error: (error) => {
        this.isLoading.set(false);
        this.adminFormNotificationStore.show('Error creating category', 'error');
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
    const category: UpdateCategoryDto = this.categoryModel() as UpdateCategoryDto;
    const categoryId = this.categoryId();
    if (!categoryId) return;
    this.categoryAdminStore.updateItem(categoryId, category).subscribe({
      next: () => {
        this.adminFormNotificationStore.show('Category updated successfully', 'success');
      },
      error: (error) => {
        this.isLoading.set(false);
        this.adminFormNotificationStore.show('Error updating category', 'error');
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
    void submit(this.categoryForm, () => {
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
    this.categoryModel.set({
      name: '',
    });
  }

  onComplete() {
    setTimeout(() => {
      this.isLoading.set(false);
      this.onResetModel();
      void this.router.navigate(['/admin/categories']);
      setTimeout(() => {
        this.adminFormNotificationStore.hide();
      }, 2000);
    });
  }

  loadCategory(id: number) {
    this.categoryAdminStore.getItem(id).subscribe({
      next: (response) => {
        this.category.set(response.data);
        this.categoryModel.set(response.data as unknown as CategoryModel);
        this.statusForm.set('detail');
      },
      error: (error) => {
        this.adminFormNotificationStore.show('Error loading category', 'error');
        console.error(error);
        setTimeout(() => {
          this.adminFormNotificationStore.hide();
        }, 3000);
      },
    });
  }

  onEdit() {
    this.statusForm.set('edit');
    this.title.set('Edit Category');
  }

  onCancel() {
    this.categoryModel.set(this.category() as unknown as CategoryModel);
    this.statusForm.set('detail');
    this.title.set('Detail Category');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.categoryId.set(Number(id));
      this.title.set('Detail Category');
      this.loadCategory(Number(id));
    } else {
      this.title.set('Create Category');
    }
  }
}
