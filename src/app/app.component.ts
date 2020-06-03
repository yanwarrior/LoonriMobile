import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

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
    private userService: UserService,
    private androidPermissions: AndroidPermissions
  ) {
    this.sideMenu();
    this.initializeApp();
    this.permissions();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString("3880ff");
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

  permissions() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?', result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.SEND_SMS, this.androidPermissions.PERMISSION.BROADCAST_SMS]);
  }

  sideMenu() {
    this.navigate = [
      {
        title: 'Etalase',
        url: '/etalase',
        icon: 'pricetags-outline'
      },
      {
        title: 'Layanan',
        url: '/product-list',
        icon: 'cube-outline'
      },
      {
        title: 'Transaksi Cucian',
        url: '/acceptance-list',
        icon: 'file-tray-stacked-outline'
      },
      {
        title: 'Tentang Aplikasi',
        url: '/about',
        icon: 'flask-outline'
      },
      {
        title: 'Keluar',
        url: '/sign-out',
        icon: 'log-out-outline'
      }
    ]
  }
}
