import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  minLength: number = 3;

  constructor() {
    this.loginForm = new FormGroup({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(this.minLength),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(this.minLength),
        checkNo$InPassword,
      ]),
    });
  }

  ngOnInit(): void {}

  login(): void {
    console.log(this.loginForm);
  }
}

function checkNo$InPassword(c: AbstractControl): ValidationErrors | null {
  if ((c.value as string).includes('$')) {
    return { no$InPassword: true };
  }

  return null;
}
