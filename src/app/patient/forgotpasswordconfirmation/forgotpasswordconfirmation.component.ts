

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
  selector: 'app-forgotpasswordconfirmation',
  templateUrl: './forgotpasswordconfirmation.component.html',
  styleUrls: ['./forgotpasswordconfirmation.component.css'],
  providers: [DoctorService]

})

export class ForgotpasswordconfirmationComponent implements OnInit {


  firstName: String = "";
  lastName: String = "";
  mobileNumber: String = "";
  pincode: String = "";
  email: String = "";
  address: String = "";
  profilePicPath: String = "";
  patientData: any = {}
  constructor(
    private doctorService: DoctorService,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private ts: ToasterService,
    private router: Router
  ) {
    setTimeout(() => {
      this.router.navigate(["/patient/login"]);
    }, 5000);
  }

  ngOnInit() {
  }


}
