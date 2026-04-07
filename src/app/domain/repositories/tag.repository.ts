import { BaseRepository } from '@domain/shared/base.repository';
import { Tag } from '@domain/models';
import { CreateTagDto, UpdateTagDto } from '@infrastructure/http/dtos/tag.dto';

export abstract class TagRepository extends BaseRepository<Tag, CreateTagDto, UpdateTagDto> {}
