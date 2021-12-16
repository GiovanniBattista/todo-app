import { Component, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-input-errors',
  templateUrl: './input-errors.component.html',
  styleUrls: ['./input-errors.component.css']
})
export class InputErrorsComponent {

  @Input() errors: ValidationErrors | null | undefined;

  constructor() { }

  get errorsArray(): { name: string; payload?: any }[] {
    /*ValidationErrors = [{
      required, true,
      minLength: { },
    }] */

    if (this.errors != null) {
      const keys = Object.keys(this.errors);
      return keys.map(key => {
        return {
          name: key,
          payload: this.errors?.[key]
        };
      })
    } else {
      return [];
    }
  }

}
