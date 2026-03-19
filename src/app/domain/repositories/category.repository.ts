import { BaseRepository } from '@domain/shared/base.repository';
import { Category } from '@domain/models';
import { CreateCategoryDto } from '@infrastructure/http/dtos/category.dto';

export abstract class CategoryRepository extends BaseRepository<Category, CreateCategoryDto> {}
