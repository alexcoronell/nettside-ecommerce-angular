import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-text-area',
  imports: [FormField],
  templateUrl: './text-area.html',
  styleUrl: './text-area.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextArea {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field = input.required<any>();
  id = input.required<string>();
  label = input.required<string>();
  readonly rows = input<number>(3);
  readonly placeholder = input<string>('');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  readonly isInvalid = computed(() => this.field()().touched() && this.field()().invalid());

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  readonly errors = computed(() => this.field()().errors());
}
