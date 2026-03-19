import { Tag } from '@domain/models';

export type CreateTagDto = Omit<
  Tag,
  'id' | 'createdBy' | 'updatedBy' | 'deletedBy' | 'createdAt' | 'updatedAt' | 'isDeleted'
>;

export type UpdateTagDto = Partial<CreateTagDto>;
