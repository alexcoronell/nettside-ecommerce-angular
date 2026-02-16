import { ProductImage } from '@models/index';

export type CreateProductImageDto = Omit<
  ProductImage,
  'id' | 'uploadedBy' | 'updatedBy' | 'createdAt' | 'updatedAt'
> & {
  product: number;
};

export type UpdateProductImageDto = Partial<Omit<CreateProductImageDto, 'filePath'>>;
