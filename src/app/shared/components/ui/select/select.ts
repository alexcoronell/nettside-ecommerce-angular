import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { StatusForm } from '@shared/types';

@Component({
  selector: 'app-select',
  imports: [FormField],
  templateUrl: './select.html',
  styleUrl: './select.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Select {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field = input.required<any>();
  id = input.required<string>();
  label = input.required<string>();
  options = input.required<Record<string, string>[]>();
  readonly = input<boolean>(false);
  statusForm = input<StatusForm>('create');
  currentValue = input<string>();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  readonly isInvalid = computed(() => this.field()().touched() && this.field()().invalid());

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  readonly errors = computed(() => this.field()().errors());
}
