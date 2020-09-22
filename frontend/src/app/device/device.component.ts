import { Component, OnInit } from '@angular/core';
import { Device } from '../models/device.model';
import { AppService } from '../app.service';
import { BaseResponse } from '../models/response.model';
import { User } from '../models/user.model';
@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.sass']
})
export class DeviceComponent implements OnInit {
  devices: Device[] = [];
  user:User;
  constructor(private _appService: AppService) { }

  ngOnInit(): void {
    this._appService.getAllDevices().subscribe(
      (response: BaseResponse) => {
        console.log("resonse devices => ", response);
        this.devices = response.response;
      }
    );
    this._appService.user.subscribe(
      (user: User) => {
        this.user = user;
      }
    );
  }

}
