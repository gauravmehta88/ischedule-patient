

import { Component, OnInit } from "@angular/core";
import { DoctorService } from "../services/patient.service";
import { CookieService } from "../../landing/services/cookie.service";
import { Router, ActivatedRoute } from "@angular/router";


import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from "@angular/forms";
import {
  ToasterContainerComponent,
  ToasterService,
  ToasterConfig
} from "angular2-toaster";

declare var $;

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.css'],
  providers: [DoctorService]

})

export class BookingConfirmationComponent implements OnInit {

  public config: ToasterConfig = new ToasterConfig({ limit: 1 });

  firstName: String = "";
  lastName: String = "";
  mobileNumber: String = "";
  pincode: String = "";
  email: String = "";
  address: String = "";
  profilePicPath: String = "";
  patientData: any = {}
  isloggedin: boolean = false;
  loading: boolean = false;
  constructor(
    private doctorService: DoctorService,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private ts: ToasterService,
    private router: Router
  ) {
    this.getPatientProfile();
  }

  ngOnInit() {
    if (this.cookieService.getItem('_id') != null) {
      this.isloggedin = true


    }
  }
  getPatientProfile() {
    this.doctorService.getPatientProfile().subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.firstName = res.Data.firstName;
        this.lastName = res.Data.lastName;
        this.mobileNumber = res.Data.mobileNumber;
        this.pincode = res.Data.pincode;
        this.email = res.Data.email;
        this.address = res.Data.address;
        this.profilePicPath = res.Data.profilePicPath;

        setTimeout(() => {
          this.router.navigate(["/patient/dashboard"]);

        }, 3000);
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }

}
