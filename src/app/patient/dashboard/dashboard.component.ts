import { Component, OnInit } from '@angular/core';
import {
  ToasterContainerComponent,
  ToasterService,
  ToasterConfig
} from "angular2-toaster";
import { CookieService } from "../../landing/services/cookie.service";
import { DoctorService } from "../services/patient.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [CookieService, DoctorService]
})
export class DashboardComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  loading: boolean = false;
  isloggedin: boolean = false;
  upcomingappointments: any = [];
  dashboardData: any = {}
  constructor(private cookieService: CookieService, private doctorService: DoctorService) { }

  ngOnInit() {
    if (this.cookieService.getItem('_id') != null) {
      this.isloggedin = true
      this.getDashBoardData()

    }
  }

  getUpcomingAppointments() {
    this.doctorService.getUpcomingAppointments().subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.upcomingappointments = res.Data;

      } else {

      }
    });
  }

  getDashBoardData() {
    this.doctorService.getDashBoardData().subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.dashboardData = res.Data;

      } else {

      }
    });
  }
}
