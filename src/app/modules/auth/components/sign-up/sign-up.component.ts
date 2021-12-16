import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { last, map, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';

function checkEmailValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    // async
    // null --> valid
    // { checkEmail: true }
    return authService.checkEmail(control.value).pipe(

      map( isAvailable => {
        console.log("Response: ", isAvailable);
        if (isAvailable) {
          return null;
        }

        return {
          checkEmail: true,
        }
      })
      )
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  error: Error | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {

    this.form = formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]], //, [checkEmailValidator(authService)]
      password: [null, [Validators.required, Validators.minLength(8)]],
      passwordRepeat: [null, [Validators.required]],
      disclaimerAccepted: [false, [Validators.requiredTrue]],
    }, {
      validators: (control) => {
        const { password, passwordRepeat } = control.value;

        if (password && passwordRepeat) {
          if (password !== passwordRepeat) {
            return {
              passwordMatch: true,
            };
          }
        }

        return null;
      }
    });

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.error = null;

    if (this.form.valid) {
      const email = this.form.value.email;
      const password = this.form.value.password;
      const firstName = this.form.value.firstName;
      const lastName = this.form.value.lastName;

      this.authService.register(email, password, firstName, lastName).subscribe(
        (args) => {
          console.log("User was successfully registered!", args);
          this.router.navigate(['/todos']);
        },
        (error) => {
          this.error = error;
        }
      );
    }
  }

}
