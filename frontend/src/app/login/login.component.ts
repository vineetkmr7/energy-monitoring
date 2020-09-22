import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  email: string = "vineetkumar@outlook.in";
  password: string = "testtest";
  user: User;
  constructor(private _appService: AppService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this._appService.login(this.email, this.password).subscribe(
      (data) => {
        console.log("login data", data);
        this.user = {
          token: data.response.token,
          ...data.response.user
        };
        this._appService.user.subscribe((user: User) => {
          if (user) {
            this._router.navigate(['/']);
          }
        });
      },
      err => console.log("error => ", err)
    );
  }

}
