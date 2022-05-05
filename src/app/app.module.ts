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
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { AddpostComponent } from './components/addpost/addpost.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    FeedsComponent,
    HeaderComponent,
    EditProfileComponent,
    AddpostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, AvatarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SocialLoginModule
  ],
  providers: [BsModalService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '84105419738-8oluc05m3ucnl6c2ciima85klppl16eo.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
