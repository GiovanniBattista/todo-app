import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, Observable, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Todo, TodoCreate } from "../types";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoList$$ = new BehaviorSubject<Todo[]>([]);
  todoList$: Observable<Todo[]> = this.todoList$$.asObservable();

  private endpoint = environment.api + '/todos';

  constructor(private httpClient: HttpClient) {

  }

  get(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.endpoint).pipe(
      tap(response => this.todoList$$.next(response))
    );
  }

  create(todo: TodoCreate): Observable<Todo> {
    return this.httpClient.post<Todo>(this.endpoint, todo).pipe(
      tap(newTodo => {
        const list = this.todoList$$.getValue();
        const listCopy = [...list, newTodo];
        this.todoList$$.next(listCopy);
      })
    );
  }

  // TODO Delete update umbauen, damit das auch wieder reactive bleibt
  // npm run develop
  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.endpoint + '/' + id);
  }

  update(todo: Todo): Observable<Todo> {
    return this.httpClient.put<Todo>(this.endpoint + '/' + todo.id, todo);
  }

  toggle(todo: Todo): Observable<Todo> {
    return this.update({
      ...todo,
      done: !todo.done
    });
  }

}
