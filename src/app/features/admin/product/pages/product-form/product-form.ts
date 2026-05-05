import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-form',
  imports: [],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductForm {}
