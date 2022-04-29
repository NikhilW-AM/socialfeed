import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FetchdataService } from 'src/app/services/fetchdata.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private _fb: FormBuilder, private _fetchdata: FetchdataService) { }

  signupForm!: FormGroup
  ngOnInit(): void {
    this.signupForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onsubmit() {
    this._fetchdata.postSignupData(this.signupForm.value).subscribe(res => {
      console.log(res);
    })
  }
}
