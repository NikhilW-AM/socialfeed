import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  modalRef!: BsModalRef;
  constructor(private _fb: FormBuilder, private modalService: BsModalService, private _router: Router, private _interaction: InteractionService) { }
  openVerticallyCentered(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  show: boolean = false;
  currentUser: any
  changePasswordForm!: FormGroup
  ngOnInit(): void {
    this.getCurrentLoggedInUser()
    this.changePasswordForm = this._fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    })


  }

  getCurrentLoggedInUser() {
    this.currentUser = JSON.parse(localStorage.getItem("user") || '{}')
    console.log(this.currentUser);

  }
  showList() {
    this.show = !this.show
  }
  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    this._router.navigate(['login'])
  }


  submit() {

  }
}
