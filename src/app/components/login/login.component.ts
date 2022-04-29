import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FetchdataService } from 'src/app/services/fetchdata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  constructor(private _fb: FormBuilder, private _fetchdata: FetchdataService) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this._fetchdata.loginData(this.loginForm.value).subscribe(res => {
      console.log(res);
    }, (error) => {
      console.log(error);

    })
  }
}
