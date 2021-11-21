import { Component } from "@angular/core";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html'
})
export class TodoFormComponent {
  todoTitle = '';

  onInput( todoTitle: string) {
    console.log(todoTitle);
    this.todoTitle = todoTitle;
  }

  onDone() {
    console.log(this.todoTitle);
  }
}
