import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.page.html',
  styleUrls: ['./sign-out.page.scss'],
})
export class SignOutPage implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  signOut() {
    this.userService.signOut();
  }

}
