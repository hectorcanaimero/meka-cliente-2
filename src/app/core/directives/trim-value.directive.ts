import { Directive } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Directive({
  selector: '[appTrimValue]'
})
export class TrimValueDirective {

  constructor(private ngControl: NgControl) {
    this.trimValueAccess(this.ngControl.valueAccessor);
  }

  private trimValueAccess(valueAccessor: any | ControlValueAccessor): void {
    const original = valueAccessor.registerOnChange;
    valueAccessor.registerOnChange = (fn: (_: unknown) => void) => original.call(valueAccessor, (value: unknown) =>
      fn((typeof value === 'string') ? value.trim() : value));
  }

}
