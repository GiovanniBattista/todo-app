import { Component, Input, Output, EventEmitter } from '@angular/core';

let counter = 1;

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent {

  id = counter++;

  @Input() disabled = false;
  @Input() value = false;
  @Output() valueChange = new EventEmitter<boolean>();

  constructor() { }

}
