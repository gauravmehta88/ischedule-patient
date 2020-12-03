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

declare var $;

@Component({
  selector: "app-patient-profile",
  templateUrl: "./patient-profile.component.html",
  styleUrls: ["./patient-profile.component.css"],
  providers: [DoctorService]
})
export class PatientProfileComponent implements OnInit {
  firstName: string = "";
  middleName: string = "";
  lastName: string = "";
  mobileNumber: string = "";
  pincode: string = "";
  email: string = "";
  address: string = "";
  allSlots: any = [];
  patientForm: FormGroup;
  allSpecialities: any = [];
  documents: any = [];
  myDateValue: Date;
  maxDate: Date;
  mytime: Date = new Date();
  profilePicPath: string = "";
  prescriontionArray: any = [];
  invoiceDetails: any = [];

  errorFirstName: boolean = false;
  errorLastName: boolean = false;
  errorEmail: boolean = false;
  errorMobile: boolean = false;

  loading: boolean = false;
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  constructor(
    private doctorService: DoctorService,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private ts: ToasterService
  ) {
    this.getPatientProfile();
  }
  initPatientForm() {
    this.patientForm = this.fb.group({
      dateOfAppointment: [""],
      timeOfAppointment: [""],

      description: [""],
      service: [""],
      doctorId: ""
    });
    $("#drpdownSpeciality").selectpicker("refresh");

  }
  ngOnInit() {
    this.getAllSpecialities();
    this.initPatientForm();

    this.initCitySelectize();
    this.getPatientPrescription();
    this.getPatientInvoice()


  }
  getPatientPrescription() {


    this.doctorService.getPatientPrescription().subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {

        this.prescriontionArray = res.Data;
      } else {
        this.ts.pop("error", "", res.Message)

      }
    });
  }
  ngAfterViewInit() {
    var self = this;
    $("#searchDoctor").change(function () {
      self.searchSlots();
      $(this).css("background-color", "#7FFF00");
    });
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
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }

  onDateValueChange(value: Date): void {
    if (false) {
      var todayTime = new Date(value);
      var month = todayTime.getMonth() + 1;
      var day = todayTime.getDate();
      var year = todayTime.getFullYear();
      var doa = day + " / " + month + " / " + year;
      this.patientForm.patchValue({
        dateOfAppointment: doa
      });


    }
  }
  searchSlots() {
    var docId = "5cbab271de3e275696acfbe0"
    var dateOfApp = new Date(this.patientForm.value.dateOfAppointment);
    var month = dateOfApp.getMonth() + 1;
    var day = dateOfApp.getDate();
    var year = dateOfApp.getFullYear();
    var doa = day + "/" + month + "/" + year;

    // var docId=$("#searchDoctor").val();
    this.doctorService.dateWiseAvailableSlots(docId, doa).subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.allSlots = res.EmptySlots;

      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }

  selectSlot(slot) {

    this.patientForm.patchValue({ "timeOfAppointment": "" + slot })
  }


  getAllSpecialities() {
    this.doctorService.getAllSpecialities().subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.allSpecialities = res.Data;

        setTimeout(() => {
          $("#drpdownSpeciality").selectpicker();
        }, 500);
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }

  cancelAppointment() {
    this.initPatientForm();
  }
  getInvoiceSubTotal(invoiceDetail) {
    let subTotal = 0;
    invoiceDetail.billItems.forEach(element => {
      subTotal = subTotal + parseInt(element.cost)
    });
    return subTotal

  }



  getInvoiceCost(invoiceDetail) {
    let subTotal = 0;
    invoiceDetail.billItems.forEach(element => {
      subTotal = subTotal + parseInt(element.cost)
    });
    let discountInInt = subTotal * parseInt(invoiceDetail.discount) / 100;
    let taxtInInt = subTotal * parseInt(invoiceDetail.tax) / 100;

    return (subTotal - discountInInt + taxtInInt)
  }

  getPatientInvoice() {
    this.doctorService.getPatientInvoice().subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.invoiceDetails = res.Data;
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }

  bookAppointment() {
    if ($("#searchDoctor").val() == "") {
      this.ts.pop("error", "", "please select doctor");
      return false;
    }
    if (this.patientForm.value.dateOfAppointment == "") {
      this.ts.pop("error", "", "please select date of appointment");
      return false;
    }



    if (!this.patientForm.valid) {
      this.ts.pop("error", "", "fill required fields");
      return false;
    }
    if (this.patientForm.invalid) {
      this.ts.pop("error", "", "please fill the valid information");
      return false;
    }
    var dateOfApp = new Date(this.patientForm.value.dateOfAppointment);
    var month = dateOfApp.getMonth() + 1;
    var day = dateOfApp.getDate();
    var year = dateOfApp.getFullYear();
    var doa = year + "-" + month + "-" + day;



    var patData = {
      service: "",
      dateOfAppointment: "",
      timeOfAppointment: "",
      doctorId: ""
    };

    patData = this.patientForm.value;

    patData.dateOfAppointment = doa;
    patData.timeOfAppointment = this.patientForm.value.timeOfAppointment;
    patData.doctorId = $("#searchDoctor").val();
    this.doctorService.bookAppointment(patData).subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.initPatientForm();
        setTimeout(() => {
          $("#drpdownSpeciality").selectpicker();


        }, 500);
        this.ts.pop("success", "", "Appoinment added successfully");
      } else {
        this.ts.pop("error", "", res.Message);
      }
    });

    console.log(this.patientForm.value);
  }

  initCitySelectize() {
    console.log("Enter in the Selectize");

    let self = this;
    var $select = $("#searchDoctor").selectize({
      delimiter: ",",
      persist: false,
      placeholder: "Search Doctor",
      valueField: "_id",
      labelField: "firstName",
      searchField: "firstName",
      maxItems: 1,
      preload: "focus",

      load: function (query, callback) {
        $.ajax({
          url:
            "http://api.ischedulenow.com/api/patient/" +
            self.cookieService.getItem("_id") +
            "/searchDoctorByName",
          type: "POST",
          headers: {
            Authorization: self.cookieService.getItem("Token"),
            Accept: "application/json"
          },
          contentType: "application/json",
          data: JSON.stringify({ stringToMatch: query }),

          dataType: "json",

          error: function () {
            callback();
          },
          success: function (res) {
            console.log(res);
            if (res != null)
              res.Data.forEach(element => {
                element.firstName =
                  "Dr. " +
                  element.firstName.charAt(0).toUpperCase() +
                  element.firstName.slice(1) +
                  " " +
                  element.lastName.charAt(0).toUpperCase() +
                  element.lastName.slice(1);
              });
            // if(res.specialData && res.specialData.length > 0)
            //  {  self.setHTML(res); }
            // console.log('Is it calling res.data',res.data);
            callback(res.Data);
          }
        });
      }
    });
    console.log($select[0]);
    // this.selectize = $select[0].selectize;
  }
}
