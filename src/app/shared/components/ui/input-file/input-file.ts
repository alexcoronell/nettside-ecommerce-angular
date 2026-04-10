/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Component,
  input,
  computed,
  ChangeDetectionStrategy,
  ElementRef,
  viewChild,
} from '@angular/core';

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
] as const;

@Component({
  selector: 'app-input-file',
  imports: [],
  templateUrl: './input-file.html',
  styleUrl: './input-file.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFile {
  field = input.required<any>();
  id = input.required<string>();
  label = input.required<string>();

  readonly accept = ALLOWED_MIME_TYPES.join(',');

  fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  readonly isInvalid = computed(() => this.field()().touched() && this.field()().invalid());

  readonly errors = computed(() => this.field()().errors());

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.field()().value.set(file);
    }
  }
  deleteFile() {
    this.field()().value.set(null);
  }
}
