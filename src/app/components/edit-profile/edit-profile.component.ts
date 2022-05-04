import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FetchdataService } from 'src/app/services/fetchdata.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private _fb: FormBuilder, private _fetchdata: FetchdataService, private _router: Router) { }

  formData = new FormData()
  imageURL?: string
  image?: any
  currentUser: any
  editUser: any
  editProfileForm!: FormGroup
  ngOnInit(): void {
    this.editProfileForm = this._fb.group({
      name: ['',],
      dob: ['',],
      email: ['',],
      mobileNumber: ['',],
      gender: ['',],
      bio: ['',],
      img: ['']
    })
    this.getUserDetails()
  }

  getUserDetails() {
    this.currentUser = JSON.parse(localStorage.getItem("user") || '{}')
    //console.log(this.currentUser.user._id);
    if (this.currentUser)
      this._fetchdata.getCurrectUser(this.currentUser.user._id).subscribe((data: any) => {
        console.log(data);
        this.editUser = data
        this.setEditForm()
      })
  }

  setEditForm() {
    this.editProfileForm.get("name")?.setValue(this.editUser?.name);
    this.editProfileForm.get("email")?.setValue(this.editUser?.email);
  }
  showPreview(event: any) {
    if (event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageURL = e.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    this.image = event.target.files[0]
  }

  submit() {
    this.formData.append('img', this.image);
    this.formData.append('bio', JSON.stringify(this.editProfileForm.get('bio')?.value));
    this.formData.append('name', JSON.stringify(this.editProfileForm.get('name')?.value));
    this.formData.append('mobileNumber', JSON.stringify(this.editProfileForm.get('mobileNumber')?.value));
    this.formData.append('email', JSON.stringify(this.editProfileForm.get('email')?.value));
    this.formData.append('dob', JSON.stringify(this.editProfileForm.get('dob')?.value))
    this.formData.append('gender', JSON.stringify(this.editProfileForm.get('gender')?.value));


    console.log(this.editProfileForm.value);
    this._fetchdata.postEditProfile(this.formData, this.currentUser.user._id).subscribe(res => {
      console.log(res);
      if (res) {
        this._router.navigate(['/feeds'])
        this.formData.delete("img")
      }
    }, (err) => {
      console.log(err);

    })


  }
}
