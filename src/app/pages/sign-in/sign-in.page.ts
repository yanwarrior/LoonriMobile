import { Component, OnInit } from '@angular/core';
import { UserSignInSerializer } from 'src/app/serializers/user-sign-in-serializer';
import { UserService } from 'src/app/services/user.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  user: UserSignInSerializer

  constructor(
    private userService: UserService,
    private router: Router,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      if (this.userService.ifSignedIn) {
        this.router.navigate(['dashboard']);
      }
    })
    this.user = new UserSignInSerializer();
  }

  ngOnInit() {
  }

  signIn() {
    this.userService.signIn(this.user)
      .subscribe(
        (response) => {
          console.log('response :', response);
          this.userService.setAuthState(true);
          this.userService.saveUserCredential(response);
        },
        (error) => {
          this.userService.toastError(error);
        }
      );
  }

}
