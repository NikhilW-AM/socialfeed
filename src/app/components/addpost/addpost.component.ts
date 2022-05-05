import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FetchdataService } from 'src/app/services/fetchdata.service';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {
  imageURL: any;
  image: string = '';
  userDetails: any
  formData = new FormData()
  constructor(private _fb: FormBuilder, private _fetchdata: FetchdataService, private _router: Router) { }

  addPostForm!: FormGroup
  ngOnInit(): void {
    this.addPostForm = this._fb.group({
      img: [''],
      caption: [''],
      userId: [''],
      userName: ['']
    })
    this.getLocalStorage()
  }

  getLocalStorage() {
    this.userDetails = JSON.parse(localStorage.getItem("user") || '{}')
  }
  showPreview(event: any) {
    if (event.target.files[0]) {
      this.image = event.target.files[0]
      var reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageURL = e.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }

  }

  submit() {
    this.formData.append('img', this.image);
    this.formData.append('caption', JSON.stringify(this.addPostForm.get('caption')?.value));
    this.formData.append('userId', this.userDetails.user._id);
    this.formData.append('userName', JSON.stringify(this.userDetails.user.name));

    console.log(this.image);
    this._fetchdata.uploadPost(this.formData).subscribe(res => {
      console.log(res);
      if (res) {
        this._router.navigate(['/feeds'])
      }
    }, (error) => {
      console.log(error);
    })
    this.formData.delete("img")
  }
}
