
import { Component, OnInit } from '@angular/core';
import {
  ToasterContainerComponent,
  ToasterService,
  ToasterConfig
} from "angular2-toaster";
import { CookieService } from "../../landing/services/cookie.service";
import { DoctorService } from "../services/patient.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [DoctorService]
})
export class SettingsComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  loading: boolean = false;
  isloggedin: boolean = false;
  option: any = "Email"
  time: String = "2 Hours"
  constructor(private ts: ToasterService,
    private cookieService: CookieService, private doctorService: DoctorService) { }


  ngOnInit() {

    if (this.cookieService.getItem('_id') != null) {
      this.isloggedin = true


    }

  }
  submit() {
    let dataToSend = {
      "reminderBy": this.option,
      "reminderBefore": this.time
    }
    this.doctorService.saveMyPrefrence(dataToSend).subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.ts.pop("success", "", "Reminder successfully set")
      }
    })
  }


}