import { Injectable } from "@angular/core";
import { delay, Observable, of, tap } from "rxjs";
import { Todo, TodoCreate } from "../types";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  counter = 1;

  todoList: Todo[] = [];

  create(todo: TodoCreate): Observable<Todo> {
    const newTodo: Todo = {
      id: this.counter,
      title: todo.title,
      dueDate: todo.dueDate
    };
    this.counter ++;

    return of(newTodo).pipe(
      delay(500),
      tap(todo => {
        this.todoList.push(todo);
      })
    );
  }

  toggle(todo: Todo): Observable<Todo> {
    return of(todo).pipe(
      delay(500),
      tap((todo) => {
        this.todoList = this.todoList.map(currentTodo => {
          if (todo.id === currentTodo.id) {
            return {
              ...currentTodo,
              done: !currentTodo.done
            }
          }
          return currentTodo;
        });
      })
    );
  }

  delete(id: number): Observable<void> {
    return of(undefined).pipe(
      delay(500),
      tap(() => {
        this.todoList = this.todoList.filter(todo => todo.id !== id);
      })
    );
  }
}
