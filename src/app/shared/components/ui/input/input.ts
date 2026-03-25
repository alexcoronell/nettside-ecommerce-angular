import { Component, input, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormField } from '@angular/forms/signals';

import { LucideDynamicIcon, LucideEye, LucideEyeOff } from '@lucide/angular';

@Component({
  selector: 'app-input',
  imports: [FormField, LucideDynamicIcon],
  templateUrl: './input.html',
  styleUrl: './input.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Input {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field = input.required<any>();
  id = input.required<string>();
  label = input.required<string>();
  _type = input<string>('text');
  autocomplete = input<string>('off');
  readonly placeholder = input<string>('');

  lucideEye = LucideEye;
  lucideEyeOff = LucideEyeOff;
  type = signal<string>(this._type());
  showPassword = signal<boolean>(false);

  togglePassword() {
    this.showPassword.set(!this.showPassword());
    this.type.set(this.showPassword() ? 'text' : 'password');
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  readonly isInvalid = computed(() => this.field()().touched() && this.field()().invalid());

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  readonly errors = computed(() => this.field()().errors());
}
