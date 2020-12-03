
import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../landing/services/login.service";
import { CookieService } from "../../landing/services/cookie.service";
import { DoctorService } from "../services/patient.service";


import { Router, ActivatedRoute } from "@angular/router";
import { Title, Meta } from '@angular/platform-browser';


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
  selector: 'app-review-doctor',
  templateUrl: './review-doctor.component.html',
  styleUrls: ['./review-doctor.component.css'],
  providers: [LoginService, CookieService, DoctorService]
})
export class ReviewDoctorComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });

  doctorId: String = "";
  doctor: any = {};
  loading: boolean = false;
  review: String = ""
  check: boolean = false
  isloggedin: boolean = false

  constructor(
    private loginService: LoginService,
    private doctorService: DoctorService,

    private cookieService: CookieService,

    private fb: FormBuilder,
    private ts: ToasterService,
    private _route: ActivatedRoute,
    private titleService: Title,
    private meta: Meta,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.cookieService.getItem('_id') != null) {
      this.isloggedin = true


    }
    if (this.cookieService.getItem('_id') == null) {
      this.router.navigate(["/patient/login"]);

    }
    this._route.params.subscribe(data => {
      console.log(data);
      this.doctorId = data.id

      this.getDoctorPublicProfile(this.doctorId);


    });


  }


  getDoctorPublicProfile(id) {
    this.doctorService.getDoctorPublicProfile(id).subscribe(res => {
      this.loading = false;
      console.log(res);

      if (res.IsSuccess) {

        this.doctor = res.Data;



      } else {
        this.ts.pop("error", "", res.Message);
      }
    });
  }


  submitReview() {
    if (this.review == '') {
      this.ts.pop("error", "", "please provide doctor review");
      return false;
    }
    if ($('input[name="rating-input"]:checked').val() == undefined || $('input[name="rating-input"]:checked').val() == "") {
      this.ts.pop("error", "", "please provide ratings");
      return false;
    }

    if (this.check == false) {
      this.ts.pop("error", "", "please accept term and conditions");
      return false;
    }

    let dataTosend = {

      "doctorId": this.doctorId.trimLeft().trimRight(),
      "review": this.review.trimLeft().trimRight(),
      "rating": $('input[name="rating-input"]:checked').val()

    }

    this.loginService.rateDoctor(dataTosend).subscribe(res => {
      if (res.IsSuccess)
        this.ts.pop("success", "Success", "thanks for the review")
      this.loading = false;

      this.router.navigate(["/patient/doctorDetail/" + this.doctorId]);

    });

  }


}
