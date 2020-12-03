

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "../../landing/services/login.service";

import {
  ToasterContainerComponent,
  ToasterService,
  ToasterConfig
} from "angular2-toaster";
import { Router } from "@angular/router";
declare var $;
declare var swal: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [LoginService]
})
export class RegisterComponent implements OnInit {

  SignUpForm: FormGroup;
  loading: boolean = false;
  geoLocation: any = []
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  constructor(
    private fb: FormBuilder,

    private ts: ToasterService,
    public loginService: LoginService,
    public router: Router
  ) {
    this.initSignUpForm();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    let self = this;
    $("#searchBox").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "http://dev.virtualearth.net/REST/v1/Locations",
          dataType: "jsonp",
          data: {
            key: "Aol3B6WbArCZMliaTOCrcSLjEtur7Y4A6uthDqQfehUjvGWhQZNhG8p1JOwraB-W",
            q: request.term
          },
          jsonp: "jsonp",
          success: function (data) {
            var result = data.resourceSets[0];
            if (result) {
              if (result.estimatedTotal > 0) {
                response($.map(result.resources, function (item) {
                  return {
                    data: item,
                    label: item.name + ' (' + item.address.countryRegion + ')',
                    value: item.name
                  }
                }));
              }
            }
          }
        });
      },
      minLength: 1,
      change: function (event, ui) {
        if (!ui.item)
          $("#searchBox").val('');
      },
      select: function (event, ui) {


        self.displaySelectedItem(ui.item.data);
      }
    });


  }


  displaySelectedItem(item) {
    var self = this;

    self.geoLocation = item.point.coordinates

    self.SignUpForm.patchValue({
      geoLocation: this.geoLocation,
      address: item.name

    })
  }

  initSignUpForm() {
    this.SignUpForm = this.fb.group({
      firstName: ["", Validators.required],
      middleName: [""],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      mobileNo: [""],
      pinNo: [""],
      address: [""],
      password: ["", Validators.required],
      geoLocation: [],
      confirmPassword: ["", Validators.required],
      agree: [""]
    });
  }

  toggleNavbar() {
    $("html").toggleClass("nav-open");
  }

  signUp() {
    if (this.SignUpForm.valid) {
      if (!this.SignUpForm.controls.agree.value) {
        this.ts.pop("error", "", "please agree to term and conditions");
        return false;
      }
      let data = {
        firstName: this.SignUpForm.value.firstName,
        lastName: this.SignUpForm.value.lastName,
        email: this.SignUpForm.value.email,
        password: this.SignUpForm.value.password,
        mobileNumber: this.SignUpForm.value.mobileNo,
        address: this.SignUpForm.value.address,
        pincode: this.SignUpForm.value.pinNo,
        geoLocation: this.geoLocation
      };
      this.loginService.signUpPatient(data).subscribe(data => {
        if (data.IsSuccess) {
          this.ts.pop("success", "", "Successfully sign up");
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
              setTimeout(() => {
                this.router.navigate(["/patient/login"]);
              }, 3000);
            }
          });
        } else {
          this.ts.pop("error", "", data.Message);
        }
      });
    } else {
      this.ts.pop("error", "", "Please fill all the Details");
    }
  }
}
