import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";
import { TodoCreate } from "src/app/types";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFormComponent {
  todoTitle = '';

  @Output()
  todoCreate = new EventEmitter<TodoCreate>();

  onInput( todoTitle: string) {
    this.todoTitle = todoTitle;
  }

  onDone() {
    if (this.todoTitle.length > 0) {
      const payload: TodoCreate = {
        title: this.todoTitle
      };
      this.todoCreate.emit(payload);

      this.todoTitle = '';
    }
  }
}
