import { ProductTag } from '@domain/models';

export type CreateProductTagDto = Omit<
  ProductTag,
  | 'id'
  | 'create dBy'
  | 'updatedBy'
  | 'deletedBy'
  | 'createdAt'
  | 'updatedAt'
  | 'isDeleted'
  | 'product'
  | 'tag'
> & {
  product: number;
  tag: number;
};

export type UpdateProductTagDto = Partial<Omit<CreateProductTagDto, 'product' | 'tag'>>;
