import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './modules/auth/auth.module';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './modules/auth/guards/logged-in.guard';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

const routes: Routes = [
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
    AuthModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
