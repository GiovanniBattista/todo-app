import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { PublicGuard } from './guards/public.guard';

const routes: Routes = [{
  path: '',
  canActivate: [PublicGuard],
  component: LoginComponent
}, {
  path: 'sign-up',
  canActivate: [PublicGuard],
  component: SignUpComponent
},
{
  path: 'logout',
  canActivate: [LoggedInGuard],
  component: LogoutComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
