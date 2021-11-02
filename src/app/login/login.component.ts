import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  loginForm: FormGroup = new FormGroup({
    "email": new FormControl(null, [Validators.required, Validators.email]),
    "password": new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z]{2,8}$/)])
  });

  ngOnInit(): void {
    $('#login').particleground();
  }

  loginFun(loginForm: FormGroup) {
    if (loginForm.valid) {
      this._AuthService.login(loginForm.value).subscribe((response) => {
        if (response.message == "success") {
          localStorage.setItem("userToken" , response.token);
          this._AuthService.saveCurrentUser();
          this._Router.navigate(['/home']);
        }

      })
    }


  }


}
