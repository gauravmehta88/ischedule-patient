

import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from "@angular/forms";
import { LoginService } from "../../landing/services/login.service";
import {
  ToasterContainerComponent,
  ToasterService,
  ToasterConfig
} from "angular2-toaster";
import { CookieService } from "../../landing/services/cookie.service";

declare var $: any;

declare var swal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit, AfterViewInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  LoginForm: FormGroup;
  userNamevalidation: boolean = true;
  passwordvalidation: boolean = true;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private ts: ToasterService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.initLoginForm();


  }

  ngOnInit() { }

  initLoginForm() {
    this.LoginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  toggleNavbar() {
    $("html").toggleClass("nav-open");
  }

  ngAfterViewInit() {
    $(".navbar-toggler").on("click", function () {
      $("html").toggleClass("nav-open");
    });

    $(".form-control")
      .on("focus", function () {
        $(this)
          .parent(".input-group")
          .addClass("input-group-focus");
      })
      .on("blur", function () {
        $(this)
          .parent(".input-group")
          .removeClass("input-group-focus");
      });
  }

  makeLowerCase() { }

  signIn() {
    console.log(this.LoginForm);
    if (this.LoginForm.valid) {
      let data = {
        username: this.LoginForm.value.username,
        password: this.LoginForm.value.password
      };
      this.loading = true;
      this.loginService.loginPatient(data).subscribe(data => {
        if (data.IsSuccess) {
          this.loading = false;


          if (!data.Data.isEmailVerified) {
            swal({
              title: "Almost there...",
              html: "<div><b>Please check your email to confirm your account</b> </br></br></br> <span> No confirmation email received?</span></br> Please check your spam folder or request new confirmation email</div>",
              type: "warning",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OK  !"
            }).then(result => {
              console.log(result);
              if (result) {

              }
            });
          } else {
            this.cookieService.setItem("address", data.Data.address);
            this.cookieService.setItem("email", data.Data.email);
            this.cookieService.setItem("firstName", data.Data.firstName);
            this.cookieService.setItem(
              "isEmailVerified",
              data.Data.isEmailVerified
            );
            this.cookieService.setItem(
              "isPhoneVerified",
              data.Data.isPhoneVerified
            );
            this.cookieService.setItem("lastName", data.Data.lastName);
            this.cookieService.setItem("mobileNumber", data.Data.mobileNumber);
            this.cookieService.setItem(
              "profilePicPath",
              data.Data.profilePicPath
            );
            this.cookieService.setItem("_id", data.Data._id);

            this.cookieService.setItem("_id", data.Data._id);
            this.cookieService.setItem("Token", data.Token);

            this.router.navigate(["/patient/dashboard"]);
          }
        } else {
          this.loading = false;
          this.ts.pop("error", "", data.Message);

          if (data.Message == 'eMail not verified.') {
            swal({
              title: "Almost there...",
              html: "<div><b>Please check your email to confirm your account</b> </br></br></br> <span> No confirmation email received?</span></br> Please check your spam folder or request new confirmation email</div>",
              type: "warning",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OK  !"
            }).then(result => {
              console.log(result);
              if (result) {

              }
            });
          }
        }
      });


    } else {
      this.userNamevalidation = false;
      this.passwordvalidation = false;
      this.ts.pop("error", "", "Please fill all the Details");
    }
  }
}
