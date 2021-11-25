import { Injectable } from "@angular/core";
import { Todo, TodoCreate } from "../types";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  counter = 1;

  todoList: Todo[] = [];

  create(todo: TodoCreate) {
    this.todoList.push({
      id: this.counter,
      title: todo.title,
      dueDate: todo.dueDate
    });

    this.counter ++;
  }

  toggle(todo: Todo) {
    todo.done = !todo.done;
  }

  delete(id: number) {
    if (id > 0) {
      this.todoList = this.todoList.filter(todo => todo.id !== id);
    }
  }
}
