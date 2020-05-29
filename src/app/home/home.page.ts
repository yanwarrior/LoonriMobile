import { Component } from '@angular/core';
import { UserRegisterSerializer } from '../serializers/user-register-serializer';
import { UserAfterRegisterSerializer } from '../serializers/user-after-register-serializer';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userRegister: UserRegisterSerializer;
  userAfterRegister: UserAfterRegisterSerializer;

  constructor(
    private userService: UserService
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
}
