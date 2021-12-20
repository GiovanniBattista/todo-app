import {RouterModule, Routes} from '@angular/router';
import {LoggedInGuard} from './modules/auth/guards/logged-in.guard';
import {NgModule} from '@angular/core';
import {MainLayoutComponent} from './modules/shared/components/main-layout/main-layout.component';


const routes: Routes = [
  {
    path: 'todos',
    canLoad: [LoggedInGuard],
    canActivate: [LoggedInGuard],
    canActivateChild: [LoggedInGuard],
    component: MainLayoutComponent,
    loadChildren: () => import('./modules/todo/todo.module').then(m => m.TodoModule)
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
