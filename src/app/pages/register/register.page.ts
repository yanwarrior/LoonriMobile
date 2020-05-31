import { Component, OnInit } from '@angular/core';
import { UserRegisterSerializer } from 'src/app/serializers/user-register-serializer';
import { UserAfterRegisterSerializer } from 'src/app/serializers/user-after-register-serializer';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userRegister: UserRegisterSerializer;
  userAfterRegister: UserAfterRegisterSerializer;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.userRegister = new UserRegisterSerializer();
  }

  register() {
    this.userService.register(this.userRegister)
      .subscribe((response) => {
        this.userAfterRegister = response;
      }, 
      (error) => {
        this.userService.toastError(error);
      });
  }

  navigateSignIn() {
    this.router.navigate(['sign-in']);
  }

  ngOnInit() {
  }

}
