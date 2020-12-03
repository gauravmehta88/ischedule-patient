import { Component, OnInit } from "@angular/core";
import { DoctorService } from "../services/patient.service";
import { CookieService } from "../../landing/services/cookie.service";
import { Router, ActivatedRoute } from "@angular/router";
import { LoginService } from "../../landing/services/login.service";



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
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css'],
  providers: [DoctorService, LoginService]

})
export class BookingDetailComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  loading: boolean = false;
  SignUpForm: FormGroup;

  dateOfAppointment: String = "";
  doctorName: String = "";
  timeOfAppointment: String = "";
  disabled: boolean = false;
  patientId: String = null;
  firstName: String = "";
  lastName: String = "";
  mobileNumber: String = "";
  pincode: String = "";
  email: String = "";
  address: String = "";
  profilePicPath: String = "";
  patientData: any = {}
  cancellationPolicy: boolean = false
  btnCLicked: boolean = false;
  invalidEmail: boolean = false;

  isloggedin: boolean = false;
  constructor(
    private doctorService: DoctorService,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private ts: ToasterService,
    private router: Router,
    private loginService: LoginService
  ) {
    this.initSignUpForm();
    this.patientId = this.cookieService.getItem("_id")
    if (this.cookieService.getItem("_id")) {
      this.disabled = true

      this.patientId = this.cookieService.getItem("_id")
      this.getPatientProfile();

    } else {

    }
  }
  initSignUpForm() {
    this.SignUpForm = this.fb.group({
      firstName: ["", Validators.required],
      middleName: [""],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      mobileNumber: [""],
      pincode: [""],
      address: [""],
      password: ["123456"],
      agree: [""]
    });
  }
  ngOnInit() {
    if (this.cookieService.getItem('_id') != null) {
      this.isloggedin = true


    }

    this.patientData = JSON.parse(localStorage.getItem("patientData"));
    this.dateOfAppointment = this.patientData.dateOfAppointment;
    this.doctorName = this.patientData.doctorName;
    this.timeOfAppointment = this.patientData.timeOfAppointment;
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
        this.SignUpForm.patchValue({
          firstName: this.firstName,
          middleName: [""],
          lastName: this.lastName,
          email: this.email,
          mobileNumber: this.mobileNumber,
          pincode: this.pincode,
          address: this.address,

        });

      } else {
        //  this.ts.pop("error", "", res.Message)
      }
    });
  }

  bookAppointment() {

    if (this.patientId) {
      this.doctorService.bookAppointment(this.patientData).subscribe(res => {
        console.log(res);
        if (res.IsSuccess) {
          this.router.navigate(["/patient/bookingConfirmation"]);

          // this.ts.pop("success", "", "Your appointment has been scheduled successfully")
        } else {
          this.ts.pop("error", "", res.Message);
        }
      });
    } else {
      this.ts.pop("error", "Please login first", "Redirecting to login page..")
      setTimeout(() => {
        this.router.navigate(["/patient/login"]);

      }, 2000);
      //book apointment for new patient

    }




  }

  bookAppointmentForNewPatient() {
    this.btnCLicked = true
    console.log(this.SignUpForm)
    if (this.SignUpForm.valid) {
      if (!this.cancellationPolicy) {
        this.ts.pop("error", "", "please agree to term and conditions");
        return false;
      }
      this.SignUpForm.patchValue({
        address: this.address,
        pincode: this.pincode
      })
      this.loginService.signUpPatient(this.SignUpForm.value).subscribe(data => {
        if (data.IsSuccess) {

        } else {
          this.ts.pop("error", "", data.Message);
        }
      });
    } else {
      this.ts.pop("error", "", "Please fill all the Details");
    }
  }



}
