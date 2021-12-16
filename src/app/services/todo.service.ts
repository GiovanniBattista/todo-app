import { Injectable } from "@angular/core";
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, onSnapshot, query, setDoc } from "@angular/fire/firestore";
import { BehaviorSubject, delay, EMPTY, from, map, Observable, of, switchMap, tap } from "rxjs";
import { Todo, TodoCreate } from "../types";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoList$$ = new BehaviorSubject<Todo[]>([]);
  todoList$: Observable<Todo[]> = this.todoList$$.asObservable();
  todoCollection = collection(this.firestore, 'todos');

  constructor(private firestore: Firestore) {
    const todoQuery = query(this.todoCollection);

    onSnapshot(todoQuery, (q) => {
      const newData: Todo[] = [];

      q.forEach(doc => {
        newData.push({
          ...doc.data(),
          id: doc.id
        } as Todo);
      })

      this.todoList$$.next(newData);
    });
  }

  create(todo: TodoCreate): Observable<Todo> {
    const promise = addDoc(this.todoCollection, {
      title: todo.title,
      done: todo.done || false,
    } as TodoCreate);

    return from(promise).pipe(
      switchMap(docRef => {
        return getDoc(docRef);
      }),
      map(content => {
        const data = content.data();

        return {
          ...data,
          id: content.id,
        } as Todo;
      }),
    );
  }

  delete(id: string): Observable<void> {
    const promise = deleteDoc(doc(this.firestore, "/todos/" + id));
    return from(promise);
  }

  update(todo: Todo): Observable<Todo> {
    const docRef = doc(this.firestore, "/todos/" + todo.id);
    const promise = setDoc(docRef, todo);

    return from(promise) as any;
  }

  toggle(todo: Todo): Observable<Todo> {
    return this.update({
      ...todo,
      done: !todo.done
    });
  }

}

//npm run strapi admin:reset-user-password
