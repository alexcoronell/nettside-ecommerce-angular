import { BaseRepository } from '@domain/shared/base.repository';
import { Brand } from '@domain/models';
import { CreateBrandDto } from '@infrastructure/http/dtos/brand.dto';

export abstract class BrandRepository extends BaseRepository<Brand, CreateBrandDto> {}
