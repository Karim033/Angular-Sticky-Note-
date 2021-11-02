import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

declare var $: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  constructor(private _AuthService: AuthService) { }

  registerForm: FormGroup = new FormGroup({
    "first_name": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
    "last_name": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
    "age": new FormControl(null, [Validators.required, Validators.min(20), Validators.max(80)]),
    "email": new FormControl(null, [Validators.required, Validators.email]),
    "password": new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z]{2,8}$/)])
  });
  isRegister: boolean = false;
  messageSuccess: boolean = false;
  error: string = "";
  ngOnInit(): void {
    $('#register').particleground();
  }

  regiserFun(registerForm: FormGroup) {


    if (registerForm.valid) {
      this._AuthService.register(registerForm.value).subscribe((response) => {
        if (response.message == "success") {
          this.isRegister = true;
          this.messageSuccess = true;
        }
        else {
          this.error = response.errors.email.message;
        }

      })

    }
    console.log(registerForm);
  }

}
