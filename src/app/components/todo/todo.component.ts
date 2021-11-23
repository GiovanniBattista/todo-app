import { Component, Inject } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo, TodoCreate } from 'src/app/types';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  constructor(public todoService: TodoService) {
    console.log('todoService', todoService);
  }

  onTodoCreate(todo: TodoCreate):void {
    console.log("Received todo: ", todo);
    this.todoService.create(todo);
  }

}
