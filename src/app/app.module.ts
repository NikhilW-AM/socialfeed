import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FeedsComponent } from './components/feeds/feeds.component';
import { HeaderComponent } from './components/header/header.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AvatarModule } from 'ngx-avatar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    FeedsComponent,
    HeaderComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, AvatarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
