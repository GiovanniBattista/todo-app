import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './modules/auth/auth.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { LoggedInGuard } from './modules/auth/guards/logged-in.guard';
import { PublicGuard } from './modules/auth/guards/public.guard';
import { LogoutComponent } from './modules/auth/components/logout/logout.component';

const routes: Routes = [{
  path: '',
  canActivate: [PublicGuard],
  component: LoginComponent
},
{
  path: 'logout',
  canActivate: [LoggedInGuard],
  component: LogoutComponent
},
{
  path: 'todos',
  canLoad: [LoggedInGuard],
  canActivate: [LoggedInGuard],
  canActivateChild: [LoggedInGuard],
  loadChildren: () => import('./modules/todo/todo.module').then(m => m.TodoModule)
}];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
