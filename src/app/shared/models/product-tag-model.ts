import { BaseModel } from '@models/base-model';
import { Product } from '@models/product-model';
import { Tag } from '@models/tag-model';

export interface ProductTag extends BaseModel {
  productId: number;
  tagId: number;
  product: Product;
  tag: Tag;
}
