import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let counter = 1;

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css'],
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleComponent)
  }]
})
export class ToggleComponent implements ControlValueAccessor {

  id = counter++;

  @Input() disabled = false;
  @Input() value = false;
  @Output() valueChange = new EventEmitter<boolean>();

  onChange = (_: boolean) => {};
  onTouched = () => {};


  constructor() { }

  writeValue(obj: any): void {
    this.value = !!obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onToggleChange() {
    this.value = !this.value;
    this.valueChange.emit(this.value);
    this.onChange(this.value);
  }

}
