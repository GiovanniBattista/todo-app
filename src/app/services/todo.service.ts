import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, map, Observable, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { StrapiListResponse, StrapiRequest, StrapiSingleResponse, Todo, TodoCreate } from "../types";

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
    return this.httpClient.get<StrapiListResponse>(this.endpoint).pipe(
      map(response => {
        console.log("response received: ", response);
        return response.data;
      }),
      map(data => data.map(elem => {
        const todo: Todo = {
          ...elem.attributes,
          id: elem.id
        };
        return todo;
      })),
      tap(todos => this.todoList$$.next(todos))
    );
  }

  create(todo: TodoCreate): Observable<Todo> {
    const strapiRequest: StrapiRequest = {
      data: todo
    };
    return this.httpClient.post<StrapiSingleResponse>(this.endpoint, strapiRequest).pipe(
      map(response => response.data),
      map(data => {
        const todo: Todo = {
          ...data.attributes,
          id: data.id
        };
        return todo;
      }),
      tap(newTodo => {
        console.log("CREATE_TODO_RESPONSE_2", newTodo);
        const list = this.todoList$$.getValue();
        const listCopy = [...list, newTodo];
        this.todoList$$.next(listCopy);
      })
    );
  }

  // TODO Delete update umbauen, damit das auch wieder reactive bleibt
  // npm run develop
  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.endpoint + '/' + id).pipe(
      tap(() => {
        const list = this.todoList$$.getValue();
        const updatedList = list.filter(elem => elem.id !== id);
        this.todoList$$.next(updatedList);
      })
    )
  }

  update(todo: Todo): Observable<Todo> {
    const body : StrapiRequest = {
      data: todo
    };
    return this.httpClient.put<StrapiSingleResponse>(this.endpoint + '/' + todo.id, body).pipe(
      map(response => response.data),
      map(data => {
        const updatedTodo: Todo = {
          ...data.attributes,
          id: data.id
        };
        return updatedTodo;
      }),
      tap(todo => {
        const list = this.todoList$$.getValue();
        const listCopy = [...list];
        const idx2Update = listCopy.findIndex(elem => elem.id === todo.id);
        if (idx2Update > 0) {
          listCopy[idx2Update].title = todo.title;
          listCopy[idx2Update].done = todo.done;
          listCopy[idx2Update].due = todo.due;
          this.todoList$$.next(listCopy);
        }
      })
    );
  }

  toggle(todo: Todo): Observable<Todo> {
    return this.update({
      ...todo,
      done: !todo.done
    });
  }

}

//npm run strapi admin:reset-user-password
