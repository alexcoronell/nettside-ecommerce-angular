import { BaseRepository } from '@domain/shared/base.repository';
import { ShippingCompany } from '@domain/models';
import { CreateShippingCompanyDto } from '@infrastructure/http/dtos/shipping-company.dto';

export abstract class ShippingCompanyRepository extends BaseRepository<
  ShippingCompany,
  CreateShippingCompanyDto
> {}
