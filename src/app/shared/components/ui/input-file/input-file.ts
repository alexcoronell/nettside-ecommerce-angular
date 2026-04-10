/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Component,
  input,
  model,
  computed,
  ChangeDetectionStrategy,
  ElementRef,
  viewChild,
  signal,
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
  field = model.required<any>();
  id = input.required<string>();
  label = input.required<string>();
  filename = model<string | undefined>(undefined);
  formIsReadonly = input<boolean>(false);

  readonly accept = ALLOWED_MIME_TYPES.join(',');

  fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  localPreviewUrl = signal<string | null>(null);

  readonly isInvalid = computed(() => this.field()().touched() && this.field()().invalid());

  readonly errors = computed(() => this.field()().errors());

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.field()().value.set(file);
      this.filename.set(file.name);

      const oldUrl = this.localPreviewUrl();
      if (oldUrl) URL.revokeObjectURL(oldUrl);
      this.localPreviewUrl.set(URL.createObjectURL(file));
    }
  }
  deleteFile() {
    this.field()().value.set(null);
    this.filename.set(undefined);

    const oldUrl = this.localPreviewUrl();
    if (oldUrl) {
      URL.revokeObjectURL(oldUrl);
      this.localPreviewUrl.set(null);
    }
  }

  displayPreviewUrl = computed(() => {
    if (this.localPreviewUrl()) return this.localPreviewUrl();
    const hasLocalFile = this.field()().value() instanceof File;
    if (!hasLocalFile && this.filename()) return this.filename();
    return null;
  });

  cleanFileName = computed(() => {
    const val = this.field()().value();
    if (val instanceof File) {
      return val.name;
    }

    if (this.filename()) {
      const filenamesplit = this.filename()?.split('---');
      return filenamesplit?.pop();
    }
    return '';
  });
}
