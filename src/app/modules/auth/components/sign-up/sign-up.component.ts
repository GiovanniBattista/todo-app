import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, of } from 'rxjs';
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

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.form = formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email], [checkEmailValidator(authService)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      passwordRepeat: [null, [Validators.required]],
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
    console.log(this.form.value);
    if (this.form.valid) {
      alert('Submitting');
    }
  }

}
