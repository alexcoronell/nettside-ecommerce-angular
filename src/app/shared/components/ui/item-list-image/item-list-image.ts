import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

const NO_IMAGE_PATH = '/assets/others/no-image.webp';
const NO_IMAGE_ALT = 'No image';

@Component({
  selector: 'app-item-list-image',
  imports: [],
  templateUrl: './item-list-image.html',
  styleUrl: './item-list-image.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListImage {
  imageUrl = input<string | null | undefined>(null);
  altText = input<string | null | undefined>(null);

  readonly src = computed(() => {
    const url = this.imageUrl();
    return url && typeof url === 'string' && url.trim() !== '' ? url : NO_IMAGE_PATH;
  });

  readonly alt = computed(() => {
    const text = this.altText();
    return text && typeof text === 'string' && text.trim() !== '' ? text : NO_IMAGE_ALT;
  });
}
