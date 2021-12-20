import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SinglePageLayoutComponent } from '../shared/components/single-page-layout/single-page-layout.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { PublicGuard } from './guards/public.guard';

const routes: Routes = [{
  path: '',
  component: SinglePageLayoutComponent,
  children: [{
    path: '',
    canActivate: [PublicGuard],
    component: LoginComponent
  },
  {
    path: 'sign-up',
    canActivate: [PublicGuard],
    component: SignUpComponent
  },
  {
    path: 'logout',
    canActivate: [LoggedInGuard],
    component: LogoutComponent
  }]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
