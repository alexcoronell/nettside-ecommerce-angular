import { BaseRepository } from '@domain/shared/base.repository';
import { Sale } from '@domain/models';
import { CreateSaleDto } from '@infrastructure/http/dtos/sale.dto';

export abstract class SaleRepository extends BaseRepository<Sale, CreateSaleDto> {}
