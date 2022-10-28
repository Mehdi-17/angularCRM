import { User } from './model/user';
import { AuthenticationService } from './authentication.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private subs: Subscription[] = [];
  loginForm: FormGroup;
  minLength: number = 3;
  widthHeight: string = '300px';

  errorMessagesLogin: { [key: string]: string } = {
    required: 'Login obligatoire',
    minlength: `Le login doit faire ${this.minLength} caractères.`,
  };

  errorMessagesPassword: { [key: string]: string } = {
    required: 'Mot de passe obligatoire',
    minlength: `Le mot de passe doit faire ${this.minLength} caractères`,
    no$InPassword: `Le caractère $ n'est pas autorisé`,
  };

  constructor(private authent: AuthenticationService, private router: Router) {
    this.authent.disconnect();

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
    this.subs.push(this.authent.authentUser(this.loginForm.value.login, this.loginForm.value.password)
    .subscribe({
      next:(user: User)=>{this.router.navigateByUrl('/home')},
      error: (error: Error)=>{alert(error)},
      complete: ()=>{}
    }));
  }

  ngOnDestroy(): void{
    this.subs.forEach(sub=>sub.unsubscribe());
  }
}

function checkNo$InPassword(c: AbstractControl): ValidationErrors | null {
  if ((c.value as string).includes('$')) {
    return { no$InPassword: true };
  }

  return null;
}
