import { BaseRepository } from '@domain/shared/base.repository';
import { ShippingCompany } from '@domain/models';
import { CreateShippingCompanyDto, UpdateShippingCompanyDto } from '@infrastructure/http/dtos/shipping-company.dto';

export abstract class ShippingCompanyRepository extends BaseRepository<
  ShippingCompany,
  CreateShippingCompanyDto,
  UpdateShippingCompanyDto
> { }
