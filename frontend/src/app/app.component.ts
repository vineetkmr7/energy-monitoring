import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'frontend';
  user = null;

  constructor(private _router: Router, private _appService: AppService) {
    this._appService.user.subscribe(
      (user: User) => {
        this.user = user;
      }
    );
  }

  logout() {
    this._appService.logout().subscribe(
      (response) => {
        console.log(response);
        this._appService.user.next(null);
      }
    );
  }

  login() {
    this._router.navigate(['login']);
  }

  addDevice() {
    this._router.navigate(['add-device']);
  }
  viewDevices() {
    this._router.navigate(['device']);
  }
  showStats() {
    this._router.navigate(['stats']);
  }
}
