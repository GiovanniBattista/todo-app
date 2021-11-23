import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/types';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  @Input()
  todos: Todo[] = [];

  @Output()
  todoToggle = new EventEmitter<Todo>();

}
