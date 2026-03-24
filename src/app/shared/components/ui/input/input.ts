import { Component, input, computed } from '@angular/core';
import { FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-input',
  imports: [FormField],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class Input {
  field = input.required<any>();
  id = input.required<string>();
  label = input.required<string>();
  type = input<string>('text');
  autocomplete = input<string>('off');
  readonly placeholder = input<string>('');

  readonly isInvalid = computed(() => this.field()().touched() && this.field()().invalid());

  readonly errors = computed(() => this.field()().errors());
}
