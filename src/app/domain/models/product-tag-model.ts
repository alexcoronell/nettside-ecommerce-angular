import { BaseModel } from 'src/app/domain/models/base-model';
import { Product } from 'src/app/domain/models/product-model';
import { Tag } from 'src/app/domain/models/tag-model';

export interface ProductTag extends BaseModel {
  productId: number;
  tagId: number;
  product: Product;
  tag: Tag;
}
