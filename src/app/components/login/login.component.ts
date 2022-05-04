import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FetchdataService } from 'src/app/services/fetchdata.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  constructor(private _fb: FormBuilder, private _fetchdata: FetchdataService, private _router: Router, private _interaction: InteractionService) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this._fetchdata.loginData(this.loginForm.value).subscribe((res: any) => {
      console.log(res);

      localStorage.setItem("token", res.token)
      localStorage.setItem("user", JSON.stringify(res))
      this._router.navigate(["/feeds"])
    }, (error) => {
      console.log(error);

    })
  }
}
