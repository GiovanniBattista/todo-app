import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  error: Error | undefined;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.error = undefined;

    if (this.username && this.password) {
      this.authService.login(this.username, this.password)
        .pipe(
          tap(() => {
            this.router.navigate(['/todos']);
          }),
          catchError(error => {
            this.error = error;
            return of(null);
          })
        )
        .subscribe(
          () => console.log('All ok')
        );
    }
  }

}
