import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SinglePageLayoutComponent } from "../shared/components/single-page-layout/single-page-layout.component";
import { TodoComponent } from "./components/todo/todo.component";

const routes: Routes = [{
  path: '',
  component: SinglePageLayoutComponent,
  children: [{
    path: '',
    component: TodoComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule {}
