import { BaseRepository } from '@domain/shared/base.repository';
import { Shipment } from '@domain/models';
import { CreateShipmentDto } from '@infrastructure/http/dtos/shipment.dto';

export abstract class ShipmentRepository extends BaseRepository<Shipment, CreateShipmentDto> {}
