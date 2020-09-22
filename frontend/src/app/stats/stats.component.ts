import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { BaseResponse } from '../models/response.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass']
})
export class StatsComponent implements OnInit {

  stats: any={};
  user;

  constructor(private _appService: AppService) { }

  ngOnInit(): void {
    this._appService.getPowerStats().subscribe(
      (response: BaseResponse) => {
        console.log("stats response => ", response);
        this.stats = response.response;
      }
    );
    this._appService.user.subscribe(
      (user: User) => {
        this.user = user;
      }
    )
  }

}
