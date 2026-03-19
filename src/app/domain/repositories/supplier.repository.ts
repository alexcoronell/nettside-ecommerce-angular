import { BaseRepository } from '@domain/shared/base.repository';
import { Supplier } from '@domain/models';
import { CreateSupplierDto } from '@infrastructure/http/dtos/supplier.dto';

export abstract class SupplierRepository extends BaseRepository<Supplier, CreateSupplierDto> {}
