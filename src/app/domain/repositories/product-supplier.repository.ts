import { BaseRepository } from '@domain/shared/base.repository';
import { ProductSupplier } from '@domain/models';
import { CreateProductSupplierDto, UpdateProductSupplierDto } from '@infrastructure/http/dtos/product-supplier.dto';

export abstract class ProductSupplierRepository extends BaseRepository<
  ProductSupplier,
  CreateProductSupplierDto,
  UpdateProductSupplierDto
> { }
