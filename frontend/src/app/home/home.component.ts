import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  user: User;
  message: string = '';
  constructor(private _appService: AppService) { }

  ngOnInit(): void {
    this._appService.user.subscribe(
      (user: User) => {
        if (user) {
          this.user = user;
          this.message = "Logged in as " + this.user.name;
        } else {
          this.message = "";
        }
      },
      err => console.log("error in home component=>", err)
    );
  }

}
