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
  errorMessagesLogin: { [key: string]: string } = {
    required: 'Login obligatoire',
    minLength: `Le login doit faire ${this.minLength} caractères.`,
  };
  errorMessagesPassword: { [key: string]: string } = {
    required: 'Mot de passe obligatoire',
    minLength: `Le mot de passe doit faire ${this.minLength} caractères`,
    no$InPassword: `Le caractère $ n'est pas autorisé`,
  };

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
