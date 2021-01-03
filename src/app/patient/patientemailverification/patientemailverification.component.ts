

import { Component, OnInit, AfterViewInit } from "@angular/core";
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


import { CookieService } from "../../landing/services/cookie.service";

import { LoginService } from "../../landing/services/login.service";
declare var $: any;
@Component({

  templateUrl: "./patientemailverification.component.html",
  styleUrls: ["./patientemailverification.component.css"],
  providers: [LoginService]
})
export class PatientemailverificationComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  userNamevalidation: boolean = true;
  passwordvalidation: boolean = true;
  loading: boolean = false;
  emailMobile: String = "";
  message: String = ""
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private ts: ToasterService,
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      let code = params['code'];
      let email = params['email'];

      var EmailCode = {
        "code": code,

        "email": email

      }

      this.loading = true;

      this.loginService.verifyEmailForPatient(EmailCode).subscribe(data => {
        if (data.IsSuccess) {
          this.loading = false;
          this.message = "Email has been successfully verified! Now you can loggin"
          this.ts.pop(
            "success",
            "Email verified",
            "Email has been successfully verified! Now you can login"
          );
          this.ts.pop("success", "Verified", "redirecting in 2 seconds....");

          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 2000);
        } else {
          this.loading = false;
          this.message = data.Message

          this.ts.pop("error", "", data.Message);
        }
        //  this.loading = false;
      });

    });
  }


}
