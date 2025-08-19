import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from 'src/app/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  LoginForm: FormGroup;
  constructor(
    private _servcie: FirestoreService,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private router: Router
  ) {
    this.LoginForm = this._fb.group({
      email: [''],
      password: [''],
    });
  }
  get V() {
    return this.LoginForm.controls;
  }
  Login() {
    if (this.LoginForm.invalid) return;
    this._servcie
      .login(this.LoginForm.value.email, this.LoginForm.value.password)
      .then((userCredential) => {
        sessionStorage.setItem('token', JSON.stringify(userCredential));
        this.router.navigate(['all-enquiries']);
        this._toastr.success('Login Successfully');
      })
      .catch((error) => {
        this._toastr.error(error);
      });
  }
}
