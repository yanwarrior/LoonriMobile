import { Component, OnInit } from '@angular/core';
import { UserSignInSerializer } from 'src/app/serializers/user-sign-in-serializer';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  user: UserSignInSerializer

  constructor(private userService: UserService) {
    this.user = new UserSignInSerializer();
  }

  ngOnInit() {
  }

  signIn() {
    this.userService.signIn(this.user)
      .subscribe(
        (response) => {
          console.log('response :', response);
          this.userService.saveUserCredential(response);
        },
        (error) => {
          this.userService.toastError(error);
        }
      );
  }

}
