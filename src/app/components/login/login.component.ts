import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FetchdataService } from 'src/app/services/fetchdata.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { ToastrService } from 'ngx-toastr';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  currentUser: any;
  userData: any;
  googleUserData: any;
  constructor(private _fb: FormBuilder, private _fetchdata: FetchdataService, private _router: Router, private _interaction: InteractionService, private _toast: ToastrService, private authService: SocialAuthService) { }

  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem("user") || '{}')
    console.log(this.currentUser);
    if (this.currentUser) {
      this._router.navigate(['/feeds'])
    }


    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  onSubmit() {
    this._fetchdata.loginData(this.loginForm.value).subscribe((res: any) => {
      console.log(res);

      localStorage.setItem("token", res.token)
      localStorage.setItem("user", JSON.stringify(res))
      this._router.navigate(["/feeds"])
    }, (error) => {
      console.log(error.error);
      this._toast.error(error.error);
    })
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res: any) => {
      console.log(res);
      this.userData = res;
      let passString = "@123"
      this.googleUserData = {
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        password: `${res.firstName}${res.lastName}${passString}`
      }
      this.registerUser(this.googleUserData);
    });
  }
  registerUser(registerUser: any) {
    // registering the user
    this._fetchdata.postSignupData(registerUser).subscribe((data: any) => {
      console.log(data);
      this._toast.success('Registered successully!', 'Success!');
      if (data.success == false) {
        console.log(data.message);
      }
      else {
        if (data.message == "User Created") {
        }
      }
    }, (err) => {
      console.log(err.error);
      if (err.error == "Email already Exist") {
        console.log("login");
        let loginValue = {
          email: this.googleUserData.email,
          password: this.googleUserData.password
        }
        this._fetchdata.loginData(loginValue).subscribe((data: any) => {
          console.log(data);
          this._toast.success('login successully!', 'Success!');
          if (data) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            this._router.navigate(['/feeds']);
          }
        })
      }
    })
  }
}
