import { BaseRepository } from '@domain/shared/base.repository';
import { Shipment } from '@domain/models';
import { CreateShipmentDto, UpdateShipmentDto } from '@infrastructure/http/dtos/shipment.dto';

export abstract class ShipmentRepository extends BaseRepository<
  Shipment,
  CreateShipmentDto,
  UpdateShipmentDto
> {}
