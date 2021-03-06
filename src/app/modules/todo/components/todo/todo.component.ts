import { Component, Inject, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo, TodoCreate } from 'src/app/types';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(public todoService: TodoService) {
    console.log('todoService', todoService);
  }

  ngOnInit() {
    console.log('TodoComponent.ngOnInit')
    this.todoService.get().subscribe();
  }

  onTodoCreate(todo: TodoCreate):void {
    console.log("Received todo: ", todo);
    this.todoService.create(todo).subscribe(todo => {
      console.log('todo created', todo);
    });
  }

  onDelete(todo: Todo): void {
    this.todoService.delete(todo.id).subscribe(() => {
      console.log('really deleted');
    });
  }

  onToggle(todo: Todo): void {
    this.todoService.toggle(todo).subscribe();
  }

}
