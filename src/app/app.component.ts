import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private userService: UserService
  ) {
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.hide();
      this.splashScreen.hide();

      this.userService.authState.subscribe(state => {
        if (state) {
          this.router.navigate(['product-list']);
        } else {
          this.router.navigate(['sign-in']);
        }
      });
    });
  }

  sideMenu() {
    this.navigate = [
      {
        title: 'Etalase',
        url: '/etalase',
        icon: 'pricetags-outline'
      },
      {
        title: 'Barang',
        url: '/product-list',
        icon: 'cube-outline'
      },
      {
        title: 'Penerimaan',
        url: '/product-list',
        icon: 'file-tray-stacked-outline'
      },
      {
        title: 'Keluar',
        url: '/sign-out',
        icon: 'log-out-outline'
      }
    ]
  }
}
