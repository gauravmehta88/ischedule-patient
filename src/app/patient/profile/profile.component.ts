

import { Component, OnInit } from "@angular/core";
import { DoctorService } from "../services/patient.service";
import { CookieService } from "../../landing/services/cookie.service";

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
import * as filestack from 'filestack-js';
const client = filestack.init('AGqWW8kQNRqi122GGl1nvz');


declare var $;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [DoctorService, CookieService]
})
export class ProfileComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  profileForm: FormGroup;
  firstName: string = "";
  middleName: string = "";
  lastName: string = "";

  dob: string = "";
  mobileNumber: string = "";
  email: string = "";
  address: string = "";
  zipCode: string = "";
  loading: boolean = false;
  errorFirstName: boolean = false;
  profilePicPath: string = "";
  allInsurances: any = [];


  errorLastName: boolean = false;
  errorMobileNumber: boolean = false;
  formD: any;
  isloggedin: boolean = false;


  constructor(
    private cookieService: CookieService,
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private ts: ToasterService
  ) {
    this.initLoginForm();
    this.getAllInsurances()
    // this.getDoctorProfile();
  }

  getAllInsurances() {
    this.doctorService.getAllInsurances().subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.allInsurances = res.Data;
        //  this.insurance = this.cookieService.getItem('insurance')
        setTimeout(() => {
          $('select').selectpicker('refresh')
        }, 1500);
        $('select').selectpicker('refresh')
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }
  uploadPic() {
    const options = {
      onFileUploadFinished: file => {
        // If you throw any error in this function it will reject the file selection.
        // The error message will be displayed to the user as an alert.
        console.log(file)
        this.profilePicPath = file.url;
        $('#ancrImage').find('img').attr('src', this.profilePicPath)
        this.saveChanges()
      }
    };


    client.picker(options).open();
  }








  initLoginForm() {
    this.profileForm = this.fb.group({
      firstName: ["", Validators.required],

      lastName: ["", Validators.required],
      address: [""],
      email: ["", Validators.required],
      mobileNumber: ["", Validators.required],
      zipCode: [""],
      dob: [""],

      insurance: [""]


    });
  }

  ngOnInit() {
    this.loading = false;
    this.getPatientProfile();
    if (this.cookieService.getItem('_id') != null) {
      this.isloggedin = true


    }

  }

  ngAfterViewInit() {

    // $("#dob").dateDropper({

    // });

    $("#dob").change(function () {
      var todayTime = new Date($(this).val());

      this.dayName = (todayTime.toDateString())
      var month = todayTime.getMonth() + 1;
      var day = todayTime.getDate();
      var year = todayTime.getFullYear();
      var doa = year + "-" + month + "-" + day;

      this.profileForm.patchValue({
        dob: doa
      });
      //  self.searchSlots()
    });
  }


  onDateValueChange(value: Date): void {
    if (false) {
      var todayTime = new Date(value);
      var month = todayTime.getMonth() + 1;
      var day = todayTime.getDate();
      var year = todayTime.getFullYear();
      var dob = day + " / " + month + " / " + year;

    }
  }
  getPatientProfile() {
    this.doctorService.getPatientProfile().subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {

        let result = res.Data.insurance.map(a => a._id);
        console.log(result)
        this.firstName = res.Data.firstName;
        this.lastName = res.Data.lastName;
        this.mobileNumber = res.Data.mobileNumber;
        this.email = res.Data.email;
        this.address = res.Data.address;
        this.zipCode = res.Data.pincode;
        this.profilePicPath = res.Data.profilePicPath;
        let dob = new Date(res.Data.dob);
        let dateFromString = (dob.getMonth() + 1) + '/' + dob.getDate() + '/' + dob.getFullYear();

        this.dob = res.Data.dob;
        this.profileForm.patchValue({

          firstName: this.firstName,

          lastName: this.lastName,
          email: this.email,
          address: this.address,
          mobileNumber: this.mobileNumber,
          zipCode: this.zipCode,
          profilePicPath: res.Data.profilePicPath,
          dob: dateFromString,
          insurance: result
        })
        $('select').selectpicker('refresh')

      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }




  saveChanges() {
    console.log(this.profileForm)
    if (!this.profileForm.valid) {

      if (this.profileForm.controls.firstName.value == "") {
        this.errorFirstName = true;
      }

      if (this.profileForm.controls.lastName.value == "") {
        this.errorLastName = true;
      }
      if (this.profileForm.controls.mobileNumber.value == "") {
        this.errorMobileNumber = true;
      }
      this.ts.pop("error", "", "fill required fields");
      return false;
    }

    console.log(this.profileForm.value)

    let data = {
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      email: this.profileForm.value.email,
      insurance: this.profileForm.value.insurance,
      mobileNumber: this.profileForm.value.mobileNumber,
      address: this.profileForm.value.address,
      pincode: this.profileForm.value.zipCode,
      dob: this.profileForm.value.dob,
      profilePicPath: this.profilePicPath
    };

    this.doctorService.editPatientProfile(data).subscribe(res => {
      console.log(res)

      if (res.IsSuccess) {
        this.ts.pop("success", "", "Profile updated");
        this.cookieService.setItem("profilePicPath", this.profilePicPath)
        $('#ancrImage').find('img').attr('src', this.profilePicPath)

      } else {
        this.ts.pop("error", "", res.Message);

      }

    })

  }
}

