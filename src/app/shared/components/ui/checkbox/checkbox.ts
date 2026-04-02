import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-checkbox',
  imports: [FormField],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Checkbox {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field = input.required<any>();
  id = input.required<string>();
  label = input.required<string>();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  readonly isInvalid = computed(() => this.field()().touched() && this.field()().invalid());

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  readonly errors = computed(() => this.field()().errors());
}
