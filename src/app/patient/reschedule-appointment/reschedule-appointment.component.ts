
import { Component, OnInit } from "@angular/core";
import { DoctorService } from "../services/patient.service";
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
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

declare var $, swal;

@Component({
  selector: 'app-reschedule-appointment',
  templateUrl: './reschedule-appointment.component.html',
  styleUrls: ['./reschedule-appointment.component.css'],
  providers: [DoctorService]
})

export class RescheduleAppointmentComponent implements OnInit {

  public config: ToasterConfig = new ToasterConfig({ limit: 1 });

  loading: boolean = false;
  firstName: string = "";
  lastName: string = "";
  mobileNumber: string = "";
  pincode: string = "";
  email: string = "";
  address: string = "";
  doctorId: string = "";
  speciality: string = "";
  aboutme: string = "";
  designation: string = "";
  hospital: string = "";
  errorFirstName: boolean = false;
  errorLastName: boolean = false;
  formD: any;
  fileName: any;
  profilePicPath: string = "";
  profileViews: string = "";
  allInsurances: any = [];
  allSpecialities: any = [];

  selectedInsurances: any = [];
  languages: any = [];

  boardCertification: string = "";
  eduAndTraining: string = "";
  awardAndPublication: string = "";
  npiNumber: string = "";
  officeLocationAddress: string = "";

  patientcount: string = ""

  dateOfAppointment: string = null;
  doctorName: string = "";
  slotArray: any = [];
  dayName: string = "";
  emptySlot: boolean = false;
  doctorData: any = {}
  specialityids: any = []
  slotSelected: String = "";
  oneStarRating: number = 0
  twoStarRating: number = 0
  threeStarRating: number = 0
  fourStarRating: number = 0
  fiveStarRating: number = 0
  reviewCount: number = 0;
  averageRating: number = 0;
  isloggedin: boolean = false
  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private ts: ToasterService,
    private cookieService: CookieService,
    private _route: ActivatedRoute,
    private router: Router

  ) { }
  ngOnInit() {
    this._route.params.subscribe(data => {
      console.log(data);
      this.doctorId = data.id
      this.loading = true;
      // this.getAllSpecialities();
      this.updateDoctorPublicProfileView(this.doctorId);
      this.getDoctorPublicProfile(this.doctorId);

    });


  }

  ngAfterViewInit() {
    var self = this;
    $("#booking_date").dateDropper({

    });

    $("#booking_date").change(function () {
      var todayTime = new Date($(this).val());

      this.dayName = (todayTime.toDateString())
      var month = todayTime.getMonth() + 1;
      var day = todayTime.getDate();
      var year = todayTime.getFullYear();
      var doa = year + "-" + month + "-" + day;

      self.dateOfAppointment = doa
      //  self.searchSlots()
    });

    this.getSlots()
  }


  getSlots() {
    var self = this;

    var todayTime = new Date($("#booking_date").val());

    this.dayName = (todayTime.toDateString())
    var month = todayTime.getMonth() + 1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    var doa = year + "-" + month + "-" + day;

    self.dateOfAppointment = doa
    self.searchSlots()
  }


  getAllSpecialities() {
    this.doctorService.getAllSpecialities().subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.allSpecialities = res.Data;
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }

  getDoctorPublicProfile(id) {
    this.doctorService.getDoctorPublicProfile(id).subscribe(res => {
      this.loading = false;
      let totalRating = 0;
      if (res.IsSuccess) {
        this.reviewCount = res.Data.Reviews.length
        this.profileViews = res.Data.profileViews;
        this.firstName = res.Data.firstName;
        this.lastName = res.Data.lastName;
        this.mobileNumber = res.Data.mobileNumber;
        this.pincode = res.Data.pincode;
        this.email = res.Data.email;
        this.address = res.Data.address;
        this.profilePicPath = res.Data.profilePicPath;
        this.patientcount = res.Data.patients_ids.length;
        this.doctorData = res.Data;
        this.specialityids = res.Data.speciality_ids;
        this.oneStarRating = res.Data.One_Stars_Count / this.reviewCount * 100
        this.twoStarRating = res.Data.Two_Stars_Count / this.reviewCount * 100
        this.threeStarRating = res.Data.Three_Stars_Count / this.reviewCount * 100
        this.fourStarRating = res.Data.Four_Stars_Count / this.reviewCount * 100
        this.fiveStarRating = res.Data.Five_Stars_Count / this.reviewCount * 100
        res.Data.Reviews.forEach(review => {
          totalRating += review.ratingGiven
        });

        setTimeout(() => {
          if (res.Data.speciality_ids.length > 0)
            this.speciality = this.getSpecialityName(res.Data.speciality_ids[0]._id);

        }, 200);

        this.aboutme = res.Data.aboutme;
        this.designation = res.Data.designation;
        this.hospital = res.Data.hospital;

        this.selectedInsurances = res.Data.insurances_ids;
        this.languages = res.Data.languagesSpeak;

        (this.boardCertification = res.Data.boardCertification),
          (this.eduAndTraining = res.Data.eduAndTraining),
          (this.awardAndPublication = res.Data.awardAndPublication),
          (this.npiNumber = res.Data.npiNumber),
          (this.officeLocationAddress = res.Data.officeLocationAddress);
      } else {
        this.ts.pop("error", "", res.Message);
      }
    });
  }

  updateDoctorPublicProfileView(id) {
    this.doctorService.updateDoctorPublicProfileView(id).subscribe(res => {
      this.loading = false;
      console.log(res);

    });
  }
  toggleMenu() {
    $("body").toggleClass("ls-toggle-menu");
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }
  getSpecialityName(id) {
    var foundSpecilaity = this.allSpecialities.find(function (element) {
      return element._id == id;
    });
    if (foundSpecilaity == undefined) return "";
    return (this.speciality = foundSpecilaity.displayName);
  }







  onDateValueChange(value: any): void {

    var todayTime = new Date(value);

    this.dayName = (value.toDateString())
    var month = todayTime.getMonth() + 1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    var doa = year + "-" + month + "-" + day;

    //var doa = day + "/" + month + "/" + year;
    this.dateOfAppointment = doa


  }


  searchSlots() {
    this.slotArray = [];

    this.emptySlot = false

    // this.doctorId = "5cbab271de3e275696acfbe0";
    this.doctorService.dateWiseAvailableSlots(this.doctorId, this.dateOfAppointment).subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.slotArray = res.EmptySlots

        if (this.slotArray.length == 0)
          this.emptySlot =
            true



      } else {
        this.slotArray = [];

        //  this.ts.pop("error", "", res.Message)
      }

    });

    console.log(this.slotArray.length)

  }


  selectSlot(slot) {
    this.slotSelected = slot;
  }

  resAppointment() {

    if (this.slotSelected == "") {
      this.ts.pop("error", "", "Please select an appointment time");
      return false
    }
    let patData = {


      "service": "5cdd04223c8d0d098422bdeb",
      "dateOfAppointment": this.dateOfAppointment,
      "timeOfAppointment": this.slotSelected,
      "doctorId": this.doctorId,
      "doctorName": this.firstName + ' ' + this.lastName,
      "appId": this.cookieService.getItem('appid'),


    }
    localStorage.setItem('patientData', JSON.stringify(patData));
    this.router.navigate(["/patient/rebookingDetail"]);




  }

}


