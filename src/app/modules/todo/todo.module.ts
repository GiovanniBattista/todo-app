import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TodoFormComponent } from "./components/todo-form/todo-form.component";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { TodoComponent } from "./components/todo/todo.component";
import { TodoRoutingModule } from "./todo-routing.module";

@NgModule({
  imports: [CommonModule, TodoRoutingModule],
  declarations: [
    TodoComponent,
    TodoFormComponent,
    TodoListComponent
  ],
  exports: [TodoComponent]
})
export class TodoModule {}
